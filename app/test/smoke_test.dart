import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sane_notes/app.dart';
import 'package:sane_notes/providers/library_controller.dart';

import 'fake_repository.dart';

void main() {
  testWidgets('creates, edits, previews, searches and deletes a note', (
    tester,
  ) async {
    tester.view.physicalSize = const Size(1200, 900);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    final repository = FakeRepository();
    await tester.pumpWidget(
      ProviderScope(
        overrides: [repositoryProvider.overrideWithValue(repository)],
        child: const SaneApp(),
      ),
    );
    await tester.pumpAndSettle();
    await tester.tap(find.text('New note'));
    await tester.pumpAndSettle();
    await tester.enterText(find.byKey(const Key('note-title')), 'Physics');
    await tester.enterText(
      find.byKey(const Key('note-body')),
      '## Waves\n\n**Remember resonance.**',
    );
    await tester.pumpAndSettle();
    expect(repository.notes.values.single.title, 'Physics');
    await tester.tap(find.text('Preview'));
    await tester.pumpAndSettle();
    expect(find.byKey(const Key('markdown-preview')), findsOneWidget);
    await tester.enterText(find.byKey(const Key('search')), 'unmatched');
    await tester.pumpAndSettle();
    expect(find.text('No matching notes'), findsOneWidget);
    await tester.enterText(find.byKey(const Key('search')), 'resonance');
    await tester.pumpAndSettle();
    expect(find.byType(ListTile), findsOneWidget);
    await tester.tap(find.byTooltip('Use dark theme'));
    await tester.pumpAndSettle();
    expect(repository.preferences['dark'], 'true');
    await tester.tap(find.byTooltip('Delete note'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Keep note'));
    await tester.pumpAndSettle();
    expect(repository.notes, hasLength(1));
    await tester.tap(find.byTooltip('Delete note'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Delete').last);
    await tester.pumpAndSettle();
    expect(repository.notes, isEmpty);
    await tester.tap(find.text('Undo'));
    await tester.pumpAndSettle();
    expect(repository.notes.values.single.body, contains('resonance'));
    expect(tester.takeException(), isNull);
  });

  testWidgets(
    'phone layout supports creation and back navigation without overflow',
    (tester) async {
      tester.view.physicalSize = const Size(390, 844);
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      await tester.pumpWidget(
        ProviderScope(
          overrides: [repositoryProvider.overrideWithValue(FakeRepository())],
          child: const SaneApp(),
        ),
      );
      await tester.pumpAndSettle();
      await tester.tap(find.text('New note'));
      await tester.pumpAndSettle();
      await tester.enterText(
        find.byKey(const Key('note-body')),
        'A small screen',
      );
      await tester.pumpAndSettle();
      await tester.tap(find.byTooltip('Back to library'));
      await tester.pumpAndSettle();
      expect(find.text('My notes'), findsOneWidget);
      expect(tester.takeException(), isNull);
    },
  );
}
