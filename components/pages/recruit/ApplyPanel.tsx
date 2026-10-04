import { Button } from "@/components/common/Button";
import { toTelHref } from "@/lib/format";

import styles from "./ApplyPanel.module.css";

/**
 * 応募方法。応募フォームが無いため、電話での応募をこのページの主な行動にする（電話番号を大きく、タップで発信）。
 * お問い合わせページへの導線は副として outline のボタンで置く。
 */
export function ApplyPanel({
  heading,
  tel,
  salesNote,
  closing,
  contactText,
  contactLink,
}: {
  heading: string;
  /** 表示用の電話番号（例: 0545-32-7860）。tel: リンクはハイフンを除いて作る */
  tel: string;
  salesNote: string;
  closing: string;
  contactText: string;
  contactLink: { label: string; href: string };
}) {
  return (
    <div className={styles.panel}>
      <div className={styles.phone}>
        <h3 className={styles.heading}>{heading}</h3>
        <a href={toTelHref(tel)} className={styles.tel}>
          <span className={styles.telLabel}>TEL</span>{" "}
          <span className={styles.telNumber}>{tel}</span>
        </a>
        <p className={styles.note}>{salesNote}</p>
      </div>
      <div className={styles.contact}>
        <p className={styles.closing}>{closing}</p>
        <p>{contactText}</p>
        <Button href={contactLink.href} variant="outline" size="md" className={styles.contactButton}>
          {contactLink.label}
        </Button>
      </div>
    </div>
  );
}
