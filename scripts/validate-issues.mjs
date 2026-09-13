#!/usr/bin/env node
// Validates issues/*.json against issues/SCHEMA.md. Exit 1 on any error.
// Usage: node scripts/validate-issues.mjs [--stats] [--json]
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ISSUES_DIR = join(ROOT, 'issues');
const labels = JSON.parse(readFileSync(join(ISSUES_DIR, 'labels.json'), 'utf8'));
const milestones = JSON.parse(readFileSync(join(ISSUES_DIR, 'milestones.json'), 'utf8')).map(m => m.title);

const PRIORITIES = labels.priority.map(l => l.name);
const TYPES = labels.type.map(l => l.name.replace('type: ', ''));
const PLATFORMS = labels.platform.map(l => l.name.replace('platform: ', '')).map(slugify);
const AREAS = labels.area.map(l => l.name.replace('area: ', ''));
const SDLC = labels.sdlc.map(l => l.name.replace('sdlc: ', ''));
const SIZES = labels.size.map(l => l.name.replace('size: ', ''));
const ALL_LABEL_NAMES = new Set(Object.values(labels).flat().map(l => l.name));

const REQUIRED_SECTIONS = [
  '## Context', '## Scope', '## Acceptance criteria', '## Technical notes',
  '## Security & privacy', '## UX notes', '## Test plan', '## Dependencies', '## Definition of done',
];

function slugify(s) { return s.toLowerCase().replace(/\s+/g, '-'); }

const args = new Set(process.argv.slice(2));
const files = readdirSync(ISSUES_DIR).filter(f => f.endsWith('.json') && !['labels.json', 'milestones.json'].includes(f)).sort();
const errors = [];
const warnings = [];
const all = [];
const byKey = new Map();

for (const f of files) {
  let arr;
  try { arr = JSON.parse(readFileSync(join(ISSUES_DIR, f), 'utf8')); }
  catch (e) { errors.push(`${f}: invalid JSON: ${e.message}`); continue; }
  if (!Array.isArray(arr)) { errors.push(`${f}: top level must be an array`); continue; }
  arr.forEach((it, i) => {
    const where = `${f}[${i}] ${it && it.key ? it.key : ''}`.trim();
    const err = m => errors.push(`${where}: ${m}`);
    if (!it || typeof it !== 'object') return err('not an object');
    if (!/^SN-[A-Z0-9]{2,8}-\d{3}$/.test(it.key || '')) err(`bad key "${it.key}" (expected SN-AREA-000)`);
    if (byKey.has(it.key)) err(`duplicate key (also in ${byKey.get(it.key).file})`);
    byKey.set(it.key, { ...it, file: f });
    if (typeof it.title !== 'string' || !it.title.trim()) err('missing title');
    else if (it.title.length > 90) err(`title too long (${it.title.length} > 90)`);
    if (!TYPES.includes(it.type)) err(`bad type "${it.type}"`);
    if (!PRIORITIES.includes(it.priority)) err(`bad priority "${it.priority}"`);
    if (!Array.isArray(it.platforms) || !it.platforms.length) err('platforms must be a non-empty array');
    else it.platforms.forEach(p => { if (!PLATFORMS.includes(p)) err(`bad platform "${p}" (allowed: ${PLATFORMS.join(', ')})`); });
    if (!Array.isArray(it.areas) || !it.areas.length || it.areas.length > 3) err('areas must have 1..3 entries');
    else it.areas.forEach(a => { if (!AREAS.includes(a)) err(`bad area "${a}"`); });
    if (!milestones.includes(it.milestone)) err(`bad milestone "${it.milestone}"`);
    if (!SIZES.includes(it.size)) err(`bad size "${it.size}"`);
    if (!SDLC.includes(it.sdlc)) err(`bad sdlc "${it.sdlc}"`);
    if (it.security && !Array.isArray(it.security)) err('security must be an array');
    if (it.depends_on && !Array.isArray(it.depends_on)) err('depends_on must be an array');
    if (it.labels_extra) {
      if (!Array.isArray(it.labels_extra)) err('labels_extra must be an array');
      else it.labels_extra.forEach(l => { if (!ALL_LABEL_NAMES.has(l)) err(`unknown extra label "${l}"`); });
    }
    if (typeof it.body !== 'string' || it.body.length < 400) err(`body missing or too short (${(it.body || '').length} chars; need >= 400)`);
    else {
      let last = -1;
      for (const s of REQUIRED_SECTIONS) {
        const idx = it.body.indexOf(s);
        if (idx === -1) err(`body missing section "${s}"`);
        else if (idx < last) err(`section "${s}" out of order`);
        else last = idx;
      }
      if (it.type === 'epic' && !/- \[ \]/.test(it.body)) err('epic body should include a checklist');
    }
    all.push(it);
  });
}

// Cross-reference checks. Dangling references are WARNINGS: they resolve once the area that owns
// the key is generated, and the publisher renders them as plain text until then.
for (const it of all) {
  if (it.parent) {
    const p = byKey.get(it.parent);
    if (!p) warnings.push(`${it.key}: parent ${it.parent} does not exist`);
    else if (p.key === it.key) errors.push(`${it.key}: parent is itself`);
  }
  for (const d of it.depends_on || []) if (!byKey.has(d)) warnings.push(`${it.key}: depends_on ${d} does not exist`);
  const refs = [...(it.body || '').matchAll(/\{\{(SN-[A-Z0-9]{2,8}-\d{3})\}\}/g)].map(m => m[1]);
  for (const r of refs) if (!byKey.has(r)) warnings.push(`${it.key}: body references {{${r}}} which does not exist`);
}
// Parent cycles
for (const it of all) {
  const seen = new Set([it.key]); let cur = it;
  while (cur && cur.parent) { if (seen.has(cur.parent)) { errors.push(`${it.key}: parent cycle`); break; } seen.add(cur.parent); cur = byKey.get(cur.parent); }
}

const count = (arr, fn) => arr.reduce((m, x) => { const k = fn(x); (Array.isArray(k) ? k : [k]).forEach(kk => m[kk] = (m[kk] || 0) + 1); return m; }, {});
const stats = {
  files: files.length, issues: all.length,
  epics: all.filter(i => i.type === 'epic').length,
  with_parent: all.filter(i => i.parent).length,
  by_priority: count(all, i => i.priority), by_type: count(all, i => i.type), by_milestone: count(all, i => i.milestone),
  by_platform: count(all, i => i.platforms), by_area: count(all, i => i.areas), by_sdlc: count(all, i => i.sdlc), by_size: count(all, i => i.size),
  security_tagged: all.filter(i => i.security && i.security.length).length,
  errors: errors.length,
  warnings: warnings.length,
};

if (args.has('--json')) console.log(JSON.stringify({ stats, errors, warnings }, null, 2));
else {
  if (args.has('--stats') || !errors.length) console.log(JSON.stringify(stats, null, 2));
  if (errors.length) { console.error(`\n${errors.length} error(s):`); errors.slice(0, 200).forEach(e => console.error(' - ' + e)); if (errors.length > 200) console.error(` ... and ${errors.length - 200} more`); }
  else console.log(`OK: ${all.length} issues across ${files.length} files`);
  if (warnings.length && args.has('--warnings')) { console.error(`\n${warnings.length} warning(s) (dangling cross-references):`); warnings.slice(0, 200).forEach(e => console.error(' - ' + e)); }
  else if (warnings.length) console.error(`${warnings.length} warning(s) (dangling cross-references) — re-run with --warnings to list`);
}
process.exit(errors.length ? 1 : 0);
