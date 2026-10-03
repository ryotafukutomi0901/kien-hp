import Link from "next/link";

import { Container } from "@/components/common/Container";
import { Logo } from "@/components/common/Logo";
import { ArrowUpIcon, FacebookIcon, InstagramIcon } from "@/components/icons";
import { site } from "@/data/site";

import styles from "./Footer.module.css";

/** PHASE 1: 構造のみ。見た目はSub-Agent 09（Footer）が仕上げる */
export function Footer() {
  const { company, nav, social } = site;
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.brand}>
          <Logo company={company} tone="light" />
          <address className={styles.address}>
            〒{company.postalCode} {company.address}
          </address>
        </div>
        <nav aria-label="フッターナビゲーション">
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
        <ul className={styles.social}>
          {social.instagram && (
            <li>
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <InstagramIcon size={28} />
                <span className="visually-hidden">Instagram（新しいタブで開く）</span>
              </a>
            </li>
          )}
          {social.facebook && (
            <li>
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FacebookIcon size={28} />
                <span className="visually-hidden">Facebook（新しいタブで開く）</span>
              </a>
            </li>
          )}
        </ul>
        <a href="#top" className={styles.toTop}>
          <ArrowUpIcon size={20} />
          <span className="visually-hidden">ページの先頭へ戻る</span>
        </a>
        <p className={styles.copyright}>{company.copyright}</p>
      </Container>
    </footer>
  );
}
