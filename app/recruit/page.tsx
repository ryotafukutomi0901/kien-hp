import type { Metadata } from "next";

import { Button } from "@/components/common/Button";
import { PageIntro } from "@/components/common/PageIntro";
import { Faq } from "@/components/page/Faq";
import { PageSection } from "@/components/page/PageSection";
import { ApplyPanel } from "@/components/pages/recruit/ApplyPanel";
import { DayList } from "@/components/pages/recruit/DayList";
import { PositionList } from "@/components/pages/recruit/PositionList";
import { RecruitIntro } from "@/components/pages/recruit/RecruitIntro";
import { recruitPage } from "@/data/pages/recruit";
import { site } from "@/data/site";
import { PriceGuide } from "@/components/page/PriceGuide";

export const metadata: Metadata = recruitPage.metadata;

/**
 * 採用情報。求職者が知りたい順に並べる:
 * 働き方（導入）→ 募集職種と条件 → 1日の流れ → よくある質問 → 応募方法。
 * #day はトップの「1日の流れを見る」の着地点。
 */
export default function Page() {
  const { intro, sections, positions, days, faq, apply } = recruitPage;
  const order = [sections.positions, sections.day, sections.faq, sections.apply];

  return (
    <>
      <PageIntro title={intro.title} en="Recruit">
        <RecruitIntro
          lead={intro.lead}
          points={intro.points}
          links={order.map((s) => ({ label: s.title, href: `#${s.id}` }))}
        />
      </PageIntro>

      <PageSection id={sections.positions.id} title={sections.positions.title} tone="plain">
        <PositionList positions={positions} />
        <div>
          <Button href={`#${sections.apply.id}`}>応募方法を見る</Button>
        </div>
      </PageSection>

      <PageSection id={sections.day.id} title={sections.day.title} lead={sections.day.lead} tone="soft">
        <DayList days={days} />
      </PageSection>

      <PageSection id={sections.faq.id} title={sections.faq.title} tone="plain">
        <Faq items={faq} />
      </PageSection>

      <PageSection id={sections.apply.id} title={sections.apply.title} tone="soft">
        <ApplyPanel
          heading={apply.heading}
          tel={site.company.tel}
          salesNote={apply.salesNote}
          closing={apply.closing}
          contactText={apply.contactText}
          contactLink={apply.contactLink}
        />
      </PageSection>
      <PriceGuide />
    </>
  );
}
