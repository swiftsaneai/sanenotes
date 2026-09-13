import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sane_notes/app.dart';
import 'package:sane_notes/bootstrap.dart';

void main() {
  bootstrap();
  runApp(const ProviderScope(child: SaneApp()));
}
