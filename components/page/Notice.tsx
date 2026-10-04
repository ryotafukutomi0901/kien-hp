import type { ReactNode } from "react";

import type { Tone } from "@/types/site";

import styles from "./Notice.module.css";

/** 補足・注意書き（営業電話お断り、対象外のサービス、確認中の事項など）。tone で地色を変える */
export function Notice({ children, tone = "yellow" }: { children: ReactNode; tone?: Tone }) {
  return <aside className={[styles.notice, styles[tone]].join(" ")}>{children}</aside>;
}
