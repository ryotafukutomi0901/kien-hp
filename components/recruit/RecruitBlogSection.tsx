import { Container } from "@/components/common/Container";
import { site } from "@/data/site";

import { RecruitCard } from "./RecruitCard";
import styles from "./RecruitBlogSection.module.css";

/** 採用情報・スタッフブログの横長カード2枚。デスクトップは横並び、それ未満は1列（写真の左右は交互） */
export function RecruitBlogSection() {
  return (
    <section className={styles.section} aria-label="採用情報とスタッフの一日">
      <Container className={styles.grid}>
        {site.promos.map((card, i) => (
          <RecruitCard key={card.title} card={card} imageSide={i % 2 === 0 ? "left" : "right"} />
        ))}
      </Container>
    </section>
  );
}
