import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { EventCard } from "@/components/events/EventCard";
import { InstagramIcon } from "@/components/icons";
import { site } from "@/data/site";
import type { Tone } from "@/types/site";
import type { CSSProperties } from "react";

import styles from "./CommunitySection.module.css";

const TONES: Tone[] = ["orange", "green", "yellow", "blue"];

/**
 * Instagram と会社行事（2026-10-21 打ち合わせ:「デスクトップ、タブレットは2カラム、スマホは縦列でInstaと会社行事」）。
 * 見た目は手本（日本テレビアート）の「Works」の色の面のカード。帯は淡いミント（2026-10-28 黒い帯から変更）。
 * Instagram のURL（site.social.instagram）が未設定の間は Instagram の列を出さず、会社行事だけを並べる。
 */
export function CommunitySection() {
  const { events, social, instagram } = site;
  const instagramUrl = social.instagram;
  return (
    <section
      className={[styles.section, instagramUrl ? styles.withInstagram : styles.eventsOnly].join(" ")}
      aria-labelledby="events-title"
    >
      <Container>
        <div className={styles.head}>
          <SectionTitle id="events-title" en={events.en}>
            {events.title}
          </SectionTitle>
          <Button href={events.more.href} variant="white" size="sm">
            {events.more.label}
          </Button>
        </div>
        <div className={styles.body}>
          {instagramUrl && (
            <div className={styles.instagram} data-reveal>
              <span className={styles.icon} aria-hidden="true">
                <InstagramIcon size={48} strokeWidth={1.6} />
              </span>
              <p className={styles.instagramEn} aria-hidden="true">
                {instagram.title}
              </p>
              <p className={styles.instagramText}>
                {instagram.body.map((line) => (
                  <span key={line} className={styles.line}>
                    {line}
                  </span>
                ))}
              </p>
              <Button href={instagramUrl} variant="white" size="md">
                {instagram.cta}
              </Button>
            </div>
          )}
          <ul className={styles.list}>
            {events.posts.map((post, i) => (
              <li key={post.href} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}>
                <EventCard post={post} tone={TONES[i % TONES.length]} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
