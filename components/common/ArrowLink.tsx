import Link from "next/link";
import type { ReactNode } from "react";

import type { Tone } from "@/types/site";

import styles from "./ArrowLink.module.css";

/**
 * 線と矢じりで描いた右向きの矢印。親（リンク）にマウスを乗せると、軸が右へ伸びる（2026-10-29。ボタンの種類ごとに動きを変えた1つ）。
 * 伸びる分の幅は先に取ってあるので、伸びても周りは動かない。装飾なので読み上げない
 */
export function GrowArrow({ className }: { className?: string }) {
  return (
    <span className={[styles.arrowBox, className].filter(Boolean).join(" ")} aria-hidden="true">
      <span className={styles.shaft} />
    </span>
  );
}

/** 「詳しく見る →」「一覧を見る →」などの小リンク。tone を省くと本文色 */
export function ArrowLink({
  href,
  children,
  tone,
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const classes = [styles.link, tone && styles[tone], className].filter(Boolean).join(" ");
  return (
    <Link href={href} className={classes}>
      <span>{children}</span>
      <GrowArrow />
    </Link>
  );
}
