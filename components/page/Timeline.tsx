import styles from "./Timeline.module.css";

export interface TimelineItem {
  /** 時刻（原文のまま。例: "8:30〜9:00"） */
  time: string;
  text: string;
}

/** 1日の流れ。時刻の列と内容の列を並べる（スタッフの一日） */
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className={styles.list}>
      {items.map((item, i) => (
        <li key={`${item.time}-${i}`} className={styles.item}>
          <span className={styles.time}>{item.time}</span>
          <span className={styles.text}>{item.text}</span>
        </li>
      ))}
    </ol>
  );
}
