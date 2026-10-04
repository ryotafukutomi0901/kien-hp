import type { DatedRecord } from "@/types/site";

export interface RecordYearGroup {
  year: string;
  records: DatedRecord[];
}

/** 年の節（#year-2026 など）のid。年の目次と節で同じ値を使う */
export function yearSectionId(year: string): string {
  return `year-${year}`;
}

/**
 * 記事を年ごとにまとめる。並び順はデータの順（data/records/* は新しい順）をそのまま保つ。
 * date は ISO形式（YYYY-MM-DD）なので先頭4文字が年。
 */
export function groupByYear(records: DatedRecord[]): RecordYearGroup[] {
  const groups: RecordYearGroup[] = [];
  for (const record of records) {
    const year = record.date.slice(0, 4);
    const last = groups.at(-1);
    if (last && last.year === year) {
      last.records.push(record);
    } else {
      groups.push({ year, records: [record] });
    }
  }
  return groups;
}
