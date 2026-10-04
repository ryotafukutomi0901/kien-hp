import { ToneMark } from "@/components/common/ToneMark";
import { ArrowRightIcon } from "@/components/icons";
import type { ServiceSummary } from "@/data/pages/services";

import styles from "./ServiceJumpNav.module.css";

/**
 * ページ冒頭のページ内リンク（3事業）。トップのカードと同じ目印（ToneMark）で、
 * 下の各節（#home-visit ほか）と対応が分かるようにする。名前も必ず併記する（色だけに頼らない）。
 */
export function ServiceJumpNav({ label, services }: { label: string; services: ServiceSummary[] }) {
  return (
    <nav aria-label={label} className={styles.nav}>
      <ul className={styles.list}>
        {services.map((service) => (
          <li key={service.id}>
            <a href={`#${service.id}`} className={`${styles.link} ${styles[service.tone]}`}>
              <ToneMark icon={service.icon} tone={service.tone} className={styles.mark} />
              <span className={styles.label}>{service.title}</span>
              <ArrowRightIcon className={styles.arrow} size={16} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
