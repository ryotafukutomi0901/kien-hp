import type { Metadata } from "next";

import { ArrowLink } from "@/components/common/ArrowLink";
import { PageIntro } from "@/components/common/PageIntro";
import { DefinitionList } from "@/components/page/DefinitionList";
import { PageSection } from "@/components/page/PageSection";
import { CallPanel } from "@/components/pages/contact/CallPanel";
import { TelLink } from "@/components/common/TelLink";
import { contactPage } from "@/data/pages/contact";
import { privacyLink } from "@/data/pages/privacy";
import { site } from "@/data/site";
import { PriceGuide } from "@/components/page/PriceGuide";

const { company } = site;
const companyName = `${company.legalForm}${company.name}（${company.nameReading}）`;

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: `${contactPage.intro}${companyName} TEL ${company.tel}`,
};

/**
 * お問い合わせ。メールフォームは未実装（送信先が不明）のため、お電話での受付を案内する。
 * 電話・FAX・所在地は site.company から読み、ここには書かない。
 */
export default function Page() {
  const { tel, access, homeHelp, privacy } = contactPage;
  return (
    <>
      <PageIntro title="お問い合わせ" en="Contact">
        <p>{contactPage.intro}</p>
      </PageIntro>

      <PageSection id="tel" title={tel.title}>
        <CallPanel
          tel={company.tel}
          fax={company.fax}
          callLabel={tel.callLabel}
          touchHint={tel.touchHint}
          salesNotice={tel.salesNotice}
        />
      </PageSection>

      <PageSection id="access" title={access.title} tone="soft">
        <DefinitionList
          items={[
            { term: "会社名", detail: companyName },
            { term: "所在地", detail: company.address },
            { term: "駐車場", detail: access.parking },
          ]}
        />
        <div>
          <ArrowLink href={access.map.href} tone="orange">
            {access.map.label}
          </ArrowLink>
        </div>
      </PageSection>

      <PageSection id="home-help" title={homeHelp.title} lead={homeHelp.serviceName}>
        <p>{homeHelp.lead}</p>
        <DefinitionList
          items={[
            { term: "お電話", detail: <TelLink tel={company.tel} size="large" icon /> },
            { term: "サービス提供エリア", detail: homeHelp.area },
            {
              term: "サービス提供の曜日・時間",
              detail: (
                <>
                  <p>{homeHelp.days}</p>
                  <p>{homeHelp.hours}</p>
                </>
              ),
            },
          ]}
        />
        <div>
          <ArrowLink href={homeHelp.detail.href} tone="orange">
            {homeHelp.detail.label}
          </ArrowLink>
        </div>
      </PageSection>

      <PageSection id="privacy" title={privacy.title} tone="soft">
        {privacy.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div>
          <ArrowLink href={privacyLink.href} tone="orange">
            {`${privacyLink.label}を見る`}
          </ArrowLink>
        </div>
      </PageSection>
      <PriceGuide />
    </>
  );
}
