import type { ReactNode } from "react";

import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";

import styles from "./PageSection.module.css";

/**
 * 下層ページの節（h2＋本文）。ページ内リンク（#id）の着地点になる。
 * 見出しはトップの小見出しと同じ（三角マーク付き）。節の地色は交互に変えて読みの区切りにする（tone="soft"）。
 */
export function PageSection({
  id,
  title,
  lead,
  tone = "plain",
  children,
}: {
  id: string;
  title: string;
  /** 見出しの下の一文（任意） */
  lead?: ReactNode;
  tone?: "plain" | "soft";
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={[styles.section, styles[tone]].join(" ")}>
      <Container>
        <SectionTitle id={`${id}-title`} variant="mark" subtitle={lead}>
          {title}
        </SectionTitle>
        <div className={styles.body}>{children}</div>
      </Container>
    </section>
  );
}
