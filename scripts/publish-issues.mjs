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
// Rolling-budget pacing.
//
// GitHub's binding secondary limit is ~500 CONTENT-CREATING requests per rolling hour (an issue
// POST and a sub-issue-link POST each cost one). It is a BUDGET, not a speed limit — which is why
// reactive "slow down when refused" pacing fails: by the time you are refused the hour's budget is
// already spent, and no amount of slowing down buys back a slot. Sprinting early just means
// stalling later, at a worse moment.
//
// So we spend the budget deliberately: keep a timestamp per content-creating request and, once
// BUDGET_MAX have been spent inside the window, wait exactly until the oldest one ages out. The
// ledger is persisted, because this script is restarted (crash, OOM, edits) and an in-memory
// counter would forget what the previous run already spent and immediately overrun.
const BUDGET_MAX = Number(process.env.BUDGET_MAX || 460); // headroom under the ~500 ceiling
const BUDGET_WINDOW = 3600_000;
const BUDGET_FILE = join(ROOT, '.rate-budget.json'); // NOT in issues/ — the validator scans that dir
const pace = { ms: Number(process.env.PACE_MS || 7200), hits: 0 };
let stamps = [];
try { stamps = JSON.parse(readFileSync(BUDGET_FILE, 'utf8')); } catch { stamps = []; }

function prune() { const cut = Date.now() - BUDGET_WINDOW; stamps = stamps.filter(t => t > cut); }
async function takeSlot() {
  prune();
  if (stamps.length >= BUDGET_MAX) {
    const wait = stamps[0] + BUDGET_WINDOW - Date.now() + 1500;
    console.log(`  hourly budget spent (${stamps.length}/${BUDGET_MAX}); waiting ${Math.round(wait / 1000)}s for a slot ...`);
    await sleep(Math.max(wait, 1000));
    return takeSlot();
  }
  stamps.push(Date.now());
  try { writeFileSync(BUDGET_FILE, JSON.stringify(stamps)); } catch {}
}
function penalise() { pace.hits++; prune(); stamps.push(...Array(15).fill(Date.now())); console.log(`  refused — charging 15 slots against the budget (spent ${stamps.length}/${BUDGET_MAX})`); }

async function api(method, path, body, { retries = 8 } = {}) {
  for (let attempt = 0; ; attempt++) {
    const args = ['api', '--method', method, path, '-H', 'Accept: application/vnd.github+json', '-H', 'X-GitHub-Api-Version: 2022-11-28'];
    if (body !== undefined) args.push('--input', '-');
    if (method !== 'GET') await takeSlot();
    const r = gh(args, body !== undefined ? JSON.stringify(body) : undefined);
    if (r.ok) return r.out ? JSON.parse(r.out) : null;
    const msg = (r.err || '') + (r.out || '');
    const rateLimited = /rate limit|abuse|secondary|429|403/i.test(msg);
    if (rateLimited && attempt < retries) {
      penalise();
      // A *secondary* block sends no Retry-After and lasts ~20 minutes. Retrying sooner keeps the
      // block alive, so wait it out properly rather than probing every 45s.
      const secondary = /secondary rate limit|temporarily blocked from content creation/i.test(msg);
      const ra = /retry-after:\s*(\d+)/i.exec(msg);
      const wait = ra ? (Number(ra[1]) + 5) * 1000
        : secondary ? 21 * 60_000
        : Math.min(5 * 60_000, 60_000 * 2 ** attempt);
      console.log(`  ${secondary ? 'SECONDARY BLOCK' : 'rate limited'} (hit #${pace.hits}); waiting ${Math.round(wait / 60000)}m ...`);
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
if (ONLY) { const prefixes = ONLY.split(',').map(s => s.trim()).filter(Boolean); issues = issues.filter(i => prefixes.some(p => i.key.startsWith(p))); }
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
  let inlineParent = process.env.INLINE_PARENT !== '0', inlineVerified = false;
  for (const i of issues) {
    const labels = labelsFor(i);
    const body = renderBody(i, numberOf);
    if (state[i.key]) {
      if (UPDATE && !DRY) {
        // GETs are cheap (primary limit only); PATCHes count against the content-creation
        // secondary limit, so only write when something actually differs.
        const live = await api('GET', `repos/${REPO}/issues/${state[i.key].number}`);
        const liveLabels = (live.labels || []).map(l => l.name).sort().join('|');
        const same = live.title === i.title && (live.body || '').trim() === body.trim()
          && liveLabels === [...labels].sort().join('|')
          && (live.milestone ? live.milestone.number : null) === (milestoneNumber.get(i.milestone) ?? null);
        if (same) { skipped++; continue; }
        await api('PATCH', `repos/${REPO}/issues/${state[i.key].number}`, { title: i.title, body, labels, milestone: milestoneNumber.get(i.milestone) });
        updated++; await sleep(pace.ms / 2);
      } else skipped++;
      continue;
    }
    if (DRY) { console.log(`#${predicted.get(i.key)} [${i.priority}] ${i.key}  ${i.title}  {${labels.length} labels} parent=${i.parent || '-'}`); created++; continue; }
    // Attach the parent on the CREATE call: one content-generating request instead of two, which
    // halves the cost of every child issue. Verified once at runtime — if GitHub silently ignores
    // the field we fall back to the explicit sub_issues call for the rest of the run.
    const wantParent = i.parent && state[i.parent];
    const payload = { title: i.title, body, labels, milestone: milestoneNumber.get(i.milestone) };
    if (wantParent && inlineParent) payload.parent_issue_id = state[i.parent].id;
    let r;
    try { r = await api('POST', `repos/${REPO}/issues`, payload); }
    catch (e) {
      if (!payload.parent_issue_id) throw e;
      console.log('  parent_issue_id rejected on create; falling back to explicit sub-issue links');
      inlineParent = false; delete payload.parent_issue_id;
      r = await api('POST', `repos/${REPO}/issues`, payload);
    }
    state[i.key] = { number: r.number, id: r.id }; saveState();
    if (r.number !== predicted.get(i.key)) { mismatches++; console.log(`  ! predicted #${predicted.get(i.key)} but got #${r.number} — cross-refs will be fixed in the repair pass`); }
    created++;
    console.log(`#${r.number} ${i.key} ${i.title}${payload.parent_issue_id ? ' (linked inline)' : ''}`);

    if (wantParent && inlineParent && !inlineVerified) {
      // One-time proof that the inline link really took effect; a GET is free of the content limit.
      const kids = await api('GET', `repos/${REPO}/issues/${state[i.parent].number}/sub_issues?per_page=100`);
      inlineVerified = true;
      if (!Array.isArray(kids) || !kids.some(k => k.number === r.number)) {
        console.log('  inline parent did NOT take effect — reverting to explicit sub-issue links');
        inlineParent = false;
      } else console.log('  inline parent link verified — halving requests per issue');
    }
    if (wantParent && !inlineParent) {
      try { await api('POST', `repos/${REPO}/issues/${state[i.parent].number}/sub_issues`, { sub_issue_id: r.id }); }
      catch (e) { console.log(`  (sub-issue link failed: ${e.message.slice(0, 120)})`); }
      await sleep(pace.ms / 2);
    }
    await sleep(pace.ms);
  }

  // Repair pass: rewrite only the bodies whose rendered form actually changed (predicted number
  // was wrong, or a referenced key has since been published).
  if (mismatches && !DRY) {
    console.log(`Checking cross-references in ${issues.length} issues ...`);
    let repaired = 0;
    for (const i of issues) {
      const want = renderBody(i, k => state[k] && state[k].number);
      const live = await api('GET', `repos/${REPO}/issues/${state[i.key].number}`);
      if ((live.body || '').trim() === want.trim()) continue;
      await api('PATCH', `repos/${REPO}/issues/${state[i.key].number}`, { body: want });
      repaired++; await sleep(pace.ms / 2);
    }
    console.log(`Repaired ${repaired} bodies`);
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
