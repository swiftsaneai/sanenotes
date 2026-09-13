import 'dart:async';

import 'package:drift/drift.dart';
import 'package:drift_flutter/drift_flutter.dart';
import 'package:sane_core/sane_core.dart';

part 'note_database.g.dart';

/// Local draft storage. Separate from the future CRDT document schema.
@DataClassName('StoredNote')
class Drafts extends Table {
  /// Stable note identifier.
  TextColumn get id => text().withLength(min: 1, max: 80)();

  /// Editable title.
  TextColumn get title => text().withLength(max: Note.maxTitleLength)();

  /// Markdown source.
  TextColumn get body => text().withLength(max: Note.maxBodyLength)();

  /// UTC edit timestamp.
  DateTimeColumn get modifiedAt => dateTime()();
  @override
  Set<Column<Object>> get primaryKey => {id};
}

/// Non-sensitive presentation settings.
class Preferences extends Table {
  /// Preference identifier.
  TextColumn get key => text()();

  /// Serialized setting.
  TextColumn get value => text()();
  @override
  Set<Column<Object>> get primaryKey => {key};
}

/// Durable SQLite implementation of the domain persistence boundary.
@DriftDatabase(tables: [Drafts, Preferences])
class NoteDatabase extends _$NoteDatabase implements NoteRepository {
  /// Opens a test or injected executor.
  new(super.e);

  /// Opens on-device storage, or the local browser SQLite worker.
  new local()
    : super(
        driftDatabase(
          name: 'sane_markdown_v1',
          native: const DriftNativeOptions(shareAcrossIsolates: true),
          web: DriftWebOptions(
            sqlite3Wasm: Uri.parse('sqlite3.wasm'),
            driftWorker: Uri.parse('drift_worker.dart.js'),
            onResult: (result) {
              if (result.chosenImplementation ==
                      WasmStorageImplementation.inMemory ||
                  result.chosenImplementation ==
                      WasmStorageImplementation.unsafeIndexedDb) {
                unawaited(result.resolvedExecutor.close());
                throw StateError(
                  'This browser cannot provide reliable local storage.',
                );
              }
            },
          ),
        ),
      );

  @override
  int get schemaVersion => 1;

  @override
  Future<Result<List<Note>>> load() async {
    try {
      final rows =
          await (select(drafts)..orderBy([
                (row) => OrderingTerm.desc(row.modifiedAt),
                (row) => OrderingTerm.asc(row.id),
              ]))
              .get();
      final notes = rows
          .map(
            (row) => Note(
              id: row.id,
              title: row.title,
              body: row.body,
              modifiedAt: row.modifiedAt.toUtc(),
            ),
          )
          .toList();
      if (notes.any((note) => !note.isValid)) {
        return const Err(
          'Some saved notes could not be read. Your database has not been changed.',
        );
      }
      return Ok(List.unmodifiable(notes));
    } on Object {
      return const Err(
        'Your notes could not be opened. Check available storage and retry.',
      );
    }
  }

  @override
  Future<Result<void>> save(Note note) async {
    if (!note.isValid) {
      return const Err('This note exceeds the supported text limits.');
    }
    try {
      await into(drafts).insertOnConflictUpdate(
        DraftsCompanion.insert(
          id: note.id,
          title: note.title,
          body: note.body,
          modifiedAt: note.modifiedAt,
        ),
      );
      return const Ok(null);
    } on Object {
      return const Err(
        'Changes are not saved. Keep this window open and retry.',
      );
    }
  }

  @override
  Future<Result<void>> remove(String id) async {
    try {
      await (delete(drafts)..where((row) => row.id.equals(id))).go();
      return const Ok(null);
    } on Object {
      return const Err('The note could not be deleted. Please retry.');
    }
  }

  @override
  Future<Result<String>> preference(String key, String fallback) async {
    try {
      final row = await (select(
        preferences,
      )..where((row) => row.key.equals(key))).getSingleOrNull();
      return Ok(row?.value ?? fallback);
    } on Object {
      return const Err('Appearance settings could not be read.');
    }
  }

  @override
  Future<Result<void>> setPreference(String key, String value) async {
    try {
      await into(preferences).insertOnConflictUpdate(
        PreferencesCompanion.insert(key: key, value: value),
      );
      return const Ok(null);
    } on Object {
      return const Err('Appearance could not be saved. Please retry.');
    }
  }
}
