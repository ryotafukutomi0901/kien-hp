import type { ReactNode } from "react";

import type { Tone } from "@/types/site";

import styles from "./SubHeading.module.css";

/** 事業の中の小見出し（h3）。左にトーン色の縦線を引き、h2（三角マーク）と区別する */
export function SubHeading({ children, tone, id }: { children: ReactNode; tone: Tone; id?: string }) {
  return (
    <h3 id={id} className={`${styles.heading} ${styles[tone]}`}>
      {children}
    </h3>
  );
}
