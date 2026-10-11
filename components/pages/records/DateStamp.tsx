import { BRUSH_RING, BRUSH_RING_DRY } from "@/components/common/brushRing";

import styles from "./DateStamp.module.css";


/**
 * 記事の日付スタンプ。ロゴの「筆の輪」をなぞった円の中に、月（小）と日（大）を手書き書体で入れる。
 * 見た目の「7月／26」は読み上げから隠し、読み上げ用に「2026年7月26日」を別に持つ（<time dateTime> は機械向け）。
 * 輪の色は呼び出し側が --stamp-color で決める（カードごとにロゴの点の色を巡回させる）。
 */
export function DateStamp({ date, className }: { date: string; className?: string }) {
  const [year, month, day] = date.split("-").map(Number);
  return (
    <time dateTime={date} className={className ? `${styles.stamp} ${className}` : styles.stamp}>
      <span className="visually-hidden">
        {year}年{month}月{day}日
      </span>
      <span className={styles.face} aria-hidden="true">
        <svg className={styles.ring} viewBox="0 0 100 100" focusable="false">
          {/* 輪の面。7時半の位置から時計回りに約330°、書き始めが太く、払いで細く外へ抜ける（左下が開く） */}
          <path d={BRUSH_RING} />
          {/* 書き始め側の「かすれ」。輪の太い部分に地色の細い線を通して筆の割れに見せる */}
          <path d={BRUSH_RING_DRY} className={styles.dry} />
        </svg>
        <span className={styles.month}>{month}月</span>
        <span className={styles.day}>{day}</span>
      </span>
    </time>
  );
}
