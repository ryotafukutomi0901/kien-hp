import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "./Container";
import styles from "./PageIntro.module.css";
import { SectionTitle } from "./SectionTitle";

interface Crumb {
  label: string;
  href: string;
}

/**
 * 下層ページの冒頭（手本: 日本テレビアートの下層ページ。グレーの地にパンくず、大きな欧文＋日本語の見出し）。
 * 右上にロゴの点を思わせる色の丸を飾る。見出し（h1）の読み上げは日本語だけ（欧文は飾り）。
 */
export function PageIntro({
  title,
  en,
  subtitle,
  crumbs = [],
  crumbLabel,
  children,
}: {
  title: ReactNode;
  /** 欧文の大見出し（「Company」「Recruit」など） */
  en?: string;
  subtitle?: ReactNode;
  /** トップと現在のページの間の階層（例: 事業内容） */
  crumbs?: Crumb[];
  /** パンくずの現在地の表記。title が文字列でないときに指定する */
  crumbLabel?: string;
  children?: ReactNode;
}) {
  const current = crumbLabel ?? (typeof title === "string" ? title : "");
  return (
    <section className={styles.intro}>
      <span className={styles.decor} aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <Container className={styles.inner}>
        <nav aria-label="パンくずリスト" className={styles.crumbs}>
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            {crumbs.map((crumb) => (
              <li key={crumb.href}>
                <Link href={crumb.href}>{crumb.label}</Link>
              </li>
            ))}
            <li aria-current="page">{current}</li>
          </ol>
        </nav>
        <SectionTitle as="h1" en={en} subtitle={subtitle}>
          {title}
        </SectionTitle>
        {children && <div className={styles.body}>{children}</div>}
      </Container>
    </section>
  );
}
