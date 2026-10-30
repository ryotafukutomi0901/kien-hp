import { Fragment } from "react";

/**
 * 金額（「2500円」「2,500円～」など）を途中で折り返さないようにして表示する。
 * 「～」が次の行の頭に1文字だけ残る、のような不自然な改行を防ぐ（2026-10-21 引き継ぎ 04）。文字そのものは変えない。
 */
const AMOUNT = /(\d[\d,]*円[～〜]?)/;

export function NoBreakAmounts({ text }: { text: string }) {
  return text.split(AMOUNT).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} style={{ whiteSpace: "nowrap" }}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
