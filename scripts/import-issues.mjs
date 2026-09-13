#!/usr/bin/env node
// Bulk-creates issues via GitHub's asynchronous Issue Import API, which is governed by a different
// (far looser) budget than POST /issues — it keeps working even while normal content creation is
// secondary-rate-limited. Use it to load a large backlog quickly; sub-issue links and
// cross-reference repair are done afterwards by publish-issues.mjs.
//
//   node scripts/import-issues.mjs --limit 3      # try a few first
//   node scripts/import-issues.mjs                # import everything not yet published
//
// Caveats this script handles: the endpoint is a preview API (custom Accept header); it returns
// 202 + a status URL that must be polled; issue numbers are assigned asynchronously and therefore
// NOT in key order, so cross-references are repaired afterwards from the recorded real numbers.
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ISSUES_DIR = join(ROOT, 'issues');
const REPO = process.env.REPO || 'swiftsaneai/sanenotes';
const ACCEPT = 'Accept: application/vnd.github.golden-comet-preview+json';
const argv = process.argv.slice(2);
const optNum = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? Number(argv[i + 1]) : d; };
const LIMIT = optNum('--limit', Infinity);
const GAP_MS = optNum('--gap', 600);
const sleep = ms => new Promise(r => setTimeout(r, ms));

function gh(args, input) {
  const r = spawnSync('gh', args, { input, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  return { ok: r.status === 0, out: r.stdout, err: r.stderr };
}
function api(method, path, body, accept = 'Accept: application/vnd.github+json') {
  const args = ['api', '--method', method, path, '-H', accept];
  if (body !== undefined) args.push('--input', '-');
  const r = gh(args, body !== undefined ? JSON.stringify(body) : undefined);
  if (!r.ok) throw new Error(((r.err || '') + (r.out || '')).slice(0, 400));
  return r.out ? JSON.parse(r.out) : null;
}

const skip = ['labels.json', 'milestones.json'];
const files = readdirSync(ISSUES_DIR).filter(f => f.endsWith('.json') && !f.startsWith('.') && !skip.includes(f)).sort();
const all = files.flatMap(f => JSON.parse(readFileSync(join(ISSUES_DIR, f), 'utf8')));
const STATE_FILE = join(ISSUES_DIR, '.published.json');
const state = existsSync(STATE_FILE) ? JSON.parse(readFileSync(STATE_FILE, 'utf8')) : {};
const save = () => writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n');

const milestoneNumber = new Map(
  JSON.parse(gh(['api', '--paginate', '--slurp', `repos/${REPO}/milestones?state=all&per_page=100`]).out)
    .flat().map(m => [m.title, m.number]));

const platformLabel = p => ({ 'ipad': 'platform: iPad', 'android-tablet': 'platform: Android tablet', 'web': 'platform: Web', 'ios-phone': 'platform: iOS phone', 'android-phone': 'platform: Android phone', 'core': 'platform: core', 'all': 'platform: all' })[p];
const labelsFor = i => [...new Set([
  i.priority, `type: ${i.type}`, ...i.platforms.map(platformLabel), ...i.areas.map(a => `area: ${a}`),
  `sdlc: ${i.sdlc}`, `size: ${i.size}`, ...(i.labels_extra || []),
  ...((i.security || []).some(s => /^OWASP-A/i.test(s)) ? ['sec: owasp-top10'] : []),
  ...((i.security || []).some(s => /^MASVS/i.test(s)) ? ['sec: masvs'] : []),
  ...((i.security || []).some(s => /^ASVS/i.test(s)) ? ['sec: asvs'] : []),
])].filter(Boolean);

// Cross-references stay as {{KEY}} tokens here on purpose: numbers are assigned out of order by the
// importer, so publish-issues.mjs --update rewrites every body once all numbers are known.
function renderBody(i) {
  const num = k => state[k] && state[k].number;
  const ref = k => num(k) ? `#${num(k)}` : '`' + k + '`';
  const meta = [
    `<!-- sn-key: ${i.key} -->`,
    `**Key:** \`${i.key}\` · **Priority:** ${i.priority.toUpperCase()} · **Type:** ${i.type} · **Size:** ${i.size} · **SDLC:** ${i.sdlc}`,
    `**Platforms:** ${i.platforms.join(', ')} · **Areas:** ${i.areas.join(', ')}`,
    i.parent ? `**Parent:** ${ref(i.parent)} (\`${i.parent}\`)` : null,
    i.depends_on && i.depends_on.length ? `**Depends on:** ${i.depends_on.map(k => `${ref(k)} (\`${k}\`)`).join(', ')}` : null,
    i.security && i.security.length ? `**Security controls:** ${i.security.map(s => '`' + s + '`').join(', ')}` : null,
    '',
    '> New here? Read `CLAUDE.md` and `docs/README.md` first — they explain the architecture, the security rules, and how issues are structured.',
    '',
  ].filter(x => x !== null).join('\n');
  return `${meta}\n${i.body.replace(/\{\{(SN-[A-Z0-9]{2,8}-\d{3})\}\}/g, (_, k) => ref(k))}`;
}

const todo = all.filter(i => !state[i.key]).slice(0, LIMIT === Infinity ? undefined : LIMIT);
console.log(`Importing ${todo.length} issues into ${REPO} via the Issue Import API`);

const pending = [];
let submitted = 0, failed = 0;
for (const i of todo) {
  const payload = { issue: { title: i.title, body: renderBody(i), labels: labelsFor(i), closed: false } };
  const ms = milestoneNumber.get(i.milestone);
  if (ms) payload.issue.milestone = ms;
  try {
    const r = api('POST', `repos/${REPO}/import/issues`, payload, ACCEPT);
    pending.push({ key: i.key, url: r.url.replace('https://api.github.com/', ''), title: i.title });
    submitted++;
    if (submitted % 25 === 0) console.log(`  submitted ${submitted}/${todo.length}`);
  } catch (e) {
    failed++;
    console.log(`  SUBMIT FAILED ${i.key}: ${e.message.slice(0, 160)}`);
    if (/secondary rate limit|temporarily blocked/i.test(e.message)) { console.log('  import endpoint is rate limited too — stopping'); break; }
  }
  await sleep(GAP_MS);
}
console.log(`Submitted ${submitted}, failed ${failed}. Polling for assigned issue numbers ...`);

// Poll each import job until it resolves. These are GETs — primary limit only, not content creation.
let done = 0, importFailed = 0;
for (let round = 0; round < 40 && pending.length; round++) {
  for (let n = pending.length - 1; n >= 0; n--) {
    const p = pending[n];
    let s;
    try { s = api('GET', p.url, undefined, ACCEPT); } catch { continue; }
    if (s.status === 'imported' && s.issue_url) {
      const number = Number(s.issue_url.split('/').pop());
      const issue = api('GET', `repos/${REPO}/issues/${number}`);
      state[p.key] = { number, id: issue.id };
      save(); done++; pending.splice(n, 1);
      console.log(`#${number} ${p.key} ${p.title}`);
    } else if (s.status === 'failed') {
      importFailed++; pending.splice(n, 1);
      console.log(`  IMPORT FAILED ${p.key}: ${JSON.stringify(s.errors || []).slice(0, 200)}`);
    }
  }
  if (pending.length) await sleep(3000);
}
console.log(`\nImported ${done}, import-failed ${importFailed}, still pending ${pending.length}`);
console.log('Next: node scripts/publish-issues.mjs            # creates sub-issue links for imported issues');
console.log('      node scripts/publish-issues.mjs --update   # rewrites cross-references to real numbers');
