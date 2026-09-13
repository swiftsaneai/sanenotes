import 'package:flutter_test/flutter_test.dart';
import 'package:sane_notes/config/build_config.dart';

void main() {
  test('release startup rejects development authentication flag', () {
    expect(
      () => assertAuthBypassSafe(release: true, bypass: true),
      throwsStateError,
    );
    expect(() => assertAuthBypassSafe(release: true), returnsNormally);
    expect(() => assertAuthBypassSafe(bypass: true), returnsNormally);
  });
}
