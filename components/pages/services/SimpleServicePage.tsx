import { Button } from "@/components/common/Button";
import { PageIntro } from "@/components/common/PageIntro";
import { PageSection } from "@/components/page/PageSection";
import { PriceGuide } from "@/components/page/PriceGuide";
import { servicesPage, type ServiceId } from "@/data/pages/services";

import { ServiceJumpNav } from "./ServiceJumpNav";
import { ServicePanel } from "./ServicePanel";

/**
 * 訪問介護・居宅介護支援の事業ページ（2026-10-21 引き継ぎ: 3事業をそれぞれ独立したページにする）。
 * 事業のご案内（要点・事業所・お問い合わせボタン）→ 他の事業 → 家事支援の料金表（家事支援以外の全ページに置く）の順。
 * 家事支援は内容が多いので app/services/home-help/page.tsx で別に組む。
 */
export function SimpleServicePage({ id }: { id: Exclude<ServiceId, "home-help"> }) {
  const { services, contactHref, contactLabel, navLabel } = servicesPage;
  const service = services.find((s) => s.id === id);
  if (!service) throw new Error(`事業が見つかりません: ${id}`);

  return (
    <>
      {/* 見出しは日本語の事業名だけ（2026-10-28 CEO指示。欧文はやめた） */}
      <PageIntro title={service.title} crumbs={[{ label: "事業内容", href: "/#services" }]} />

      <PageSection id="overview" title="事業のご案内" tone="plain">
        <ServicePanel service={service} action={<Button href={contactHref}>{contactLabel}</Button>} />
      </PageSection>

      <PageSection id="others" title="ほかの事業" tone="soft">
        <ServiceJumpNav label={navLabel} services={services} current={id} />
      </PageSection>

      <PriceGuide />
    </>
  );
}
