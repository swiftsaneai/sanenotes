import 'dart:io';

import 'package:drift/native.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sane_core/sane_core.dart';
import 'package:sane_notes/data/note_database.dart';

void main() {
  test(
    'notes and appearance survive close and reopen, then deletion persists',
    () async {
      final directory = Directory.systemTemp.createTempSync('sane-test-');
      addTearDown(() => directory.deleteSync(recursive: true));
      final file = File('${directory.path}/notes.sqlite');
      var database = NoteDatabase(NativeDatabase(file));
      final early = Note(
        id: 'a',
        title: 'First',
        body: 'Old',
        modifiedAt: DateTime.utc(2026),
      );
      final recent = Note(
        id: 'b',
        title: "Quotes ' and Unicode हिंदी",
        body: '# Body',
        modifiedAt: DateTime.utc(2026, 9),
      );
      expect(await database.save(early), isA<Ok<void>>());
      expect(await database.save(recent), isA<Ok<void>>());
      expect(await database.setPreference('dark', 'true'), isA<Ok<void>>());
      await database.close();
      database = NoteDatabase(NativeDatabase(file));
      final loaded = await database.load() as Ok<List<Note>>;
      expect(loaded.value.map((note) => note.id), ['b', 'a']);
      expect(loaded.value.first.title, recent.title);
      expect(
        (await database.preference('dark', 'false') as Ok<String>).value,
        'true',
      );
      expect(await database.remove('b'), isA<Ok<void>>());
      await database.close();
      database = NoteDatabase(NativeDatabase(file));
      expect((await database.load() as Ok<List<Note>>).value.single.id, 'a');
      await database.close();
    },
  );

  test('rejects oversized input without modifying the stored row', () async {
    final database = NoteDatabase(NativeDatabase.memory());
    addTearDown(database.close);
    final note = Note(
      id: 'a',
      title: 'Safe',
      body: '',
      modifiedAt: DateTime.utc(2026),
    );
    await database.save(note);
    expect(
      await database.save(
        note.edit(title: 'x' * 161, body: '', at: note.modifiedAt),
      ),
      isA<Err<void>>(),
    );
    expect(
      (await database.load() as Ok<List<Note>>).value.single.title,
      'Safe',
    );
  });

  test('corrupt database fails safely without replacing its bytes', () async {
    final directory = Directory.systemTemp.createTempSync('sane-corrupt-');
    addTearDown(() => directory.deleteSync(recursive: true));
    final file = File('${directory.path}/notes.sqlite')
      ..writeAsStringSync('not a database');
    final original = file.readAsBytesSync();
    final database = NoteDatabase(NativeDatabase(file));
    expect(await database.load(), isA<Err<List<Note>>>());
    await database.close();
    expect(file.readAsBytesSync(), original);
  });
  test(
    'subsecond edit order survives reopen and version 1 migrates safely',
    () async {
      final directory = Directory.systemTemp.createTempSync('sane-migration-');
      addTearDown(() => directory.deleteSync(recursive: true));
      final file = File('${directory.path}/notes.sqlite');
      var database = NoteDatabase(NativeDatabase(file));
      final first = Note(
        id: 'z',
        title: 'Earlier',
        body: '',
        modifiedAt: DateTime.utc(2026, 9, 13, 12, 0, 0, 100),
      );
      final second = Note(
        id: 'a',
        title: 'Later',
        body: '',
        modifiedAt: DateTime.utc(2026, 9, 13, 12, 0, 0, 900),
      );
      await database.save(first);
      await database.save(second);
      await database.close();
      database = NoteDatabase(NativeDatabase(file));
      expect(
        (await database.load() as Ok<List<Note>>).value.map((note) => note.id),
        ['a', 'z'],
      );
      // Recreate the exact v1 timestamp representation and version marker.
      await database.customStatement(
        'UPDATE drafts SET modified_at = CAST(modified_at / 1000 AS INTEGER)',
      );
      await database.customStatement('PRAGMA user_version = 1');
      await database.close();
      database = NoteDatabase(NativeDatabase(file));
      final migrated = (await database.load() as Ok<List<Note>>).value;
      expect(migrated, hasLength(2));
      expect(migrated.first.modifiedAt, DateTime.utc(2026, 9, 13, 12));
      expect(
        migrated.map((note) => note.title),
        containsAll(['Earlier', 'Later']),
      );
      await database.close();
    },
  );
}
