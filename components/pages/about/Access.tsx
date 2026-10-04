import { ArrowRightIcon } from "@/components/icons";
import type { AboutPageContent } from "@/data/pages/about";

import styles from "./Access.module.css";
import { InfoList } from "./InfoList";

/** 所在地・交通・駐車場と地図。地図はAPIキー不要のGoogleマップ埋め込み（表示されるまで読み込まない） */
export function Access({ access }: { access: AboutPageContent["offices"]["access"] }) {
  return (
    <>
      <InfoList items={access.items} />
      <div className={styles.map}>
        <iframe
          src={access.map.embedSrc}
          title={access.map.title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={styles.frame}
        />
      </div>
      <a href={access.map.openHref} target="_blank" rel="noopener noreferrer" className={styles.open}>
        <span>{access.map.openLabel}</span>
        <span className="visually-hidden">（新しいタブで開きます）</span>
        <ArrowRightIcon size={14} className={styles.arrow} />
      </a>
    </>
  );
}
