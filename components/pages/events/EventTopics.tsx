import type { CSSProperties } from "react";

import type { EventRecord } from "@/types/site";

import { EventListCard } from "./EventListCard";
import styles from "./EventTopics.module.css";

const TITLE = "最近の行事";

/**
 * 一覧の頭の「最近の行事」（手本: ハウステンボス採用サイトのお知らせの「トピックス」）。新しい順に3件。
 * 見出しは画面に入ると1文字ずつ下から出る（手本と同じ 0.6s・同じ緩急、0.05s ずつずらす）。読み上げは見出し全体。
 * 出る合図はサイト共通の Reveal（data-reveal → is-revealed）。下に一覧との区切り線を引く。
 */
export function EventTopics({ records }: { records: EventRecord[] }) {
  return (
    <section className={styles.topics} aria-labelledby="event-topics-title">
      <h2 id="event-topics-title" className={styles.title} aria-label={TITLE} data-reveal>
        {[...TITLE].map((char, i) => (
          <span key={i} className={styles.char} style={{ "--i": i } as CSSProperties} aria-hidden="true">
            {char}
          </span>
        ))}
      </h2>
      <ol className={styles.grid}>
        {records.map((record, i) => (
          <li key={record.id} data-reveal style={{ "--reveal-delay": `${i * 150}ms` } as CSSProperties}>
            <EventListCard record={record} sizes="(min-width: 1280px) 400px, (min-width: 768px) 30vw, 92vw" />
          </li>
        ))}
      </ol>
    </section>
  );
}
