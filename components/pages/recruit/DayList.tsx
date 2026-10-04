import { Timeline } from "@/components/page/Timeline";
import type { RecruitDay } from "@/data/pages/recruit";

import styles from "./DayList.module.css";
import { JobCard } from "./JobCard";

/** スタッフの一日の3例。デスクトップでは横に並べる。時刻・内容は原文のまま（data/pages/recruit.ts） */
export function DayList({ days }: { days: RecruitDay[] }) {
  return (
    <ul className={styles.grid}>
      {days.map((day) => (
        <JobCard
          key={day.id}
          id={day.id}
          title={day.title}
          icon={day.icon}
          tone={day.tone}
          className={styles.card}
          bodyClassName={styles.body}
        >
          <Timeline items={day.items} />
        </JobCard>
      ))}
    </ul>
  );
}
