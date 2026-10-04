import Image from "next/image";

import { ArrowLink } from "@/components/common/ArrowLink";
import { ToneMark } from "@/components/common/ToneMark";
import type { ServiceItem } from "@/types/site";

import styles from "./ServiceCard.module.css";

/**
 * 写真帯の下端の縁（モック: 写真の下端はわずかに波打ち、白くにじんでカード地へ溶ける。
 * 目印の真上だけ、カード地が小さな丘のように写真へ盛り上がる）。
 *
 * viewBox の1単位＝デスクトップの1px。preserveAspectRatio="xMinYMax slice" で高さに合わせて拡縮し、
 * 横幅は右側を切り捨てる。こうすると丘の形と位置がカード幅で歪まず、SVGの高さを 24px→18px にするだけで
 * モバイルの目印に合う。丘の中心 x=63 は目印（ToneMark）の色面の中心（64pxの目印の左端32＋色面の中心31）。
 * 丘の幅は色面（約50px）の1.3倍ほど、高さ9。基準線は y=12（SVGの縦中央）。CSSで写真帯の下端に縦中央を合わせて置く。
 */
const EDGE_LINE =
  "M0 12.6C8 12.4 18 12 26 12C36 12 41 3 63 3C85 3 90 12 100 12" +
  "C146 12 190 13.4 260 13S400 10.8 520 11.4S700 13.6 820 12.8S1000 10.6 1120 11.4S1300 13.4 1420 12.6S1560 11.4 1600 11.8";

function MediaEdge() {
  return (
    <svg
      className={styles.edge}
      viewBox="0 0 1600 24"
      preserveAspectRatio="xMinYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <path d={`${EDGE_LINE}V24H0Z`} fill="currentColor" />
      <path d={EDGE_LINE} className={styles.edgeGlow} />
      <path d={EDGE_LINE} className={styles.edgeRim} />
    </svg>
  );
}

/**
 * サービス1件のカード。写真帯 → 波打つ縁 → 目印（ToneMark）＋見出し・説明・「詳しく見る」。
 * カード全体を押せるようにするが、フォーカスできるのは「詳しく見る」1つだけ
 * （リンクの ::after をカード全面に広げる。二重リンクにしない）。
 */
export function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <article className={`${styles.card} ${styles[item.tone]}`}>
      <div className={styles.media}>
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 1280px) 600px, (min-width: 640px) 50vw, 100vw"
          className={styles.image}
          style={{ objectPosition: item.image.position }}
        />
        <MediaEdge />
      </div>
      <div className={styles.body}>
        <ToneMark icon={item.icon} tone={item.tone} className={styles.mark} />
        <div className={styles.text}>
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
          <ArrowLink href={item.link.href} tone={item.tone} className={styles.link}>
            {item.link.label}
            <span className="visually-hidden">（{item.title}）</span>
          </ArrowLink>
        </div>
      </div>
    </article>
  );
}
