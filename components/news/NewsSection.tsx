import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { site } from "@/data/site";
import { formatDate } from "@/lib/format";
import type { Tone } from "@/types/site";

import styles from "./NewsSection.module.css";

const TONES: Tone[] = ["blue", "green", "yellow", "orange"];

/**
 * お知らせ（手本: 日本テレビアートの「News」）。
 * 左に欧文の大見出し、右に1件ずつの行（色の角丸の正方形に会社のマーク／日付／件名／「もっとみる •」）、区切り線。
 * 写真の無いお知らせなので、正方形の中には喜援のマークを入れる（手本は社名の看板の写真）。
 */
export function NewsSection() {
  const { news, company } = site;
  const mark = company.logoMark;
  return (
    <section className={styles.section} aria-labelledby="news-title">
      <Container className={styles.inner}>
        <SectionTitle id="news-title" en={news.en}>
          {news.title}
        </SectionTitle>
        <div className={styles.main}>
          <ul className={styles.list}>
            {news.items.map((item, i) => (
              <li key={item.href} data-reveal>
                <Link href={item.href} className={styles.row}>
                  <span className={`${styles.thumb} ${styles[TONES[i % TONES.length]]}`} aria-hidden="true">
                    {mark && (
                      <span className={styles.thumbMark}>
                        <Image src={mark.src} alt="" width={268} height={318} className={styles.thumbImage} />
                      </span>
                    )}
                  </span>
                  <span className={styles.text}>
                    <time dateTime={item.date} className={styles.date}>
                      {formatDate(item.date)}
                    </time>
                    <span className={styles.title}>{item.title}</span>
                    <span className={styles.more} aria-hidden="true">
                      もっとみる
                      <span className={styles.dot} />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.all}>
            <Button href={news.more.href} variant="outline" size="lg">
              {news.more.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
