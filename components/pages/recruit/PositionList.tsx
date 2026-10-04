import type { CSSProperties } from "react";

import { DefinitionList } from "@/components/page/DefinitionList";
import type { RecruitPosition } from "@/data/pages/recruit";

import { JobCard } from "./JobCard";
import styles from "./PositionList.module.css";

/**
 * 募集職種のカード3枚。デスクトップでは横に並べ、項目（時給・勤務時間…）の行の高さを3枚でそろえて見比べやすくする。
 * 時給は項目の先頭に置き、強調する。
 */
export function PositionList({ positions }: { positions: RecruitPosition[] }) {
  return (
    <ul className={styles.grid}>
      {positions.map((position) => {
        const items = [
          { term: "時給", detail: <p className={styles.wage}>{position.wage}</p> },
          ...position.terms.map((t) => ({
            term: t.term,
            detail: t.detail.map((line) => <p key={line}>{line}</p>),
          })),
        ];
        // 行をそろえるためのグリッドの行数（見出し1行＋項目数）。CSSの grid-row: span に渡す
        const rows = { "--term-rows": items.length, "--card-rows": items.length + 1 } as CSSProperties;
        return (
          <JobCard
            key={position.id}
            id={position.id}
            title={position.title}
            icon={position.icon}
            tone={position.tone}
            className={styles.card}
            bodyClassName={styles.body}
            style={rows}
          >
            <DefinitionList items={items} />
          </JobCard>
        );
      })}
    </ul>
  );
}
