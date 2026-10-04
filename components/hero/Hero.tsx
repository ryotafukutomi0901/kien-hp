import Image from "next/image";

import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { LeafDecoration } from "@/components/common/LeafDecoration";
import { site } from "@/data/site";

import styles from "./Hero.module.css";

/*
 * 写真の輪郭（clipPathUnits="objectBoundingBox" なので 0〜1 の比率。写真の箱の大きさに追従する）。
 * WAVE_LG はモックの下端を 1440×680 に換算した実測点から作った（誤差は1440幅で最大3px）。
 *   上端: ごく浅い弧（左端10px・中央0・右端6px）
 *   下端: 左端 495 → 左の肩で急に下がり 557 で平ら（x 250〜440）→ 右へ向かって下がり続け、右端で 680（写真の下端）
 * WAVE_SM はモバイル用。同じ形のまま振幅を 0.32 倍にしたもの。上端は弧なし（写真の上はフェードで溶かす）。
 */
const WAVE_LG =
  "M0 0.0147C0.3333 -0.0044 0.6667 -0.0044 1 0.0088L1 1" +
  "C0.9769 0.9978 0.9016 0.9936 0.8611 0.9868C0.8206 0.9799 0.7917 0.9716 0.7569 0.9588" +
  "C0.7222 0.9461 0.6933 0.9262 0.6528 0.9103C0.6123 0.8944 0.5625 0.8775 0.5139 0.8632" +
  "C0.4653 0.849 0.412 0.8324 0.3611 0.825C0.3102 0.8176 0.2512 0.8221 0.2083 0.8191" +
  "C0.1655 0.8162 0.1319 0.8145 0.1042 0.8074C0.0764 0.8002 0.059 0.7897 0.0417 0.7765" +
  "C0.0243 0.7632 0.0069 0.736 0 0.7279Z";

const WAVE_SM =
  "M0 0L1 0L1 1" +
  "C0.9769 0.9993 0.9016 0.998 0.8611 0.9958C0.8206 0.9936 0.7917 0.9909 0.7569 0.9868" +
  "C0.7222 0.9827 0.6933 0.9764 0.6528 0.9713C0.6123 0.9662 0.5625 0.9608 0.5139 0.9562" +
  "C0.4653 0.9517 0.412 0.9464 0.3611 0.944C0.3102 0.9416 0.2512 0.9431 0.2083 0.9421" +
  "C0.1655 0.9412 0.1319 0.9406 0.1042 0.9384C0.0764 0.9361 0.059 0.9327 0.0417 0.9285" +
  "C0.0243 0.9242 0.0069 0.9155 0 0.9129Z";

/**
 * トップのファーストビュー。左にコピー、右に富士山の写真（Z型の視線導線）。
 * 写真は下端を白い波で切り、右側ほど低く伸ばして Services の上端に重ねる（--hero-bleed）。
 * 波の下は透明なので、Services の地色（--color-bg-soft）と継ぎ目なくつながる。
 */
export function Hero() {
  const { hero } = site;
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media}>
        <div className={styles.photo}>
          {/* 写真は高さ基準で拡大されるため、表示される画像の幅は画面幅より広い（モバイル約2.4倍・タブレット約1.6倍） */}
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            preload
            sizes="(min-width: 1280px) 110vw, (min-width: 640px) 160vw, 240vw"
            className={styles.image}
            style={{ objectPosition: hero.image.position }}
          />
        </div>
        {/* 左の中ほどの葉っぱは写真の内側に置き、波の線で一緒に切る */}
        <LeafDecoration variant="bottom-left" className={styles.leafMidLeft} />
      </div>

      {/* 上の角の葉っぱ。Hero の箱で切る（モバイルでは写真が下側に寄るため、写真とは別に置く） */}
      <div className={styles.decorTop}>
        <LeafDecoration variant="top-left" className={styles.leafTopLeft} />
        <LeafDecoration variant="top-right" className={styles.leafTopRight} />
      </div>

      <Container className={styles.content}>
        <h1 id="hero-title" className={styles.title}>
          {hero.title.map((line) => (
            <span key={line} className={styles.line}>
              {line}
            </span>
          ))}
        </h1>
        <p className={styles.lead}>
          {hero.lead.map((line) => (
            <span key={line} className={styles.line}>
              {line}
            </span>
          ))}
        </p>
        <Button href={hero.cta.href} size="lg" className={styles.cta}>
          {hero.cta.label}
        </Button>
      </Container>

      {/* 右下の房。波の線をまたいで Services の上端にかかる */}
      <LeafDecoration variant="bottom-right" className={styles.leafCornerWide} />
      <LeafDecoration variant="top-right" className={styles.leafCornerTall} />
      <LeafDecoration variant="bottom-left" flip className={styles.leafCornerLow} />

      <svg className={styles.defs} width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="hero-wave-sm" clipPathUnits="objectBoundingBox">
            <path d={WAVE_SM} />
          </clipPath>
          <clipPath id="hero-wave-lg" clipPathUnits="objectBoundingBox">
            <path d={WAVE_LG} />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
}
