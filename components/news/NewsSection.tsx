import Image from "next/image";

import { ArrowLink } from "@/components/common/ArrowLink";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { site } from "@/data/site";

import { NewsList } from "./NewsList";
import styles from "./NewsSection.module.css";

/** PHASE 1: 構造のみ。リスト右側の富士山写真のフェードはSub-Agent 06（News）が仕上げる */
export function NewsSection() {
  const { news } = site;
  return (
    <section className={styles.section} aria-labelledby="news-title">
      <Container>
        <div className={styles.head}>
          <SectionTitle id="news-title" variant="mark">
            {news.title}
          </SectionTitle>
          <ArrowLink href={news.more.href}>
            {news.more.label}
            <span className="visually-hidden">（お知らせ）</span>
          </ArrowLink>
        </div>
        <div className={styles.panel}>
          <NewsList items={news.items} />
          <div className={styles.media} aria-hidden="true">
            <Image
              src={news.image.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 360px, 0px"
              className={styles.image}
              style={{ objectPosition: news.image.position }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
