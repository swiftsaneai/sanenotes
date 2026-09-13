import 'package:flutter/widgets.dart';
import 'package:sane_notes/config/build_config.dart';

/// Initializes platform bindings and validates compile-time configuration.
void bootstrap() {
  WidgetsFlutterBinding.ensureInitialized();
  assertAuthBypassSafe();
}
