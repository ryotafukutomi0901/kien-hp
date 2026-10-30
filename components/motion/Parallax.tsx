"use client";

import { useRef, type ReactNode } from "react";

import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * スクロールに合わせて、中身を上下にずらす（奥行き。手本の日本テレビアートの写真の動き）。
 * distance は動く幅（px）。正なら下へ、負なら上へずれる。
 * fromTop: ページの一番上にある要素（ヒーロー）用。読み込んだ時点では動かさず、スクロールに合わせて 0 → distance。
 * それ以外は、画面の下から入って上へ抜けるまでに -distance → distance。
 * 動きを減らす設定では動かさない。className で配置（絶対配置の層など）を呼び出し側が決める。
 */
export function Parallax({
  children,
  className,
  distance,
  fromTop = false,
}: {
  children: ReactNode;
  className?: string;
  distance: number;
  fromTop?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el,
          { y: fromTop ? 0 : -distance },
          {
            y: distance,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: fromTop ? "top top" : "top bottom",
              end: "bottom top",
              scrub: true,
            },
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
