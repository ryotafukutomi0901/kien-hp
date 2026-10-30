import type { Metadata } from "next";

import { PageIntro } from "@/components/common/PageIntro";
import { TelLink } from "@/components/common/TelLink";
import { DefinitionList } from "@/components/page/DefinitionList";
import { PageSection } from "@/components/page/PageSection";
import { PolicyText } from "@/components/pages/privacy/PolicyText";
import { PolicyToc } from "@/components/pages/privacy/PolicyToc";
import { PrivacyIntro } from "@/components/pages/privacy/PrivacyIntro";
import { privacyPage } from "@/data/pages/privacy";
import { site } from "@/data/site";

const { company } = site;
/** 前文・説明文の「株式会社喜援」 */
const companyName = `${company.legalForm}${company.name}`;

export const metadata: Metadata = {
  title: privacyPage.title,
  description: privacyPage.description(`${companyName}（${company.nameReading}）`),
};

/**
 * プライバシーポリシー。旧サイトは本文が空だったため新たに起こした下書き（data/pages/privacy.ts）。
 * 構成は他の下層ページと同じ PageIntro（h1・前文・目次）→ PageSection（h2）。地色は plain / soft を交互にする。
 * 会社名・所在地・電話は site.company から読み、ここには書かない。
 */
export default function Page() {
  const { sections, contactWindow: labels } = privacyPage;

  const contactWindow = (
    <DefinitionList
      items={[
        { term: labels.nameLabel, detail: `${companyName}（${company.nameReading}）` },
        { term: labels.addressLabel, detail: company.address },
        { term: labels.telLabel, detail: <TelLink tel={company.tel} size="large" icon /> },
      ]}
    />
  );

  return (
    <>
      {/* 320px幅で「ー」だけが次の行に残らないよう、「プライバシー」と「ポリシー」の間で折り返せるようにする */}
      <PageIntro
        title={privacyPage.title === "プライバシーポリシー" ? <>プライバシー<wbr />ポリシー</> : privacyPage.title}
        crumbLabel={privacyPage.title}
        en="Privacy Policy"
      >
        <PrivacyIntro preamble={privacyPage.preamble(companyName)}>
          <PolicyToc label={privacyPage.tocLabel} items={sections.map(({ id, title }) => ({ id, title }))} />
        </PrivacyIntro>
      </PageIntro>

      {sections.map((section, i) => (
        <PageSection key={section.id} id={section.id} title={section.title} tone={i % 2 === 0 ? "plain" : "soft"}>
          <PolicyText blocks={section.blocks} contactWindow={contactWindow} newTabNote={privacyPage.newTabNote} />
        </PageSection>
      ))}
    </>
  );
}
