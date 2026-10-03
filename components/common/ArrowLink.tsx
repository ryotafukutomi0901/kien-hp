import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowRightIcon } from "@/components/icons";
import type { Tone } from "@/types/site";

import styles from "./ArrowLink.module.css";

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
      <ArrowRightIcon className={styles.arrow} size={14} />
    </Link>
  );
}
