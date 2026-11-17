import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { servicesPage } from "@/data/pages/services";

import { FeeTable } from "./FeeTable";
import styles from "./PriceGuide.module.css";

/**
 * 家事支援の料金表と、相談へ進むボタン（2026-10-21 引き継ぎ 05・07 で全ページに置いた）。
 * 2026-11-13 CEO指示「下層ページに料金とお問い合わせが多すぎる。必要なところだけ」で、置くのはトップと
 * 訪問介護・居宅介護支援のページだけにし（会社概要・採用・ニュース・会社行事・お問い合わせからは外した）、
 * 2026-11-17 CEO指示「トップにpriceの画面はいらない」でトップからも外した。いま置くのは訪問介護・居宅介護支援のページだけ。
 * 家事支援のページには同じ表が本文の中にあるので置かない。
 * 置き場所は各ページの最後（お問い合わせの帯・フッターの直前）。表の値は data/pages/services.ts の fee だけを参照する。
 */
export function PriceGuide() {
  const { fee } = servicesPage.homeHelp;
  return (
    <section className={styles.section} aria-labelledby="price-guide-title">
      <Container className={styles.inner}>
        <div className={styles.head}>
          <SectionTitle id="price-guide-title" en="Price" subtitle={fee.note}>
            家事支援の料金
          </SectionTitle>
          <div className={styles.actions}>
            <Button href={servicesPage.contactHref} size="md">
              {servicesPage.contactLabel}
            </Button>
            <Button href="/services/home-help" variant="white" size="md">
              家事支援事業を見る
            </Button>
          </div>
        </div>
        <div className={styles.table}>
          <FeeTable table={fee.table} />
        </div>
      </Container>
    </section>
  );
}
