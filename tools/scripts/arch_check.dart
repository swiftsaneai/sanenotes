import 'dart:convert';
import 'dart:io';

import 'package:analyzer/dart/analysis/utilities.dart';
import 'package:analyzer/dart/ast/ast.dart';
import 'package:analyzer/dart/ast/visitor.dart';
import 'package:path/path.dart' as p;
import 'package:yaml/yaml.dart';

/// Validates internal edges, pure-Dart boundaries and banned log calls.
List<String> checkArchitecture(Directory root, Map<String, Set<String>> edges) {
  final failures = <String>[];
  const pure = {
    'sane_crypto',
    'sane_core',
    'sane_ink',
    'sane_sync',
    'sane_search',
    'sane_ml',
    'sane_billing',
  };
  final manifests = <File>[];
  void discover(Directory directory) {
    for (final entity in directory.listSync()) {
      if (entity is Directory &&
          !p.basename(entity.path).startsWith('.') &&
          !{
            'build',
            'node_modules',
            'Pods',
          }.contains(p.basename(entity.path))) {
        discover(entity);
      } else if (entity is File && p.basename(entity.path) == 'pubspec.yaml') {
        manifests.add(entity);
      }
    }
  }

  for (final child in ['app', 'packages', 'plugins']) {
    final directory = Directory(p.join(root.path, child));
    if (directory.existsSync()) discover(directory);
  }
  for (final manifest in manifests) {
    final yaml = loadYaml(manifest.readAsStringSync()) as YamlMap;
    final name = yaml['name'] as String;
    final relative = p.relative(manifest.path, from: root.path);
    final isApp = relative == p.join('app', 'pubspec.yaml');
    final isPlugin = p.split(relative).first == 'plugins';
    void edge(String dependency, String file) {
      if (dependency == 'flutter' && pure.contains(name)) {
        failures.add(
          '$file: $name imports Flutter; pure-Dart boundary (rule 2).',
        );
      }
      if (!dependency.startsWith('sane_') || dependency == name) {
        return;
      }
      if (isApp) {
        if (!edges.containsKey(dependency) &&
            !dependency.endsWith('_platform_interface')) {
          failures.add(
            '$file: $name -> $dependency violates consumer rule 7; '
            'depend on the platform-interface contract instead.',
          );
        }
        return;
      }
      if (isPlugin) {
        if (edges.containsKey(dependency) || dependency == 'sane_notes') {
          failures.add(
            '$file: $name -> $dependency violates plugin leaf rule 7.',
          );
        }
      } else if (!(edges[name]?.contains(dependency) ?? false) &&
          !dependency.endsWith('_platform_interface')) {
        failures.add(
          '$file: forbidden edge $name -> $dependency (overview rule '
          '${_domainRule(name)}); move cross-feature wiring to app/.',
        );
      }
    }

    for (final section in [
      'dependencies',
      'dev_dependencies',
      'dependency_overrides',
    ]) {
      final dependencies = yaml[section];
      if (dependencies is YamlMap) {
        for (final dependency in dependencies.keys.cast<String>()) {
          edge(dependency, relative);
        }
      }
    }
    final library = Directory(p.join(manifest.parent.path, 'lib'));
    if (!library.existsSync()) continue;
    for (final file
        in library
            .listSync(recursive: true, followLinks: false)
            .whereType<File>()
            .where((file) => file.path.endsWith('.dart'))) {
      final path = p.relative(file.path, from: root.path);
      final unit = parseString(
        content: file.readAsStringSync(),
        path: file.path,
      ).unit;
      for (final directive in unit.directives.whereType<UriBasedDirective>()) {
        final uris = [
          directive.uri.stringValue,
          if (directive is NamespaceDirective)
            ...directive.configurations.map((config) => config.uri.stringValue),
        ];
        for (final uri in uris) {
          if (uri == null) continue;
          if (uri.startsWith('package:')) {
            edge(uri.substring(8).split('/').first, path);
          } else if (uri.startsWith('file:')) {
            failures.add(
              '$path: file URI escapes package resolution (rule 1); use a package import.',
            );
          } else if (!uri.contains(':')) {
            final target = p.normalize(p.join(file.parent.path, uri));
            if (!p.isWithin(manifest.parent.path, target)) {
              failures.add(
                '$path: relative import escapes its package (rule 1).',
              );
            }
          }
        }
      }
      unit.accept(_LoggingVisitor(path, failures));
    }
  }
  return failures;
}

int _domainRule(String name) => switch (name) {
  'sane_core' => 2,
  'sane_crypto' => 3,
  'sane_ink' || 'sane_brushes' || 'sane_render' => 4,
  'sane_ui' => 6,
  _ => 5,
};

class _LoggingVisitor extends RecursiveAstVisitor<void> {
  new(this.path, this.failures);
  final String path;
  final List<String> failures;
  @override
  void visitMethodInvocation(MethodInvocation node) {
    if ({'print', 'debugPrint'}.contains(node.methodName.name)) {
      failures.add(
        '$path: ${node.methodName.name}() is banned; use the redacted logging facade.',
      );
    }
    super.visitMethodInvocation(node);
  }
}

/// Reads the reviewable package policy.
Map<String, Set<String>> readPolicy(File file) {
  final data = jsonDecode(file.readAsStringSync()) as Map<String, Object?>;
  return data.map(
    (key, value) =>
        MapEntry(key, (value! as List<Object?>).cast<String>().toSet()),
  );
}

void main(List<String> arguments) {
  final root = Directory(arguments.isEmpty ? '.' : arguments.single).absolute;
  final errors = checkArchitecture(
    root,
    readPolicy(File(p.join(root.path, 'tools/scripts/allowed_edges.json'))),
  );
  if (errors.isNotEmpty) {
    stderr.writeln(errors.join('\n'));
    exitCode = 1;
  } else {
    stdout.writeln('Architecture boundaries verified.');
  }
}
