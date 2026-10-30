import { Fragment } from "react";

import { Button } from "@/components/common/Button";
import { TelLink } from "@/components/common/TelLink";
import { DefinitionList } from "@/components/page/DefinitionList";
import { FeeTable } from "@/components/page/FeeTable";
import type { ServicesPageContent } from "@/data/pages/services";

import styles from "./HomeHelpGuide.module.css";
import { SubHeading } from "./SubHeading";

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

/** 料金。表の下に、相談へ進むボタンを置く（2026-10-21 引き継ぎ 07: 料金の近くにお問い合わせ） */
export function HomeHelpFee({ fee, contact }: { fee: HomeHelp["fee"]; contact: { label: string; href: string } }) {
  return (
    <div className={styles.guide}>
      <div className={`${styles.item} ${styles.wide}`}>
        <SubHeading tone="orange">{fee.title}</SubHeading>
        <p className={styles.text}>{fee.note}</p>
        <FeeTable table={fee.table} />
        <div>
          <Button href={contact.href}>{contact.label}</Button>
        </div>
      </div>
    </div>
  );
}

/** 対応エリア・日時とキャンセル（デスクトップは2列） */
export function HomeHelpCoverage({ coverage, cancel }: { coverage: HomeHelp["coverage"]; cancel: HomeHelp["cancel"] }) {
  return (
    <div className={styles.guide}>
      <div className={styles.item}>
        <SubHeading tone="orange">{coverage.title}</SubHeading>
        <DefinitionList items={coverage.items} />
      </div>
      <div className={styles.item}>
        <SubHeading tone="orange">{cancel.title}</SubHeading>
        {cancel.body.map((sentence) => (
          <p key={sentence} className={styles.text}>
            {sentence}
          </p>
        ))}
      </div>
    </div>
  );
}

/**
 * はぐくむFUJI（富士市の子育て支援）の案内。家事支援事業の一部として置く。
 * 登録済みの方 → お問い合わせ（サイト内）／まだの方 → 富士市のページでご登録 → お問い合わせ。
 * 富士市のページは外部サイトなので、新しいタブで開くことを読み上げでも伝える。
 */
export function HagukumuGuide({ hagukumu }: { hagukumu: HomeHelp["hagukumu"] }) {
  const { registered, unregistered } = hagukumu;
  return (
    <div className={styles.hagukumu}>
      <div className={styles.hagukumuIntro}>
        <div className={styles.phrased}>
          <SubHeading tone="orange">
            <Phrases parts={hagukumu.title} />
          </SubHeading>
        </div>
        <p className={`${styles.text} ${styles.phrased}`}>
          <Phrases parts={hagukumu.body} />
        </p>
        <p className={styles.text}>{hagukumu.note}</p>
      </div>
      <div className={styles.hagukumuWays}>
        <div className={styles.way}>
          <p className={styles.wayLabel}>登録済みの方</p>
          <p className={styles.text}>{registered.text}</p>
          <div>
            <Button href={registered.contact.href}>{registered.contact.label}</Button>
          </div>
        </div>
        <div className={styles.way}>
          <p className={styles.wayLabel}>まだ登録されていない方</p>
          <p className={styles.text}>{unregistered.text}</p>
          <ul className={styles.externalList}>
            {unregistered.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                  {link.label}
                  <span className="visually-hidden">（富士市のサイト。新しいタブで開きます）</span>
                </a>
              </li>
            ))}
          </ul>
          <div>
            <Button href="/contact" variant="outline">
              ご登録のあと、お問い合わせ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 喜援ホームヘルプサービスについて（旧ホームヘルプサイトの紹介文）。見出しの一文を大きく、副見出し、紹介文の順。
 * 節の見出し（h2）は呼び出し側の PageSection が持つ。
 */
export function HomeHelpAbout({ about }: { about: HomeHelp["about"] }) {
  return (
    <div className={styles.about}>
      <p className={styles.aboutCatch}>{about.catch}</p>
      <p className={styles.aboutLead}>{about.lead}</p>
      <div className={styles.aboutBody}>
        {about.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

/** 家事支援のご予約（お電話）と、お問い合わせボタン。節の見出し（h2「ご予約」）は呼び出し側の PageSection が持つ */
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
