import type { ReactNode } from "react";

import { Container } from "./Container";
import styles from "./PageIntro.module.css";
import { SectionTitle } from "./SectionTitle";

/** 下層ページの冒頭（ページ見出し＋導入文）。PHASE 1では下層ページの仮置きにも使う */
export function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section className={styles.intro}>
      <Container>
        <SectionTitle as="h1">{title}</SectionTitle>
        {children && <div className={styles.body}>{children}</div>}
      </Container>
    </section>
  );
}
