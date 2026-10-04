import Link from "next/link";
import { Fragment } from "react";

import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { LeafDecoration } from "@/components/common/LeafDecoration";
import { SectionTitle } from "@/components/common/SectionTitle";
import { TelLink } from "@/components/common/TelLink";
import { ArrowRightIcon } from "@/components/icons";
import type { Link as LinkItem, Tone } from "@/types/site";

import styles from "./NotFoundView.module.css";

export interface NotFoundContent {
  /**
   * 見出しの行ごとの配列。改行位置を決めておくのは、自動で折り返すと見出しの箱が列の幅いっぱいに広がり、
   * 末尾の筆線（SectionTitle brush）が文字から離れた右端に出てしまうため
   */
  title: string[];
  /** 1段落目は少し大きく（--t-body）、2段落目以降は本文（--t-note） */
  body: string[];
  home: LinkItem;
  pages: {
    title: string;
    items: (LinkItem & { description: string; tone: Tone })[];
  };
  tel: {
    title: string;
    lead: string;
    salesNotice: string;
  };
}

/**
 * 404（ページが見つからない）。次の行動をすぐ選べるよう、
 *   1. トップページへ戻る（ページ内で唯一の強いボタン）
 *   2. 主なページ（サービス・事業所・採用情報・お問い合わせ）の一覧
 *   3. お電話
 * の順に置く。読み上げ順（DOM順）はこの順のまま、1024px以上は 1 と 3 を左の列、2 を右の列に並べる。
 * 「404」という番号は高齢の読者には意味が伝わりにくいので出さない（HTTPの状態コードは Next.js が返す）。
 */
export function NotFoundView({ content, tel }: { content: NotFoundContent; tel: string }) {
  return (
    <section className={styles.section} aria-labelledby="not-found-title">
      <LeafDecoration variant="top-right" className={styles.leafTop} />
      <LeafDecoration variant="bottom-left" className={styles.leafBottom} />

      <Container className={styles.inner}>
        <div className={styles.intro}>
          <SectionTitle as="h1" id="not-found-title">
            {content.title.map((line, i) => (
              <Fragment key={line}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </SectionTitle>
          <div className={styles.body}>
            {content.body.map((paragraph, i) => (
              <p key={paragraph} className={i === 0 ? styles.lead : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
          <Button href={content.home.href} size="lg" className={styles.home}>
            {content.home.label}
          </Button>
        </div>

        <nav className={styles.pages} aria-labelledby="not-found-pages-title">
          <h2 id="not-found-pages-title" className={styles.subTitle}>
            {content.pages.title}
          </h2>
          <ul className={styles.pageList} role="list">
            {content.pages.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.pageLink}>
                  {/* ロゴの周りの水彩の点。装飾なので読み上げない */}
                  <span className={[styles.dot, styles[item.tone]].join(" ")} aria-hidden="true" />
                  <span className={styles.pageText}>
                    <span className={styles.pageLabel}>{item.label}</span>
                    <span className={styles.pageDescription}>{item.description}</span>
                  </span>
                  <ArrowRightIcon size={18} className={styles.pageArrow} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.tel}>
          <h2 className={styles.subTitle}>{content.tel.title}</h2>
          <p>{content.tel.lead}</p>
          <p>
            <TelLink tel={tel} size="large" icon />
          </p>
          <p className={styles.notice}>{content.tel.salesNotice}</p>
        </div>
      </Container>
    </section>
  );
}
