import Image from "next/image";

import { ArrowLink } from "@/components/common/ArrowLink";
import { Icon } from "@/components/icons";
import type { ServiceItem } from "@/types/site";

import styles from "./ServiceCard.module.css";

/** PHASE 1: 構造のみ。トーン別の地色・円形アイコン・写真の切り抜きはSub-Agent 03（Services）が仕上げる */
export function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <article className={[styles.card, styles[item.tone]].join(" ")}>
      <div className={styles.media}>
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw"
          className={styles.image}
          style={{ objectPosition: item.image.position }}
        />
      </div>
      <div className={styles.body}>
        <span className={styles.icon}>
          <Icon name={item.icon} size={28} />
        </span>
        <h3 className={styles.title}>
          {item.title}
          {item.badge && <span className={styles.badge}>（{item.badge}）</span>}
        </h3>
        <p className={styles.description}>
          {item.description.map((line) => (
            <span key={line} className={styles.line}>
              {line}
            </span>
          ))}
        </p>
        <ArrowLink href={item.link.href} tone={item.tone}>
          {item.link.label}
          <span className="visually-hidden">（{item.title}）</span>
        </ArrowLink>
      </div>
    </article>
  );
}
