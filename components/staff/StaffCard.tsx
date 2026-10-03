import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/lib/format";
import type { StaffPost } from "@/types/site";

import styles from "./StaffCard.module.css";

/** PHASE 1: 構造のみ。Sub-Agent 05（Staff）が仕上げる */
export function StaffCard({ post }: { post: StaffPost }) {
  return (
    <article className={styles.card}>
      <Link href={post.href} className={styles.link}>
        <div className={styles.media}>
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw"
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
