// 開発サーバのページをヘッドレスChromeで撮影する（CDPで端末幅を正確に指定。追加ライブラリ不要）。
// 複数のエージェントが同時に使えるよう、デバッグポートとプロファイルは毎回別にする。
//
// 使い方:
//   node scripts/shot.mjs <出力PNG> [--width 1440] [--path /] [--height 900] [--full]
//                          [--clip-y 0 --clip-h 800] [--selector "#services"] [--reduced]
//   --full        ページ全体を撮る
//   --selector    その要素の範囲だけを撮る（例: セクションのid・クラス）
//   --clip-y/-h   縦方向の範囲を指定して撮る
//   --hide-header sticky ヘッダーを隠して撮る（--selector でセクションを撮るとき、途中に写り込むのを防ぐ）
//   --keep-scroll 読み込み後のスクロール位置のまま撮る（--path "/events#id" のハッシュ着地を確かめるとき。--full等と併用しない）
// 撮影後、横スクロールの有無（scrollWidth と innerWidth）とコンソールのエラーを表示する。
// 開発サーバは既定で http://localhost:3461（環境変数 BASE_URL で変更可）。
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const out = args[0];
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const has = (name) => args.includes(`--${name}`);
if (!out || out.startsWith("--")) {
  console.error("usage: node scripts/shot.mjs <out.png> [--width 1440] [--path /] [--full] [--selector css]");
  process.exit(1);
}

const width = Number(opt("width", 1440));
const height = Number(opt("height", 900));
const path = opt("path", "/");
const base = process.env.BASE_URL ?? "http://localhost:3461";
const port = 9400 + Math.floor(Math.random() * 500);
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const profile = mkdtempSync(join(tmpdir(), "kien-shot-"));
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
const problems = [];

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
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result.value;
};

let code = 0;
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
    if (m.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(m.params.type)) {
      problems.push(`${m.params.type}: ${m.params.args.map((a) => a.value ?? a.description).join(" ")}`);
    }
    for (let i = waiters.length - 1; i >= 0; i--) {
      if (waiters[i].name === m.method) waiters.splice(i, 1)[0].cb(m.params);
    }
  });
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 640 });
  if (has("reduced")) {
    await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  }
  const loaded = waitFor("Page.loadEventFired");
  await send("Page.navigate", { url: base + path });
  await loaded;
  await evaluate("document.fonts.ready.then(() => true)");
  // 遅延読み込みの画像を読ませるため、少しずつ最下部までスクロールし、全画像の読み込みを待ってから戻す
  // （img属性を書き換えるとハイドレーション警告が出るので、スクロールだけで読ませる）
  await evaluate(`(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    // behavior: "instant" で scroll-behavior: smooth を上書きする（styleを書き換えるとハイドレーション不一致になるため）
    const start = scrollY;
    for (let y = 0; y < document.documentElement.scrollHeight; y += Math.round(innerHeight / 2)) { scrollTo({ top: y, behavior: "instant" }); await wait(120); }
    const pendingImgs = [...document.images].filter((img) => !img.complete);
    await Promise.race([Promise.all(pendingImgs.map((img) => new Promise((r) => { img.addEventListener("load", r, { once: true }); img.addEventListener("error", r, { once: true }); }))), wait(8000)]);
    scrollTo({ top: KEEP ? start : 0, behavior: "instant" });
  })()`.replace("KEEP", has("keep-scroll") ? "true" : "false"));
  await sleep(600);

  if (has("hide-header")) {
    await evaluate("(() => { const h = document.querySelector('body > header'); if (h) h.style.visibility = 'hidden'; })()");
  }
  const params = { format: "png", captureBeyondViewport: true };
  const selector = opt("selector");
  if (selector) {
    const rect = await evaluate(
      `(() => { const el = document.querySelector(${JSON.stringify(selector)}); if (!el) return null; const r = el.getBoundingClientRect(); return { x: 0, y: r.top + scrollY, width: innerWidth, height: r.height }; })()`,
    );
    if (!rect) throw new Error(`selector not found: ${selector}`);
    params.clip = { ...rect, scale: 1 };
  } else if (has("full") || opt("clip-h")) {
    const full = await evaluate("document.documentElement.scrollHeight");
    const y = Number(opt("clip-y", 0));
    params.clip = { x: 0, y, width, height: Number(opt("clip-h", full - y)), scale: 1 };
  }
  const shot = await send("Page.captureScreenshot", params);
  writeFileSync(out, Buffer.from(shot.data, "base64"));

  const m = await evaluate("({ innerWidth, scrollWidth: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight })");
  console.log(`saved: ${out}  width=${width} page=${m.scrollWidth}x${m.height}${m.scrollWidth > m.innerWidth ? "  ⚠ 横スクロールあり" : ""}`);
  if (problems.length) console.log("console:\n  " + problems.join("\n  "));
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
