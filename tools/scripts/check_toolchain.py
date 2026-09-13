#!/usr/bin/env python3
"""Fail early when local, FVM, mise and CI compiler expectations differ."""
import json
from pathlib import Path
import subprocess
import tomllib

root = Path(__file__).resolve().parents[2]
expected = json.loads((root / '.fvmrc').read_text())['flutter']
configured = tomllib.loads((root / 'mise.toml').read_text())['tools']['flutter']
if configured != expected:
    raise SystemExit(f'mise Flutter {configured} differs from canonical .fvmrc {expected}.')
actual = json.loads(subprocess.check_output(['flutter', '--version', '--machine'], text=True))
if actual['frameworkVersion'] != expected:
    raise SystemExit(f'Expected Flutter {expected}, found {actual["frameworkVersion"]}. Use fvm use or mise install.')
print(f'Flutter {expected}; bundled Dart {actual["dartSdkVersion"]}. Toolchain verified.')
