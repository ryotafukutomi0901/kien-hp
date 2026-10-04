import type { ReactNode } from "react";

import styles from "./AboutBlock.module.css";

/** 節（h2）の中の小見出し（h3）＋内容。1024px以上は見出しを左の列に置き、本文の行を短く保つ */
export function AboutBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.block}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

/** AboutBlock を縦に並べ、境界線で区切る */
export function AboutBlockStack({ children }: { children: ReactNode }) {
  return <div className={styles.stack}>{children}</div>;
}
