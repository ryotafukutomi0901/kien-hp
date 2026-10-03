import Image from "next/image";

import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { site } from "@/data/site";

import styles from "./Hero.module.css";

/** PHASE 1: 構造のみ。写真の楕円カーブ・葉っぱ・コピー位置はSub-Agent 02（Hero）が仕上げる */
export function Hero() {
  const { hero } = site;
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media}>
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          preload
          sizes="100vw"
          className={styles.image}
          style={{ objectPosition: hero.image.position }}
        />
      </div>
      <Container className={styles.content}>
        <h1 id="hero-title" className={styles.title}>
          {hero.title.map((line) => (
            <span key={line} className={styles.line}>
              {line}
            </span>
          ))}
        </h1>
        <p className={styles.lead}>
          {hero.lead.map((line) => (
            <span key={line} className={styles.line}>
              {line}
            </span>
          ))}
        </p>
        <Button href={hero.cta.href} size="lg">
          {hero.cta.label}
        </Button>
      </Container>
    </section>
  );
}
