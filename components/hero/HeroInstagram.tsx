import { InstagramIcon } from "@/components/icons";
import { site } from "@/data/site";

import styles from "./Hero.module.css";

/**
 * ヒーロー右下の Instagram へのカード（2026-10-28 CEO指示。お知らせのカードから差し替え）。
 * URL は data/site.ts の social.instagram。未入手の間は仮のリンク（#）にしておき、URLを入れると新しいタブで開く本物のリンクになる。
 * 文言は旧サイトの「インスタグラムを始めました！よろしければフォローをお願いします！」（data/site.ts の instagram）。
 */
export function HeroInstagram() {
  const { instagram, social } = site;
  const href = social.instagram ?? "#";
  const external = Boolean(social.instagram);
  return (
    <aside className={styles.notice} aria-label="Instagram">
      <a
        href={href}
        className={styles.noticeLink}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span className={styles.noticeIcon} aria-hidden="true">
          <InstagramIcon size={26} strokeWidth={1.8} />
        </span>
        <span className={styles.noticeText}>
          <span className={styles.noticeLabel}>{instagram.title}</span>
          <span className={styles.noticeTitle}>{instagram.body.join("")}</span>
        </span>
        <span className={styles.noticeArrow} aria-hidden="true">
          →
        </span>
        {external && <span className="visually-hidden">（新しいタブで開きます）</span>}
      </a>
    </aside>
  );
}
