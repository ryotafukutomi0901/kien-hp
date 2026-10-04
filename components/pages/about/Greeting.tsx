import { LeafDecoration } from "@/components/common/LeafDecoration";
import type { AboutPageContent } from "@/data/pages/about";

import styles from "./Greeting.module.css";

/** ご挨拶。標語「人を大切にする会社になる」だけを手書き体の大きな文字で目立たせ、ほかは原文どおりの段落で組む */
export function Greeting({ greeting }: { greeting: AboutPageContent["company"]["greeting"] }) {
  return (
    <>
      <p className={styles.opening}>{greeting.opening}</p>
      <div className={styles.motto}>
        <p className={styles.mottoText}>{greeting.motto}</p>
        <LeafDecoration variant="single" className={styles.leaf} />
      </div>
      <div className={styles.prose}>
        {greeting.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </>
  );
}
