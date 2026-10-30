import Link from "next/link";

import { ToneMark } from "@/components/common/ToneMark";
import { ArrowRightIcon } from "@/components/icons";
import type { ServiceSummary } from "@/data/pages/services";

import styles from "./ServiceJumpNav.module.css";

/**
 * 他の事業のページへのリンク。トップのカードと同じ目印（ToneMark）で、事業と色の対応が分かるようにする。
 * 名前も必ず併記する（色だけに頼らない）。いま開いている事業（current）は並べない。
 */
export function ServiceJumpNav({
  label,
  services,
  current,
}: {
  label: string;
  services: ServiceSummary[];
  current?: ServiceSummary["id"];
}) {
  return (
    <nav aria-label={label} className={styles.nav}>
      <ul className={styles.list}>
        {services
          .filter((service) => service.id !== current)
          .map((service) => (
          <li key={service.id}>
            <Link href={`/services/${service.id}`} className={`${styles.link} ${styles[service.tone]}`}>
              <ToneMark icon={service.icon} tone={service.tone} className={styles.mark} />
              <span className={styles.label}>{service.title}</span>
              <ArrowRightIcon className={styles.arrow} size={16} />
            </Link>
          </li>
          ))}
      </ul>
    </nav>
  );
}
