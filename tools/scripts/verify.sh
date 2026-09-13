#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."
python3 tools/scripts/check_toolchain.py
flutter pub get
python3 tools/scripts/check_storage_assets.py
dart format --output=none --set-exit-if-changed app/lib app/test app/integration_test app/tool packages tools/scripts
dart analyze --fatal-infos
dart run tools/scripts/arch_check.dart
dart test tools/scripts/test
(cd packages/sane_core && dart test)
(cd packages/sane_ui && flutter test --no-pub)
(cd app && flutter test --no-pub)
