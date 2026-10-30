import type { ReactNode } from "react";

import type { IconName, Tone } from "@/types/site";

import { BRUSH_RING, BRUSH_RING_DRY } from "./brushRing";
import styles from "./ToneMark.module.css";

/*
 * 事業・職種の目印（2026-10-11 作り直し。CEO指摘「家・人・太陽の絵記号がAIっぽい」への対応）。
 *
 * ロゴの筆の輪の中に、ロゴと同じ書き方の顔（目2つと口1本）を置き、事業ごとに表情を変える
 * （2026-10-28 CEO指示「案1にしよう」。それまでは事業の頭の漢字1字＝訪・居・家 を活字で置いていた）。
 *   訪問介護＝ロゴと同じ笑顔、居宅介護支援＝目を細めたほっとした顔、家事支援＝口をあけた笑顔
 * 顔の線は輪と同じ系統の濃い色の1色（ロゴが1色でできているのに合わせる）。
 * 輪は会社行事の日付スタンプと同じ形（brushRing.ts）で、ロゴの輪と同じ書き方。輪の色が事業のトーン色、
 * 添える小さな点がロゴの周りに散る点の名残。
 * 呼び出し側は従来どおり icon（IconName）と tone を渡す。icon から表情を引く。
 * 装飾なので読み上げない。事業名は隣の見出しで伝える。大きさは呼び出し側で --tone-mark-size を指定する（既定48px）。
 */
type Face = "smile" | "calm" | "laugh";

/* 今使っているのは house・person・sun の3つ。残りは3つの表情のどれかに寄せておく */
const FACES: Record<IconName, Face> = {
  house: "smile",
  person: "calm",
  sun: "laugh",
  heart: "smile",
  clipboard: "calm",
  document: "laugh",
};

/* 目と口の位置はロゴの顔の比率（輪の半径に対する目の間隔・高さ、口の幅・深さ）から出した */
const EYE_X = [36, 64];

function FaceLines({ face }: { face: Face }): ReactNode {
  if (face === "calm") {
    return (
      <>
        {EYE_X.map((x) => (
          <path key={x} d={`M${x - 4.5} 40Q${x} 33.5 ${x + 4.5} 40`} className={styles.line} strokeWidth={3.4} />
        ))}
        <path d="M37 51Q50 62 63 51" className={styles.line} strokeWidth={3.8} />
      </>
    );
  }
  const eyes = EYE_X.map((x) => <ellipse key={x} cx={x} cy={38} rx={3.1} ry={4.2} className={styles.fill} />);
  if (face === "laugh") {
    return (
      <>
        {eyes}
        <path d="M35 48Q50 49 65 48Q63 64 50 64Q37 64 35 48Z" className={styles.mouth} />
      </>
    );
  }
  return (
    <>
      {eyes}
      <path d="M33 48Q50 66 67 48" className={styles.line} strokeWidth={4} />
    </>
  );
}

/* 輪の開き位置と点の位置を、目印ごとにずらして同じ判の繰り返しに見せない */
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
        <FaceLines face={FACES[icon]} />
      </svg>
    </span>
  );
}
