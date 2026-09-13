import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:sane_notes/router/app_router.dart';
import 'package:sane_ui/sane_ui.dart';

/// Application composition root.
class SaneApp extends StatefulWidget {
  /// Creates the app.
  const new({super.key});

  @override
  State<SaneApp> createState() => _SaneAppState();
}

class _SaneAppState extends State<SaneApp> {
  final GoRouter _router = createRouter();
  @override
  void dispose() {
    _router.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => MaterialApp.router(
    title: 'Sane Notes',
    debugShowCheckedModeBanner: false,
    theme: saneLooks.first.theme(Brightness.light),
    darkTheme: saneLooks.first.theme(Brightness.dark),
    routerConfig: _router,
  );
}
