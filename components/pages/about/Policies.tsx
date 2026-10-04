import { ArrowRightIcon } from "@/components/icons";
import type { AboutPageContent } from "@/data/pages/about";

import styles from "./Policies.module.css";

/**
 * 喜援の3つの方針。冒頭の一文は「目標」と明示する（実績の表現にしない。CONTENT_SOURCE.md 9章#12）。
 * ①〜③は1つずつのまとまりにし、原文の「⇒」は矢印の小さな箇条にする。
 */
export function Policies({ policies }: { policies: AboutPageContent["company"]["policies"] }) {
  return (
    <>
      <p className={styles.goal}>
        <span className={styles.goalLabel}>{policies.goalLabel}</span>
        <span className={styles.goalText}>{policies.goal}</span>
      </p>
      <ol className={styles.list} role="list">
        {policies.items.map((item, i) => (
          <li key={item.title} className={styles.card}>
            <div className={styles.head}>
              <span className={styles.badge}>{i + 1}</span>
              <h4 className={styles.title}>{item.title}</h4>
            </div>
            <ul className={styles.points} role="list">
              {item.points.map((point) => (
                <li key={point} className={styles.point}>
                  <ArrowRightIcon size={14} className={styles.arrow} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </>
  );
}
