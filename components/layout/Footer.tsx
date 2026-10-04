import Link from "next/link";

import { Container } from "@/components/common/Container";
import { Logo } from "@/components/common/Logo";
import { ArrowUpIcon, FacebookIcon, InstagramIcon } from "@/components/icons";
import { site } from "@/data/site";

import styles from "./Footer.module.css";

/**
 * サイト共通フッター（参考モック 0,1678–869,1810）。
 * - 1024px以上: 左にロゴ・住所、右上にナビ7項目、右下にSNSと「ページ上部へ戻る」、最下部中央にコピーライト
 * - 640〜1023px: ロゴ＋住所／ナビ（4列）／コピーライト＋SNS・戻るボタン
 * - 640px未満: ロゴ→住所→ナビ（2列）→SNS・戻るボタン→コピーライト
 * 並び替えはCSSグリッドのエリアだけで行い、読み上げ順（DOM順）はどの幅でも同じにしている。
 */
export function Footer() {
  const { company, nav, social } = site;
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <Logo company={company} tone="light" className={styles.logo} />
        <address className={styles.address}>
          {company.postalCode && (
            <>
              <span>〒{company.postalCode}</span>{" "}
            </>
          )}
          {/* 狭い画面で折り返すときは郵便番号の後ろで改行させ、住所の途中で切らない */}
          <span className={styles.addressLine}>{company.address}</span>
        </address>
        <nav aria-label="フッターナビゲーション" className={styles.nav}>
          <ul className={styles.navList}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.utility}>
          {(social.instagram || social.facebook) && (
          <ul className={styles.social}>
            {social.instagram && (
              <li>
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  {/* 線画は24pxグリッドの内側17px分なので、見た目32px（モック実測）になるよう44で描く */}
                  <InstagramIcon size={44} />
                  <span className="visually-hidden">Instagram（新しいタブで開く）</span>
                </a>
              </li>
            )}
            {social.facebook && (
              <li>
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  {/* 円は24pxグリッドの内側20px分。見た目33px（モック実測）になるよう40で描く */}
                  <FacebookIcon size={40} />
                  <span className="visually-hidden">Facebook（新しいタブで開く）</span>
                </a>
              </li>
            )}
          </ul>
          )}
          <a href="#top" className={styles.toTop}>
            {/* モックの矢印は線が太い（約2px）ため、線幅だけ既定の1.8から上げる */}
            <ArrowUpIcon size={20} strokeWidth={2.4} className={styles.toTopArrow} />
            <span className="visually-hidden">ページ上部へ戻る</span>
          </a>
        </div>
        <p className={styles.copyright}>
          <small>{company.copyright}</small>
        </p>
      </Container>
    </footer>
  );
}
