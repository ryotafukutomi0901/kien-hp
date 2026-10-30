"use client";

import { useRef, type ReactNode } from "react";

import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * スクロールに合わせて、中身を横へ流す（手本の「Who We Are」の下のタイルの列）。
 * 画面の下から入って上へ抜けるまでに、x を 0 → -distance（px）。中の CSS の流れ（無限ループ）とは別の層なので、両方が重なって動く。
 */
export function ScrollDrift({ children, className, distance }: { children: ReactNode; className?: string; distance: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el,
          { x: 0 },
          {
            x: -distance,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
