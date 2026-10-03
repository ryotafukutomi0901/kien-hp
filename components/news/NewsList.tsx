import Link from "next/link";

import { formatDate } from "@/lib/format";
import type { NewsItem } from "@/types/site";

import styles from "./NewsList.module.css";

/** お知らせの行リスト。トップと /news の両方で使う。見た目はSub-Agent 06（News）が仕上げる */
export function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.href} className={styles.item}>
          <Link href={item.href} className={styles.link}>
            <time dateTime={item.date} className={styles.date}>
              {formatDate(item.date)}
            </time>
            <span className={styles.text}>
              {item.category && <span className={styles.category}>{item.category}</span>}
              {item.title}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
