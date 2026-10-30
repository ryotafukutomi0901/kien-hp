"use client";

import { useEffect } from "react";

/** お問い合わせのボタンの帯の色（ロゴの色のうち、ボタンの地のコーラル以外） */
const COLORS = ["pink", "yellow", "mint"] as const;

/**
 * お問い合わせのボタン（Button の data-wipe）にマウスを乗せる・キーボードで選ぶたびに、
 * 斜めの帯の色（--wipe-color）をロゴの色からランダムに選ぶ（2026-10-30 CEO指示「ピンク→コーポレートカラーランダムに」）。
 * 前回と同じ色は続けない。ページ全体で1つだけ置き、乗せた要素から近いボタンを探す（ボタンごとに JS を持たせない）。
 * 何も描画しない。JS が無い環境では帯はイエロー（Button.module.css の既定）。
 */
export function ButtonWipeColor() {
  useEffect(() => {
    const pick = (event: Event) => {
      const button = (event.target as Element | null)?.closest?.<HTMLElement>("[data-wipe]");
      if (!button) return;
      // ボタンの中を動いているだけ（子の要素から子の要素へ）のときは選び直さない
      const from = (event as PointerEvent | FocusEvent).relatedTarget as Node | null;
      if (from && button.contains(from)) return;
      const choices = COLORS.filter((color) => color !== button.dataset.wipeColor);
      const color = choices[Math.floor(Math.random() * choices.length)];
      button.dataset.wipeColor = color;
      button.style.setProperty("--wipe-color", `var(--logo-${color})`);
    };
    document.addEventListener("pointerover", pick);
    document.addEventListener("focusin", pick);
    return () => {
      document.removeEventListener("pointerover", pick);
      document.removeEventListener("focusin", pick);
    };
  }, []);

  return null;
}
