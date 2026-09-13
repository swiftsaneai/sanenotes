import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

/// Creates routes scoped to this application instance.
GoRouter createRouter() => GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) =>
          const Scaffold(body: Center(child: Text('Sane Notes'))),
    ),
  ],
);
