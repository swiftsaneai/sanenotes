#!/usr/bin/env python3
"""Generate Dart palette constants from the committed, canonical design tokens."""
import json
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[2]
TOKENS = json.loads((ROOT / 'docs/design/tokens.json').read_text())


def color(value):
    """Translate canonical CSS hex / rgba palette values to Dart ARGB."""
    if value.startswith('#'):
        digits = value[1:]
        if len(digits) == 3:
            digits = ''.join(c * 2 for c in digits)
        return '0xff' + digits
    values = re.findall(r'\d*\.?\d+', value)
    red, green, blue = map(int, values[:3])
    alpha = round(float(values[3]) * 255) if len(values) > 3 else 255
    return f'0x{alpha:02x}{red:02x}{green:02x}{blue:02x}'


rows = []
for key, look in TOKENS['looks'].items():
    modes = []
    for mode in ('light', 'dark'):
        modes.append('[' + ', '.join(color(look[mode][role]) for role in
                                    ('bg', 'sf', 'sf2', 'ink', 'mu', 'ac', 'aci', 'pp')) + ']')
    radius = float(look['r'].removesuffix('px'))
    rows.append(f"SaneLook(id: '{key}', name: '{look['name']}', radius: {radius:g}, "
                f"light: {modes[0]}, dark: {modes[1]}),")
output = ROOT / 'packages/sane_ui/lib/src/look_data.dart'
output.write_text("// Generated from docs/design/tokens.json. Run tools/scripts/generate_tokens.py.\n"
                  "part of '../sane_ui.dart';\n\n"
                  "/// All seventeen committed design palettes.\n"
                  'const saneLooks = <SaneLook>[\n' + '\n'.join(rows) + '\n];\n')
subprocess.run(['dart', 'format', str(output)], check=True)
