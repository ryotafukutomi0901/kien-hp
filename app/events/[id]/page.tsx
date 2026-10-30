import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { PageIntro } from "@/components/common/PageIntro";
import { PriceGuide } from "@/components/page/PriceGuide";
import { CategoryPill } from "@/components/pages/events/CategoryPill";
import { EventCategoryMenu } from "@/components/pages/events/EventCategoryMenu";
import styles from "@/components/pages/events/EventDetail.module.css";
import { EventGallery } from "@/components/pages/events/EventGallery";
import pageStyles from "@/components/pages/events/EventsPage.module.css";
import { eventCategoryCounts, eventPhotoSrc, eventRecords } from "@/data/records/events";
import { site } from "@/data/site";
import { formatDate } from "@/lib/format";
import type { EventRecord } from "@/types/site";

// 20件すべてを書き出し時に作る。無い id は 404
export const dynamicParams = false;

export function generateStaticParams() {
  return eventRecords.map((record) => ({ id: record.id }));
}

type Props = { params: Promise<{ id: string }> };

const find = (id: string) => eventRecords.findIndex((record) => record.id === id);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const record = eventRecords[find((await params).id)];
  if (!record) return {};
  const text = (record.detail ?? record.body).join("");
  const description = text.length > 110 ? `${text.slice(0, 110)}…` : text;
  const cover = record.cover ?? 0;
  const photo = record.photos[cover];
  return {
    title: `${record.title}（会社行事）`,
    description,
    openGraph: {
      type: "article",
      locale: "ja_JP",
      siteName: site.seo.siteName,
      title: record.title,
      description,
      images: photo ? [{ url: eventPhotoSrc(record.id, cover), width: photo.width, height: photo.height, alt: photo.alt }] : undefined,
    },
  };
}

/** 前後の行事へのリンク（小さな写真・ひとこと・題・日付） */
function NeighborLink({ record, label, align }: { record: EventRecord; label: string; align: "start" | "end" }) {
  return (
    <Link href={`/events/${record.id}`} className={`${styles.neighbor} ${styles[align]}`}>
      <span className={styles.neighborThumb}>
        <Image
          src={eventPhotoSrc(record.id, record.cover ?? 0)}
          alt=""
          fill
          sizes="96px"
          className={styles.neighborImage}
          style={{ objectPosition: record.coverPosition }}
        />
      </span>
      <span className={styles.neighborText}>
        <span className={styles.neighborLabel}>{label}</span>
        <span className={styles.neighborTitle}>{record.title}</span>
        <time dateTime={record.date} className={styles.neighborDate}>
          {formatDate(record.date)}
        </time>
      </span>
    </Link>
  );
}

/**
 * 会社行事の下層ページ（2026-10-28 新設。手本: ハウステンボス採用サイトの記事）。
 * 冒頭（パンくず・題・分類・日付）→ 左に分類の目次（押すと絞った一覧へ）・右に大きな写真 → 本文 → 写真の一覧
 * → 前後の行事 → 「一覧に戻る」。本文と写真は旧採用サイトの記事のまま（data/records/events.ts）。
 */
export default async function Page({ params }: Props) {
  const index = find((await params).id);
  const record = eventRecords[index];
  if (!record) notFound();

  // 並びは新しい順。「前の行事」は1つ古い記事、「次の行事」は1つ新しい記事
  const older = eventRecords[index + 1];
  const newer = eventRecords[index - 1];
  const paragraphs = record.detail ?? record.body;

  return (
    <>
      <PageIntro
        title={<span className={styles.title}>{record.title}</span>}
        crumbLabel={record.title}
        crumbs={[{ label: "会社行事", href: "/events" }]}
      >
        <div className={styles.meta}>
          <time dateTime={record.date} className={styles.date}>
            {formatDate(record.date)}
          </time>
          {record.categories.map((category) => (
            <CategoryPill key={category} category={category} />
          ))}
        </div>
      </PageIntro>

      <div className={pageStyles.page}>
        <Container className={styles.layout}>
          <div className={styles.side}>
            <EventCategoryMenu counts={eventCategoryCounts(eventRecords)} />
          </div>

          <article className={styles.article}>
            <EventGallery id={record.id} title={record.title} photos={record.photos}>
              {paragraphs.map((paragraph, i) => (
                // 本文は段落の配列で並びが変わらないため、順番をキーにしてよい
                <p key={i}>{paragraph}</p>
              ))}
            </EventGallery>

            {(older || newer) && (
              <nav aria-label="前後の行事" className={styles.neighbors}>
                {older && <NeighborLink record={older} label="前の行事" align="start" />}
                {newer && <NeighborLink record={newer} label="次の行事" align="end" />}
              </nav>
            )}

            <div className={styles.back}>
              <Button href="/events" variant="outline">
                一覧に戻る
              </Button>
            </div>
          </article>
        </Container>
      </div>
      <PriceGuide />
    </>
  );
}
