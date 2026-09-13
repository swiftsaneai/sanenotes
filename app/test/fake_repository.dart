import 'package:sane_core/sane_core.dart';

/// Deterministic repository with injectable storage failures.
class FakeRepository implements NoteRepository {
  /// Stored test values.
  final Map<String, Note> notes = {};

  /// Non-sensitive settings.
  final Map<String, String> preferences = {};

  /// Simulates unavailable storage.
  bool failWrites = false;

  /// Simulates an unreadable existing database.
  bool failReads = false;

  @override
  Future<Result<List<Note>>> load() async =>
      failReads ? const Err('Cannot open notes') : Ok(notes.values.toList());
  @override
  Future<Result<void>> save(Note note) async {
    await Future<void>.delayed(const Duration(milliseconds: 1));
    if (failWrites) return const Err('Storage unavailable');
    notes[note.id] = note;
    return const Ok(null);
  }

  @override
  Future<Result<void>> remove(String id) async {
    if (failWrites) return const Err('Storage unavailable');
    notes.remove(id);
    return const Ok(null);
  }

  @override
  Future<Result<String>> preference(String key, String fallback) async =>
      Ok(preferences[key] ?? fallback);
  @override
  Future<Result<void>> setPreference(String key, String value) async {
    preferences[key] = value;
    return const Ok(null);
  }

  @override
  Future<void> close() async {}
}
