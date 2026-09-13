import 'dart:io';

import 'package:test/test.dart';

void main() {
  test('foundation placeholder homes have purpose and privacy invariants', () {
    for (final path in [
      'services/entitlements',
      'services/relay',
      'website',
      'tools/perf_harness',
      'tools/device_lab',
      'tools/scripts',
    ]) {
      final file = File('$path/README.md');
      expect(file.existsSync(), isTrue, reason: path);
      expect(file.readAsStringSync().trim(), isNotEmpty);
      if (path.startsWith('services/')) {
        expect(
          file.readAsStringSync(),
          contains('ciphertext-only, never stores note content'),
        );
      }
    }
    final budgets = File('tools/perf_harness/README.md').readAsStringSync();
    for (final value in ['≤16 ms', '≤25 ms', '≤30 ms']) {
      expect(budgets, contains(value));
    }
  });
}
