import 'dart:io';

import 'package:test/test.dart';
import 'package:yaml/yaml.dart';

import '../arch_check.dart';

void main() {
  test('all twelve domain packages are workspace members with exact edges', () {
    final policy = readPolicy(File('tools/scripts/allowed_edges.json'));
    final root = loadYaml(File('pubspec.yaml').readAsStringSync()) as YamlMap;
    final workspace = (root['workspace'] as YamlList).cast<String>();
    const flutterPackages = {
      'sane_render',
      'sane_brushes',
      'sane_pdf',
      'sane_audio',
      'sane_ui',
    };
    for (final entry in policy.entries) {
      final path = 'packages/${entry.key}';
      expect(workspace, contains(path));
      final manifest =
          loadYaml(File('$path/pubspec.yaml').readAsStringSync()) as YamlMap;
      expect(manifest['resolution'], 'workspace');
      final dependencies = manifest['dependencies'] as YamlMap?;
      final internal =
          dependencies?.keys
              .cast<String>()
              .where((name) => name.startsWith('sane_'))
              .toSet() ??
          <String>{};
      expect(internal, entry.value, reason: entry.key);
      final isFlutter = flutterPackages.contains(entry.key);
      expect(dependencies?.containsKey('flutter') ?? false, isFlutter);
      final dev = manifest['dev_dependencies'] as YamlMap;
      expect(dev.containsKey(isFlutter ? 'flutter_test' : 'test'), isTrue);
      expect(File('$path/lib/${entry.key}.dart').existsSync(), isTrue);
      expect(
        File('$path/README.md').readAsStringSync(),
        contains(isFlutter ? '[Flutter]' : '[pure Dart]'),
      );
    }
  });
}
