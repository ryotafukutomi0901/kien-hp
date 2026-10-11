import type { IconName, Tone } from "@/types/site";

import { BRUSH_RING, BRUSH_RING_DRY } from "./brushRing";
import styles from "./ToneMark.module.css";

/*
 * 事業・職種の目印（2026-10-11 作り直し。CEO指摘「家・人・太陽の絵記号がAIっぽい」への対応）。
 *
 * どのサイトにもある絵記号（家・人・太陽）をやめ、日本の「はんこ」のように、ロゴの筆の輪の中に
 * 手書きの漢字を1字置く。漢字は事業の頭の字（訪問介護＝訪、居宅介護支援＝居、家事支援＝家 など）。
 * 輪は会社行事の日付スタンプと同じ形（brushRing.ts）で、ロゴの輪と同じ書き方。輪の色が事業のトーン色、
 * 添える小さな点がロゴの周りに散る点の名残。漢字は見出しと同じ手書き書体（Klee One）。
 * 呼び出し側は従来どおり icon（IconName）と tone を渡す。icon から漢字を引く。
 * 装飾なので読み上げない。事業名は隣の見出しで伝える。大きさは呼び出し側で --tone-mark-size を指定する（既定48px）。
 */
const GLYPHS: Record<IconName, string> = {
  house: "訪",
  person: "居",
  sun: "家",
  heart: "護",
  clipboard: "採",
  document: "日",
};

/* 輪の開き位置と点の位置を、字ごとにずらして同じ判の繰り返しに見せない */
const TURNS: Record<IconName, number> = { house: 0, person: 70, sun: 150, heart: 220, clipboard: 290, document: 40 };
const DOTS: Record<IconName, { x: number; y: number; r: number }> = {
  house: { x: 88, y: 17, r: 4.6 },
  person: { x: 14, y: 16, r: 4.2 },
  sun: { x: 90, y: 82, r: 4.4 },
  heart: { x: 12, y: 84, r: 4 },
  clipboard: { x: 88, y: 17, r: 4.2 },
  document: { x: 14, y: 16, r: 4.6 },
};

export function ToneMark({ icon, tone, className }: { icon: IconName; tone: Tone; className?: string }) {
  const dot = DOTS[icon];
  return (
    <span className={[styles.mark, styles[tone], className].filter(Boolean).join(" ")} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 100 100" focusable="false">
        <g transform={`rotate(${TURNS[icon]} 50 50)`}>
          <path d={BRUSH_RING} className={styles.ring} />
          <path d={BRUSH_RING_DRY} className={styles.dry} />
        </g>
        <circle cx={dot.x} cy={dot.y} r={dot.r} className={styles.dot} />
        <text x="50" y="67" textAnchor="middle" className={styles.glyph}>
          {GLYPHS[icon]}
        </text>
      </svg>
    </span>
  );
}
