import { ArrowRightIcon } from "@/components/icons";

import styles from "./RecruitIntro.module.css";

/**
 * 採用ページの導入（PageIntro の中身）。リード文 → 働き方の特徴（先頭を大きく）→ ページ内リンク。
 * 求職者が最初に知りたい「どんな働き方ができるか」を見出しの直下で目立たせる。
 */
export function RecruitIntro({
  lead,
  points,
  links,
}: {
  /** 文ごとの配列 */
  lead: string[];
  /** 働き方の特徴。先頭の1つを強調する */
  points: string[];
  links: { label: string; href: string }[];
}) {
  const [featured, ...rest] = points;
  return (
    <div className={styles.intro}>
      <p className={styles.lead}>
        {lead.map((sentence) => (
          <span key={sentence} className={styles.sentence}>
            {sentence}
          </span>
        ))}
      </p>
      <ul className={styles.points} aria-label="働き方の特徴">
        <li className={styles.featured}>
          <span className={styles.featuredText}>{featured}</span>
        </li>
        {rest.map((point) => (
          <li key={point} className={styles.point}>
            {point}
          </li>
        ))}
      </ul>
      <nav aria-label="このページの内容">
        <ul className={styles.toc}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.tocLink}>
                <span>{link.label}</span>
                <ArrowRightIcon className={styles.tocArrow} size={14} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
