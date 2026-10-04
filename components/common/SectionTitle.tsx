import type { ReactNode } from "react";

import { BrushStroke } from "./BrushStroke";
import styles from "./SectionTitle.module.css";

type Variant = "brush" | "mark";

interface SectionTitleProps {
  children: ReactNode;
  /**
   * brush: 手書き風見出し＋末尾の下に緑のペン線（サービス・私たちのこと）
   * mark : 左にオレンジの三角マークが付くゴシックの小見出し（スタッフ紹介・NEWS）
   */
  variant?: Variant;
  subtitle?: ReactNode;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
}

/** セクション見出しの共通部品（統括管理）。見た目を変えたい場合は統括に要望を出す */
export function SectionTitle({ children, variant = "brush", subtitle, as: Tag = "h2", id, className }: SectionTitleProps) {
  return (
    <div className={[styles.root, styles[variant], className].filter(Boolean).join(" ")}>
      <Tag id={id} className={styles.title}>
        <span className={styles.text}>
          {children}
          {variant === "brush" && <BrushStroke className={styles.stroke} />}
        </span>
      </Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
