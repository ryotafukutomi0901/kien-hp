import Link from "next/link";

import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { Logo } from "@/components/common/Logo";
import { site } from "@/data/site";

import styles from "./Header.module.css";
import { MobileMenu } from "./MobileMenu";

/** PHASE 1: 構造のみ。参考画像に合わせた見た目はSub-Agent 01（Header）が仕上げる */
export function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Logo company={site.company} />
        <nav aria-label="グローバルナビゲーション" className={styles.nav}>
          <ul className={styles.navList}>
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button href={site.contact.href} size="md" className={styles.contact}>
          {site.contact.label}
        </Button>
        <MobileMenu nav={site.nav} contact={site.contact} />
      </Container>
    </header>
  );
}
