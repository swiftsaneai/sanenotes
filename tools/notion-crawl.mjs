// Crawl a public Notion site via loadPageChunk and dump Markdown.
import { writeFileSync } from 'node:fs';
const HOST = 'https://goodnotes-team.notion.site';
const ROOT = 'cdf804c6-b65a-4975-b26a-01f14de35be8';
const out = [];
const seen = new Set();
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function loadPage(id) {
  const blocks = {};
  let cursor = { stack: [] }, chunk = 0;
  for (let i = 0; i < 20; i++) {
    const res = await fetch(`${HOST}/api/v3/loadPageChunk`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ pageId: id, limit: 100, cursor, chunkNumber: chunk++, verticalColumns: false }) });
    if (!res.ok) { console.error('HTTP', res.status, id); break; }
    const j = await res.json();
    Object.assign(blocks, Object.fromEntries(Object.entries(j.recordMap?.block || {}).map(([k, v]) => [k, v.value?.value || v.value])));
    if (!j.cursor || !j.cursor.stack || !j.cursor.stack.length) break;
    cursor = j.cursor;
  }
  return blocks;
}
const txt = t => (t || []).map(x => x[0]).join('');
function render(id, blocks, depth, acc, childPages) {
  const b = blocks[id]; if (!b) return;
  const t = b.type, p = b.properties || {};
  const title = txt(p.title);
  switch (t) {
    case 'page': if (depth > 0) { childPages.push({ id, title }); acc.push(`- [[${title}]]`); return; } break;
    case 'header': acc.push(`\n## ${title}`); break;
    case 'sub_header': acc.push(`\n### ${title}`); break;
    case 'sub_sub_header': acc.push(`\n#### ${title}`); break;
    case 'bulleted_list': case 'to_do': acc.push(`- ${title}`); break;
    case 'numbered_list': acc.push(`1. ${title}`); break;
    case 'toggle': acc.push(`- ▸ ${title}`); break;
    case 'callout': case 'quote': acc.push(`> ${title}`); break;
    case 'text': if (title) acc.push(title); break;
    case 'table_row': acc.push('| ' + Object.values(p).map(txt).join(' | ') + ' |'); break;
    case 'image': case 'video': case 'embed': case 'divider': case 'table_of_contents': case 'breadcrumb': break;
    case 'column_list': case 'column': case 'table': case 'transclusion_container': case 'transclusion_reference': break;
    default: if (title) acc.push(title);
  }
  for (const c of b.content || []) render(c, blocks, depth + 1, acc, childPages);
}
async function crawl(id, title, depth) {
  if (seen.has(id) || depth > 4) return; seen.add(id);
  const blocks = await loadPage(id);
  const acc = [], childPages = [];
  render(id, blocks, 0, acc, childPages);
  out.push(`\n${'#'.repeat(Math.min(depth + 1, 3))} ${title}\n`);
  out.push(acc.join('\n'));
  console.error(`page ${title} (${acc.length} lines, ${childPages.length} children)`);
  for (const c of childPages) { await sleep(300); await crawl(c.id, c.title, depth + 1); }
}
await crawl(ROOT, 'Goodnotes User Guide', 0);
writeFileSync(new URL('./goodnotes-userguide-full.md', import.meta.url), out.join('\n'));
console.error('done, pages:', seen.size);
