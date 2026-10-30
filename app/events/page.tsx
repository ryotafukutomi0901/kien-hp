import type { Metadata } from "next";

import { Container } from "@/components/common/Container";
import { PageIntro } from "@/components/common/PageIntro";
import { PriceGuide } from "@/components/page/PriceGuide";
import { EventsBrowser } from "@/components/pages/events/EventsBrowser";
import { EventTopics } from "@/components/pages/events/EventTopics";
import styles from "@/components/pages/events/EventsPage.module.css";
import { eventRecords } from "@/data/records/events";

export const metadata: Metadata = {
  title: "会社行事",
  description:
    "株式会社喜援（きえん）の会社行事です。研修や、恒例のカレーパーティー・きりたんぽ会など、事務所での出来事を写真とともに新しい順に掲載しています。",
};

/**
 * 会社行事の一覧（旧採用サイト「INFO > 会社行事」の全件。2026-10-28 作り直し。手本: ハウステンボス採用サイトのお知らせ）。
 * 「最近の行事」3件 → 区切り線 → 左に分類の目次・右に写真のカード（ページ送り）。各カードは下層ページ /events/<id> へ。
 */
export default function Page() {
  return (
    <>
      <PageIntro title="会社行事" en="Events">
        <p>研修や食事会など、事務所での出来事を新しい順に掲載しています。</p>
      </PageIntro>
      <div className={styles.page}>
        <Container className={styles.inner}>
          <EventTopics records={eventRecords.slice(0, 3)} />
          <EventsBrowser records={eventRecords} />
        </Container>
      </div>
      <PriceGuide />
    </>
  );
}
