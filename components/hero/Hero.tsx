import type { CSSProperties } from "react";
import Image from "next/image";

import { Button } from "@/components/common/Button";
import { Parallax } from "@/components/motion/Parallax";
import { site } from "@/data/site";

import { HeroInstagram } from "./HeroInstagram";
import styles from "./Hero.module.css";

/**
 * トップのファーストビュー（2026-10-28 CEO指示）。
 * 「人を大切にする会社になる」をコンセプトに、それに合う写真を右に大きく置く。左に見出し・リード・ボタン。
 * 写真の後ろにロゴの色の淡い面（傾けた角丸と丸）を重ね、角に会社のマークの丸いバッジ（周りを欧文が回る）を添える。
 * 背景の色の丸は全ページ共通（SiteBackground）で、ここでは描かない。右下に Instagram へのカード。
 *
 * トップを開いたときは、手本（日本テレビアート）のヒーローと同じ順番で出てくる（2026-10-28 CEO指示。lib/intro.ts）。
 * 見出しとリードは1文字ずつの箱に分け、合図のあと順番にせり上がる。読み上げは見出しの aria-label とリードの隠し文で、文のまま読む。
 */

interface Char {
  text: string;
  order: number;
}

/** 句読点・中黒は前の文字と同じ箱に入れる（1文字ずつの箱にしても、行の頭に来ないように） */
const CLINGS = /[、。・，．）」』！？]/;

/**
 * 見出し・リードを1文字ずつの箱に分け、せり上がる順番を振る。手本と同じ数え方:
 * 見出しの2行目は1行目の最後の文字と同時に始め、リードは見出しの後に5文字ぶん間をあけ、2行を続けて数える。
 */
function splitIntoChars(title: string[], lead: string[]) {
  let order = 0;
  const split = (line: string) => {
    const chars: Char[] = [];
    for (const ch of Array.from(line)) {
      const prev = chars[chars.length - 1];
      if (prev && CLINGS.test(ch)) prev.text += ch;
      else chars.push({ text: ch, order: order++ });
    }
    return chars;
  };
  const titleLines: Char[][] = [];
  for (const [i, line] of title.entries()) {
    if (i > 0) order -= 1;
    titleLines.push(split(line));
  }
  order += 5;
  const leadLines = lead.map(split);
  return { titleLines, leadLines };
}

function Chars({ chars }: { chars: Char[] }) {
  return chars.map(({ text, order }) => (
    <span key={order} className={styles.char} style={{ "--i": order } as CSSProperties}>
      {text}
    </span>
  ));
}

export function Hero() {
  const { hero, company } = site;
  const mark = company.logoMark;
  const { titleLines, leadLines } = splitIntoChars(hero.title, hero.lead);
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 id="hero-title" className={styles.title} aria-label={hero.title.join("")}>
            {titleLines.map((chars, i) => (
              <span key={i} className={styles.line} aria-hidden="true" style={{ animationDelay: `${200 + i * 140}ms` }}>
                <Chars chars={chars} />
              </span>
            ))}
          </h1>
          <p className={styles.lead}>
            <span className="visually-hidden">{hero.lead.join("")}</span>
            {leadLines.map((chars, i) => (
              <span key={i} className={styles.leadLine} aria-hidden="true">
                <Chars chars={chars} />
              </span>
            ))}
          </p>
          <div className={styles.actions}>
            <Button href={hero.cta.href} size="md" effect="chevron">
              {hero.cta.label}
            </Button>
            {hero.secondaryCta && (
              <Button href={hero.secondaryCta.href} size="md" effect="chevron">
                {hero.secondaryCta.label}
              </Button>
            )}
          </div>
        </div>

        <figure className={styles.visual}>
          {/* スクロールで奥行きを出す: ピンクの面は上へ、黄と緑の丸は下へ、写真は少しだけ下へ（GSAP） */}
          <Parallax className={styles.layer} distance={-60} fromTop>
            <span className={styles.blobPink} aria-hidden="true" />
          </Parallax>
          <Parallax className={styles.layer} distance={110} fromTop>
            <span className={styles.blobYellow} aria-hidden="true" />
            <span className={styles.blobMint} aria-hidden="true" />
          </Parallax>
          <Parallax className={styles.photoLayer} distance={36} fromTop>
            <div className={styles.photo}>
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                preload
                sizes="(min-width: 1024px) 58vw, 100vw"
                className={styles.image}
                style={{ objectPosition: hero.image.position }}
              />
            </div>
          </Parallax>
          <span className={styles.badge} aria-hidden="true">
            <svg viewBox="0 0 120 120" className={styles.badgeText}>
              <defs>
                <path id="hero-badge-circle" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
              </defs>
              {/*
                欧文は1周ぶんを、円周（半径44 = 上の d と同じ）ちょうどに割り付ける。2回くり返していたときは円周より長く、
                はみ出た分が継ぎ目で切れて「KIEN · F KIEN」と重なっていた（2026-10-28 修正）。
                末尾の空白も1文字として数え、継ぎ目の「· KIEN」の間をほかの区切りと同じにする（xmlSpace）
              */}
              <text xmlSpace="preserve">
                <textPath href="#hero-badge-circle" textLength={2 * Math.PI * 44} lengthAdjust="spacing">
                  {hero.badge}
                </textPath>
              </text>
            </svg>
            {mark && <Image src={mark.src} alt="" width={268} height={318} className={styles.badgeMark} />}
          </span>
        </figure>
      </div>

      <HeroInstagram />
    </section>
  );
}
