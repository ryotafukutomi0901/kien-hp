import { eventCategoryLabel } from "@/data/records/events";
import type { EventCategory } from "@/types/site";

import styles from "./CategoryPill.module.css";

/** 会社行事の分類の札（色はロゴの色。文字はほぼ黒でコントラストを保つ） */
export function CategoryPill({ category, className }: { category: EventCategory; className?: string }) {
  return (
    <span className={className ? `${styles.pill} ${className}` : styles.pill} data-category={category}>
      {eventCategoryLabel(category)}
    </span>
  );
}
