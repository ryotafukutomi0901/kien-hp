"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowRightIcon } from "@/components/icons";
import { eventCategories, eventCategoryCounts } from "@/data/records/events";
import { getLenis } from "@/lib/lenis";
import type { EventRecord } from "@/types/site";

import { EventCategoryMenu, type EventFilter } from "./EventCategoryMenu";
import { EventListCard } from "./EventListCard";
import styles from "./EventsBrowser.module.css";

/** 1ページの件数（手本と同じく 3列×4段） */
const PER_PAGE = 12;

const isFilter = (value: string | null): value is EventFilter =>
  value === "all" || eventCategories.some((category) => category.id === value);

/**
 * 会社行事の一覧（手本: ハウステンボス採用サイトのお知らせ）。左に分類の目次、右に写真のカードを3列、下にページ送り。
 * - 分類とページは URL（?category=meal&page=2）にも残す。下層ページの目次からは ?category= で着地する
 * - JS が動くまで（と JS が無い環境）は全件を並べる。ページ送りは JS が動いてから出す
 * - カードは画面に入ると下からふわっと出る（手本と同じ 0.8s・同じ緩急、列ごとに 0.15s ずつ遅らせる）
 */
export function EventsBrowser({ records }: { records: EventRecord[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState<EventFilter>("all");
  const [page, setPage] = useState(1);

  const filtered = filter === "all" ? records : records.filter((record) => record.categories.includes(filter));
  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * PER_PAGE;
  const visible = ready ? filtered.slice(start, start + PER_PAGE) : records;

  const counts = eventCategoryCounts(records);

  // URL の ?category= ?page= を読む（下層ページの目次・共有されたリンクからの着地）
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const requested = Number(params.get("page"));
    /* eslint-disable react-hooks/set-state-in-effect -- 表示後に URL を読んで一度だけ合わせる（静的書き出しのため） */
    if (isFilter(category)) setFilter(category);
    if (Number.isInteger(requested) && requested > 1) setPage(requested);
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // 画面に入ったカードを出す（並びが変わるたびに、新しく並んだカードを見張り直す）
  useEffect(() => {
    const cells = [...(listRef.current?.querySelectorAll<HTMLElement>("li:not([data-shown])") ?? [])];
    if (!ready || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cells.forEach((cell) => cell.setAttribute("data-shown", ""));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    cells.forEach((cell) => observer.observe(cell));
    return () => observer.disconnect();
  }, [ready, filter, current]);

  const syncUrl = (nextFilter: EventFilter, nextPage: number) => {
    const params = new URLSearchParams();
    if (nextFilter !== "all") params.set("category", nextFilter);
    if (nextPage > 1) params.set("page", String(nextPage));
    const query = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
  };

  // 一覧の頭が画面の上に隠れていたら、頭まで戻す（ヘッダーの高さぶん下げる）
  const scrollToTop = () => {
    const root = rootRef.current;
    if (!root || root.getBoundingClientRect().top >= 0) return;
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 0;
    const offset = -(header + 24);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(root, { offset });
    else window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY + offset });
  };

  const selectFilter = (next: EventFilter) => {
    setFilter(next);
    setPage(1);
    syncUrl(next, 1);
    scrollToTop();
  };

  const goToPage = (next: number) => {
    setPage(next);
    syncUrl(filter, next);
    scrollToTop();
  };

  const filterLabel = filter === "all" ? "すべて" : eventCategories.find((c) => c.id === filter)?.label;
  const end = Math.min(start + PER_PAGE, filtered.length);

  return (
    <section ref={rootRef} className={`${styles.browser} ${ready ? styles.ready : ""}`} aria-labelledby="event-list-title">
      <h2 id="event-list-title" className="visually-hidden">
        行事の一覧
      </h2>
      <div className={styles.side}>
        <EventCategoryMenu active={filter} counts={counts} onSelect={selectFilter} />
      </div>
      <div className={styles.content}>
        <p className="visually-hidden" aria-live="polite">
          {ready && `${filterLabel}の行事 ${filtered.length}件のうち、${start + 1}件目から${end}件目を表示しています`}
        </p>
        <ol ref={listRef} className={styles.grid}>
          {visible.map((record) => (
            <li key={record.id} className={styles.cell}>
              <EventListCard record={record} />
            </li>
          ))}
        </ol>

        {ready && pageCount > 1 && (
          <nav aria-label="ページ送り" className={styles.pager}>
            {current > 1 && (
              <button type="button" className={styles.pageButton} onClick={() => goToPage(current - 1)}>
                <ArrowRightIcon size={20} className={styles.prevIcon} />
                <span className="visually-hidden">前のページ</span>
              </button>
            )}
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={styles.pageButton}
                aria-current={n === current ? "page" : undefined}
                onClick={() => goToPage(n)}
              >
                {n}
                <span className="visually-hidden">ページ目</span>
              </button>
            ))}
            {current < pageCount && (
              <button type="button" className={styles.pageButton} onClick={() => goToPage(current + 1)}>
                <ArrowRightIcon size={20} />
                <span className="visually-hidden">次のページ</span>
              </button>
            )}
          </nav>
        )}
      </div>
    </section>
  );
}
