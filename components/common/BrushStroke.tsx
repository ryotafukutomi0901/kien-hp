import styles from "./BrushStroke.module.css";

/**
 * 手書き見出しの下に引く緑のペン線（モックの「私たちのサービス」「私たちのこと」「ともに」の下線）。
 * 置き場所は親が決める（SectionTitle の brush、Final CTA の見出しなど）。装飾なのでaria-hidden。
 */
export function BrushStroke({ className }: { className?: string }) {
  return (
    <svg
      className={className ? `${styles.stroke} ${className}` : styles.stroke}
      viewBox="0 0 120 14"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 11.5C24 10.4 52 8.2 80 5.6c13-1.2 25-2.4 37-3.6" />
      <path d="M10 12.4c22-1.4 47-3.4 72-5.6" className={styles.thin} />
    </svg>
  );
}
