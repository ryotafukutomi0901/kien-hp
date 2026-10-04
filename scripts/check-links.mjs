// 開発サーバ（既定 http://localhost:3461）の全ページを巡回し、内部リンクを検査する。
//   - リンク先のページが 200 で返るか
//   - "#id" 付きのリンクは、リンク先のHTMLにその id があるか
// 外部リンク・tel:・mailto: は対象外。使い方: node scripts/check-links.mjs
const base = process.env.BASE_URL ?? "http://localhost:3461";
const start = ["/"];
const pages = new Map(); // path -> html
const queue = [...start];
const problems = [];

async function load(path) {
  if (pages.has(path)) return pages.get(path);
  const res = await fetch(base + path);
  const html = res.ok ? await res.text() : null;
  pages.set(path, html);
  if (!res.ok) problems.push(`${path} → HTTP ${res.status}`);
  return html;
}

const links = []; // [from, href]
while (queue.length) {
  const path = queue.shift();
  const html = await load(path);
  if (!html) continue;
  for (const [, href] of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const full = href.startsWith("#") ? path + href : href;
    links.push([path, full]);
    const target = full.split("#")[0] || "/";
    if (!pages.has(target) && !queue.includes(target)) queue.push(target);
  }
}

for (const [from, href] of links) {
  const [target, hash] = [href.split("#")[0] || "/", href.split("#")[1]];
  const html = await load(target);
  if (!html) continue;
  if (hash && !html.includes(`id="${decodeURIComponent(hash)}"`)) problems.push(`${from} のリンク ${href} → #${hash} が無い`);
}

const unique = [...new Set(links.map(([, h]) => h))];
console.log(`ページ ${pages.size} 件、内部リンク ${links.length} 件（重複除き ${unique.length} 件）を検査`);
console.log([...pages.keys()].sort().join("  "));
if (problems.length) {
  console.log(`\n問題 ${problems.length} 件:\n  ` + [...new Set(problems)].join("\n  "));
  process.exit(1);
}
console.log("問題なし");
