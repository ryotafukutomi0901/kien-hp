"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";

import { GrowArrow } from "@/components/common/ArrowLink";
import { NoBreakAmounts } from "@/components/common/NoBreakAmounts";
import { ToneMark } from "@/components/common/ToneMark";
import type { IconName, ImageAsset, Link as LinkType, Tone } from "@/types/site";

import styles from "./ServiceFlipCard.module.css";

interface ServiceFlipCardProps {
  title: string;
  description: string[];
  tone: Tone;
  icon: IconName;
  link: LinkType;
  image?: ImageAsset;
  /** 裏の事業名の横に添える札（家事支援の「はぐくむFUJI 協力事業所」） */
  badge?: string;
}

/**
 * めくれる事業カード（2026-10-28 CEO指示。CEOが示したカードの「ひっくり返る」動きを、事業内容に使う）。
 * 表: 斜めの帯の入った淡い面の中央に、漢字のはんこと事業名（日本語だけ。2026-10-28 CEO指示で欧文と「めくる」の表記をやめた）。
 * 裏: 写真・何をしているか（原文）・「詳しく見る」。
 * 見た目はCEOの2つ目の案（斜めのグラデーション・細い枠）を、ロゴの色に置き換えたもの（ServiceFlipCard.module.css）。
 * めくり方:
 *   - マウスのある端末は、カードにマウスを乗せるとめくれる（CSS の :hover）
 *   - スマホ・タブレットは、表をタップするとめくれる（ボタン）。裏の「戻る」で表に戻る
 *   - キーボードは、表のボタンでめくる。裏の「詳しく見る」に移ったときもめくれる（:focus-within）
 * 読み上げは表と裏の両方を読む（見た目の裏返しは読み上げに影響しない）。
 */
export function ServiceFlipCard({ title, description, tone, icon, link, image, badge }: ServiceFlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const backId = useId();
  return (
    // スクロールで現れる目印（is-revealed）は Reveal.tsx が class に足す。めくったときに React が article の class を
    // 書き直して目印が消えないよう、data-reveal は class を持たない外側の要素に付ける
    <div data-reveal>
      <article
        className={[styles.card, styles[tone], flipped && styles.flipped].filter(Boolean).join(" ")}
        // マウスで乗せてめくる端末では、離したら表に戻す（クリックでめくった状態のまま残さない）
        onMouseLeave={() => setFlipped(false)}
      >
        <div className={styles.inner}>
          <div className={styles.front}>
            <span className={styles.stamp}>
              <ToneMark icon={icon} tone={tone} className={styles.mark} />
            </span>
            <div className={styles.names}>
              <h3 className={styles.title}>{title}</h3>
            </div>
            <button
              type="button"
              className={styles.flip}
              aria-expanded={flipped}
              aria-controls={backId}
              onClick={() => setFlipped(true)}
            >
              <span className="visually-hidden">{title}の内容を見る</span>
            </button>
          </div>

          <div id={backId} className={styles.back}>
            {image ? (
              <div className={styles.photo}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
                  className={styles.image}
                  style={{ objectPosition: image.position }}
                />
              </div>
            ) : (
              <div className={`${styles.photo} ${styles.photoDecor}`} aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            )}
            <p className={styles.backTitle}>
              <span aria-hidden="true">{title}</span>
              {badge && <span className={styles.badge}>{badge}</span>}
            </p>
            <p className={styles.description}>
              {description.map((line) => (
                <NoBreakAmounts key={line} text={line} />
              ))}
            </p>
            <div className={styles.actions}>
              <Link href={link.href} className={styles.more}>
                {link.label}
                <span className="visually-hidden">（{title}）</span>
                <GrowArrow />
              </Link>
              <button type="button" className={styles.backButton} onClick={() => setFlipped(false)}>
                戻る
                <span className="visually-hidden">（{title}の表へ）</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
