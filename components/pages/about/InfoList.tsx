import { DefinitionList } from "@/components/page/DefinitionList";
import type { AboutProfileItem } from "@/data/pages/about";

import styles from "./InfoList.module.css";
import { TelLink } from "@/components/common/TelLink";

/** 会社の基本情報・アクセスの一覧。TEL は発信リンクにし、telNote があれば下に添える */
export function InfoList({ items, telNote }: { items: AboutProfileItem[]; telNote?: string }) {
  return (
    <DefinitionList
      items={items.map((item) => ({
        term: item.term,
        detail:
          item.kind === "tel" ? (
            <>
              <p>
                <TelLink tel={item.value} />
              </p>
              {telNote && <p className={styles.note}>{telNote}</p>}
            </>
          ) : (
            <span className={styles.value}>{item.value}</span>
          ),
      }))}
    />
  );
}
