import type { FeeTableContent } from "@/data/pages/services";

import styles from "./FeeTable.module.css";

/**
 * 料金表。見出しは呼び出し側が持つので、表の中身は <caption>（画面には出さず読み上げ専用）で示す。
 * 家事支援の料金は data/pages/services.ts の fee が唯一の出どころで、家事支援のページと PriceGuide が同じ表を使う。
 */
export function FeeTable({ table }: { table: FeeTableContent }) {
  return (
    <table className={styles.table}>
      <caption className="visually-hidden">{table.caption}</caption>
      <thead>
        <tr>
          <th scope="col">{table.headers[0]}</th>
          <th scope="col" className={styles.valueCol}>
            {table.headers[1]}
          </th>
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row) => (
          <tr key={row.label}>
            <th scope="row">{row.label}</th>
            <td className={styles.value}>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
