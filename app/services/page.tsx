import type { Metadata } from "next";

import { Button } from "@/components/common/Button";
import { PageIntro } from "@/components/common/PageIntro";
import { PageSection } from "@/components/page/PageSection";
import { HomeHelpGuide, HomeHelpReserve } from "@/components/pages/services/HomeHelpGuide";
import { HomeHelpMenu } from "@/components/pages/services/HomeHelpMenu";
import { ServiceJumpNav } from "@/components/pages/services/ServiceJumpNav";
import { ServicePanel } from "@/components/pages/services/ServicePanel";
import introStyles from "@/components/pages/services/ServicesIntro.module.css";
import { servicesPage } from "@/data/pages/services";

export const metadata: Metadata = {
  title: "サービス",
  // 総合HPトップ紹介文から（「洗濯」を含む文は CONTENT_SOURCE.md 9章#4 により使わない）
  description: "富士市にて訪問・居宅介護事業、家事支援事業を行っております。訪問介護、居宅介護、家事代行なら喜援！",
};

/**
 * サービス（Sub-Agent P2）。トップのサービスカードの着地点 #home-visit / #care-plan / #home-help。
 * 節の地色は PageIntro（soft）に続けて plain → soft → plain と交互にする。
 */
export default function Page() {
  const { services, homeHelp, contactHref, contactLabel } = servicesPage;
  const tones = ["plain", "soft", "plain"] as const;
  const contactButton = <Button href={contactHref}>{contactLabel}</Button>;

  return (
    <>
      <PageIntro title="サービス">
        <p className={introStyles.lead}>{servicesPage.intro}</p>
        <ServiceJumpNav label={servicesPage.navLabel} services={services} />
      </PageIntro>

      {services.map((service, i) => (
        <PageSection key={service.id} id={service.id} title={service.title} lead={service.subtitle} tone={tones[i % 3]}>
          {service.id === "home-help" ? (
            <>
              <ServicePanel service={service} />
              <HomeHelpMenu
                title={homeHelp.menu.title}
                items={homeHelp.menu.items}
                excludedLabel={homeHelp.menu.excludedLabel}
              />
              <HomeHelpGuide homeHelp={homeHelp} />
              <HomeHelpReserve reserve={homeHelp.reserve} contact={{ label: contactLabel, href: contactHref }} />
            </>
          ) : (
            <ServicePanel service={service} action={contactButton} />
          )}
        </PageSection>
      ))}
    </>
  );
}
