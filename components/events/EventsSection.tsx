import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { site } from "@/data/site";

import { EventCard } from "./EventCard";
import styles from "./EventsSection.module.css";

/** PHASE 1: 構造のみ。Sub-Agent 05（Staff）が仕上げる */
export function EventsSection() {
  const { events } = site;
  return (
    <section className={styles.section} aria-labelledby="events-title">
      <Container>
        <SectionTitle id="events-title" variant="mark">
          {events.title}
        </SectionTitle>
        <div className={styles.row}>
          <ul className={styles.grid}>
            {events.posts.map((post) => (
              <li key={post.href}>
                <EventCard post={post} />
              </li>
            ))}
          </ul>
          <Button href={events.more.href} variant="outline" size="sm" className={styles.more}>
            {events.more.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
