import type { ReactNode } from "react";

import styles from "./SectionTitle.module.css";

type Variant = "brush" | "mark";

interface SectionTitleProps {
  /** 見出しの本体（日本語） */
  children: ReactNode;
  /**
   * 欧文の大きなラベル（手本の「Our Service」「News」型）。指定すると欧文を大きく、日本語を小さく下に添える。
   * 欧文は飾りなので読み上げない（aria-hidden）。見出しの読み上げは日本語だけになる。
   */
  en?: string;
  /**
   * en が無いときの見た目。
   * brush: 日本語の大見出し（--t-heading）
   * mark : 左にロゴの色の丸が付く小見出し（--t-heading-sm）。下層ページの節で使う
   */
  variant?: Variant;
  subtitle?: ReactNode;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  /** 中央揃え（手本の「Who We Are」型） */
  align?: "start" | "center";
  /** 黒い地の上に置くとき */
  onDark?: boolean;
}

/** セクション見出しの共通部品（統括管理）。h1〜h3 は書体・太さが共通で、差は文字サイズだけ（styles/base.css） */
export function SectionTitle({
  children,
  en,
  variant = "brush",
  subtitle,
  as: Tag = "h2",
  id,
  className,
  align = "start",
  onDark = false,
}: SectionTitleProps) {
  const classes = [styles.root, en ? styles.withEn : styles[variant], styles[align], onDark && styles.onDark, className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes}>
      <Tag id={id} className={styles.title}>
        {en ? (
          <>
            <span className={styles.en} aria-hidden="true">
              {en}
            </span>
            <span className={styles.ja}>{children}</span>
          </>
        ) : (
          <span className={styles.text}>{children}</span>
        )}
      </Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
