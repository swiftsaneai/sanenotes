import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sane_ui/sane_ui.dart';

void main() {
  setUpAll(() async {
    for (final family in ['Karla', 'Newsreader']) {
      final loader = FontLoader('packages/sane_ui/$family')
        ..addFont(rootBundle.load('packages/sane_ui/fonts/$family.ttf'));
      await loader.load();
    }
  });
  test('all palettes provide readable body text and button contrast', () {
    expect(saneLooks, hasLength(17));
    for (final look in saneLooks) {
      for (final brightness in Brightness.values) {
        final scheme = look.theme(brightness).colorScheme;
        double contrast(Color a, Color b) {
          final aa = a.computeLuminance();
          final bb = b.computeLuminance();
          return aa > bb ? (aa + .05) / (bb + .05) : (bb + .05) / (aa + .05);
        }

        expect(
          contrast(scheme.surface, scheme.onSurface),
          greaterThanOrEqualTo(4.5),
          reason: '${look.id} $brightness body',
        );
        expect(
          contrast(scheme.primary, scheme.onPrimary),
          greaterThanOrEqualTo(4.5),
          reason: '${look.id} $brightness button',
        );
      }
    }
  });
  for (final brightness in Brightness.values) {
    testWidgets('palette gallery ${brightness.name}', (tester) async {
      tester.view.physicalSize = const Size(1600, 1600);
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: RepaintBoundary(
              key: const Key('gallery'),
              child: Wrap(
                children: [
                  for (final look in saneLooks)
                    SizedBox(
                      width: 400,
                      height: 320,
                      child: Theme(
                        data: look.theme(brightness),
                        child: Builder(
                          builder: (context) => Material(
                            color: Theme.of(context).scaffoldBackgroundColor,
                            child: Padding(
                              padding: const EdgeInsets.all(SaneSpace.medium),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    look.name,
                                    style: Theme.of(context)
                                        .textTheme
                                        .titleLarge,
                                  ),
                                  const SizedBox(height: SaneSpace.medium),
                                  const Text(
                                    'A clear space for your thoughts.',
                                  ),
                                  const SizedBox(height: SaneSpace.medium),
                                  Card(
                                    child: ListTile(
                                      title: const Text('Study notes'),
                                      subtitle: const Text(
                                        'Saved on this device',
                                      ),
                                      onTap: () {},
                                    ),
                                  ),
                                  const SizedBox(height: SaneSpace.medium),
                                  FilledButton(
                                    onPressed: () {},
                                    child: const Text('New note'),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();
      await expectLater(
        find.byKey(const Key('gallery')),
        matchesGoldenFile('goldens/themes_${brightness.name}.png'),
      );
    });
  }
}
