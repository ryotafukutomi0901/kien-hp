import Image from "next/image";
import type { CSSProperties } from "react";

import { Button } from "@/components/common/Button";
import { ScrollDrift } from "@/components/motion/ScrollDrift";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { aboutPage } from "@/data/pages/about";
import { site } from "@/data/site";

import styles from "./AboutSection.module.css";

/**
 * 経営理念（手本: 日本テレビアートの「Who We Are」）。トップでは Hero の直後（2026-10-21 引き継ぎ）。
 * 中央揃えの大きな欧文＋日本語の見出し（ほかの節と同じ SectionTitle。2026-10-29 CEO指摘「経営理念だけH2ちっちゃくない？」で小さなラベルから変更）
 * → 中央に大きく理念の3か条 → 横に流れる色のタイル（写真入り）→ ご挨拶の文 → 会社案内へ。
 * ご挨拶の文は /about と同じ原文（data/pages/about.ts）を使う。
 */
export function AboutSection() {
  const { about } = site;
  const { greeting } = aboutPage.company;
  // タイルの列は途切れなく流すため2回描く（2回目は読み上げない）
  const tiles = [...about.gallery, ...about.gallery];
  return (
    <section className={styles.section} aria-labelledby="about-title">
      <Container>
        <div data-reveal>
          <SectionTitle id="about-title" en={about.en} align="center">
            {about.title}
          </SectionTitle>
        </div>
        <ol className={styles.principles}>
          {about.body.map((line, i) => (
            <li key={line} data-reveal style={{ "--reveal-delay": `${i * 120}ms` } as CSSProperties}>
              {line}
            </li>
          ))}
        </ol>
      </Container>

      <div className={styles.gallery} aria-hidden="true">
        {/* CSS の無限の流れに、スクロールでの横の動き（GSAP）を重ねる */}
        <ScrollDrift distance={320}>
          <ul className={styles.galleryTrack}>
            {tiles.map((tile, i) => (
              <li key={`${tile.image.src}-${i}`} className={`${styles.tile} ${styles[tile.shape]} ${styles[tile.tone]}`}>
                <span className={styles.tilePhoto}>
                  <Image
                    src={tile.image.src}
                    alt=""
                    fill
                    sizes="240px"
                    className={styles.tileImage}
                    style={{ objectPosition: tile.image.position }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </ScrollDrift>
      </div>

      <Container className={styles.message}>
        <p className={styles.motto} data-reveal>
          {greeting.motto}
        </p>
        {[greeting.opening, ...greeting.body].map((paragraph) => (
          <p key={paragraph} className={styles.paragraph} data-reveal>
            {paragraph}
          </p>
        ))}
        <div className={styles.cta} data-reveal>
          <Button href={about.cta.href} variant="white" size="lg">
            {about.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
