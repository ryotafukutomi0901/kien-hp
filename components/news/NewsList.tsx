import Link from "next/link";

import { formatDate } from "@/lib/format";
import type { NewsItem } from "@/types/site";

import styles from "./NewsList.module.css";

/**
 * お知らせの行リスト。トップ（NewsSection）と /news の両方で使う。
 * 枠・写真・左右の余白は呼び出し側の責務。リストが持つのは行の組み（日付｜カテゴリ＋タイトル）と行間の線だけ。
 * 呼び出し側は CSS 変数 --news-row-inset-end でリンク右端を内側へ寄せられる（右に写真を重ねる場合など）。
 */
export function NewsList({ items, className }: { items: NewsItem[]; className?: string }) {
  return (
    <ul className={className ? `${styles.list} ${className}` : styles.list}>
      {items.map((item) => (
        <li key={item.href} className={styles.item}>
          <Link href={item.href} className={styles.link}>
            <time dateTime={item.date} className={styles.date}>
              {formatDate(item.date)}
            </time>{" "}
            <span className={styles.text}>
              {item.category && (
                <>
                  <span className={styles.category}>{item.category}</span>{" "}
                </>
              )}
              <span className={styles.title}>{item.title}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
