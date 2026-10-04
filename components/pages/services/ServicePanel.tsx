import type { ReactNode } from "react";

import { DefinitionList, type DefinitionItem } from "@/components/page/DefinitionList";
import type { ServiceOffice, ServiceSummary } from "@/data/pages/services";

import styles from "./ServicePanel.module.css";
import { TelLink } from "@/components/common/TelLink";
import { ToneMark } from "@/components/common/ToneMark";

function OfficeCard({ office, headingId }: { office: ServiceOffice; headingId: string }) {
  const items: DefinitionItem[] = [
    { term: "事業所指定番号", detail: <span className={styles.number}>{office.designationNumber}</span> },
    { term: "TEL", detail: <TelLink tel={office.tel} /> },
  ];
  if (office.area) items.push({ term: "サービス提供地域", detail: office.area });
  return (
    <div className={styles.office} role="group" aria-labelledby={headingId}>
      <h3 id={headingId} className={styles.officeName}>
        {office.name}
      </h3>
      <DefinitionList items={items} />
    </div>
  );
}

/**
 * 1事業の要点のパネル。トーン色の地に目印（ToneMark）＋本文、右に事業所カード（白）、末尾に問い合わせ。
 * 色はトップのサービスカードと同じトーン（訪問介護=yellow／居宅介護支援=green／家事支援=orange）。
 */
export function ServicePanel({ service, action }: { service: ServiceSummary; action?: ReactNode }) {
  const hasOffice = Boolean(service.office);
  return (
    <div className={[styles.panel, styles[service.tone], hasOffice && styles.withOffice].filter(Boolean).join(" ")}>
      <div className={styles.intro}>
        <ToneMark icon={service.icon} tone={service.tone} className={styles.mark} />
        <div className={styles.text}>
          <p className={styles.lead}>{service.lead}</p>
          {service.body?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {service.message && <p className={styles.message}>{service.message}</p>}
        </div>
      </div>
      {service.office && <OfficeCard office={service.office} headingId={`${service.id}-office`} />}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
