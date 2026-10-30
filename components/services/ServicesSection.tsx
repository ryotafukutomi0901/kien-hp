import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { servicesPage } from "@/data/pages/services";
import { site } from "@/data/site";

import { ServiceFlipCard } from "./ServiceFlipCard";
import styles from "./ServicesSection.module.css";

/**
 * 事業内容（手本: 日本テレビアートの「Our Service」）。
 * 左に大きな欧文＋日本語、右に紹介文。下にめくれるカード（3事業。2026-10-28 CEO指示）を並べる。
 * はぐくむFUJI は家事支援事業そのもの（協力事業所）なので別のカードにせず、家事支援のカードの裏に札で添える。
 * カードの表は事業名とはんこ、裏は写真と「何をしているか」（原文）と、各事業のページへの「詳しく見る」。
 * id="services" はヘッダーの「事業内容」・パンくず・404 の着地点（一覧ページ /services は 2026-10-28 に廃止）。
 */
export function ServicesSection() {
  const { services } = site;
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <Container>
        <div className={styles.head}>
          <SectionTitle id="services-title" en={services.en}>
            {services.title}
          </SectionTitle>
          <p className={styles.lead}>{servicesPage.intro}</p>
        </div>
        <div className={styles.grid}>
          {services.items.map((item) => (
            <div key={item.title} className={styles.cell}>
              <ServiceFlipCard
                title={item.title}
                description={item.description}
                tone={item.tone}
                icon={item.icon}
                link={item.link}
                image={item.image}
                badge={item.badge}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
