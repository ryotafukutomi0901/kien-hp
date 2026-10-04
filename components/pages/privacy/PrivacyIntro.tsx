import type { ReactNode } from "react";

import styles from "./PrivacyIntro.module.css";

/** ページ冒頭（PageIntro の中）の前文と目次。前文は本文と同じ40emの行の長さにそろえる */
export function PrivacyIntro({ preamble, children }: { preamble: string[]; children: ReactNode }) {
  return (
    <div className={styles.intro}>
      <div className={styles.preamble}>
        {preamble.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {children}
    </div>
  );
}
