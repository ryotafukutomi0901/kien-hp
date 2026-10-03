import type { ReactNode } from "react";

import styles from "./SectionTitle.module.css";

type Variant = "brush" | "mark";

interface SectionTitleProps {
  children: ReactNode;
  /**
   * brush: 手書き風見出し＋緑の筆線（サービス・私たちのこと）
   * mark : 左上にオレンジの三角マークが付く小見出し（スタッフ紹介・NEWS）
   */
  variant?: Variant;
  subtitle?: ReactNode;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
}

/**
 * セクション見出しの共通部品。
 * PHASE 1では構造のみ。筆線（brush）はServices担当、三角マーク（mark）はStaff担当が仕上げる。
 */
export function SectionTitle({ children, variant = "brush", subtitle, as: Tag = "h2", id, className }: SectionTitleProps) {
  return (
    <div className={[styles.root, styles[variant], className].filter(Boolean).join(" ")}>
      <Tag id={id} className={styles.title}>
        {children}
      </Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
