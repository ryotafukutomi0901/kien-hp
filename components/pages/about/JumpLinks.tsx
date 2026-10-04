import { ArrowUpIcon } from "@/components/icons";
import type { Link } from "@/types/site";

import styles from "./JumpLinks.module.css";

/** ページ冒頭の目次（ページ内リンク）。下向きの矢印で「このページの下へ移動する」ことを示す */
export function JumpLinks({ links }: { links: Link[] }) {
  return (
    <nav aria-label="このページの目次">
      <ul className={styles.list} role="list">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={styles.link}>
              <span>{link.label}</span>
              <ArrowUpIcon size={14} className={styles.arrow} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
