import type { AboutPageContent } from "@/data/pages/about";

import styles from "./Philosophy.module.css";

/** 経営理念。3か条は大きな番号つきの一覧、続く3段落は原文どおりの本文 */
export function Philosophy({ philosophy }: { philosophy: AboutPageContent["company"]["philosophy"] }) {
  return (
    <>
      {/* list-style: none でも一覧として読み上げられるよう role="list" を付ける（Safari） */}
      <ol className={styles.principles} role="list">
        {philosophy.principles.map((principle, i) => (
          <li key={principle} className={styles.principle}>
            <span className={styles.number}>{i + 1}</span>
            <span className={styles.text}>{principle}</span>
          </li>
        ))}
      </ol>
      <div className={styles.prose}>
        {philosophy.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </>
  );
}
