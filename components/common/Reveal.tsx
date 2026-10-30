"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * スクロールで要素がふわっと現れる演出（手本の出現の動き）。data-reveal を付けた要素が画面に入ったら is-revealed を付ける。
 * - JSが動くまでは何も隠さない（html[data-reveal-ready] が付いてから styles/base.css で隠す）
 * - 動きを減らす設定（prefers-reduced-motion）では隠さない
 * - ページを移動するたびに、新しい要素を監視し直す
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const targets = [...document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)")];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    targets.forEach((el) => observer.observe(el));
    root.dataset.revealReady = "true";
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
