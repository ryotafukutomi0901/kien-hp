// 開発サーバの全ページを、複数の幅で検査する（ヘッドレスChromeをCDPで操作。追加ライブラリ不要）。
//   - 文字のコントラスト比（WCAG AA: 通常4.5:1、大きい文字3:1。背景が画像・グラデーションの文字は「要目視」）
//   - 横はみ出し（scrollWidth > innerWidth）／要素の中で文字が切れている（scrollWidth > clientWidth）
//   - 折り返した最後の行が1文字だけ（「一文字残り」）
//   - ボタン・リンクのタップ領域（44px未満。::after で広げているものは広げた分を含める）
//   - コンソールのエラー
// 使い方: node scripts/audit.mjs [--paths /,/services] [--widths 375,768,1440]
// 開発サーバは既定で http://localhost:3461（環境変数 BASE_URL で変更可）。
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
// 会社行事の下層ページ（/events/<id>）は、写真の多い最新の1件で代表させる
const paths = opt("paths", "/,/services/home-visit,/services/care-plan,/services/home-help,/about,/recruit,/news,/events,/events/2026-07-26-curry-party,/contact,/privacy").split(",");
const widths = opt("widths", "320,375,768,1024,1440").split(",").map(Number);
const base = process.env.BASE_URL ?? "http://localhost:3461";
const port = 9400 + Math.floor(Math.random() * 500);
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const profile = mkdtempSync(join(tmpdir(), "kien-audit-"));
const chrome = spawn(
  chromePath,
  ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"],
  { stdio: "ignore" },
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws;
let seq = 0;
const pending = new Map();
const waiters = [];
let problems = [];

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
const waitFor = (name, ms = 20000) =>
  new Promise((resolve) => {
    const t = setTimeout(() => resolve(null), ms);
    waiters.push({ name, cb: (p) => (clearTimeout(t), resolve(p)) });
  });
const evaluate = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
  return r.result.value;
};

// ページ内で実行する検査。結果は JSON で返す
const AUDIT = `(() => {
  const parse = (c) => { const m = c.match(/rgba?\\(([^)]+)\\)/); if (!m) return null; const p = m[1].split(/[ ,\\/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const L = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  const ratio = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const over = (t, b) => ({ r: t.r * t.a + b.r * (1 - t.a), g: t.g * t.a + b.g * (1 - t.a), b: t.b * t.a + b.b * (1 - t.a), a: 1 });
  const bgOf = (el) => {
    const chain = [];
    for (let e = el; e; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.backgroundImage.includes('url(')) return { img: true };
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0) { chain.push(c); if (c.a >= 1) break; }
    }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = chain.length - 1; i >= 0; i--) base = over(chain[i], base);
    return base;
  };
  const contrast = [], seen = new Set();
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  const orphans = [];
  while ((n = w.nextNode())) {
    const t = n.nodeValue.trim(); if (!t) continue;
    const el = n.parentElement; if (!el || el.closest('script,style,noscript,.visually-hidden')) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2) continue;
    const bg = bgOf(el);
    if (bg.img) { const k = 'img|' + t.slice(0, 16); if (!seen.has(k)) { seen.add(k); contrast.push('要目視(背景が画像) 「' + t.slice(0, 18) + '」'); } }
    else {
      const f = over(parse(cs.color), bg), cr = ratio(f, bg);
      const px = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700;
      const need = (px >= 24 || (px >= 18.66 && bold)) ? 3 : 4.5;
      const k = t.slice(0, 16) + cr.toFixed(2);
      if (cr < need && !seen.has(k)) { seen.add(k); contrast.push(cr.toFixed(2) + ':1 (<' + need + ') 「' + t.slice(0, 18) + '」 ' + px + 'px'); }
    }
    // 一文字残り: 折り返した最後の行が1文字だけ
    if (t.length >= 4 && t.length <= 240) {
      const range = document.createRange();
      const tops = [];
      const text = n.nodeValue;
      for (let i = 0; i < text.length; i++) {
        if (/\\s/.test(text[i])) continue;
        range.setStart(n, i); range.setEnd(n, i + 1);
        const rc = range.getClientRects()[0]; if (!rc || rc.width === 0) continue;
        tops.push(Math.round(rc.top));
      }
      if (tops.length) {
        // 回転した文字でも誤判定しないよう、隣り合う文字の高さの差が文字の高さの0.8倍を超えたところを行の切れ目とする
        const fs = parseFloat(cs.fontSize);
        let lines = 1, lastLine = 1;
        for (let i = 1; i < tops.length; i++) {
          if (Math.abs(tops[i] - tops[i - 1]) > fs * 0.8) { lines++; lastLine = 1; } else lastLine++;
        }
        if (lines > 1 && lastLine === 1) orphans.push('「…' + t.slice(-10) + '」');
      }
    }
  }
  const small = [];
  document.querySelectorAll('a[href],button').forEach((a) => {
    const cs = getComputedStyle(a), r = a.getBoundingClientRect();
    if (cs.display === 'none' || cs.display === 'inline' || r.width === 0 || a.closest('.visually-hidden') || a.matches('.skip-link')) return;
    const after = getComputedStyle(a, '::after');
    const extra = after.position === 'absolute' && after.content !== 'none' ? Math.abs(parseFloat(after.top) || 0) * 2 : 0;
    if (r.height + extra < 43.5) small.push((a.innerText || a.getAttribute('aria-label') || '').trim().slice(0, 16) + ' h=' + Math.round(r.height + extra));
  });
  const clipped = [];
  document.querySelectorAll('h1,h2,h3,h4,p,li,dt,dd,a,span,td,th,div').forEach((e) => {
    // 読み上げ対象外の飾り（流れる欧文の帯など）は、端で切るのが仕様なので数えない
    if (e.closest('.visually-hidden, [aria-hidden="true"], [role="img"]')) return;
    const cs = getComputedStyle(e);
    if ((cs.overflowX === 'hidden' || cs.overflowX === 'clip') && e.clientWidth > 0 && e.scrollWidth > e.clientWidth + 1 && (e.innerText || '').trim()) {
      clipped.push((e.innerText || '').trim().slice(0, 18));
    }
  });
  return { overflow: document.documentElement.scrollWidth - innerWidth, contrast, orphans: [...new Set(orphans)], small: [...new Set(small)], clipped: [...new Set(clipped)] };
})()`;

let code = 0;
const summary = [];
try {
  let targets = [];
  for (let i = 0; i < 75 && !targets.length; i++) {
    try {
      targets = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).filter((t) => t.type === "page");
    } catch {}
    if (!targets.length) await sleep(200);
  }
  ws = new WebSocket(targets[0].webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  ws.addEventListener("message", (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const p = pending.get(m.id);
      pending.delete(m.id);
      if (m.error) p.reject(new Error(m.error.message));
      else p.resolve(m.result);
      return;
    }
    if (m.method === "Runtime.exceptionThrown") problems.push(m.params.exceptionDetails?.exception?.description ?? "exception");
    if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") {
      problems.push(`error: ${m.params.args.map((a) => a.value ?? a.description).join(" ")}`.slice(0, 200));
    }
    for (let i = waiters.length - 1; i >= 0; i--) {
      if (waiters[i].name === m.method) waiters.splice(i, 1)[0].cb(m.params);
    }
  });
  await send("Page.enable");
  await send("Runtime.enable");

  for (const width of widths) {
    await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 640 });
    for (const path of paths) {
      problems = [];
      const loaded = waitFor("Page.loadEventFired");
      await send("Page.navigate", { url: base + path });
      await loaded;
      await evaluate("document.fonts.ready.then(() => true)");
      await sleep(400);
      // トップを直接開くとヒーローの登場演出が流れる（lib/intro.ts）。出そろってから測る
      if (await evaluate('document.documentElement.hasAttribute("data-intro")')) await sleep(6500);
      const r = JSON.parse(await evaluate(`JSON.stringify(${AUDIT})`));
      const lines = [];
      if (r.overflow > 0) lines.push(`横はみ出し ${r.overflow}px`);
      for (const c of r.contrast) lines.push(`コントラスト ${c}`);
      for (const o of r.orphans) lines.push(`一文字残り ${o}`);
      for (const s of r.small) lines.push(`タップ領域 ${s}`);
      for (const c of r.clipped) lines.push(`文字が切れている ${c}`);
      for (const p of [...new Set(problems)]) lines.push(`コンソール ${p}`);
      summary.push({ width, path, lines });
    }
  }
  let bad = 0;
  for (const { width, path, lines } of summary) {
    const real = lines.filter((l) => !l.startsWith("コントラスト 要目視"));
    if (real.length) bad++;
    console.log(`${real.length ? "✗" : "✓"} ${String(width).padStart(4)}px ${path}`);
    for (const l of lines) console.log(`      ${l}`);
  }
  console.log(`\n${summary.length}件中 ${bad}件に指摘あり（「要目視」は背景が画像の文字。撮影して読めるか確かめる）`);
  if (bad) code = 2;
} catch (e) {
  console.error("failed:", e.message);
  code = 1;
} finally {
  try {
    ws?.close();
  } catch {}
  chrome.kill("SIGKILL");
  await sleep(300);
  rmSync(profile, { recursive: true, force: true });
  process.exit(code);
}
