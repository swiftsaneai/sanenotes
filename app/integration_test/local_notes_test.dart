import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:sane_core/sane_core.dart';
import 'package:sane_notes/app.dart';
import 'package:sane_notes/bootstrap.dart';
import 'package:sane_notes/data/note_database.dart';
import 'package:sane_notes/providers/library_controller.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  testWidgets('real platform storage survives a repository reopen', (
    tester,
  ) async {
    bootstrap();
    final database = NoteDatabase.local();
    await tester.pumpWidget(
      ProviderScope(
        overrides: [repositoryProvider.overrideWithValue(database)],
        child: const SaneApp(),
      ),
    );
    await tester.pumpAndSettle();
    await tester.tap(find.text('New note'));
    await tester.pumpAndSettle();
    await tester.enterText(
      find.byKey(const Key('note-title')),
      'Platform smoke test',
    );
    await tester.enterText(
      find.byKey(const Key('note-body')),
      '## Durable notes\n\nHello from the platform test.',
    );
    await tester.pumpAndSettle();
    final context = tester.element(find.byKey(const Key('note-body')));
    final container = ProviderScope.containerOf(context);
    final controller = container.read(libraryProvider.notifier);
    await controller.flush();
    final saved = container.read(libraryProvider).requireValue.notes.first;
    expect(saved.body, contains('Durable notes'));
    await tester.pumpWidget(const SizedBox.shrink());
    await tester.pumpAndSettle();
    await database.close();
    final reopened = NoteDatabase.local();
    final loaded = await reopened.load() as Ok<List<Note>>;
    expect(
      loaded.value.firstWhere((note) => note.id == saved.id).body,
      saved.body,
    );
    expect(await reopened.remove(saved.id), isA<Ok<void>>());
    await reopened.close();
  });
}
