import type { Metadata } from "next";

import { PageIntro } from "@/components/common/PageIntro";
import { RecordYearNav } from "@/components/pages/records/RecordYearNav";
import { RecordYearSections } from "@/components/pages/records/RecordYearSections";
import { eventRecords } from "@/data/records/events";

export const metadata: Metadata = {
  title: "会社行事",
  description:
    "株式会社喜援（きえん）の会社行事です。研修や、恒例のカレーパーティー・きりたんぽ会など、事務所での出来事を新しい順に掲載しています。",
};

/** 会社行事（旧求人サイト「INFO > 会社行事」の全件）。トップのカードは /events#<id> でここへ着地する */
export default function Page() {
  return (
    <>
      <PageIntro title="会社行事">
        <p>研修や食事会など、事務所での出来事を新しい順に掲載しています。</p>
        <RecordYearNav records={eventRecords} label="会社行事" />
      </PageIntro>
      <RecordYearSections records={eventRecords} label="会社行事" />
    </>
  );
}
