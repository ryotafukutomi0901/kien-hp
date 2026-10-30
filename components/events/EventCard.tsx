import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/lib/format";
import type { EventPost, Tone } from "@/types/site";

import styles from "./EventCard.module.css";

/**
 * 会社行事の1件（手本: 日本テレビアートの「Works」のカード。色の面の中に写真、下に名前と日付、「もっとみる ⊕」）。
 * カード全体が1つのリンク。色はロゴの4色を順に使う。
 */
export function EventCard({ post, tone }: { post: EventPost; tone: Tone }) {
  return (
    <article className={`${styles.card} ${styles[tone]}`}>
      <Link href={post.href} className={styles.link}>
        <span className={styles.label} aria-hidden="true">
          Event
        </span>
        <span className={styles.media}>
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 40vw, 80vw"
            className={styles.image}
            style={{ objectPosition: post.image.position }}
          />
        </span>
        <h3 className={styles.title}>{post.title.join("")}</h3>
        <span className={styles.foot}>
          <time dateTime={post.date} className={styles.date}>
            {formatDate(post.date)}
          </time>
          <span className={styles.more} aria-hidden="true">
            もっとみる
            <span className={styles.moreIcon}>+</span>
          </span>
        </span>
      </Link>
    </article>
  );
}
