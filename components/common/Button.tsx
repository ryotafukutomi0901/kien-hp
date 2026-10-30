import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

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
   * "chevron": 縁をなぞる代わりに、文字が少し左へ寄り、右から「»」が現れる（2026-10-28 CEO指示。
   * 使うのはヒーローの2つと、トップの採用の欄の「採用情報を見る」だけ。2026-10-30 に一度「縁をなぞる」にそろえたが、
   * CEO指示「私たちの想いと採用情報を見るのみ一個前のに戻して」「採用の欄の採用情報を見るもヒーローと同じに」で戻した）。
   * この動きのときは末尾の目印（arrow）を出さない
   */
  effect?: "chevron";
  className?: string;
}

/** お問い合わせへのボタンかどうか（斜めに色が広がる動きを付ける。2026-10-28 CEO指示） */
const isContact = (href: string) => href === "/contact" || href.startsWith("/contact#");

/*
 * マウスを乗せたときの動き（2026-10-30 CEO指示「家事支援事業を見るのボタンの動きを、お問い合わせ以外すべてに。色はコーポレートカラーを使い分けて」）
 *   お問い合わせ: 斜めの帯が広がり、地がコーラル → ロゴのほかの色（ピンク・イエロー・ミントから毎回ランダム）に変わる
 *                （.wipe。色は ButtonWipeColor が乗せるたびに決める）
 *   それ以外   : ロゴの色の線が縁を一周して描かれ、少し浮く（.trace）。線の色はボタンごとに決まった1色（traceColor）
 *   ただしヒーローの2つとトップの採用の欄の「採用情報を見る」（effect="chevron"）は「»」が現れる動き
 * それまでの種類ごとの動き（文字のスロット・点が咲く）はやめた。戻し方は docs/REVERT_2026-10-28.md
 */
const TRACE_COLORS = ["coral", "pink", "yellow", "mint"] as const;
/* primary の地はコーラル。同じ色や近い色（ピンク）の線は見えないので、イエロー・ミントだけ */
const TRACE_COLORS_ON_CORAL = ["yellow", "mint"] as const;

/** 線の色をボタンごとに決める（行き先と文言から。同じボタンはいつも同じ色になり、違うボタンには色が散る） */
function traceColor(variant: Variant, href: string, children: ReactNode): string {
  const key = href + (typeof children === "string" ? children : "");
  let hash = 0;
  for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  const palette = variant === "primary" ? TRACE_COLORS_ON_CORAL : TRACE_COLORS;
  return `var(--logo-${palette[hash % palette.length]})`;
}

/**
 * サイト共通のピル型リンクボタン（手本: 日本テレビアート）。外部サイトは新しいタブで開く。
 */
export function Button({ href, children, variant = "primary", size = "md", arrow = true, effect, className }: ButtonProps) {
  const motion = isContact(href) ? "wipe" : (effect ?? "trace");
  const classes = [styles.button, styles[variant], styles[size], styles[motion], className].filter(Boolean).join(" ");
  const style = motion === "trace" ? ({ "--trace-color": traceColor(variant, href, children) } as CSSProperties) : undefined;
  const contact = motion === "wipe";
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
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} style={style} data-wipe={contact || undefined}>
        <span className={styles.label}>
          {children}
          <span className="visually-hidden">（外部サイト。新しいタブで開きます）</span>
        </span>
        {mark}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} style={style} data-wipe={contact || undefined}>
      <span className={styles.label}>{children}</span>
      {mark}
    </Link>
  );
}
