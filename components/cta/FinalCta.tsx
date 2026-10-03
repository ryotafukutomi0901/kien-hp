import Image from "next/image";

import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { site } from "@/data/site";

import styles from "./FinalCta.module.css";

/** PHASE 1: 構造のみ。帯状の富士山写真と白抜けのグラデーションはSub-Agent 08（Final CTA）が仕上げる */
export function FinalCta() {
  const { finalCta } = site;
  return (
    <section className={styles.section} aria-labelledby="final-cta-title">
      <div className={styles.media} aria-hidden="true">
        <Image
          src={finalCta.image.src}
          alt=""
          fill
          sizes="100vw"
          className={styles.image}
          style={{ objectPosition: finalCta.image.position }}
        />
      </div>
      <Container className={styles.inner}>
        <h2 id="final-cta-title" className={styles.title}>
          {finalCta.title.map((line) => (
            <span key={line} className={styles.line}>
              {line}
            </span>
          ))}
        </h2>
        <Button href={finalCta.cta.href} size="md">
          {finalCta.cta.label}
        </Button>
      </Container>
    </section>
  );
}
