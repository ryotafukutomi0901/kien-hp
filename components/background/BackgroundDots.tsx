"use client";

import { useEffect, useRef } from "react";

import { introDotsOpening } from "@/lib/intro";

/**
 * 全ページの背景の「色の丸」（手本: 日本テレビアートのファーストビュー。2026-10-28 CEO指示で、ヒーローだけでなく背景として常に出す）。
 * 画面の中心の奥から、ロゴの4色の丸が手前へゆっくり飛んでくる。喜援のロゴの周りに散る点を、動きにしたもの。
 * 背景なので淡く（不透明度を抑え）、本文の邪魔をしない速さにしている。
 * - 動きを減らす設定（prefers-reduced-motion）では止まった1枚絵を描く
 * - タブが裏にあるときは描画を止める。描画は毎秒30回に抑える（常に動くので電池を食わないように）
 * - 端末の画素密度は1.5倍までに抑える
 * - まれに丸の代わりに喜援のロゴのマークが飛んでくる（2026-10-28 CEO案。画面に同時に2つまで）
 * - トップを開いたときは、丸が画面の中央から外へ一気に広がって始まる（ヒーローの登場演出。lib/intro.ts）
 */
const COLORS = ["#ec746c", "#ec9cac", "#fcdc7c", "#bcdcbc", "#f2a7b8", "#f6cf72", "#a8d5b0", "#f0928a"];
/** 新しく出てくる丸のうち、ロゴのマークになる割合と、画面に同時に出す上限 */
const LOGO_RATE = 0.03;
const LOGO_MAX = 2;

interface Dot {
  x: number;
  y: number;
  z: number;
  r: number;
  color: string;
  logo: boolean;
}

export function BackgroundDots({ className, logoSrc }: { className?: string; logoSrc?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let frame = 0;
    let last = 0;
    let running = false;

    // ロゴのマーク（読み込みが終わるまでは丸として描く）
    const logo = new window.Image();
    if (logoSrc) logo.src = logoSrc;
    const logoReady = () => Boolean(logoSrc) && logo.complete && logo.naturalWidth > 0;
    const logoAspect = () => (logo.naturalHeight || 318) / (logo.naturalWidth || 268);

    const spawn = (z = Math.random()): Dot => {
      const angle = Math.random() * Math.PI * 2;
      const spread = 0.2 + Math.random() * 0.8;
      return {
        x: Math.cos(angle) * spread,
        y: Math.sin(angle) * spread,
        z,
        r: 0.5 + Math.random() * 0.9,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        logo: Boolean(logoSrc) && Math.random() < LOGO_RATE && dots.filter((d) => d.logo).length < LOGO_MAX,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 640 ? 46 : 90;
      // 1つずつ足す（spawn が「いま出ているロゴの数」を数えるため）
      dots = [];
      for (let i = 0; i < count; i++) dots.push(spawn());
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const opening = introDotsOpening();
      if (opening <= 0) return;
      const cx = width * 0.5;
      const cy = height * 0.5;
      const scale = Math.max(width, height) * 0.32;
      const base = width < 640 ? 7 : 10;
      for (const d of dots) {
        const k = 1 / Math.max(d.z, 0.04);
        const px = cx + d.x * scale * k * 0.5 * opening;
        const py = cy + d.y * scale * k * 0.5 * opening;
        const radius = Math.min(d.r * base * k * 0.35, 40);
        if (d.logo && logoReady()) {
          // ロゴのマークは丸より大きく・少し濃く（何の形か分かるように）
          const w = Math.max(radius * 3.2, 14);
          const h = w * logoAspect();
          ctx.globalAlpha = Math.min(0.85, 0.25 + (1 - d.z) * 0.8) * Math.min(opening * 3, 1);
          ctx.drawImage(logo, px - w / 2, py - h / 2, w, h);
          continue;
        }
        // 奥ほど小さく薄く、手前ほど大きく。背景なので最大でも 0.55 に抑える
        ctx.globalAlpha = Math.min(0.55, 0.12 + (1 - d.z) * 0.6) * Math.min(opening * 3, 1);
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = (time: number) => {
      frame = requestAnimationFrame(step);
      if (time - last < 33) return; // 約30fps
      last = time;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.z -= 0.0026 + (1 - d.z) * 0.005;
        if (d.z <= 0.04) dots[i] = spawn(1);
      }
      draw();
    };

    const start = () => {
      if (running || reduce || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    resize();
    draw();
    start();
    logo.onload = () => draw();

    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener("resize", onResize);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [logoSrc]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
