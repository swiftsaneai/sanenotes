import 'dart:io';

import 'package:test/test.dart';

import '../arch_check.dart';

void main() {
  late Directory root;
  final policy = readPolicy(File('tools/scripts/allowed_edges.json'));
  setUp(() => root = Directory.systemTemp.createTempSync('sane-arch-'));
  tearDown(() => root.deleteSync(recursive: true));
  void fixture(String path, String name, String dependency, String code) {
    final directory = Directory('${root.path}/$path')
      ..createSync(recursive: true);
    File('${directory.path}/pubspec.yaml')
        .writeAsStringSync('name: $name\ndependencies:\n  $dependency: any\n');
    Directory('${directory.path}/lib').createSync();
    File('${directory.path}/lib/example.dart').writeAsStringSync(code);
  }

  test('policy exactly names the planned layers and allowed edges', () {
    expect(policy, hasLength(12));
    expect(policy['sane_crypto'], isEmpty);
    expect(policy['sane_ui'], isEmpty);
    expect(policy['sane_core'], {'sane_crypto'});
    expect(policy['sane_sync'], {'sane_core', 'sane_crypto'});
    expect(policy['sane_render'], {'sane_brushes', 'sane_ink', 'sane_core'});
  });
  test('allowed core dependency passes', () {
    fixture(
      'packages/sane_ink',
      'sane_ink',
      'sane_core',
      "import 'package:sane_core/sane_core.dart';",
    );
    expect(checkArchitecture(root, policy), isEmpty);
  });
  test('design package cannot import model', () {
    fixture('packages/sane_ui', 'sane_ui', 'sane_core', '');
    expect(
      checkArchitecture(root, policy).join(),
      contains('sane_ui -> sane_core'),
    );
  });
  test('pure Dart cannot import Flutter, even without declaring it', () {
    fixture(
      'packages/sane_core',
      'sane_core',
      'meta',
      "import 'package:flutter/widgets.dart';",
    );
    expect(checkArchitecture(root, policy).join(), contains('pure-Dart'));
  });
  test('plugin cannot import domain packages', () {
    fixture('plugins/sane_example', 'sane_example', 'sane_core', '');
    expect(checkArchitecture(root, policy).join(), contains('leaf rule 7'));
  });
  test('AST detects logging but not words in a comment', () {
    fixture(
      'app',
      'sane_notes',
      'sane_core',
      "// print('comment');\nvoid example() { print('value'); }",
    );
    expect(checkArchitecture(root, policy), hasLength(1));
    expect(
      checkArchitecture(root, policy).single,
      contains('print() is banned'),
    );
  });
  test('conditional exports cannot hide a forbidden edge', () {
    fixture(
      'packages/sane_crypto',
      'sane_crypto',
      'meta',
      "export 'local.dart' if (dart.library.ui) "
          "'package:sane_render/sane_render.dart';",
    );
    expect(checkArchitecture(root, policy).join(), contains('rule 3'));
  });
  test('development dependencies cannot bring Flutter into pure Dart', () {
    fixture('packages/sane_core', 'sane_core', 'meta', '');
    File(
      '${root.path}/packages/sane_core/pubspec.yaml',
    ).writeAsStringSync('name: sane_core\ndev_dependencies:\n  flutter: any\n');
    expect(checkArchitecture(root, policy).join(), contains('pure-Dart'));
  });
  test('app consumes native contracts instead of concrete implementations', () {
    fixture('app', 'sane_notes', 'sane_ink_surface_ios', '');
    expect(checkArchitecture(root, policy).join(), contains('consumer rule 7'));
    fixture('app', 'sane_notes', 'sane_ink_surface_platform_interface', '');
    expect(checkArchitecture(root, policy), isEmpty);
  });
  test('generated libraries remain subject to logging policy', () {
    fixture('app', 'sane_notes', 'sane_core', '');
    File('${root.path}/app/lib/generated.g.dart')
        .writeAsStringSync("void generated() { debugPrint('value'); }");
    expect(checkArchitecture(root, policy).join(), contains('debugPrint()'));
  });
  test('relative and file imports cannot escape a package', () {
    for (final uri in [
      '../../../app/lib/main.dart',
      'file:///tmp/other.dart',
    ]) {
      fixture('packages/sane_core', 'sane_core', 'meta', "import '$uri';");
      expect(checkArchitecture(root, policy).join(), contains('rule 1'));
    }
  });
}
