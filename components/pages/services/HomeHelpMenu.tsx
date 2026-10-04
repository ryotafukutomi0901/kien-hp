import { Notice } from "@/components/page/Notice";
import type { HomeHelpMenuItem } from "@/data/pages/services";

import styles from "./HomeHelpMenu.module.css";
import { SubHeading } from "./SubHeading";

/** 家事支援の3つのサービス。各カードの末尾に「対象外」を Notice で添える（高さが違ってもそろえて下に置く） */
export function HomeHelpMenu({
  title,
  items,
  excludedLabel,
}: {
  title: string;
  items: HomeHelpMenuItem[];
  excludedLabel: string;
}) {
  return (
    <div className={styles.block}>
      <SubHeading tone="orange">{title}</SubHeading>
      <ul className={styles.grid}>
        {items.map((item) => (
          <li key={item.title} className={styles.card}>
            <h4 className={styles.title}>{item.title}</h4>
            <div className={styles.description}>
              {item.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {item.notes?.map((note) => (
              <p key={note} className={styles.note}>
                ※{note}
              </p>
            ))}
            <div className={styles.excluded}>
              <Notice tone="orange">
                <p className={styles.excludedLabel}>{excludedLabel}</p>
                <p>{item.excluded}</p>
              </Notice>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
