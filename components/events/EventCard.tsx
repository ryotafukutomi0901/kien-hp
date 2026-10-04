import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/lib/format";
import type { EventPost } from "@/types/site";

import styles from "./EventCard.module.css";

/**
 * スタッフ紹介の1件。写真＋2行タイトルをひとつのリンクにし、日付はリンクの外に置く。
 * 写真の被写体位置は data/sections/events.ts の image.position（object-position）で調整する。
 */
export function EventCard({ post }: { post: EventPost }) {
  return (
    <article className={styles.card}>
      <Link href={post.href} className={styles.link}>
        <div className={styles.media}>
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            sizes="(min-width: 1280px) 262px, (min-width: 1024px) 22vw, 50vw"
            className={styles.image}
            style={{ objectPosition: post.image.position }}
          />
        </div>
        <h3 className={styles.title}>
          {post.title.map((line) => (
            <span key={line} className={styles.line}>
              {line}
            </span>
          ))}
        </h3>
      </Link>
      <time dateTime={post.date} className={styles.date}>
        {formatDate(post.date)}
      </time>
    </article>
  );
}
