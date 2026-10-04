import Image from "next/image";

import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { LeafDecoration } from "@/components/common/LeafDecoration";
import { SectionTitle } from "@/components/common/SectionTitle";
import { site } from "@/data/site";

import styles from "./AboutSection.module.css";

/**
 * 私たちのこと（モック y900〜1120）。
 * 全幅のぼかした富士山＋左を白く霞ませた背景の上に、左にテキスト列、右に白枠の楕円写真。
 * モバイルは 見出し→本文→ボタン→楕円写真 の1列。
 */
export function AboutSection() {
  const { about } = site;
  return (
    <section className={styles.section} aria-labelledby="about-title">
      <div className={styles.background} aria-hidden="true">
        {/* ぼかして使うので、表示幅の半分の解像度で足りる */}
        <Image
          src={about.background.src}
          alt=""
          fill
          sizes="50vw"
          className={styles.backgroundImage}
          style={{ objectPosition: about.background.position }}
        />
      </div>
      <LeafDecoration variant="bottom-left" className={styles.leafLeft} />
      <LeafDecoration variant="single" className={styles.leafRight} />
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
          <Button href={about.cta.href} size="lg" className={styles.cta}>
            {about.cta.label}
          </Button>
        </div>
        <div className={styles.photo}>
          <div className={styles.photoInner}>
            <Image
              src={about.photo.src}
              alt={about.photo.alt}
              fill
              sizes="(min-width: 1280px) 612px, (min-width: 1024px) 50vw, (min-width: 640px) 45vw, 100vw"
              className={styles.photoImage}
              style={{ objectPosition: about.photo.position }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
