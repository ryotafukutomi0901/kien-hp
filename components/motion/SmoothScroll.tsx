"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis, setLenis } from "@/lib/lenis";

/**
 * マウスホイールのスクロールを滑らかにする（Lenis。手本の日本テレビアートと同じ。2026-10-28 CEO指示）。
 * - スマホ・タブレットのタッチ操作は、ブラウザ標準のスクロールのまま（Lenis の既定）
 * - 動きを減らす設定（prefers-reduced-motion）では使わない
 * - GSAP の時計で動かし、ScrollTrigger とずれないようにする
 * - ページ内リンク（#id）は Lenis が受け持ち、ヘッダーの高さ分ずらして止める
 * - ページを移動したら一番上へ（ハッシュ付きのときは Next.js の着地に任せる）
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 64;
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      anchors: { offset: -(header + 12) },
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(lenis);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    getLenis()?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
