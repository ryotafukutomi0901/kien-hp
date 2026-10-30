import Link from "next/link";

import { Container } from "@/components/common/Container";
import { Logo } from "@/components/common/Logo";
import { TelLink } from "@/components/common/TelLink";
import { ArrowUpIcon, InstagramIcon } from "@/components/icons";
import { site } from "@/data/site";

import styles from "./Footer.module.css";

/**
 * サイト共通フッター（手本: 日本テレビアート）。白い地。
 * 左にロゴ、右に欧文の見出し（Company / Service …）ごとのサイトマップ。区切り線の下に所在地・電話。
 * その下に、上下を線で挟んだ段（左に Official SNS、右にプライバシーポリシーと「Page Top」のピル）、最後にコピーライト。
 * Official SNS は Instagram の URL が未入手の間も仮のリンク（#）で出す（ヒーローの Instagram のカードと同じ扱い）。
 * マウスを乗せたときの動きは手本と同じ時間・緩急（Footer.module.css。docs/REFERENCE_NTVART.md 第6節）。
 */
export function Footer() {
  const { company, footerNav, legal, social } = site;
  const instagramHref = social.instagram ?? "#";
  const instagramExternal = Boolean(social.instagram);
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <Logo company={company} className={styles.logo} />
          <nav aria-label="フッターナビゲーション" className={styles.nav}>
            {footerNav.map((group) => (
              <div key={group.en} className={styles.group}>
                <p className={styles.groupTitle}>
                  <span aria-hidden="true">{group.en}</span>
                  <span className="visually-hidden">{group.title}</span>
                </p>
                <ul className={styles.links}>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={styles.link}>
                        <span className={styles.linkText}>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.office}>
          <p className={styles.officeTitle}>
            <span aria-hidden="true">Office</span>
            <span className="visually-hidden">所在地</span>
          </p>
          <address className={styles.address}>
            <span className={styles.companyName}>
              {company.legalForm}
              {company.name}
            </span>
            {company.postalCode && <span>〒{company.postalCode}</span>}
            <span>{company.address}</span>
            <span className={styles.contactLine}>
              TEL <TelLink tel={company.tel} /> ／ FAX {company.fax}
            </span>
          </address>
        </div>

        <div className={styles.bottom}>
          <p className={styles.sns}>
            <span className={styles.snsTitle}>Official SNS</span>
            <a
              href={instagramHref}
              className={styles.snsLink}
              {...(instagramExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <InstagramIcon size={28} />
              <span className="visually-hidden">Instagram{instagramExternal && "（新しいタブで開く）"}</span>
            </a>
          </p>
          <div className={styles.bottomEnd}>
            {legal.length > 0 && (
              <ul className={styles.legal}>
                {legal.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.legalLink}>
                      <span className={styles.legalText}>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <a href="#top" className={styles.toTop}>
              Page Top
              <ArrowUpIcon size={14} strokeWidth={2.4} />
              <span className="visually-hidden">（ページ上部へ戻る）</span>
            </a>
          </div>
        </div>
        <p className={styles.copyright}>
          <small>{company.copyright}</small>
        </p>
      </Container>
    </footer>
  );
}
