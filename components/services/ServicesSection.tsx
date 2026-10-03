import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { site } from "@/data/site";

import { ServiceCard } from "./ServiceCard";
import styles from "./ServicesSection.module.css";

/** PHASE 1: 構造のみ。Sub-Agent 03（Services）が仕上げる */
export function ServicesSection() {
  const { services } = site;
  return (
    <section className={styles.section} aria-labelledby="services-title">
      <Container>
        <SectionTitle id="services-title" subtitle={services.lead}>
          {services.title}
        </SectionTitle>
        <div className={styles.grid}>
          {services.items.map((item) => (
            <ServiceCard key={item.title} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
