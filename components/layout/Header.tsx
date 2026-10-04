import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { Logo } from "@/components/common/Logo";
import { site } from "@/data/site";

import styles from "./Header.module.css";
import { MobileMenu, NavItems } from "./MobileMenu";

/**
 * サイト共通ヘッダー（参考モック 0,0–869,62）。
 * - 1280px以上: ロゴ／ナビ7項目（ロゴとCTAの間で中央）／お問い合わせ
 * - 640〜1279px: ロゴ／お問い合わせ／メニューボタン（7項目＋CTAが1行に収まらないため）
 * - 640px未満: ロゴ／メニューボタン（お問い合わせはメニュー内）
 */
export function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Logo company={site.company} />
        <nav aria-label="グローバルナビゲーション" className={styles.nav}>
          <ul className={styles.navList}>
            <NavItems nav={site.nav} linkClassName={styles.navLink} />
          </ul>
        </nav>
        <div className={styles.actions}>
          <Button href={site.contact.href} size="md" className={styles.contact}>
            {site.contact.label}
          </Button>
          <MobileMenu nav={site.nav} contact={site.contact} />
        </div>
      </Container>
    </header>
  );
}
