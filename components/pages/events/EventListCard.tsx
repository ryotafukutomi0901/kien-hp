import Image from "next/image";
import Link from "next/link";

import { eventPhotoSrc } from "@/data/records/events";
import { formatDate } from "@/lib/format";
import type { EventRecord } from "@/types/site";

import { CategoryPill } from "./CategoryPill";
import styles from "./EventListCard.module.css";

/**
 * 会社行事の一覧のカード（手本: ハウステンボス採用サイトのお知らせのカード）。
 * 角丸の写真の左上に主な分類の札、下に日付とほかの分類、題。カード全体が下層ページ（/events/<id>）へのリンク。
 * 読み上げは 題 → 日付 → 分類 の順（DOM の順）。見た目の順（写真・札 → 日付 → 題）は CSS で並べる。
 * 写真は飾り（alt=""）。何の記事かは題で伝える。
 */
export function EventListCard({
  record,
  headingLevel = "h3",
  sizes = "(min-width: 1024px) 300px, (min-width: 640px) 45vw, 92vw",
}: {
  record: EventRecord;
  headingLevel?: "h2" | "h3";
  sizes?: string;
}) {
  const Heading = headingLevel;
  const [primary, ...others] = record.categories;
  const cover = record.cover ?? 0;
  return (
    <Link href={`/events/${record.id}`} className={styles.card}>
      <span className={styles.media}>
        <Image
          src={eventPhotoSrc(record.id, cover)}
          alt=""
          fill
          sizes={sizes}
          className={styles.image}
          style={{ objectPosition: record.coverPosition }}
        />
      </span>
      <span className={styles.lower}>
        <Heading className={styles.title}>{record.title}</Heading>
        <span className={styles.meta}>
          <time dateTime={record.date} className={styles.date}>
            {formatDate(record.date)}
          </time>
          {others.map((category) => (
            <CategoryPill key={category} category={category} />
          ))}
        </span>
      </span>
      {primary && <CategoryPill category={primary} className={styles.primary} />}
    </Link>
  );
}
