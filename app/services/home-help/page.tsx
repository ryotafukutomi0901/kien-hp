import type { Metadata } from "next";

import { Button } from "@/components/common/Button";
import { PageIntro } from "@/components/common/PageIntro";
import { PageSection } from "@/components/page/PageSection";
import {
  HagukumuGuide,
  HomeHelpAbout,
  HomeHelpCoverage,
  HomeHelpFee,
  HomeHelpReserve,
} from "@/components/pages/services/HomeHelpGuide";
import { HomeHelpMenu } from "@/components/pages/services/HomeHelpMenu";
import { ServiceJumpNav } from "@/components/pages/services/ServiceJumpNav";
import { ServicePanel } from "@/components/pages/services/ServicePanel";
import { servicesPage } from "@/data/pages/services";

export const metadata: Metadata = {
  title: "家事支援事業",
  // 「洗濯」を含む文は CONTENT_SOURCE.md 9章#4 により使わない。はぐくむFUJIの協力事業所であることは原文から
  description: "介護で培われた細やかな気配り等を活かし、介護ヘルパーそれぞれのスキルを利用した家事支援（家事代行）サービスです。富士市内で、はぐくむFUJI家事育児サポート事業の協力事業所として承っております。",
};

/**
 * 家事支援事業（喜援ホームヘルプサービス）。構成は 喜援ホームヘルプサービスについて（旧サイトの紹介文）→ 要点 → サービス内容 →
 * 料金・対応・キャンセル → はぐくむFUJI → ご予約 → 他の事業。
 * お問い合わせボタンは要点・料金・はぐくむFUJI・ご予約の4か所（2026-10-21 引き継ぎ 07: 料金・家事支援の紹介付近に置く）。
 * 料金表はこのページの本文の中にあるので、PriceGuide（全ページ共通の料金帯）は置かない。
 */
export default function Page() {
  const { services, homeHelp, contactHref, contactLabel, navLabel } = servicesPage;
  const service = services.find((s) => s.id === "home-help");
  if (!service) throw new Error("家事支援事業が見つかりません");
  const contact = { label: contactLabel, href: contactHref };

  return (
    <>
      <PageIntro
        title={service.title}
        subtitle={service.subtitle}
        crumbs={[{ label: "事業内容", href: "/#services" }]}
      />

      <PageSection id="about" title={homeHelp.about.title} tone="soft">
        <HomeHelpAbout about={homeHelp.about} />
      </PageSection>

      <PageSection id="overview" title="事業のご案内" tone="plain">
        <ServicePanel service={service} action={<Button href={contactHref}>{contactLabel}</Button>} />
      </PageSection>

      <PageSection id="menu" title={homeHelp.menu.title} tone="soft">
        <HomeHelpMenu items={homeHelp.menu.items} excludedLabel={homeHelp.menu.excludedLabel} />
      </PageSection>

      <PageSection id="fee" title="ご利用案内" tone="plain">
        <HomeHelpFee fee={homeHelp.fee} contact={contact} />
        <HomeHelpCoverage coverage={homeHelp.coverage} cancel={homeHelp.cancel} />
      </PageSection>

      <PageSection id="hagukumu" title="はぐくむFUJI（富士市）のご案内" tone="soft">
        <HagukumuGuide hagukumu={homeHelp.hagukumu} />
      </PageSection>

      <PageSection id="reserve" title={homeHelp.reserve.title} tone="plain">
        <HomeHelpReserve reserve={homeHelp.reserve} contact={contact} />
      </PageSection>

      <PageSection id="others" title="ほかの事業" tone="soft">
        <ServiceJumpNav label={navLabel} services={services} current="home-help" />
      </PageSection>
    </>
  );
}
