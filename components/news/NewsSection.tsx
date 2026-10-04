import Image from "next/image";

import { ArrowLink } from "@/components/common/ArrowLink";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { site } from "@/data/site";

import { NewsList } from "./NewsList";
import styles from "./NewsSection.module.css";

/**
 * トップのNEWS。上端の区切り線（Staffとの境界）→ 見出し行 → 白いパネル（3行＋右端の富士山写真）。
 * 写真は装飾。タブレット以上はパネル右側に重ねて左端を白へフェード、モバイルはパネル上部の細い帯にする。
 */
export function NewsSection() {
  const { news } = site;
  return (
    <section className={styles.section} aria-labelledby="news-title">
      <Container>
        <div className={styles.head}>
          <SectionTitle id="news-title" variant="mark">
            {news.title}
          </SectionTitle>
          <ArrowLink href={news.more.href} className={styles.more}>
            {news.more.label}
            <span className="visually-hidden">（お知らせ）</span>
          </ArrowLink>
        </div>
        <div className={styles.panel}>
          <div className={styles.media} aria-hidden="true">
            <Image
              src={news.image.src}
              alt=""
              fill
              sizes="(min-width: 1280px) 372px, (min-width: 1024px) 31vw, (min-width: 640px) 25vw, 100vw"
              className={styles.image}
              style={{ objectPosition: news.image.position }}
            />
          </div>
          <NewsList items={news.items} className={styles.list} />
        </div>
      </Container>
    </section>
  );
}
