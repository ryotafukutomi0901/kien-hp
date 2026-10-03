import Image from "next/image";
import Link from "next/link";

import type { Company } from "@/types/site";

import styles from "./Logo.module.css";

/**
 * ロゴ（太陽マーク画像＋社名テキスト）。社名はテキストで組み、他事業者への展開時は data/site.ts だけを変える。
 * tone="light" はフッター等の暗い地で使う。見た目の仕上げはHeader担当。
 */
export function Logo({ company, tone = "dark" }: { company: Company; tone?: "dark" | "light" }) {
  return (
    <Link href="/" className={[styles.logo, styles[tone]].join(" ")} aria-label={`${company.legalForm} ${company.name} トップへ`}>
      <span className={styles.mark}>
        <Image src={company.logoMark.src} alt="" width={120} height={106} className={styles.markImage} />
        <span className={styles.markText}>{company.nameEn}</span>
      </span>
      <span className={styles.name}>
        <span className={styles.legal}>
          {company.legalForm}
          <span className={styles.en}>{company.nameEn}</span>
        </span>
        <span className={styles.main}>{company.name}</span>
      </span>
    </Link>
  );
}
