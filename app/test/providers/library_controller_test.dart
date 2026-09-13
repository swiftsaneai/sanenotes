import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sane_notes/providers/library_controller.dart';

import '../fake_repository.dart';

void main() {
  test(
    'serializes rapid edits and never reports saved before acknowledgement',
    () async {
      final repository = FakeRepository();
      final container = ProviderContainer.test(
        overrides: [repositoryProvider.overrideWithValue(repository)],
      );
      await container.read(libraryProvider.future);
      final controller = container.read(libraryProvider.notifier);
      final id = controller.create();
      for (var i = 0; i < 30; i++) {
        controller.edit(id, title: 'Edit $i', body: 'Body $i');
      }
      expect(
        container.read(libraryProvider).requireValue.pending,
        greaterThan(0),
      );
      await controller.flush();
      expect(repository.notes[id]!.title, 'Edit 29');
      expect(container.read(libraryProvider).requireValue.pending, 0);
      expect(container.read(libraryProvider).requireValue.unsaved, isEmpty);
    },
  );

  test(
    'retains unsaved edits after failure and retries the latest version',
    () async {
      final repository = FakeRepository()..failWrites = true;
      final container = ProviderContainer.test(
        overrides: [repositoryProvider.overrideWithValue(repository)],
      );
      await container.read(libraryProvider.future);
      final controller = container.read(libraryProvider.notifier);
      final id = controller.create(title: 'Keep this');
      await controller.flush();
      expect(
        container.read(libraryProvider).requireValue.unsaved,
        contains(id),
      );
      expect(
        container.read(libraryProvider).requireValue.note(id)!.title,
        'Keep this',
      );
      repository.failWrites = false;
      controller.retry();
      await controller.flush();
      expect(repository.notes[id]!.title, 'Keep this');
      expect(container.read(libraryProvider).requireValue.unsaved, isEmpty);
    },
  );

  test(
    'failed deletion keeps the note and successful deletion can be undone',
    () async {
      final repository = FakeRepository();
      final container = ProviderContainer.test(
        overrides: [repositoryProvider.overrideWithValue(repository)],
      );
      await container.read(libraryProvider.future);
      final controller = container.read(libraryProvider.notifier);
      final id = controller.create(title: 'Original', body: 'Preserved');
      await controller.flush();
      final note = repository.notes[id]!;
      repository.failWrites = true;
      expect(await controller.remove(id), isFalse);
      expect(container.read(libraryProvider).requireValue.note(id), isNotNull);
      repository.failWrites = false;
      expect(await controller.remove(id), isTrue);
      expect(repository.notes, isEmpty);
      controller.restore(note);
      await controller.flush();
      expect(repository.notes[id]!.body, 'Preserved');
    },
  );

  test('failed initialization produces an error without any writes', () async {
    final repository = FakeRepository()..failReads = true;
    final container = ProviderContainer.test(
      overrides: [repositoryProvider.overrideWithValue(repository)],
    );
    await expectLater(container.read(libraryProvider.future), throwsStateError);
    expect(repository.notes, isEmpty);
  });
}
