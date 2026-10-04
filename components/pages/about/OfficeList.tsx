import { ArrowLink } from "@/components/common/ArrowLink";
import type { AboutPageContent } from "@/data/pages/about";

import styles from "./OfficeList.module.css";
import { TelLink } from "@/components/common/TelLink";
import { ToneMark } from "@/components/common/ToneMark";

/** 事業所2件。トップのサービスカードと同じ目印（ToneMark）で、どの事業の事業所かを見分けやすくする */
export function OfficeList({ list }: { list: AboutPageContent["offices"]["list"] }) {
  return (
    <ul className={styles.list} role="list">
      {list.items.map((office) => (
        <li key={office.name} className={[styles.card, styles[office.tone]].join(" ")}>
          <div className={styles.head}>
            <ToneMark icon={office.icon} tone={office.tone} className={styles.mark} />
            <h4 className={styles.name}>{office.name}</h4>
          </div>
          <dl className={styles.meta}>
            <div className={styles.row}>
              <dt className={styles.term}>{list.designationLabel}</dt>
              <dd className={styles.number}>{office.designationNumber}</dd>
            </div>
            <div className={styles.row}>
              <dt className={styles.term}>TEL</dt>
              <dd>
                <TelLink tel={office.tel} />
              </dd>
            </div>
          </dl>
          <ArrowLink href={office.link.href} tone={office.tone} className={styles.link}>
            {office.link.label}
          </ArrowLink>
        </li>
      ))}
    </ul>
  );
}
