import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_markdown_plus/flutter_markdown_plus.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:sane_core/sane_core.dart';
import 'package:sane_notes/providers/library_controller.dart';
import 'package:sane_ui/sane_ui.dart';

/// A live Markdown editor with local autosave and an inert preview.
class NoteEditor extends ConsumerStatefulWidget {
  /// Creates an editor keyed by stable note identity.
  const new({required this.note, required this.onChange, super.key});

  /// Current immutable note.
  final Note note;

  /// Sends user changes to the library coordinator.
  final void Function(String title, String body) onChange;

  @override
  ConsumerState<NoteEditor> createState() => _NoteEditorState();
}

class _NoteEditorState extends ConsumerState<NoteEditor> {
  late final TextEditingController _title = TextEditingController(
    text: widget.note.title,
  );
  late final TextEditingController _body = TextEditingController(
    text: widget.note.body,
  );
  final _bodyFocus = FocusNode();
  bool _preview = false;
  bool _deleting = false;

  @override
  void dispose() {
    _title.dispose();
    _body.dispose();
    _bodyFocus.dispose();
    super.dispose();
  }

  void _changed(String _) => widget.onChange(_title.text, _body.text);

  void _insert(String before, String after) {
    final selection = _body.selection;
    final start = selection.isValid ? selection.start : _body.text.length;
    final end = selection.isValid ? selection.end : start;
    final selected = _body.text.substring(start, end);
    final replacement = '$before$selected$after';
    if (_body.text.length - (end - start) + replacement.length >
        Note.maxBodyLength) {
      return;
    }
    _body.value = TextEditingValue(
      text: _body.text.replaceRange(start, end, replacement),
      selection: TextSelection(
        baseOffset: start + before.length,
        extentOffset: start + before.length + selected.length,
      ),
    );
    _changed('');
    _bodyFocus.requestFocus();
  }

  @override
  Widget build(BuildContext context) => Column(
    children: [
      Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: SaneSpace.medium,
          vertical: SaneSpace.small,
        ),
        child: Row(
          children: [
            Text('MARKDOWN', style: Theme.of(context).textTheme.labelSmall),
            const Spacer(),
            IconButton(
              tooltip: 'Copy Markdown',
              onPressed: () async {
                await Clipboard.setData(
                  ClipboardData(text: '# ${_title.text}\n\n${_body.text}'),
                );
                if (context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Markdown copied')),
                  );
                }
              },
              icon: const Icon(Icons.copy_outlined),
            ),
            IconButton(
              tooltip: 'Delete note',
              onPressed: _deleting ? null : _delete,
              icon: const Icon(Icons.delete_outline),
            ),
          ],
        ),
      ),
      const Divider(),
      Expanded(
        child: LayoutBuilder(
          builder: (context, constraints) {
            final split = constraints.maxWidth >= 760;
            return Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(SaneSpace.medium),
                  child: Wrap(
                    crossAxisAlignment: WrapCrossAlignment.center,
                    spacing: SaneSpace.small,
                    children: [
                      IconButton(
                        tooltip: 'Heading',
                        onPressed: () => _insert('## ', ''),
                        icon: const Icon(Icons.title),
                      ),
                      IconButton(
                        tooltip: 'Bold',
                        onPressed: () => _insert('**', '**'),
                        icon: const Icon(Icons.format_bold),
                      ),
                      IconButton(
                        tooltip: 'Italic',
                        onPressed: () => _insert('*', '*'),
                        icon: const Icon(Icons.format_italic),
                      ),
                      IconButton(
                        tooltip: 'Checklist',
                        onPressed: () => _insert('- [ ] ', ''),
                        icon: const Icon(Icons.checklist),
                      ),
                      IconButton(
                        tooltip: 'Code',
                        onPressed: () => _insert('`', '`'),
                        icon: const Icon(Icons.code),
                      ),
                      if (!split)
                        SegmentedButton<bool>(
                          segments: const [
                            ButtonSegment(
                              value: false,
                              label: Text('Write'),
                              icon: Icon(Icons.edit_outlined),
                            ),
                            ButtonSegment(
                              value: true,
                              label: Text('Preview'),
                              icon: Icon(Icons.visibility_outlined),
                            ),
                          ],
                          selected: {_preview},
                          onSelectionChanged: (value) =>
                              setState(() => _preview = value.first),
                        ),
                    ],
                  ),
                ),
                Expanded(
                  child: split
                      ? Row(
                          children: [
                            Expanded(child: _write()),
                            const VerticalDivider(width: 1),
                            Expanded(child: _render()),
                          ],
                        )
                      : _preview
                      ? _render()
                      : _write(),
                ),
              ],
            );
          },
        ),
      ),
      const Divider(),
      Padding(
        padding: const EdgeInsets.all(SaneSpace.medium),
        child: Row(
          children: [
            Text(
              '${widget.note.wordCount} words',
              style: Theme.of(context).textTheme.labelSmall,
            ),
            const Spacer(),
            Text(
              'Markdown · Autosave on',
              style: Theme.of(context).textTheme.labelSmall,
            ),
          ],
        ),
      ),
    ],
  );

  Widget _write() => Align(
    alignment: Alignment.topCenter,
    child: ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: SaneSpace.page),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: SaneSpace.large),
        child: Column(
          children: [
            TextField(
              key: const Key('note-title'),
              readOnly: _deleting,
              controller: _title,
              onChanged: _changed,
              maxLength: Note.maxTitleLength,
              maxLines: 2,
              minLines: 1,
              style: Theme.of(context).textTheme.headlineMedium,
              decoration: const InputDecoration(
                hintText: 'Untitled note',
                labelText: 'Note title',
                filled: false,
                counterText: '',
                border: InputBorder.none,
              ),
            ),
            const SizedBox(height: SaneSpace.medium),
            Expanded(
              child: TextField(
                key: const Key('note-body'),
                readOnly: _deleting,
                controller: _body,
                focusNode: _bodyFocus,
                onChanged: _changed,
                maxLength: Note.maxBodyLength,
                maxLines: null,
                expands: true,
                textAlignVertical: TextAlignVertical.top,
                keyboardType: TextInputType.multiline,
                style: Theme.of(context).textTheme.bodyLarge,
                decoration: const InputDecoration(
                  hintText: 'Start with a thought…\n\nUse # for headings, **bold**, or - [ ] for a checklist.',
                  labelText: 'Note body',
                  alignLabelWithHint: true,
                  filled: false,
                  counterText: '',
                  border: InputBorder.none,
                ),
              ),
            ),
          ],
        ),
      ),
    ),
  );

  Widget _render() => Align(
    alignment: Alignment.topCenter,
    child: ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: SaneSpace.page),
      child: Markdown(
        key: const Key('markdown-preview'),
        selectable: true,
        padding: const EdgeInsets.all(SaneSpace.large),
        data:
            '# ${_title.text.isEmpty ? 'Untitled note' : _title.text}\n\n${_body.text}',
        // Never let user-controlled Markdown cause a network or local file read.
        imageBuilder: (uri, title, alt) => Chip(
          avatar: const Icon(Icons.image_not_supported_outlined),
          label: Text(
            alt?.isNotEmpty ?? false
                ? 'Image: $alt (not loaded)'
                : 'Image not loaded',
          ),
        ),
      ),
    ),
  );

  Future<void> _delete() async {
    final note = widget.note;
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete this note?'),
        content: Text(
          '“${note.displayTitle}” will be removed from this device. You can undo immediately after deleting.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Keep note'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Delete'),
          ),
        ],
      ),
    );
    if (confirmed != true || !mounted) return;
    setState(() => _deleting = true);
    final controller = ref.read(libraryProvider.notifier);
    final removed = await controller.remove(note.id);
    if (!mounted) return;
    if (!removed) {
      setState(() => _deleting = false);
      return;
    }
    final messenger = ScaffoldMessenger.of(context);
    context.go('/');
    messenger.showSnackBar(
      SnackBar(
        content: const Text('Note deleted'),
        action: SnackBarAction(
          label: 'Undo',
          onPressed: () => controller.restore(note),
        ),
      ),
    );
  }
}
