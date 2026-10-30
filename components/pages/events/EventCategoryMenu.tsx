"use client";

import Link from "next/link";
import { useId, useRef } from "react";

import { ChevronDownIcon } from "@/components/icons";
import { eventCategories } from "@/data/records/events";
import type { EventCategory } from "@/types/site";

import styles from "./EventCategoryMenu.module.css";

export type EventFilter = EventCategory | "all";

const ITEMS: { id: EventFilter; label: string }[] = [{ id: "all", label: "すべて" }, ...eventCategories];

/** 分類で絞った一覧の URL（下層ページから一覧へ戻るときに使う） */
export function eventFilterHref(filter: EventFilter): string {
  return filter === "all" ? "/events" : `/events?category=${filter}`;
}

/**
 * 会社行事の分類の目次（手本: ハウステンボス採用サイトのお知らせの「カテゴリー」）。
 * PC は左の白いパネル（一覧では画面に付いてくる）、1023px以下は開閉式（<details>）。
 * - onSelect を渡すと、その場で一覧を絞るボタンになる（一覧ページ）
 * - 渡さないと、絞った一覧へのリンクになる（下層ページ）
 * 選んでいない分類は薄い色、選んでいる分類はほぼ黒＋コーラルの点。件数を右に添える。
 * 下層ページでは active を渡さない（どれも選んでいない見た目）。
 */
export function EventCategoryMenu({
  active,
  counts,
  onSelect,
}: {
  active?: EventFilter;
  counts: Record<EventFilter, number>;
  onSelect?: (filter: EventFilter) => void;
}) {
  const panelLabelId = useId();
  const drawerRef = useRef<HTMLDetailsElement>(null);
  const activeLabel = ITEMS.find((item) => item.id === active)?.label;

  const list = (closeDrawer: boolean) => (
    <ul className={styles.list}>
      {ITEMS.map((item) => {
        const selected = item.id === active;
        const content = (
          <>
            <span className={styles.itemLabel}>{item.label}</span>
            <span className={styles.count}>
              {counts[item.id]}
              <span className="visually-hidden">件</span>
            </span>
          </>
        );
        return (
          <li key={item.id} className={styles.item}>
            {onSelect ? (
              <button
                type="button"
                className={styles.link}
                aria-pressed={selected}
                onClick={() => {
                  onSelect(item.id);
                  if (closeDrawer && drawerRef.current) drawerRef.current.open = false;
                }}
              >
                {content}
              </button>
            ) : (
              <Link href={eventFilterHref(item.id)} className={styles.link} aria-current={selected ? "true" : undefined}>
                {content}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );

  // 絞り込みのボタンはボタンの組（role="group"）、リンクはナビゲーション（<nav>）としてまとめる
  const Wrapper = onSelect ? "div" : "nav";
  const role = onSelect ? "group" : undefined;
  return (
    <div className={styles.menu}>
      <Wrapper className={styles.panel} role={role} aria-labelledby={panelLabelId}>
        <p id={panelLabelId} className={styles.label}>
          カテゴリー
        </p>
        {list(false)}
      </Wrapper>

      <details ref={drawerRef} className={styles.drawer}>
        <summary className={styles.summary}>
          <span className={styles.label}>カテゴリー</span>
          <span className={styles.current}>{activeLabel ?? "分類で絞って見る"}</span>
          <ChevronDownIcon size={18} className={styles.chevron} />
        </summary>
        <Wrapper role={role} aria-label="カテゴリー">
          {list(true)}
        </Wrapper>
      </details>
    </div>
  );
}
