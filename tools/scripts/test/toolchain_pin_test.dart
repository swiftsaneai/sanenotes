import 'dart:convert';
import 'dart:io';

import 'package:test/test.dart';

void main() {
  test('local and CI use the canonical Flutter pin', () {
    final pin =
        (jsonDecode(File('.fvmrc').readAsStringSync())
                as Map<String, Object?>)['flutter']!
            as String;
    expect(pin, matches(RegExp(r'^\d+\.\d+\.\d+$')));
    expect(File('mise.toml').readAsStringSync(), contains('flutter = "$pin"'));
    expect(
      File('.github/workflows/flutter.yml').readAsStringSync(),
      contains('steps.sdk.outputs.version'),
    );
    expect(
      File('.github/workflows/flutter.yml').readAsStringSync(),
      contains('.fvmrc'),
    );
  });
}
