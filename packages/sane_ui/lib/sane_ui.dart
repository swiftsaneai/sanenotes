/// Design tokens and accessible Material themes.
library;

import 'package:flutter/material.dart';

part 'src/look_data.dart';

/// A paired palette from the committed design source.
final class SaneLook {
  /// Creates a look.
  const new({
    required this.id,
    required this.name,
    required this.radius,
    required this.light,
    required this.dark,
  });

  /// Stable preference key.
  final String id;

  /// Human-readable look name.
  final String name;

  /// Card radius from the design sheet.
  final double radius;

  /// Light palette in canonical role order.
  final List<int> light;

  /// Dark palette in canonical role order.
  final List<int> dark;

  /// Builds the Material adaptation of this palette.
  ThemeData theme(Brightness brightness) {
    final colors = brightness == Brightness.dark ? dark : light;
    Color color(int index) => Color(colors[index]);
    final scheme =
        ColorScheme.fromSeed(
          seedColor: color(5),
          brightness: brightness,
        ).copyWith(
          surface: color(1),
          onSurface: color(3),
          surfaceContainerHighest: color(2),
        );
    // Generated on-primary pairing preserves readable button contrast.
    return ThemeData(
      useMaterial3: true,
      fontFamily: 'packages/sane_ui/Karla',
      brightness: brightness,
      colorScheme: scheme,
      scaffoldBackgroundColor: color(0),
      visualDensity: VisualDensity.standard,
      textTheme: TextTheme(
        headlineLarge: TextStyle(
          fontSize: 38,
          fontWeight: FontWeight.w600,
          color: color(3),
          fontFamily: 'packages/sane_ui/Newsreader',
        ),
        headlineMedium: TextStyle(
          fontSize: 34,
          fontWeight: FontWeight.w600,
          color: color(3),
          fontFamily: 'packages/sane_ui/Newsreader',
        ),
        titleLarge: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: color(3),
        ),
        titleMedium: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          color: color(3),
        ),
        bodyLarge: TextStyle(fontSize: 16, height: 1.5, color: color(3)),
        bodyMedium: TextStyle(fontSize: 14, height: 1.45, color: color(3)),
      ),
      cardTheme: CardThemeData(
        elevation: 0,
        color: color(1),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radius),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: color(2),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radius),
          borderSide: BorderSide.none,
        ),
      ),
      iconButtonTheme: IconButtonThemeData(
        style: IconButton.styleFrom(minimumSize: const Size(48, 48)),
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(minimumSize: const Size(48, 48)),
      ),
      dividerTheme: DividerThemeData(color: scheme.outlineVariant, space: 1),
    );
  }
}

/// Shared layout dimensions. Spacing comes from the design scale.
abstract final class SaneSpace {
  /// Small separation.
  static const small = 8.0;

  /// Standard inset.
  static const medium = 16.0;

  /// Page inset.
  static const large = 28.0;

  /// Adaptive sidebar breakpoint.
  static const wide = 900.0;

  /// Sidebar width for the notes list.
  static const sidebar = 320.0;

  /// Maximum readable page width.
  static const page = 820.0;
}
