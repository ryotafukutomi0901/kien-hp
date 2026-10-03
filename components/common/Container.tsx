import type { ReactNode } from "react";

import styles from "./Container.module.css";

/** コンテンツ幅（--container-max）と左右余白（--container-pad）を揃える唯一の枠 */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className ? `${styles.container} ${className}` : styles.container}>{children}</div>;
}
