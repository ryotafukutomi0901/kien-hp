import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
 * GSAP の登録を1か所にまとめる（2026-10-28 CEO指示で GSAP・Lenis を導入）。
 * クライアント部品（"use client"）からだけ読み込む。サーバーで描くときは何もしない。
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** 動きを減らす設定でないときだけ動かす（gsap.matchMedia の条件） */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
