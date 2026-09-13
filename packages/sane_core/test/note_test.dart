import 'package:sane_core/sane_core.dart';
import 'package:test/test.dart';

void main() {
  final note = Note(
    id: 'test',
    title: 'Physics',
    body: '# Wave motion\nTwo waves',
    modifiedAt: DateTime.utc(2026),
  );
  test(
    'searches title and body without case or outer whitespace sensitivity',
    () {
      expect(note.matches(' PHYSICS '), isTrue);
      expect(note.matches('two WAVES'), isTrue);
      expect(note.matches('chemistry'), isFalse);
      expect(note.matches(''), isTrue);
    },
  );
  test('editing preserves identity and returns a new value', () {
    final edited = note.edit(
      title: '',
      body: 'New text',
      at: DateTime.utc(2026, 9),
    );
    expect(edited.id, note.id);
    expect(edited.displayTitle, 'Untitled note');
    expect(edited.wordCount, 2);
    expect(note.title, 'Physics');
    expect(edited.modifiedAt.isAfter(note.modifiedAt), isTrue);
  });
  test('bounds and empty content are explicit', () {
    expect(note.isValid, isTrue);
    expect(
      note.edit(title: 'x' * 161, body: '', at: note.modifiedAt).isValid,
      isFalse,
    );
    expect(
      note.edit(title: '', body: 'x' * 100001, at: note.modifiedAt).isValid,
      isFalse,
    );
    expect(note.edit(title: '', body: '  ', at: note.modifiedAt).wordCount, 0);
  });
}
