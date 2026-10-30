import { site } from "@/data/site";

import { BackgroundDots } from "./BackgroundDots";
import styles from "./SiteBackground.module.css";

/**
 * 全ページの固定背景（2026-10-28 CEO指示「今のヒーローの演出を背景にして常に出しておく」）。
 * 淡い地に白い同心円、その上をロゴの4色の丸が奥から飛んでくる（まれに喜援のロゴのマークも混ざる）。画面に固定し、スクロールしても後ろに出続ける。
 * 各セクションは地を透明か半透明にして、この背景を透かす。
 */
export function SiteBackground() {
  return (
    <div className={styles.background} aria-hidden="true">
      <div className={styles.rings} />
      <BackgroundDots className={styles.dots} logoSrc={site.company.logoMark?.src} />
    </div>
  );
}
