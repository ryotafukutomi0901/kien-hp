"use client";

import { useRef, type ReactNode } from "react";

import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * 流れる欧文の帯の動き（手本: 日本テレビアート。スクロールの速さで流れが速くなり、上へ戻すと逆に流れる）。
 * 中身（同じ並びを2回）を xPercent -50 まで動かし続け、スクロールの速さに合わせて速さ（timeScale）を変える。
 * JS が動くまでは CSS のアニメーションで流し、動き始めたら GSAP に引き継ぐ（data-motion="gsap"）。
 * 動きを減らす設定では動かさない。
 */
export function MarqueeTrack({ children, className, seconds = 40 }: { children: ReactNode; className?: string; seconds?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        el.dataset.motion = "gsap";
        const loop = gsap.fromTo(el, { xPercent: 0 }, { xPercent: -50, duration: seconds, ease: "none", repeat: -1 });
        let direction = 1;
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            direction = self.direction;
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 8);
            gsap.to(loop, {
              timeScale: direction * boost,
              duration: 0.25,
              overwrite: true,
              onComplete: () => {
                gsap.to(loop, { timeScale: direction, duration: 1.2, ease: "power2.out" });
              },
            });
          },
        });
        return () => {
          trigger.kill();
          loop.kill();
          delete el.dataset.motion;
        };
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
