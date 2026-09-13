/// Local note values and persistence contracts.
library;

/// Recoverable operation result. Errors never contain note content.
sealed class Result<T> {
  /// Creates a result.
  const new();
}

/// Successful operation.
final class Ok<T> extends Result<T> {
  /// Creates a successful result.
  const new(this.value);

  /// Operation value.
  final T value;
}

/// Failed operation with a user-safe description.
final class Err<T> extends Result<T> {
  /// Creates a recoverable failure.
  const new(this.message);

  /// Safe description, never a raw exception.
  final String message;
}

/// An immutable local Markdown note. This is not a CRDT document bundle.
final class Note {
  /// Creates a note value.
  const new({
    required this.id,
    required this.title,
    required this.body,
    required this.modifiedAt,
  });

  /// Maximum editable title length.
  static const maxTitleLength = 160;

  /// Maximum editable Markdown length.
  static const maxBodyLength = 100000;

  /// Stable, opaque identifier.
  final String id;

  /// User-entered title; may be empty while editing.
  final String title;

  /// Markdown source, never interpreted as HTML.
  final String body;

  /// Last edit time in UTC.
  final DateTime modifiedAt;

  /// Fallback title used only for display.
  String get displayTitle =>
      title.trim().isEmpty ? 'Untitled note' : title.trim();

  /// Plain text preview of the Markdown source.
  String get excerpt => body.trim().isEmpty
      ? 'A little space for your thoughts.'
      : body
            .replaceAll(RegExp(r'[#*_>`~\[\]]'), '')
            .replaceAll(RegExp(r'\s+'), ' ')
            .trim();

  /// Number of whitespace-delimited words.
  int get wordCount =>
      body.trim().isEmpty ? 0 : body.trim().split(RegExp(r'\s+')).length;

  /// Whether lengths and identity are within the local schema bounds.
  bool get isValid =>
      id.isNotEmpty &&
      id.length <= 80 &&
      title.length <= maxTitleLength &&
      body.length <= maxBodyLength;

  /// Matches a case-insensitive title/body query, ignoring outer whitespace.
  bool matches(String query) {
    final value = query.trim().toLowerCase();
    return title.toLowerCase().contains(value) ||
        body.toLowerCase().contains(value);
  }

  /// Returns a new value, preserving the stable identity.
  Note edit({
    required String title,
    required String body,
    required DateTime at,
  }) => Note(id: id, title: title, body: body, modifiedAt: at.toUtc());
}

/// Persistence boundary for local Markdown notes and non-sensitive preferences.
abstract interface class NoteRepository {
  /// Loads notes in descending modification order.
  Future<Result<List<Note>>> load();

  /// Atomically saves one note.
  Future<Result<void>> save(Note note);

  /// Deletes one note by its identity.
  Future<Result<void>> remove(String id);

  /// Reads a presentation preference, defaulting when absent.
  Future<Result<String>> preference(String key, String fallback);

  /// Saves a presentation preference.
  Future<Result<void>> setPreference(String key, String value);

  /// Releases storage resources.
  Future<void> close();
}
