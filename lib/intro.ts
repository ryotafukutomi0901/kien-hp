/**
 * トップのヒーローの登場演出の合図（2026-10-28 CEO指示「日本テレビアートのヒーローの動きを喜援版で」）。
 *
 * <html data-intro> の値で、ヒーロー・背景の同心円・色の丸の状態を切り替える。
 *   wait: 演出の前。見出し・写真などを隠しておく
 *   play: 演出の開始（data-intro-start に開始時刻 = performance.now()）。各部品は tokens.css の --intro-* の時刻で順に出る
 * 隠した状態が一瞬でも見えないよう、合図はページの最初の描画より前に INTRO_SCRIPT（app/layout.tsx の <head>）が付ける。
 *
 * 流すのは、トップを直接開いたとき（再読み込みを含む）と、ヘッダーのロゴを押してトップへ戻ったとき（2026-10-30 CEO指示。
 * holdIntro・playIntro と components/hero/IntroReplay.tsx）。ナビの「ホーム」・ブラウザの戻るでトップへ戻ったとき・
 * 動きを減らす設定（prefers-reduced-motion）のときは付けず、すぐに全部を見せる。
 * 読み込み画面は置かない（CEO指示「ヒーローの動きの始まりからで良い」）。文字の準備を最大1.2秒待ってから始める。
 */
export const INTRO_SCRIPT = `(function(){
  var d = document.documentElement;
  if (location.pathname !== "/" || !window.matchMedia || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  d.setAttribute("data-intro", "wait");
  var play = function () {
    if (d.getAttribute("data-intro") !== "wait") return;
    d.setAttribute("data-intro-start", String(performance.now()));
    d.setAttribute("data-intro", "play");
  };
  var ready = function () {
    var fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    Promise.race([fonts, new Promise(function (r) { setTimeout(r, 1200); })]).then(function () {
      requestAnimationFrame(function () { requestAnimationFrame(play); });
    });
  };
  // タブが裏で開かれたときは requestAnimationFrame が止まるので、表に出たときに始まる
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready, { once: true });
  else ready();
})();`;

/** 演出の前の状態にする（見出し・写真・背景の円をすぐに隠す）。動きを減らす設定では何もせず false */
export function holdIntro(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  document.documentElement.setAttribute("data-intro", "wait");
  return true;
}

/** 隠した状態が描かれてから、演出を最初から流す（INTRO_SCRIPT の play と同じ。2回待つのは隠した状態を一度描かせるため） */
export function playIntro(): void {
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const root = document.documentElement;
      if (root.getAttribute("data-intro") !== "wait") return;
      root.setAttribute("data-intro-start", String(performance.now()));
      root.setAttribute("data-intro", "play");
    }),
  );
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
let dotsTiming: { at: number; span: number } | null = null;

/**
 * 背景の色の丸が中央から外へ広がる割合（0〜1）。演出がないときは 1。
 * 手本の「色の丸が中央から飛び出す」（1.125秒後から2秒、power3.out）。時刻は tokens.css の --intro-dots-at / --intro-dots-for。
 */
export function introDotsOpening(): number {
  const root = document.documentElement;
  const state = root.getAttribute("data-intro");
  if (state === "wait") return 0;
  if (state !== "play") return 1;
  if (!dotsTiming) {
    const style = getComputedStyle(root);
    dotsTiming = {
      at: parseFloat(style.getPropertyValue("--intro-dots-at")) || 0,
      span: parseFloat(style.getPropertyValue("--intro-dots-for")) || 1,
    };
  }
  const elapsed = (performance.now() - Number(root.getAttribute("data-intro-start"))) / 1000;
  const t = Math.min(Math.max((elapsed - dotsTiming.at) / dotsTiming.span, 0), 1);
  return easeOutCubic(t);
}
