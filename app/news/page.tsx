import type { Metadata } from "next";

import { Button } from "@/components/common/Button";
import { PageIntro } from "@/components/common/PageIntro";
import { RecordYearNav } from "@/components/pages/records/RecordYearNav";
import { RecordYearSections } from "@/components/pages/records/RecordYearSections";
import { newsRecords } from "@/data/records/news";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "株式会社喜援（きえん）からのお知らせです。定期研修や事業所移転完了のお知らせを掲載しています。",
};

/** お知らせ（旧総合HP「INFO > ニュース」の全件）。トップの一覧は /news#<id> でここへ着地する */
export default function Page() {
  return (
    <>
      <PageIntro title="お知らせ">
        <p>
          {site.company.legalForm}
          {site.company.name}からのお知らせです。
        </p>
        <RecordYearNav records={newsRecords} label="お知らせ" />
      </PageIntro>
      <RecordYearSections
        records={newsRecords}
        label="お知らせ"
        footer={
          <div>
            <Button href="/events" variant="outline">
              会社行事はこちら
            </Button>
          </div>
        }
      />
    </>
  );
}
