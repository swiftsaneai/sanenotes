import 'package:flutter_test/flutter_test.dart';
import 'package:sane_notes/app.dart';

void main() {
  testWidgets('boots the application shell', (tester) async {
    await tester.pumpWidget(const SaneApp());
    await tester.pumpAndSettle();
    expect(find.text('Sane Notes'), findsOneWidget);
  });
}
