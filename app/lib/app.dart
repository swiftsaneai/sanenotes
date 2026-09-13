import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:sane_notes/providers/library_controller.dart';
import 'package:sane_notes/router/app_router.dart';
import 'package:sane_ui/sane_ui.dart';

/// Application composition root.
class SaneApp extends ConsumerStatefulWidget {
  /// Creates the app.
  const new({super.key});

  @override
  ConsumerState<SaneApp> createState() => _SaneAppState();
}

class _SaneAppState extends ConsumerState<SaneApp> {
  final GoRouter _router = createRouter();
  @override
  void dispose() {
    _router.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final appearance = ref.watch(
      libraryProvider.select(
        (value) => (
          value.asData?.value.dark ?? false,
          value.asData?.value.look ?? 'paper',
        ),
      ),
    );
    final look = saneLooks.firstWhere(
      (look) => look.id == appearance.$2,
      orElse: () => saneLooks.first,
    );
    return MaterialApp.router(
      title: 'Sane Notes',
      debugShowCheckedModeBanner: false,
      theme: look.theme(Brightness.light),
      darkTheme: look.theme(Brightness.dark),
      themeMode: appearance.$1 ? ThemeMode.dark : ThemeMode.light,
      routerConfig: _router,
    );
  }
}
