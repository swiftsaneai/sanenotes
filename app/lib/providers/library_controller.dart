import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sane_core/sane_core.dart';
import 'package:sane_notes/data/note_database.dart';
import 'package:uuid/uuid.dart';

/// The only production persistence binding; overridden in tests.
final repositoryProvider = Provider<NoteRepository>((ref) {
  final database = NoteDatabase.local();
  ref.onDispose(() => unawaited(database.close()));
  return database;
});

/// Immutable library and save status.
class LibraryState {
  /// Creates a library snapshot.
  const new({
    required this.notes,
    this.dark = false,
    this.look = 'paper',
    this.pending = 0,
    this.unsaved = const {},
    this.error,
  });

  /// Notes in descending edit order.
  final List<Note> notes;

  /// Dark presentation preference.
  final bool dark;

  /// Chosen design palette.
  final String look;

  /// Writes waiting for durable acknowledgement.
  final int pending;

  /// Notes whose latest edits have not been acknowledged.
  final Set<String> unsaved;

  /// Safe operation failure description.
  final String? error;

  /// Replaces fields with immutable copies; errors are explicitly cleared.
  LibraryState copy({
    List<Note>? notes,
    bool? dark,
    String? look,
    int? pending,
    Set<String>? unsaved,
    String? error,
  }) => LibraryState(
    notes: List.unmodifiable(notes ?? this.notes),
    dark: dark ?? this.dark,
    look: look ?? this.look,
    pending: pending ?? this.pending,
    unsaved: Set.unmodifiable(unsaved ?? this.unsaved),
    error: error,
  );

  /// Finds the selected local note without treating absence as a storage error.
  Note? note(String? id) {
    for (final note in notes) {
      if (note.id == id) return note;
    }
    return null;
  }
}

/// Reactive library state and serialized durable mutations.
final libraryProvider = AsyncNotifierProvider<LibraryController, LibraryState>(
  LibraryController.new,
);

/// Coordinates UI snapshots with the repository boundary.
class LibraryController extends AsyncNotifier<LibraryState> {
  Future<void> _tail = Future.value();
  late NoteRepository _repository;
  final Set<String> _deleting = {};

  @override
  Future<LibraryState> build() async {
    _repository = ref.watch(repositoryProvider);
    final loaded = await _repository.load().timeout(
      const Duration(seconds: 20),
    );
    final notes = switch (loaded) {
      Ok<List<Note>>(:final value) => value,
      Err<List<Note>>(:final message) => throw StateError(message),
    };
    final dark = await _repository.preference('dark', 'false');
    final look = await _repository.preference('look', 'paper');
    return LibraryState(
      notes: notes,
      dark: dark is Ok<String> && dark.value == 'true',
      look: look is Ok<String> ? look.value : 'paper',
    );
  }

  LibraryState get _current => state.requireValue;

  void _set(LibraryState next) {
    if (ref.mounted) state = AsyncData(next);
  }

  /// Creates and immediately schedules a new note for persistence.
  String create({String title = '', String body = ''}) {
    final note = Note(
      id: const Uuid().v4(),
      title: title,
      body: body,
      modifiedAt: DateTime.now().toUtc(),
    );
    _save(note);
    return note.id;
  }

  /// Edits a note without blocking typing on storage latency.
  void edit(String id, {required String title, required String body}) {
    if (_deleting.contains(id)) return;
    final note = _current.note(id);
    if (note == null || (note.title == title && note.body == body)) return;
    _save(note.edit(title: title, body: body, at: DateTime.now()));
  }

  void _save(Note note) {
    if (!note.isValid) return;
    final notes = [note, ..._current.notes.where((item) => item.id != note.id)]
      ..sort((a, b) => b.modifiedAt.compareTo(a.modifiedAt));
    _set(
      _current.copy(
        notes: notes,
        unsaved: {..._current.unsaved, note.id},
        pending: _current.pending + 1,
        error: _current.error,
      ),
    );
    _tail = _tail.then((_) async {
      final result = await _repository.save(note);
      if (!ref.mounted) return;
      final unsaved = {..._current.unsaved};
      if (result is Ok<void> && identical(_current.note(note.id), note)) {
        unsaved.remove(note.id);
      }
      _set(
        _current.copy(
          pending: _current.pending - 1,
          unsaved: unsaved,
          error: result is Err<void>
              ? result.message
              : (unsaved.isEmpty ? null : _current.error),
        ),
      );
    });
  }

  /// Retries every note whose latest version has not been durably saved.
  void retry() {
    _current.notes
        .where((note) => _current.unsaved.contains(note.id))
        .toList()
        .forEach(_save);
  }

  /// Removes only after queued edits and durable deletion succeed.
  Future<bool> remove(String id) async {
    _deleting.add(id);
    final completion = Completer<bool>();
    _set(_current.copy(pending: _current.pending + 1, error: _current.error));
    _tail = _tail.then((_) async {
      final result = await _repository.remove(id);
      _deleting.remove(id);
      if (!ref.mounted) {
        completion.complete(false);
        return;
      }
      if (result is Ok<void>) {
        _set(
          _current.copy(
            notes: _current.notes.where((note) => note.id != id).toList(),
            unsaved: {..._current.unsaved}..remove(id),
            pending: _current.pending - 1,
          ),
        );
        completion.complete(true);
      } else {
        _set(
          _current.copy(
            pending: _current.pending - 1,
            error: (result as Err<void>).message,
          ),
        );
        completion.complete(false);
      }
    });
    return await completion.future;
  }

  /// Restores the original identity and content after accidental deletion.
  void restore(Note note) => _save(note);

  /// Persists appearance on the same queue as note operations.
  void appearance({bool? dark, String? look}) {
    _set(_current.copy(dark: dark, look: look, error: _current.error));
    final settings = <String, String>{
      if (dark != null) 'dark': '$dark',
      'look': ?look,
    };
    _tail = _tail.then((_) async {
      for (final entry in settings.entries) {
        final result = await _repository.setPreference(entry.key, entry.value);
        if (result is Err<void> && ref.mounted) {
          _set(_current.copy(error: result.message));
        }
      }
    });
  }

  /// Waits for all already-enqueued operations (used by lifecycle tests).
  Future<void> flush() => _tail;
}
