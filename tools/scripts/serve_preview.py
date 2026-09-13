#!/usr/bin/env python3
"""Serve the compiled Flutter preview on localhost with SQLite worker headers."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class PreviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--port', type=int, default=5173)
args = parser.parse_args()
root = Path(__file__).resolve().parents[2] / 'app/build/web'
if not (root / 'index.html').exists():
    raise SystemExit('Build first: cd app && flutter build web --release --no-web-resources-cdn')
server = ThreadingHTTPServer(('127.0.0.1', args.port), partial(PreviewHandler, directory=str(root)))
print(f'Sane Notes preview: http://127.0.0.1:{args.port}', flush=True)
try:
    server.serve_forever()
except KeyboardInterrupt:
    server.server_close()
