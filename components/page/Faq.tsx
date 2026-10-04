import styles from "./Faq.module.css";

export interface FaqItem {
  question: string;
  /** 段落ごとの配列 */
  answer: string[];
}

/** よくあるご質問。JSなしの <details>（キーボード・読み上げに標準で対応）。 */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details key={item.question} className={styles.item}>
          <summary className={styles.question}>
            <span className={styles.mark} aria-hidden="true">
              Q
            </span>
            <span>{item.question}</span>
          </summary>
          <div className={styles.answer}>
            <span className={`${styles.mark} ${styles.markAnswer}`} aria-hidden="true">
              A
            </span>
            <div>
              {item.answer.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
