import type { CSSProperties, ReactNode } from "react";

import { ToneMark } from "@/components/common/ToneMark";
import type { IconName, Tone } from "@/types/site";

import styles from "./JobCard.module.css";

/**
 * 採用ページのカード（職種・スタッフの一日）。上に職種の色帯と目印（ToneMark）付きの h3、下に本文（dl・ol など）。
 * 目印はトップの「私たちのサービス」とそろえる（訪問介護=黄・居宅介護支援=緑・家事支援=橙）。
 * ul の中に置く前提で li を返す。className / bodyClassName / style は並べ方（グリッド）を呼び出し側で足すためのもの。
 */
export function JobCard({
  id,
  title,
  icon,
  tone,
  className,
  bodyClassName,
  style,
  children,
}: {
  id: string;
  title: string;
  icon: IconName;
  tone: Tone;
  className?: string;
  bodyClassName?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <li className={[styles.card, styles[tone], className].filter(Boolean).join(" ")} style={style}>
      <div className={styles.head}>
        <ToneMark icon={icon} tone={tone} className={styles.mark} />
        <h3 id={id} className={styles.title}>
          {title}
        </h3>
      </div>
      <div className={[styles.body, bodyClassName].filter(Boolean).join(" ")}>{children}</div>
    </li>
  );
}
