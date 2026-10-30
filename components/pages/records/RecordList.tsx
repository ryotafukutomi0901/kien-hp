import Image from "next/image";

import type { DatedRecord } from "@/types/site";

import { DateStamp } from "./DateStamp";
import styles from "./RecordList.module.css";

/** カードごとに巡回させるロゴの点の色（コーラル・黄・緑・ピンク） */
const TONES = ["coral", "yellow", "green", "pink"] as const;

/**
 * お知らせの記事（/news。2026-10-28 まで /events でも共用）。
 * 写真の無い記事を「はがき」のようなカードにし、日付をロゴの筆の輪のスタンプで見せる。
 *
 * - 各記事は <article id={record.id}>。トップの「/news#<id>」の着地点で（会社行事は 2026-10-28 から下層ページ /events/<id> を持つので使わない）、
 *   着地した記事は :target（直接アクセス）／[data-current]（next/link からの遷移。RecordHashHighlight）で強調する
 * - 見出しは既定で h3（年の節 h2 の下）。年で分けずに使う場合は headingLevel="h2"
 * - DOM は 写真 → 見出し → 本文 → 日付 の順（見出しで移動したとき本文から読めるように）。スタンプの位置はCSSで上に置く
 * - record.image があればカードの上部に写真を出す（旧サイトの写真は未取得のため、現在はどの記事にも無い）
 */
export function RecordList({
  records,
  headingLevel = "h3",
}: {
  records: DatedRecord[];
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <ol className={styles.grid}>
      {records.map((record, i) => (
        <li key={record.id} className={styles.cell}>
          <article
            id={record.id}
            aria-labelledby={`${record.id}-title`}
            className={[styles.card, styles[TONES[i % TONES.length]], record.image && styles.withImage]
              .filter(Boolean)
              .join(" ")}
          >
            {record.image && (
              <div className={styles.media}>
                <Image
                  src={record.image.src}
                  alt={record.image.alt}
                  fill
                  sizes="(min-width: 1280px) 384px, (min-width: 640px) 50vw, 100vw"
                  className={styles.image}
                  style={{ objectPosition: record.image.position }}
                />
              </div>
            )}
            <Heading id={`${record.id}-title`} className={styles.title}>
              {record.title}
            </Heading>
            <div className={styles.body}>
              {record.body.map((paragraph, j) => (
                // 本文は段落の配列で並びが変わらないため、順番をキーにしてよい
                <p key={j}>{paragraph}</p>
              ))}
            </div>
            <DateStamp date={record.date} className={styles.stamp} />
          </article>
        </li>
      ))}
    </ol>
  );
}
