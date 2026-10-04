import { PhoneIcon } from "@/components/icons";
import { toTelHref } from "@/lib/format";

import styles from "./TelLink.module.css";

/**
 * 本文中の電話番号の発信リンク（"0545-32-7860" → tel:0545327860）。
 * 見た目は本文の行に収め、押せる範囲だけを上下に広げて --tap-min 以上にする（Button の sm と同じ方式）。
 * 大きな主CTAの電話ボタン（/contact・/recruit）は各ページの部品で、toTelHref と PhoneIcon だけを共有する。
 */
export function TelLink({
  tel,
  size = "normal",
  icon = false,
}: {
  tel: string;
  size?: "normal" | "large";
  /** 受話器アイコンを前に付ける */
  icon?: boolean;
}) {
  const classes = [styles.tel, size === "large" && styles.large].filter(Boolean).join(" ");
  return (
    <a href={toTelHref(tel)} className={classes}>
      {icon && <PhoneIcon size={20} className={styles.icon} />}
      <span>{tel}</span>
    </a>
  );
}
