import type { ReactNode } from "react";

import styles from "./DefinitionList.module.css";

export interface DefinitionItem {
  term: string;
  /** 段落ごとの配列、または自由な要素（電話リンクなど） */
  detail: ReactNode;
}

/** 「項目名：内容」の一覧（会社概要・事業所・料金・募集要項）。狭い画面では項目名を上に積む */
export function DefinitionList({ items }: { items: DefinitionItem[] }) {
  return (
    <dl className={styles.list}>
      {items.map((item) => (
        <div key={item.term} className={styles.row}>
          <dt className={styles.term}>{item.term}</dt>
          <dd className={styles.detail}>{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
