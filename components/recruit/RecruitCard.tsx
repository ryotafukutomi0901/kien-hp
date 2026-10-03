import Image from "next/image";

import { Button } from "@/components/common/Button";
import { Icon } from "@/components/icons";
import type { PromoCard } from "@/types/site";

import styles from "./RecruitCard.module.css";

/**
 * 採用情報・スタッフブログの横長カード（写真＋アイコン付き見出し＋ボタン）。
 * imageSide で写真の左右を切り替える。PHASE 1は構造のみ、Sub-Agent 07（Recruit / Blog）が仕上げる。
 */
export function RecruitCard({ card, imageSide = "left" }: { card: PromoCard; imageSide?: "left" | "right" }) {
  return (
    <article className={[styles.card, styles[card.tone], styles[imageSide]].join(" ")}>
      <div className={styles.media}>
        <Image
          src={card.image.src}
          alt={card.image.alt}
          fill
          sizes="(min-width: 1024px) 240px, 40vw"
          className={styles.image}
          style={{ objectPosition: card.image.position }}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>
          <span className={styles.icon}>
            <Icon name={card.icon} size={24} />
          </span>
          {card.title}
        </h3>
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
