import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowRightIcon } from "@/components/icons";

import styles from "./Button.module.css";

type Variant = "primary" | "outline" | "white";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  href: string;
  children: ReactNode;
  /**
   * primary: 黒いピル（手本の「Contact」）。右端に白い丸の矢印
   * outline: 淡いグレーのピル（手本の「もっとみる •」）。白地の上で使う
   * white  : 白いピル。グレー地・色の面の上で使う
   */
  variant?: Variant;
  size?: Size;
  /** 末尾の目印（primary は矢印、それ以外は小さな丸） */
  arrow?: boolean;
  /**
   * マウスを乗せたときの動き。"chevron": 文字が少し左へ寄り、右から「»」が現れる（2026-10-28 CEO指示。ヒーローの「私たちの想いを見る」）。
   * この動きのときは末尾の目印（arrow）を出さない
   */
  effect?: "chevron";
  className?: string;
}

/** お問い合わせへのボタンかどうか（斜めに色が広がる動きを付ける。2026-10-28 CEO指示） */
const isContact = (href: string) => href === "/contact" || href.startsWith("/contact#");

/*
 * マウスを乗せたときの動きは、ボタンの種類ごとに1つずつ、ほかと重ならないものにしている
 * （2026-10-29 CEO指示「既に使用しているものは避けて他のアニメーションを使って」）。
 *   お問い合わせ: 斜めの帯（.wipe）／ effect="chevron": 「»」が現れる（ここまでは 2026-10-28）
 *   primary: 文字が上へ抜けて下から入れ替わり、白い丸の矢印が右へ抜けて左から戻る（.slot）
 *   outline: 右端の点がミントの円になって広がり、ボタンを満たす（.bloom）
 *   white  : コーラルの線が縁を一周して描かれ、少し浮く（.trace）
 */
const MOTION: Record<Variant, string> = { primary: "slot", outline: "bloom", white: "trace" };

/**
 * サイト共通のピル型リンクボタン（手本: 日本テレビアート）。外部サイトは新しいタブで開く。
 */
export function Button({ href, children, variant = "primary", size = "md", arrow = true, effect, className }: ButtonProps) {
  const motion = isContact(href) ? "wipe" : (effect ?? MOTION[variant]);
  const classes = [styles.button, styles[variant], styles[size], styles[motion], className].filter(Boolean).join(" ");
  // .slot で下から入れ替わる文字（同じ文言）。文字列のときだけ用意する
  const text = motion === "slot" && typeof children === "string" ? children : undefined;
  const label = (
    <span className={styles.labelInner} data-text={text}>
      {children}
    </span>
  );
  const mark = arrow && !effect ? (
    variant === "primary" ? (
      <span className={styles.circle} aria-hidden="true">
        <ArrowRightIcon size={14} strokeWidth={2.4} />
      </span>
    ) : (
      <span className={styles.dot} aria-hidden="true" />
    )
  ) : null;

  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        <span className={styles.label}>
          {label}
          <span className="visually-hidden">（外部サイト。新しいタブで開きます）</span>
        </span>
        {mark}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      <span className={styles.label}>{label}</span>
      {mark}
    </Link>
  );
}
