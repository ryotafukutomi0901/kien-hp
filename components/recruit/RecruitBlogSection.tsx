import Image from "next/image";

import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { PhotoMarquee } from "@/components/marquee/PhotoMarquee";
import { Parallax } from "@/components/motion/Parallax";
import { recruitPage } from "@/data/pages/recruit";
import { site } from "@/data/site";

import styles from "./RecruitBlogSection.module.css";

/**
 * 採用情報（手本: 日本テレビアートの「Recruit」。採用がサイトの主な目的＝2026-10-21 打ち合わせ）。
 * 流れる欧文の帯 → 左に小さな「Recruit」と大きな日本語の見出し・働き方の特徴・ボタン、右に色の太い枠の写真カードを傾けて重ねる。
 * 文言は採用ページと同じ原文（data/pages/recruit.ts の intro、data/sections/promos.ts）。
 */
export function RecruitBlogSection() {
  const card = site.promos[0];
  const { intro } = recruitPage;
  const photos = [
    { src: card.image.src, position: card.image.position, tone: "yellow" },
    { src: "/images/recruit/staff-day.jpg", position: "40% 50%", tone: "orange" },
    { src: "/images/about/about-oval.jpg", position: "50% 60%", tone: "blue" },
  ] as const;
  return (
    <section className={styles.section} aria-labelledby="recruit-title">
      <PhotoMarquee content={site.marquees.recruit} />
      <Container className={styles.inner}>
        <div className={styles.text}>
          <h2 id="recruit-title" className={styles.heading} data-reveal>
            <span className={styles.label} aria-hidden="true">
              {site.recruitEn}
            </span>
            <span className={styles.title}>
              {intro.lead.map((line) => (
                <span key={line} className={styles.titleLine}>
                  {line}
                </span>
              ))}
            </span>
          </h2>
          <ul className={styles.points} data-reveal>
            {intro.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className={styles.actions} data-reveal>
            <Button href={card.cta.href} size="md">
              {card.cta.label}
            </Button>
            {card.secondaryCta && (
              <Button href={card.secondaryCta.href} variant="outline" size="md">
                {card.secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
        <div className={styles.photos} aria-hidden="true">
          {/* 3枚をスクロールで別々の速さで上下させる（GSAP）。重なり順は層（layerN）で決める */}
          {photos.map((photo, i) => (
            <Parallax key={photo.src} className={`${styles.layer} ${styles[`layer${i + 1}`]}`} distance={[-50, 70, -30][i]}>
              <span className={`${styles.photo} ${styles[`photo${i + 1}`]} ${styles[photo.tone]}`} data-reveal="scale">
                <span className={styles.photoInner}>
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 280px, 40vw"
                    className={styles.photoImage}
                    style={{ objectPosition: photo.position }}
                  />
                </span>
              </span>
            </Parallax>
          ))}
        </div>
      </Container>
    </section>
  );
}
