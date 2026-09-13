#!/usr/bin/env python3
"""Verify the pinned SQLite browser asset and presence of the compiled worker."""
from pathlib import Path
import hashlib
import json

root = Path(__file__).resolve().parents[2]
web = root / 'app/web'
manifest = json.loads((web / 'storage-assets.json').read_text())
actual = hashlib.sha256((web / 'sqlite3.wasm').read_bytes()).hexdigest()
if actual != manifest['sqlite3WasmSha256']:
    raise SystemExit('SQLite WASM checksum mismatch; restore the pinned asset.')
if (web / 'drift_worker.dart.js').stat().st_size < 1000:
    raise SystemExit('Missing or truncated Drift worker; rebuild app/tool/drift_worker.dart.')
print('Browser storage assets verified.')
