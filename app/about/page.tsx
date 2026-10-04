import type { Metadata } from "next";

import { PageIntro } from "@/components/common/PageIntro";
import { Notice } from "@/components/page/Notice";
import { PageSection } from "@/components/page/PageSection";
import { AboutBlock, AboutBlockStack } from "@/components/pages/about/AboutBlock";
import { Access } from "@/components/pages/about/Access";
import { Greeting } from "@/components/pages/about/Greeting";
import { InfoList } from "@/components/pages/about/InfoList";
import { JumpLinks } from "@/components/pages/about/JumpLinks";
import { OfficeList } from "@/components/pages/about/OfficeList";
import { Philosophy } from "@/components/pages/about/Philosophy";
import { Policies } from "@/components/pages/about/Policies";
import { aboutPage } from "@/data/pages/about";

export const metadata: Metadata = {
  title: aboutPage.metadata.title,
  description: aboutPage.metadata.description,
};

/**
 * 事業所・会社概要（docs/PAGES.md「/about」）。
 * ナビの「会社概要」→ #company、「事業所」→ #offices の着地点。
 */
export default function Page() {
  const { company, offices } = aboutPage;

  return (
    <>
      <PageIntro title={aboutPage.title}>
        <JumpLinks links={aboutPage.jumpLinks} />
      </PageIntro>

      <PageSection id={company.id} title={company.title} tone="plain">
        <AboutBlockStack>
          <AboutBlock title={company.greeting.title}>
            <Greeting greeting={company.greeting} />
          </AboutBlock>
          <AboutBlock title={company.philosophy.title}>
            <Philosophy philosophy={company.philosophy} />
          </AboutBlock>
          <AboutBlock title={company.policies.title}>
            <Policies policies={company.policies} />
          </AboutBlock>
          <AboutBlock title={company.profile.title}>
            <InfoList items={company.profile.items} telNote={aboutPage.salesCallNotice} />
          </AboutBlock>
        </AboutBlockStack>
      </PageSection>

      <PageSection id={offices.id} title={offices.title} tone="soft">
        <AboutBlockStack>
          <AboutBlock title={offices.list.title}>
            <OfficeList list={offices.list} />
            <Notice>
              <p>{aboutPage.salesCallNotice}</p>
            </Notice>
          </AboutBlock>
          <AboutBlock title={offices.access.title}>
            <Access access={offices.access} />
          </AboutBlock>
        </AboutBlockStack>
      </PageSection>
    </>
  );
}
