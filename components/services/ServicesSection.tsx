import type { CSSProperties } from "react";

import { Container } from "@/components/common/Container";
import { LeafDecoration } from "@/components/common/LeafDecoration";
import { SectionTitle } from "@/components/common/SectionTitle";
import { site } from "@/data/site";

import { ServiceCard } from "./ServiceCard";
import styles from "./ServicesSection.module.css";

/**
 * 私たちのサービス（Sub-Agent 03）。見出しの左外側に葉っぱ、4事業を2×2のカードで比較させる。
 * 上端はHeroの白い波（--color-bg-soft）とそのままつながる。
 */
export function ServicesSection() {
  const { services } = site;
  // デスクトップの列数。4事業はモックどおり2×2、それ以外は事業数ぶん（最大3列）
  const columns = services.items.length === 4 ? 2 : Math.min(services.items.length, 3);
  // 「、」の直後で区切り、狭い幅ではそこで折り返させる（文言は data のまま）
  const leadPhrases = services.lead?.split(/(?<=、)/);
  return (
    <section className={styles.section} aria-labelledby="services-title">
      <LeafDecoration variant="bottom-left" className={styles.leaf} />
      <Container>
        <SectionTitle
          id="services-title"
          subtitle={leadPhrases?.map((phrase) => (
            <span key={phrase} className={styles.phrase}>
              {phrase}
            </span>
          ))}
        >
          {services.title}
        </SectionTitle>
        <div className={styles.grid} style={{ "--service-columns": columns } as CSSProperties}>
          {services.items.map((item) => (
            <ServiceCard key={item.title} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
