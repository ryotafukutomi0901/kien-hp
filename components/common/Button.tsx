import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowRightIcon } from "@/components/icons";

import styles from "./Button.module.css";

type Variant = "primary" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** 末尾の矢印。参考画像ではすべてのボタンに付いている */
  arrow?: boolean;
  className?: string;
}

/**
 * サイト共通のピル型リンクボタン。
 * 参考画像の実測（1440px換算）: lg 約300×56（ヒーロー）/ md 約165×48（ヘッダー）/ sm 約195×40（カード内）。
 */
export function Button({ href, children, variant = "primary", size = "md", arrow = true, className }: ButtonProps) {
  const classes = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(" ");
  return (
    <Link href={href} className={classes}>
      <span>{children}</span>
      {arrow && <ArrowRightIcon className={styles.arrow} size={16} />}
    </Link>
  );
}
