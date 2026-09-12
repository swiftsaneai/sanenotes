#!/usr/bin/env node
// Publishes issues/*.json to GitHub: labels, milestones, issues, sub-issue links, cross-refs.
// Idempotent and resumable. Requires an authenticated `gh` CLI (run `gh auth login` first).
//
// Usage:
//   node scripts/publish-issues.mjs                # publish everything missing
//   node scripts/publish-issues.mjs --dry-run      # print the plan, create nothing
//   node scripts/publish-issues.mjs --update       # also PATCH title/body/labels of already-published issues
//   node scripts/publish-issues.mjs --only SN-INK  # only keys starting with prefix
//   node scripts/publish-issues.mjs --project 3    # also add every issue to Projects v2 #3 (needs `project` scope)
//   REPO=owner/name node scripts/publish-issues.mjs
//
// GitHub secondary rate limits allow ~500 content-creating requests/hour. Each issue costs 1 request
// (+1 per sub-issue link), so a full run of several hundred issues takes 1-2 hours. The script paces
// itself (PACE_MS) and backs off on 403/429; re-running resumes from issues/.published.json.
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ISSUES_DIR = join(ROOT, 'issues');
const REPO = process.env.REPO || 'swiftsaneai/sanenotes';
const PACE_MS = Number(process.env.PACE_MS || 7500);
const argv = process.argv.slice(2);
const flag = n => argv.includes(n);
const opt = n => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : undefined; };
const DRY = flag('--dry-run'), UPDATE = flag('--update'), ONLY = opt('--only'), PROJECT = opt('--project');
const STATE_FILE = join(ISSUES_DIR, '.published.json');
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ---------- gh helpers ----------
function gh(args, input) {
  const r = spawnSync('gh', args, { input, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  return { ok: r.status === 0, out: r.stdout, err: r.stderr, status: r.status };
}
async function api(method, path, body, { retries = 6 } = {}) {
  for (let attempt = 0; ; attempt++) {
    const args = ['api', '--method', method, path, '-H', 'Accept: application/vnd.github+json', '-H', 'X-GitHub-Api-Version: 2022-11-28'];
    if (body !== undefined) args.push('--input', '-');
    const r = gh(args, body !== undefined ? JSON.stringify(body) : undefined);
    if (r.ok) return r.out ? JSON.parse(r.out) : null;
    const msg = (r.err || '') + (r.out || '');
    const rateLimited = /rate limit|abuse|secondary|429|403/i.test(msg);
    if (rateLimited && attempt < retries) {
      const wait = Math.min(15 * 60_000, 60_000 * 2 ** attempt);
      console.log(`  rate limited; waiting ${Math.round(wait / 1000)}s ...`);
      await sleep(wait); continue;
    }
    throw new Error(`gh api ${method} ${path} failed: ${msg.slice(0, 500)}`);
  }
}
async function paginate(path) {
  const r = gh(['api', '--paginate', '--slurp', path, '-H', 'Accept: application/vnd.github+json']);
  if (!r.ok) throw new Error(`gh api --paginate ${path} failed: ${r.err}`);
  return JSON.parse(r.out).flat();
}

// ---------- load ----------
const auth = gh(['auth', 'status']);
if (!auth.ok && !DRY) { console.error('gh is not authenticated. Run: gh auth login'); process.exit(2); }
const validate = spawnSync('node', [join(ROOT, 'scripts', 'validate-issues.mjs')], { encoding: 'utf8' });
if (validate.status !== 0) { console.error(validate.stdout, validate.stderr); console.error('Fix validation errors before publishing.'); process.exit(1); }

const labelsSpec = JSON.parse(readFileSync(join(ISSUES_DIR, 'labels.json'), 'utf8'));
const milestonesSpec = JSON.parse(readFileSync(join(ISSUES_DIR, 'milestones.json'), 'utf8'));
const files = readdirSync(ISSUES_DIR).filter(f => f.endsWith('.json') && !['labels.json', 'milestones.json', '.published.json'].includes(f)).sort();
let issues = files.flatMap(f => JSON.parse(readFileSync(join(ISSUES_DIR, f), 'utf8')));
if (ONLY) issues = issues.filter(i => i.key.startsWith(ONLY));
const byKey = new Map(issues.map(i => [i.key, i]));
const state = existsSync(STATE_FILE) ? JSON.parse(readFileSync(STATE_FILE, 'utf8')) : {};
const saveState = () => writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n');

// ---------- ordering: parents before children, then by key ----------
const depth = k => { let d = 0, cur = byKey.get(k); while (cur && cur.parent && byKey.has(cur.parent)) { d++; cur = byKey.get(cur.parent); if (d > 20) break; } return d; };
issues.sort((a, b) => depth(a.key) - depth(b.key) || a.key.localeCompare(b.key));

// ---------- labels for an issue ----------
const platformLabel = p => {
  const map = { 'ipad': 'platform: iPad', 'android-tablet': 'platform: Android tablet', 'web': 'platform: Web', 'ios-phone': 'platform: iOS phone', 'android-phone': 'platform: Android phone', 'core': 'platform: core', 'all': 'platform: all' };
  return map[p];
};
const labelsFor = i => Array.from(new Set([
  i.priority, `type: ${i.type}`, ...i.platforms.map(platformLabel), ...i.areas.map(a => `area: ${a}`),
  `sdlc: ${i.sdlc}`, `size: ${i.size}`, ...(i.labels_extra || []),
  ...((i.security || []).some(s => /^OWASP-A/i.test(s)) ? ['sec: owasp-top10'] : []),
  ...((i.security || []).some(s => /^MASVS/i.test(s)) ? ['sec: masvs'] : []),
  ...((i.security || []).some(s => /^ASVS/i.test(s)) ? ['sec: asvs'] : []),
]).values()).filter(Boolean);

// ---------- body rendering ----------
function renderBody(i, numberOf) {
  const ref = k => numberOf(k) ? `#${numberOf(k)}` : `\`${k}\``;
  let body = i.body.replace(/\{\{(SN-[A-Z0-9]{2,8}-\d{3})\}\}/g, (_, k) => ref(k));
  const meta = [
    `<!-- sn-key: ${i.key} -->`,
    `**Key:** \`${i.key}\` · **Priority:** ${i.priority.toUpperCase()} · **Type:** ${i.type} · **Size:** ${i.size} · **SDLC:** ${i.sdlc}`,
    `**Platforms:** ${i.platforms.join(', ')} · **Areas:** ${i.areas.join(', ')}`,
    i.parent ? `**Parent:** ${ref(i.parent)} (\`${i.parent}\`)` : null,
    i.depends_on && i.depends_on.length ? `**Depends on:** ${i.depends_on.map(k => `${ref(k)} (\`${k}\`)`).join(', ')}` : null,
    i.security && i.security.length ? `**Security controls:** ${i.security.map(s => `\`${s}\``).join(', ')}` : null,
    '',
    '> New here? Read `CLAUDE.md` and `docs/README.md` first — they explain the architecture, the security rules, and how issues are structured.',
    '',
  ].filter(x => x !== null).join('\n');
  return `${meta}\n${body}`;
}

// ---------- main ----------
(async () => {
  console.log(`Repo: ${REPO} · issues to consider: ${issues.length} · dry-run: ${DRY}`);

  // Labels
  const wantLabels = Object.values(labelsSpec).flat();
  if (!DRY) {
    const existing = new Map((await paginate(`repos/${REPO}/labels?per_page=100`)).map(l => [l.name, l]));
    for (const l of wantLabels) {
      const e = existing.get(l.name);
      if (!e) { console.log(`label + ${l.name}`); await api('POST', `repos/${REPO}/labels`, { name: l.name, color: l.color, description: l.description }); await sleep(500); }
      else if (e.color !== l.color || (e.description || '') !== l.description) { await api('PATCH', `repos/${REPO}/labels/${encodeURIComponent(l.name)}`, { color: l.color, description: l.description }); await sleep(300); }
    }
  } else console.log(`would ensure ${wantLabels.length} labels`);

  // Milestones
  const milestoneNumber = new Map();
  if (!DRY) {
    const existing = await paginate(`repos/${REPO}/milestones?state=all&per_page=100`);
    for (const m of existing) milestoneNumber.set(m.title, m.number);
    for (const m of milestonesSpec) {
      if (!milestoneNumber.has(m.title)) { console.log(`milestone + ${m.title}`); const r = await api('POST', `repos/${REPO}/milestones`, { title: m.title, description: m.description }); milestoneNumber.set(m.title, r.number); await sleep(500); }
    }
  }

  // Discover already-published issues by key marker (in case state file is missing)
  if (!DRY) {
    const existing = await paginate(`repos/${REPO}/issues?state=all&per_page=100`);
    for (const e of existing) {
      if (e.pull_request) continue;
      const m = /<!-- sn-key: (SN-[A-Z0-9]{2,8}-\d{3}) -->/.exec(e.body || '');
      if (m) state[m[1]] = { number: e.number, id: e.id };
    }
    saveState();
  }

  // Pre-assign numbers: if the repo has no issues/PRs beyond what we know, numbers will be sequential.
  let nextNumber = null;
  if (!DRY) {
    const latest = await paginate(`repos/${REPO}/issues?state=all&per_page=1&sort=created&direction=desc`);
    const latestPR = gh(['api', `repos/${REPO}/pulls?state=all&per_page=1&sort=created&direction=desc`]);
    const maxIssue = latest.length ? latest[0].number : 0;
    const maxPR = latestPR.ok && latestPR.out ? (JSON.parse(latestPR.out)[0]?.number || 0) : 0;
    nextNumber = Math.max(maxIssue, maxPR) + 1;
  } else nextNumber = 1;
  const predicted = new Map();
  for (const i of issues) if (!state[i.key]) predicted.set(i.key, nextNumber++);
  const numberOf = k => (state[k] && state[k].number) || predicted.get(k) || null;

  // Create
  let created = 0, skipped = 0, updated = 0, mismatches = 0;
  for (const i of issues) {
    const labels = labelsFor(i);
    const body = renderBody(i, numberOf);
    if (state[i.key]) {
      if (UPDATE && !DRY) {
        await api('PATCH', `repos/${REPO}/issues/${state[i.key].number}`, { title: i.title, body, labels, milestone: milestoneNumber.get(i.milestone) });
        updated++; await sleep(PACE_MS / 2);
      } else skipped++;
      continue;
    }
    if (DRY) { console.log(`#${predicted.get(i.key)} [${i.priority}] ${i.key}  ${i.title}  {${labels.length} labels} parent=${i.parent || '-'}`); created++; continue; }
    const r = await api('POST', `repos/${REPO}/issues`, { title: i.title, body, labels, milestone: milestoneNumber.get(i.milestone) });
    state[i.key] = { number: r.number, id: r.id }; saveState();
    if (r.number !== predicted.get(i.key)) { mismatches++; console.log(`  ! predicted #${predicted.get(i.key)} but got #${r.number} — cross-refs will be fixed in the repair pass`); }
    created++;
    console.log(`#${r.number} ${i.key} ${i.title}`);
    if (i.parent && state[i.parent]) {
      try { await api('POST', `repos/${REPO}/issues/${state[i.parent].number}/sub_issues`, { sub_issue_id: r.id }); }
      catch (e) { console.log(`  (sub-issue link failed: ${e.message.slice(0, 120)})`); }
      await sleep(PACE_MS / 2);
    }
    await sleep(PACE_MS);
  }

  // Repair pass: if any predicted number was wrong, rewrite bodies with real numbers.
  if (mismatches && !DRY) {
    console.log(`Repairing cross-references in ${issues.length} issues ...`);
    for (const i of issues) { await api('PATCH', `repos/${REPO}/issues/${state[i.key].number}`, { body: renderBody(i, k => state[k] && state[k].number) }); await sleep(PACE_MS / 2); }
  }

  // Optional: add to Projects v2
  if (PROJECT && !DRY) {
    const owner = REPO.split('/')[0];
    const q = `query($o:String!,$n:Int!){organization(login:$o){projectV2(number:$n){id}}}`;
    const r = gh(['api', 'graphql', '-f', `query=${q}`, '-F', `o=${owner}`, '-F', `n=${PROJECT}`]);
    const pid = r.ok ? JSON.parse(r.out).data?.organization?.projectV2?.id : null;
    if (!pid) console.log('Project not found or no project scope; skipping');
    else for (const i of issues) {
      const nodeId = (await api('GET', `repos/${REPO}/issues/${state[i.key].number}`)).node_id;
      gh(['api', 'graphql', '-f', `query=mutation($p:ID!,$c:ID!){addProjectV2ItemById(input:{projectId:$p,contentId:$c}){item{id}}}`, '-F', `p=${pid}`, '-F', `c=${nodeId}`]);
      await sleep(1000);
    }
  }
  console.log(`\nDone. created=${created} updated=${updated} skipped(existing)=${skipped} mismatches=${mismatches}`);
})().catch(e => { console.error(e.message); process.exit(1); });
