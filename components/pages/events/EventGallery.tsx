"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { ArrowRightIcon, CloseIcon } from "@/components/icons";
import { eventPhotoSrc } from "@/data/records/events";
import { getLenis } from "@/lib/lenis";
import type { EventPhoto } from "@/types/site";

import styles from "./EventGallery.module.css";

/**
 * 会社行事の下層ページの写真（手本: ハウステンボス採用サイトの記事。大きな写真 → 本文 → 写真）。
 * 先頭の写真を大きく → 本文（children）→ 全部の写真の一覧。どの写真も押すと画面いっぱいに拡大する。
 * 拡大は <dialog>（Esc で閉じる・背景の操作を止める）。左右の矢印キーとボタンで前後の写真へ。
 * 開いている間は慣性スクロール（Lenis）を止め、閉じたら押した写真へフォーカスを戻す（dialog の標準の動き）。
 */
export function EventGallery({
  id,
  title,
  photos,
  children,
}: {
  id: string;
  title: string;
  photos: EventPhoto[];
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const count = photos.length;

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
    getLenis()?.stop();
  };

  const close = () => dialogRef.current?.close();

  const step = useCallback((delta: number) => setIndex((i) => (i === null ? i : (i + delta + count) % count)), [count]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setIndex(null);
      getLenis()?.start();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("keydown", onKey);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("keydown", onKey);
    };
  }, [step]);

  const current = index === null ? null : photos[index];
  const lead = photos[0];

  return (
    <div className={styles.gallery}>
      {lead && (
        <button type="button" className={styles.lead} onClick={() => open(0)}>
          <Image
            src={eventPhotoSrc(id, 0)}
            alt={lead.alt}
            width={lead.width}
            height={lead.height}
            sizes="(min-width: 1280px) 860px, (min-width: 1024px) 64vw, 92vw"
            priority
            className={styles.leadImage}
          />
          <span className="visually-hidden">（写真を拡大する）</span>
        </button>
      )}

      <div className={styles.body}>{children}</div>

      {count > 1 && (
        <section className={styles.photos} aria-labelledby={`${id}-photos`}>
          <h2 id={`${id}-photos`} className={styles.photosTitle}>
            写真<span className={styles.photosCount}>{count}枚</span>
          </h2>
          <ul className={styles.grid}>
            {photos.map((photo, i) => (
              <li key={i} data-reveal style={{ "--reveal-delay": `${(i % 3) * 150}ms` } as CSSProperties}>
                <button type="button" className={styles.thumb} onClick={() => open(i)}>
                  <Image
                    src={eventPhotoSrc(id, i)}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 30vw, 46vw"
                    className={styles.thumbImage}
                  />
                  <span className="visually-hidden">（写真を拡大する）</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={`${title}の写真`}
        data-lenis-prevent
        onClick={(e) => {
          // 写真や暗い地を押したら閉じる（写真の枠は押せないようにしてあり、押すと dialog 自身に届く）
          if (e.target === e.currentTarget) close();
        }}
      >
        {current && index !== null && (
          <figure className={styles.figure}>
            <div className={styles.stage}>
              <Image key={index} src={eventPhotoSrc(id, index)} alt={current.alt} fill sizes="92vw" className={styles.full} />
            </div>
            <figcaption className={styles.caption}>
              <span className={styles.counter}>
                {index + 1} / {count}
              </span>
              {current.alt}
            </figcaption>
          </figure>
        )}
        <button type="button" className={`${styles.control} ${styles.closeButton}`} onClick={close}>
          <CloseIcon size={22} />
          <span className="visually-hidden">閉じる</span>
        </button>
        {count > 1 && (
          <>
            <button type="button" className={`${styles.control} ${styles.prev}`} onClick={() => step(-1)}>
              <ArrowRightIcon size={22} className={styles.prevIcon} />
              <span className="visually-hidden">前の写真</span>
            </button>
            <button type="button" className={`${styles.control} ${styles.next}`} onClick={() => step(1)}>
              <ArrowRightIcon size={22} />
              <span className="visually-hidden">次の写真</span>
            </button>
          </>
        )}
      </dialog>
    </div>
  );
}
