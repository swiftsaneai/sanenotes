import 'package:go_router/go_router.dart';
import 'package:sane_notes/features/library/library_screen.dart';

/// Creates routes scoped to this application instance.
GoRouter createRouter() => GoRouter(
  routes: [
    GoRoute(path: '/', builder: (context, state) => const LibraryScreen()),
    GoRoute(
      path: '/notes/:id',
      builder: (context, state) =>
          LibraryScreen(noteId: state.pathParameters['id']),
    ),
  ],
);
