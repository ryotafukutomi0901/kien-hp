import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { site } from "@/data/site";

import { StaffCard } from "./StaffCard";
import styles from "./StaffSection.module.css";

/** PHASE 1: 構造のみ。Sub-Agent 05（Staff）が仕上げる */
export function StaffSection() {
  const { staff } = site;
  return (
    <section className={styles.section} aria-labelledby="staff-title">
      <Container>
        <SectionTitle id="staff-title" variant="mark">
          {staff.title}
        </SectionTitle>
        <div className={styles.row}>
          <ul className={styles.grid}>
            {staff.posts.map((post) => (
              <li key={post.href}>
                <StaffCard post={post} />
              </li>
            ))}
          </ul>
          <Button href={staff.more.href} variant="outline" size="sm" className={styles.more}>
            {staff.more.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
