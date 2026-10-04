import { PhoneIcon } from "@/components/icons";
import { toTelHref } from "@/lib/format";
import styles from "./CallPanel.module.css";

/**
 * お問い合わせページの主役。電話をかけるボタン（ページ内で唯一の強いCTA）、FAX、営業電話お断りの注記。
 * 高齢のご家族が読む前提で、番号は強調サイズ（--t-heading）・ボタンの高さは80px以上にしている。
 * リンクの読み上げは「電話をかける 0545-32-7860」（見えている文字と同じ）。
 */
export function CallPanel({
  tel,
  fax,
  callLabel,
  touchHint,
  salesNotice,
}: {
  tel: string;
  fax: string;
  callLabel: string;
  touchHint: string;
  salesNotice: string;
}) {
  return (
    <div className={styles.panel}>
      <div className={styles.callArea}>
        <a href={toTelHref(tel)} className={styles.call}>
          <span className={styles.callLabel}>
            <PhoneIcon size={22} className={styles.icon} />
            {callLabel}
          </span>{" "}
          <span className={styles.number}>{tel}</span>
        </a>
        <p className={styles.hint}>{touchHint}</p>
      </div>
      <div className={styles.sub}>
        <dl className={styles.fax}>
          <dt>FAX</dt>
          <dd>{fax}</dd>
        </dl>
        <p className={styles.notice}>{salesNotice}</p>
      </div>
    </div>
  );
}
