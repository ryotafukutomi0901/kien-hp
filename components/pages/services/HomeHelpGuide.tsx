import { Fragment } from "react";

import { Button } from "@/components/common/Button";
import { DefinitionList } from "@/components/page/DefinitionList";
import type { FeeTableContent, ServicesPageContent } from "@/data/pages/services";

import styles from "./HomeHelpGuide.module.css";
import { SubHeading } from "./SubHeading";
import { TelLink } from "@/components/common/TelLink";

/** 料金・キャンセル料の表。見出し（h3）とは別に <caption> で表の中身を示す（画面には見出しがあるので読み上げ専用） */
function FeeTable({ table }: { table: FeeTableContent }) {
  return (
    <table className={styles.table}>
      <caption className="visually-hidden">{table.caption}</caption>
      <thead>
        <tr>
          <th scope="col">{table.headers[0]}</th>
          <th scope="col" className={styles.valueCol}>
            {table.headers[1]}
          </th>
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row) => (
          <tr key={row.label}>
            <th scope="row">{row.label}</th>
            <td className={styles.value}>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

type HomeHelp = ServicesPageContent["homeHelp"];

/** 区切った配列をつなげて表示し、区切りの位置でだけ折り返す（<wbr> と word-break: keep-all） */
function Phrases({ parts }: { parts: string[] }) {
  return parts.map((part, i) => (
    <Fragment key={part}>
      {i > 0 && <wbr />}
      {part}
    </Fragment>
  ));
}

/** 家事支援のご利用案内。料金 → 対応エリア・日時 → キャンセル → 協力事業所（デスクトップは2×2、読む順に左→右・上→下） */
export function HomeHelpGuide({ homeHelp }: { homeHelp: HomeHelp }) {
  const { fee, coverage, cancel, partner } = homeHelp;
  return (
    <div className={styles.guide}>
      <div className={styles.item}>
        <SubHeading tone="orange">{fee.title}</SubHeading>
        <p className={styles.text}>{fee.note}</p>
        <FeeTable table={fee.table} />
      </div>
      <div className={styles.item}>
        <SubHeading tone="orange">{coverage.title}</SubHeading>
        <DefinitionList items={coverage.items} />
      </div>
      <div className={styles.item}>
        <SubHeading tone="orange">{cancel.title}</SubHeading>
        <FeeTable table={cancel.table} />
      </div>
      <div className={styles.item}>
        <div className={styles.phrased}>
          <SubHeading tone="orange">
            <Phrases parts={partner.title} />
          </SubHeading>
        </div>
        <p className={`${styles.text} ${styles.phrased}`}>
          <Phrases parts={partner.body} />
        </p>
      </div>
    </div>
  );
}

/** 家事支援のご予約（お電話）と、事業の末尾のお問い合わせボタン */
export function HomeHelpReserve({
  reserve,
  contact,
}: {
  reserve: HomeHelp["reserve"];
  contact: { label: string; href: string };
}) {
  return (
    <div className={styles.reserve}>
      <div className={styles.reserveText}>
        <SubHeading tone="orange">{reserve.title}</SubHeading>
        <p className={styles.text}>{reserve.body}</p>
      </div>
      <div className={styles.reserveActions}>
        <p className={styles.telRow}>
          <span className={styles.telLabel}>TEL</span>
          <TelLink tel={reserve.tel} size="large" />
        </p>
        <Button href={contact.href}>{contact.label}</Button>
      </div>
    </div>
  );
}
