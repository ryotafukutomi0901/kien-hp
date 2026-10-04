import Image from "next/image";

import { Button } from "@/components/common/Button";
import { ToneMark } from "@/components/common/ToneMark";
import type { PromoCard } from "@/types/site";

import styles from "./RecruitCard.module.css";

/**
 * 採用情報・スタッフブログの横長カード（写真＋目印付き見出し＋本文＋ボタン）。
 * imageSide で写真の左右を切り替える（モバイルでは常に上部の帯）。
 * 見出しはh2。このセクションには見える見出しが無く、h3にすると直前のNEWSの子に読まれるため。
 */
export function RecruitCard({ card, imageSide = "left" }: { card: PromoCard; imageSide?: "left" | "right" }) {
  return (
    <article className={[styles.card, styles[card.tone], styles[imageSide]].join(" ")}>
      <div className={styles.media}>
        <Image
          src={card.image.src}
          alt={card.image.alt}
          fill
          sizes="(min-width: 1024px) 240px, (min-width: 640px) 40vw, 100vw"
          className={styles.image}
          style={{ objectPosition: card.image.position }}
        />
      </div>
      <div className={styles.body}>
        <h2 className={styles.title}>
          <ToneMark icon={card.icon} tone={card.tone} className={styles.mark} />
          {card.title}
        </h2>
        <p className={styles.text}>
          {card.body.map((line) => (
            <span key={line} className={styles.line}>
              {line}
            </span>
          ))}
        </p>
        <Button href={card.cta.href} size="sm">
          {card.cta.label}
        </Button>
      </div>
    </article>
  );
}
