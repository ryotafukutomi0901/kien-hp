import type { DatedRecord } from "@/types/site";

import { groupByYear, yearSectionId } from "./group";
import styles from "./RecordYearNav.module.css";

/**
 * 年の目次（「2026年 8件」…）。記事の多いページで、目当ての年へ飛べるようにする。
 * 年が1つしか無いときは目次の意味が無いので出さない。
 */
export function RecordYearNav({ records, label }: { records: DatedRecord[]; label: string }) {
  const groups = groupByYear(records);
  if (groups.length < 2) return null;

  return (
    <nav aria-label={`${label}を年ごとに見る`} className={styles.nav}>
      <ul className={styles.list}>
        {groups.map((group) => (
          <li key={group.year}>
            <a href={`#${yearSectionId(group.year)}`} className={styles.link}>
              <span>{group.year}年</span>
              <span className={styles.count}>{group.records.length}件</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
