import Image from "next/image";
import { Fragment } from "react";

import { MarqueeTrack } from "@/components/motion/MarqueeTrack";
import type { MarqueeContent } from "@/types/site";

import styles from "./PhotoMarquee.module.css";

/**
 * 横に流れる大きな欧文の帯（手本: 日本テレビアートの「We are the creative group…」）。
 * 言葉の切れ目に、色の角丸タイルに入った写真を挟む。帯は飾りなので読み上げず、意味（label）だけを読み上げる。
 * 途切れなく流すため、同じ並びを2回描いて半分だけ動かす。動きは MarqueeTrack（GSAP）: スクロールの速さで速くなり、上へ戻すと逆に流れる。
 * 動きを減らす設定では止まる。
 */
export function PhotoMarquee({ content, tone = "light" }: { content: MarqueeContent; tone?: "light" | "dark" }) {
  const run = (copy: number) => (
    <div className={styles.run} aria-hidden={copy > 0 ? "true" : undefined}>
      {content.segments.map((segment, i) => {
        const chip = content.images[i % content.images.length];
        return (
          <Fragment key={`${copy}-${segment}`}>
            <span className={styles.word}>{segment}</span>
            <span className={`${styles.chip} ${styles[chip.tone]}`}>
              <span className={styles.chipPhoto}>
                <Image
                  src={chip.image.src}
                  alt=""
                  fill
                  sizes="160px"
                  className={styles.chipImage}
                  style={{ objectPosition: chip.image.position }}
                />
              </span>
            </span>
          </Fragment>
        );
      })}
    </div>
  );

  return (
    <div className={`${styles.marquee} ${styles[tone]}`} role="img" aria-label={content.label}>
      <MarqueeTrack className={styles.track}>
        {run(0)}
        {run(1)}
      </MarqueeTrack>
    </div>
  );
}
