import type { ReactNode } from "react";

import { PageSection } from "@/components/page/PageSection";
import type { DatedRecord } from "@/types/site";

import { groupByYear, yearSectionId } from "./group";
import { RecordHashHighlight } from "./RecordHashHighlight";
import { RecordList } from "./RecordList";

/**
 * 記事を年ごとの節（h2「2026年」＋記事 h3）に分けて並べる。節の地色は plain / soft を交互にする。
 * footer は最後の節の記事の下に置く（/news の「会社行事はこちら」など）。
 * 記事が0件のときは label の節に「掲載している記事はありません」を出す。
 */
export function RecordYearSections({
  records,
  label,
  footer,
}: {
  records: DatedRecord[];
  /** 「会社行事」「お知らせ」など。記事が無いときの節の見出しに使う */
  label: string;
  footer?: ReactNode;
}) {
  const groups = groupByYear(records);

  if (groups.length === 0) {
    return (
      <PageSection id="records" title={label}>
        <p>現在、掲載している記事はありません。</p>
        {footer}
      </PageSection>
    );
  }

  return (
    <>
      {groups.map((group, i) => (
        <PageSection
          key={group.year}
          id={yearSectionId(group.year)}
          title={`${group.year}年`}
          tone={i % 2 === 0 ? "plain" : "soft"}
        >
          <RecordList records={group.records} />
          {i === groups.length - 1 && footer}
        </PageSection>
      ))}
      <RecordHashHighlight />
    </>
  );
}
