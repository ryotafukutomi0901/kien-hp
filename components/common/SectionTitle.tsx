import type { CSSProperties, ReactNode } from "react";

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
  /**
   * 開いたときの登場の動き（下層ページの h1 で使う。2026-11-13 CEO指示「下層ページのH1にアニメーションがない」）。
   * 欧文があるときは欧文が1文字ずつ下からせり上がり、続いて日本語がふわっと出る。
   * 欧文が無いとき（事業・行事のページ）は、日本語の見出しが1文字ずつせり上がる（文字列でないときは見出しごと）
   */
  animate?: boolean;
}

/** 日本語の見出しを1文字ずつの箱に分ける。読み上げは隠した元の文で、文のまま読ませる */
function JaChars({ children }: { children: ReactNode }) {
  if (typeof children !== "string") return <span className={styles.textRise}>{children}</span>;
  return (
    <>
      <span className="visually-hidden">{children}</span>
      <span aria-hidden="true">
        {Array.from(children).map((ch, i) => (
          <span key={i} className={styles.jaChar} style={{ "--i": i } as CSSProperties}>
            {ch}
          </span>
        ))}
      </span>
    </>
  );
}

/** 欧文を語ごと・1文字ずつの箱に分ける（語の途中では折り返さない）。--i はせり上がる順番 */
function EnChars({ text }: { text: string }) {
  let i = 0;
  return text.split(" ").map((word, w) => (
    <span key={w} className={styles.enWord}>
      {w > 0 && " "}
      {Array.from(word).map((ch) => (
        <span key={i} className={styles.enChar} style={{ "--i": i++ } as CSSProperties}>
          {ch}
        </span>
      ))}
    </span>
  ));
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
  animate = false,
}: SectionTitleProps) {
  const classes = [
    styles.root,
    en ? styles.withEn : styles[variant],
    styles[align],
    onDark && styles.onDark,
    animate && styles.animated,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes}>
      <Tag id={id} className={styles.title}>
        {en ? (
          <>
            <span className={styles.en} aria-hidden="true">
              {animate ? <EnChars text={en} /> : en}
            </span>
            <span className={styles.ja} style={animate ? ({ "--n": en.length } as CSSProperties) : undefined}>
              {children}
            </span>
          </>
        ) : (
          <span className={styles.text}>{animate ? <JaChars>{children}</JaChars> : children}</span>
        )}
      </Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
