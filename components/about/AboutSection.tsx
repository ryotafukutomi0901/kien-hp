import Image from "next/image";

import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { site } from "@/data/site";

import styles from "./AboutSection.module.css";

/** PHASE 1: 構造のみ。背景写真のぼかし・白枠の楕円写真はSub-Agent 04（About）が仕上げる */
export function AboutSection() {
  const { about } = site;
  return (
    <section className={styles.section} aria-labelledby="about-title">
      <div className={styles.background} aria-hidden="true">
        <Image
          src={about.background.src}
          alt=""
          fill
          sizes="100vw"
          className={styles.backgroundImage}
          style={{ objectPosition: about.background.position }}
        />
      </div>
      <Container className={styles.inner}>
        <div className={styles.text}>
          <SectionTitle id="about-title">{about.title}</SectionTitle>
          <p className={styles.body}>
            {about.body.map((line) => (
              <span key={line} className={styles.line}>
                {line}
              </span>
            ))}
          </p>
          <Button href={about.cta.href} size="lg">
            {about.cta.label}
          </Button>
        </div>
        <div className={styles.photo}>
          <Image
            src={about.photo.src}
            alt={about.photo.alt}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className={styles.photoImage}
            style={{ objectPosition: about.photo.position }}
          />
        </div>
      </Container>
    </section>
  );
}
