"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { getLenis } from "@/lib/lenis";
import { holdIntro, playIntro } from "@/lib/intro";

/**
 * ヘッダーのロゴ（data-intro-replay）を押してトップへ戻ったとき、トップを開いたときと同じ登場演出をもう一度流す
 * （2026-10-30 CEO指示「ヘッダーの喜援を押してTOPに戻るときも、OPアニメーションと同じのが発動するように」）。
 * - 押した時点で演出の前の状態にし（ほかのページからなら、トップが描かれる前に隠しておくため）、トップが表示されてから流す
 * - すでにトップにいるときは、頭まで戻してその場で流し直す
 * - 新しいタブで開く押し方（Ctrl・Cmd・中ボタンなど）や、動きを減らす設定では何もしない
 * 何も描画しない。ページ全体で1つだけ置く（app/layout.tsx）。
 */
export function IntroReplay() {
  const pathname = usePathname();
  const pending = useRef(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[data-intro-replay]");
      if (!link || !holdIntro()) return;
      if (window.location.pathname === "/") {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
        playIntro();
      } else {
        pending.current = true;
      }
    };
    // 捕まえる段階で受け取り、Next.js のリンクの移動より先に隠す
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (pathname !== "/" || !pending.current) return;
    pending.current = false;
    playIntro();
  }, [pathname]);

  return null;
}
