import { ArrowUpIcon } from "@/components/icons";

import styles from "./PolicyToc.module.css";

/**
 * プライバシーポリシーの目次（ページ内リンク）。
 * 項目が8つあるので、640px以上は2段組み（左の段を上から下へ読んでから右の段へ。CSSの段組みで順序を保つ）。
 * 下向きの矢印は、事業所・会社概要ページの目次（components/pages/about/JumpLinks）と同じ「このページの下へ移動する」の印。
 */
export function PolicyToc({ label, items }: { label: string; items: { id: string; title: string }[] }) {
  return (
    <nav aria-labelledby="privacy-toc-label" className={styles.toc}>
      <p id="privacy-toc-label" className={styles.label}>
        {label}
      </p>
      {/* list-style: none でも一覧として読み上げられるよう role="list" を付ける（Safari） */}
      <ol className={styles.list} role="list">
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            <a href={`#${item.id}`} className={styles.link}>
              <ArrowUpIcon size={14} className={styles.arrow} />
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
