import Image from "next/image";

import { BrushStroke } from "@/components/common/BrushStroke";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { site } from "@/data/site";

import styles from "./FinalCta.module.css";

/**
 * ページ最後の問い合わせ帯（定義書 docs/sections/08-final-cta.md）。
 * 淡い空色の地に、右から富士山の写真が溶け込む。左に手書きの見出し2行（右上がり）、その右にボタン。
 * 写真は装飾なので空alt＋aria-hidden。見出しはh2で、ルートの aria-labelledby から参照する。
 */
export function FinalCta() {
  const { finalCta } = site;
  const lastLine = finalCta.title.length - 1;
  return (
    <section className={styles.section} aria-labelledby="final-cta-title">
      <div className={styles.media} aria-hidden="true">
        <Image
          src={finalCta.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 432px, (min-width: 640px) 36vw, 100vw"
          className={styles.image}
          style={{ objectPosition: finalCta.image.position }}
        />
      </div>
      <Container className={styles.inner}>
        <h2 id="final-cta-title" className={styles.title}>
          {finalCta.title.map((line, i) => (
            <span key={line} className={styles.line}>
              {line}
              {/* モックの1行目末尾（読点の右）の小さなペン先と、2行目「ともに。」の下のペン線 */}
              {i === 0 && lastLine > 0 && <BrushStroke className={styles.flick} />}
              {i === lastLine && <BrushStroke className={styles.stroke} />}
            </span>
          ))}
        </h2>
        <Button href={finalCta.cta.href} size="md" className={styles.button}>
          {finalCta.cta.label}
        </Button>
      </Container>
    </section>
  );
}
