#!/usr/bin/env node
// Creates the GitHub sub-issue link for every published issue that has a parent and is not already
// linked. Needed after import-issues.mjs, because the Issue Import API has no parent field.
// Idempotent: it reads each epic's existing children first and only creates what is missing.
//
//   node scripts/link-subissues.mjs --dry-run
//   node scripts/link-subissues.mjs --gap 2000
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ISSUES_DIR = join(ROOT, 'issues');
const REPO = process.env.REPO || 'swiftsaneai/sanenotes';
const argv = process.argv.slice(2);
const DRY = argv.includes('--dry-run');
const GAP = (() => { const i = argv.indexOf('--gap'); return i >= 0 ? Number(argv[i + 1]) : 1500; })();
const sleep = ms => new Promise(r => setTimeout(r, ms));

function gh(args, input) {
  const r = spawnSync('gh', args, { input, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  return { ok: r.status === 0, out: r.stdout, err: r.stderr };
}
function api(method, path, body) {
  const args = ['api', '--method', method, path, '-H', 'Accept: application/vnd.github+json'];
  if (body !== undefined) args.push('--input', '-');
  const r = gh(args, body !== undefined ? JSON.stringify(body) : undefined);
  if (!r.ok) throw new Error(((r.err || '') + (r.out || '')).slice(0, 400));
  return r.out ? JSON.parse(r.out) : null;
}

const skip = ['labels.json', 'milestones.json'];
const all = readdirSync(ISSUES_DIR)
  .filter(f => f.endsWith('.json') && !f.startsWith('.') && !skip.includes(f))
  .flatMap(f => JSON.parse(readFileSync(join(ISSUES_DIR, f), 'utf8')));
const state = existsSync(join(ISSUES_DIR, '.published.json'))
  ? JSON.parse(readFileSync(join(ISSUES_DIR, '.published.json'), 'utf8')) : {};

// Group children by parent so each epic's existing children are fetched once, not once per child.
const byParent = new Map();
for (const i of all) {
  if (!i.parent || !state[i.key] || !state[i.parent]) continue;
  if (!byParent.has(i.parent)) byParent.set(i.parent, []);
  byParent.get(i.parent).push(i);
}

let linked = 0, already = 0, failed = 0, blocked = false;
console.log(`Checking sub-issue links for ${byParent.size} parents ...`);
for (const [parentKey, children] of byParent) {
  if (blocked) break;
  const pnum = state[parentKey].number;
  let existing = new Set();
  try {
    const kids = api('GET', `repos/${REPO}/issues/${pnum}/sub_issues?per_page=100`);
    if (Array.isArray(kids)) existing = new Set(kids.map(k => k.number));
  } catch { /* treat as none linked */ }

  for (const c of children) {
    if (existing.has(state[c.key].number)) { already++; continue; }
    if (DRY) { console.log(`would link ${c.key} #${state[c.key].number} -> ${parentKey} #${pnum}`); linked++; continue; }
    try {
      api('POST', `repos/${REPO}/issues/${pnum}/sub_issues`, { sub_issue_id: state[c.key].id });
      linked++;
      if (linked % 25 === 0) console.log(`  linked ${linked} ...`);
    } catch (e) {
      failed++;
      if (/secondary rate limit|temporarily blocked/i.test(e.message)) {
        console.log('  SECONDARY BLOCK on sub-issue linking — stopping; re-run later to continue');
        blocked = true; break;
      }
      console.log(`  link failed ${c.key}: ${e.message.slice(0, 140)}`);
    }
    await sleep(GAP);
  }
}
console.log(`\nlinked=${linked} already-linked=${already} failed=${failed}${blocked ? ' (stopped early: rate limited)' : ''}`);
if (blocked) process.exitCode = 3;
