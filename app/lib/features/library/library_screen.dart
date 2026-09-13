import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:sane_notes/features/editor/note_editor.dart';
import 'package:sane_notes/providers/library_controller.dart';
import 'package:sane_ui/sane_ui.dart';

/// Adaptive local library and editor workspace.
class LibraryScreen extends ConsumerStatefulWidget {
  /// Creates a workspace, optionally opening one local note.
  const new({this.noteId, super.key});

  /// Local route identity; no remote lookup is made.
  final String? noteId;

  @override
  ConsumerState<LibraryScreen> createState() => _LibraryScreenState();
}

class _LibraryScreenState extends ConsumerState<LibraryScreen> {
  final _search = TextEditingController();
  final _searchFocus = FocusNode();
  String _query = '';

  @override
  void dispose() {
    _search.dispose();
    _searchFocus.dispose();
    super.dispose();
  }

  void _create({String title = '', String body = ''}) {
    final id = ref
        .read(libraryProvider.notifier)
        .create(title: title, body: body);
    context.go('/notes/$id');
  }

  @override
  Widget build(BuildContext context) {
    final library = ref.watch(libraryProvider);
    return library.when(
      loading: () => const Scaffold(
        body: Center(
          child: CircularProgressIndicator(
            semanticsLabel: 'Opening your notes',
          ),
        ),
      ),
      error: (error, stack) => Scaffold(
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(SaneSpace.large),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.folder_off_outlined, size: 48),
                const SizedBox(height: SaneSpace.medium),
                Text(
                  'Your notes could not be opened',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const Text(
                  'Your saved data has not been replaced. Check device storage, then try again.',
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: SaneSpace.medium),
                FilledButton(
                  onPressed: () => ref.invalidate(libraryProvider),
                  child: const Text('Try again'),
                ),
              ],
            ),
          ),
        ),
      ),
      data: (data) => CallbackShortcuts(
        bindings: {
          const SingleActivator(LogicalKeyboardKey.keyN, meta: true): _create,
          const SingleActivator(LogicalKeyboardKey.keyN, control: true):
              _create,
          const SingleActivator(LogicalKeyboardKey.keyF, meta: true):
              _searchFocus.requestFocus,
        },
        child: Scaffold(
          body: SafeArea(
            child: Column(
              children: [
                _header(data),
                if (data.error != null)
                  MaterialBanner(
                    content: Text(data.error!),
                    actions: [
                      TextButton(
                        onPressed: ref.read(libraryProvider.notifier).retry,
                        child: const Text('Retry saving'),
                      ),
                    ],
                  ),
                Expanded(
                  child: LayoutBuilder(
                    builder: (context, constraints) {
                      final wide = constraints.maxWidth >= SaneSpace.wide;
                      final note = data.note(widget.noteId);
                      final editor = widget.noteId == null
                          ? _welcome(data)
                          : note == null
                          ? _missing()
                          : NoteEditor(
                              key: ValueKey(note.id),
                              note: note,
                              onChange: (title, body) => ref
                                  .read(libraryProvider.notifier)
                                  .edit(note.id, title: title, body: body),
                            );
                      if (!wide) {
                        return widget.noteId == null
                            ? _list(data, compact: true)
                            : editor;
                      }
                      return Row(
                        children: [
                          SizedBox(
                            width: SaneSpace.sidebar,
                            child: _list(data),
                          ),
                          const VerticalDivider(width: 1),
                          Expanded(child: editor),
                        ],
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _header(LibraryState data) => Container(
    color: Theme.of(context).colorScheme.surface,
    padding: const EdgeInsets.symmetric(
      horizontal: SaneSpace.medium,
      vertical: SaneSpace.small,
    ),
    child: Row(
      children: [
        if (widget.noteId != null)
          IconButton(
            tooltip: 'Back to library',
            onPressed: () => context.go('/'),
            icon: const Icon(Icons.arrow_back),
          ),
        Icon(
          Icons.auto_stories_outlined,
          color: Theme.of(context).colorScheme.primary,
        ),
        const SizedBox(width: SaneSpace.small),
        Text('Sane', style: Theme.of(context).textTheme.titleLarge),
        const Spacer(),
        Flexible(
          child: Text(
            data.pending > 0
                ? 'Saving…'
                : data.unsaved.isNotEmpty
                ? 'Not saved'
                : 'Saved on device',
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: Theme.of(context).textTheme.labelMedium,
          ),
        ),
        IconButton(
          tooltip: data.dark ? 'Use light theme' : 'Use dark theme',
          onPressed: () =>
              ref.read(libraryProvider.notifier).appearance(dark: !data.dark),
          icon: Icon(
            data.dark ? Icons.light_mode_outlined : Icons.dark_mode_outlined,
          ),
        ),
        PopupMenuButton<String>(
          tooltip: 'Choose appearance',
          icon: const Icon(Icons.palette_outlined),
          initialValue: data.look,
          onSelected: (look) =>
              ref.read(libraryProvider.notifier).appearance(look: look),
          itemBuilder: (_) => [
            for (final look in saneLooks)
              CheckedPopupMenuItem(
                value: look.id,
                checked: look.id == data.look,
                child: Text(look.name),
              ),
          ],
        ),
        PopupMenuButton<String>(
          tooltip: 'Library options',
          onSelected: (action) {
            if (action == 'backup') {
              unawaited(_backup(data));
            } else {
              _about();
            }
          },
          itemBuilder: (_) => const [
            PopupMenuItem(value: 'backup', child: Text('Copy library backup')),
            PopupMenuItem(value: 'privacy', child: Text('About & privacy')),
          ],
        ),
      ],
    ),
  );

  Widget _list(LibraryState data, {bool compact = false}) {
    final notes = data.notes.where((note) => note.matches(_query)).toList();
    return Material(
      color: Theme.of(context).colorScheme.surface,
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(SaneSpace.medium),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  children: [
                    Text(
                      'My notes',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const Spacer(),
                    Text('${data.notes.length}'),
                  ],
                ),
                const SizedBox(height: SaneSpace.medium),
                FilledButton.icon(
                  onPressed: _create,
                  icon: const Icon(Icons.add),
                  label: const Text('New note'),
                ),
                const SizedBox(height: SaneSpace.medium),
                TextField(
                  key: const Key('search'),
                  controller: _search,
                  focusNode: _searchFocus,
                  onChanged: (value) => setState(() => _query = value),
                  decoration: InputDecoration(
                    hintText: 'Search your notes',
                    prefixIcon: const Icon(Icons.search),
                    suffixIcon: _query.isEmpty
                        ? null
                        : IconButton(
                            tooltip: 'Clear search',
                            onPressed: () {
                              _search.clear();
                              setState(() => _query = '');
                            },
                            icon: const Icon(Icons.close),
                          ),
                  ),
                ),
                const SizedBox(height: SaneSpace.medium),
                Text(
                  'LAST EDITED',
                  style: Theme.of(context).textTheme.labelSmall,
                ),
              ],
            ),
          ),
          Expanded(
            child: notes.isEmpty
                ? Center(
                    child: Padding(
                      padding: const EdgeInsets.all(SaneSpace.large),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(
                            _query.isEmpty ? Icons.edit_note : Icons.search_off,
                            size: 48,
                          ),
                          const SizedBox(height: SaneSpace.medium),
                          Text(
                            _query.isEmpty
                                ? 'Make room for a thought.'
                                : 'No matching notes',
                            textAlign: TextAlign.center,
                            style: Theme.of(context).textTheme.titleMedium,
                          ),
                          const SizedBox(height: SaneSpace.small),
                          Text(
                            _query.isEmpty
                                ? 'Start with a blank note, or use a simple outline.'
                                : 'Try another word from the title or body.',
                            textAlign: TextAlign.center,
                          ),
                          if (_query.isEmpty)
                            TextButton(
                              onPressed: () => _create(
                                title: 'Today',
                                body: '## A little focus\n\n- [ ] My most important task\n\n## Notes\n\n',
                              ),
                              child: const Text('Start a daily note'),
                            ),
                        ],
                      ),
                    ),
                  )
                : ListView.separated(
                    padding: const EdgeInsets.symmetric(
                      horizontal: SaneSpace.small,
                    ),
                    itemCount: notes.length,
                    separatorBuilder: (_, _) =>
                        const SizedBox(height: SaneSpace.small),
                    itemBuilder: (context, index) {
                      final note = notes[index];
                      return ListTile(
                        key: ValueKey('tile-${note.id}'),
                        selected: note.id == widget.noteId,
                        selectedTileColor: Theme.of(context)
                            .colorScheme
                            .primaryContainer,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(SaneSpace.small),
                        ),
                        contentPadding: const EdgeInsets.all(SaneSpace.medium),
                        title: Text(
                          note.displayTitle,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const SizedBox(height: SaneSpace.small),
                            Text(
                              note.excerpt,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                            const SizedBox(height: SaneSpace.small),
                            Text(
                              '${_date(note.modifiedAt)} · ${note.wordCount} words',
                              style: Theme.of(context).textTheme.labelSmall,
                            ),
                          ],
                        ),
                        onTap: () => context.go('/notes/${note.id}'),
                      );
                    },
                  ),
          ),
          const Padding(
            padding: EdgeInsets.all(SaneSpace.medium),
            child: Row(
              children: [
                Icon(Icons.lock_outline, size: 16),
                SizedBox(width: SaneSpace.small),
                Expanded(
                  child: Text(
                    'Your space. On this device.',
                    style: TextStyle(fontSize: 12),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _welcome(LibraryState data) => Center(
    child: SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(SaneSpace.large),
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 540),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'A CLEARER MIND',
                style: Theme.of(context).textTheme.labelLarge
                    ?.copyWith(color: Theme.of(context).colorScheme.primary),
              ),
              const SizedBox(height: SaneSpace.medium),
              Text(
                'Good ideas deserve\na little space.',
                style: Theme.of(context).textTheme.headlineLarge,
              ),
              const SizedBox(height: SaneSpace.medium),
              const Text(
                'Capture a thought, untangle a problem, or plan your next small step. Everything stays on this device.',
              ),
              const SizedBox(height: SaneSpace.large),
              FilledButton.icon(
                onPressed: _create,
                icon: const Icon(Icons.edit_outlined),
                label: const Text('Write something'),
              ),
              const SizedBox(height: SaneSpace.large),
              const Divider(),
              const SizedBox(height: SaneSpace.large),
              Text(
                'A place to begin',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: SaneSpace.medium),
              Card(
                child: ListTile(
                  contentPadding: const EdgeInsets.all(SaneSpace.medium),
                  leading: const Icon(Icons.wb_sunny_outlined),
                  title: const Text('A daily page'),
                  subtitle: const Text(
                    'A little focus, a few thoughts, a fresh start.',
                  ),
                  trailing: const Icon(Icons.arrow_forward),
                  onTap: () => _create(
                    title: 'Today',
                    body: '## A little focus\n\n- [ ] My most important task\n\n## Notes\n\n## Something to remember\n\n',
                  ),
                ),
              ),
              Card(
                child: ListTile(
                  contentPadding: const EdgeInsets.all(SaneSpace.medium),
                  leading: const Icon(Icons.school_outlined),
                  title: const Text('Study notes'),
                  subtitle: const Text('Key ideas, questions, and a summary.'),
                  trailing: const Icon(Icons.arrow_forward),
                  onTap: () => _create(
                    title: 'Study notes',
                    body: '## Key ideas\n\n## Questions\n\n## In my own words\n\n',
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    ),
  );

  Widget _missing() => Center(
    child: Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        const Text('This note is no longer in your library.'),
        TextButton(
          onPressed: () => context.go('/'),
          child: const Text('Back to my notes'),
        ),
      ],
    ),
  );

  Future<void> _backup(LibraryState data) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Copy a readable backup?'),
        content: const Text(
          'This puts every note on your system clipboard as JSON. Other apps and clipboard sync may be able to read it. Paste it into a file you control.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Copy backup'),
          ),
        ],
      ),
    );
    if (confirmed != true) return;
    await Clipboard.setData(
      ClipboardData(
        text: const JsonEncoder.withIndent('  ').convert({
          'format': 'sane-markdown-backup',
          'version': 1,
          'notes': [
            for (final note in data.notes)
              {
                'id': note.id,
                'title': note.title,
                'body': note.body,
                'modifiedAt': note.modifiedAt.toIso8601String(),
              },
          ],
        }),
      ),
    );
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Library backup copied. Paste it into a safe file.'),
        ),
      );
    }
  }

  void _about() => showAboutDialog(
    context: context,
    applicationName: 'Sane Notes',
    applicationVersion: '0.1.0 · Local Markdown preview',
    children: const [
      Text(
        'No account, analytics, or cloud sync. Notes are stored in local SQLite, without app-level encryption. Browser storage can be cleared or evicted. Keep a backup of important notes.\n\nMarkdown links and images do not fetch external content. Handwriting, PDFs, sync and AI are planned features.',
      ),
    ],
  );

  String _date(DateTime value) {
    final local = value.toLocal();
    return '${local.day}/${local.month}/${local.year}';
  }
}
