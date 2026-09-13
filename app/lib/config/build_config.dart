import 'package:flutter/foundation.dart';

/// Rejects development authentication flags in release builds.
void assertAuthBypassSafe({
  bool release = kReleaseMode,
  bool bypass = const bool.fromEnvironment('SANE_AUTH_BYPASS'),
}) {
  if (release && bypass) {
    throw StateError(
      'Development authentication flags are forbidden in release.',
    );
  }
}
