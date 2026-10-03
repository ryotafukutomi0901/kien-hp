import { Container } from "@/components/common/Container";
import { site } from "@/data/site";

import { RecruitCard } from "./RecruitCard";
import styles from "./RecruitBlogSection.module.css";

/** PHASE 1: 構造のみ。Sub-Agent 07（Recruit / Blog）が仕上げる */
export function RecruitBlogSection() {
  return (
    <section className={styles.section} aria-label="採用情報とスタッフブログ">
      <Container className={styles.grid}>
        {site.promos.map((card, i) => (
          <RecruitCard key={card.title} card={card} imageSide={i % 2 === 0 ? "left" : "right"} />
        ))}
      </Container>
    </section>
  );
}
