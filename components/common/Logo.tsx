import Image from "next/image";
import Link from "next/link";

import type { Company } from "@/types/site";

import styles from "./Logo.module.css";

// public/images/logo/kien-emblem*.png の実寸（scripts/make-logo-assets.py が出力する）。表示サイズはCSSで決める
const LOGO_MARK_WIDTH = 268;
const LOGO_MARK_HEIGHT = 318;

/**
 * ロゴ（マーク画像＋社名テキスト）。社名はテキストで組み、他事業者への展開時は data/site.ts だけを変える。
 * 組み方は参考モックのヘッダー: 左にマーク画像（欧文名の「KIEN」は画像に含まれる）、右に小さな法人格と、ふりがな（読み仮名）付きの大きな社名。
 * tone="light" は暗い地（フッター）用で、company.logoMarkLight（白一色の版）があればそれを使う。
 * tone="light" はフッター等の暗い地で使う（light側の見た目はFooter担当が調整する）。
 * className は配置（余白・位置）を呼び出し側で決めるためのもの。
 */
export function Logo({
  company,
  tone = "dark",
  className,
}: {
  company: Company;
  tone?: "dark" | "light";
  className?: string;
}) {
  const classes = [styles.logo, styles[tone], className].filter(Boolean).join(" ");
  const mark = tone === "light" ? (company.logoMarkLight ?? company.logoMark) : company.logoMark;
  return (
    <Link href="/" className={classes} aria-label={`${company.legalForm} ${company.name} トップへ`}>
      {mark && (
        <Image
          src={mark.src}
          alt=""
          width={LOGO_MARK_WIDTH}
          height={LOGO_MARK_HEIGHT}
          loading="eager" // ヘッダーのロゴは全ページで最初の画面に出る
          className={styles.markImage}
        />
      )}
      <span className={styles.name}>
        <span className={styles.legal}>{company.legalForm}</span>
        {/* 読み仮名は社名の下にふりがなとして付ける（ruby。読み上げでも社名と読みが対になる） */}
        <ruby className={styles.main}>
          {company.name}
          <rt className={styles.reading}>{company.nameReading}</rt>
        </ruby>
      </span>
    </Link>
  );
}
