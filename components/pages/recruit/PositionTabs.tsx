"use client";

import { useEffect, useId, useState, type KeyboardEvent } from "react";

import { Button } from "@/components/common/Button";
import { ToneMark } from "@/components/common/ToneMark";
import { DefinitionList } from "@/components/page/DefinitionList";
import type { RecruitPosition } from "@/data/pages/recruit";

import styles from "./PositionTabs.module.css";

/**
 * 募集要項（職種ごとの条件）をタブで選んで見る（2026-11-17 CEO指示「募集要項みたいなところは全部タブで選べるように」）。
 * 3職種のタブを押すと、下にその職種の時給・勤務時間・休日・保険・必要資格が出る。
 * 各職種の下の「この職種について問い合わせる」は、お問い合わせフォームを「採用・求人」と選んだ職種を選んだ状態で開く。
 * /recruit#position-helper のように職種の id 付きで開いたときも、その職種のタブを開いておく。
 * キーボード: ← → で隣のタブへ、Home / End で先頭・末尾へ（WAI-ARIA のタブの作法）。
 */
export function PositionTabs({ positions, contactHref }: { positions: RecruitPosition[]; contactHref: string }) {
  const [index, setIndex] = useState(0);
  const baseId = useId();
  const current = positions[index];

  // ページ内リンク（#position-…）で開いたとき、その職種のタブを開く
  useEffect(() => {
    const fromHash = () => {
      const i = positions.findIndex((position) => `#${position.id}` === window.location.hash);
      if (i < 0) return;
      setIndex(i);
      // その職種の見出しは、タブを開いてから現れるので、開いたあとで画面に入れる
      requestAnimationFrame(() => document.getElementById(positions[i].id)?.scrollIntoView({ block: "start" }));
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [positions]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = positions.length - 1;
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? (index + 1) % positions.length
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? (index - 1 + positions.length) % positions.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setIndex(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  const rows = [
    { term: "時給", detail: <p className={styles.wage}>{current.wage}</p> },
    ...current.terms.map((t) => ({
      term: t.term,
      detail: t.detail.map((line) => <p key={line}>{line}</p>),
    })),
  ];

  return (
    <div className={styles.root}>
      <div role="tablist" aria-label="募集職種" className={styles.tabs} onKeyDown={onKeyDown}>
        {positions.map((position, i) => (
          <button
            key={position.id}
            id={`${baseId}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-controls={`${baseId}-panel`}
            tabIndex={i === index ? 0 : -1}
            className={`${styles.tab} ${styles[position.tone]}`}
            onClick={() => setIndex(i)}
          >
            <ToneMark icon={position.icon} tone={position.tone} className={styles.mark} />
            <span className={styles.tabLabel}>{position.title}</span>
          </button>
        ))}
      </div>

      {/* 職種を替えたら中身が入れ替わる（key で作り直し、ぽんと弾んで現れる） */}
      <div
        key={current.id}
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${index}`}
        className={`${styles.panel} ${styles[current.tone]}`}
      >
        <h3 id={current.id} className={styles.title}>
          {current.title}
        </h3>
        <DefinitionList items={rows} />
        <div className={styles.actions}>
          <Button href={`${contactHref}?type=recruit&position=${current.id}#form`} size="md">
            この職種について問い合わせる
          </Button>
        </div>
      </div>
    </div>
  );
}
