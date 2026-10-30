import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { TelLink } from "@/components/common/TelLink";
import { site } from "@/data/site";

import styles from "./FinalCta.module.css";

/**
 * ページ最後のお問い合わせ（手本: 日本テレビアートの「Contact Us!」の帯）。
 * ロゴのコーラルの面に、下線付きの大きな欧文「Contact Us!」、その下に「お問い合わせ」、経営理念の結びの一文、ボタンと電話。
 * 欧文は飾り（aria-hidden）。見出し（h2）の読み上げは「お問い合わせ」。
 */
export function FinalCta() {
  const { finalCta, company } = site;
  return (
    <section className={styles.section} aria-labelledby="final-cta-title">
      <Container className={styles.inner}>
        <h2 id="final-cta-title" className={styles.heading} data-reveal>
          <span className={styles.en} aria-hidden="true">
            {finalCta.en}
          </span>
          <span className={styles.ja}>{finalCta.heading}</span>
        </h2>
        <p className={styles.message} data-reveal>
          {finalCta.title.map((line) => (
            <span key={line} className={styles.line}>
              {line}
            </span>
          ))}
        </p>
        <div className={styles.actions} data-reveal>
          <Button href={finalCta.cta.href} size="lg">
            {finalCta.cta.label}
          </Button>
          <p className={styles.tel}>
            <span className={styles.telLabel}>TEL</span>
            <TelLink tel={company.tel} size="large" />
          </p>
        </div>
      </Container>
    </section>
  );
}
