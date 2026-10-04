import Link from "next/link";
import type { ReactNode } from "react";

import type { PolicyBlock, PolicyInline, PolicyLink } from "@/data/pages/privacy";

import styles from "./PolicyText.module.css";

/** 別サイトへのリンクの印（四角から右上へ抜ける矢印）。見た目の補足なので読み上げない */
function ExternalIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={styles.externalIcon}
    >
      <path d="M14 4h6v6M20 4l-8.5 8.5M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
    </svg>
  );
}

function PolicyAnchor({ link, className, newTabNote }: { link: PolicyLink; className: string; newTabNote: string }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        <span>{link.label}</span>
        <ExternalIcon />
        <span className="visually-hidden">{newTabNote}</span>
      </a>
    );
  }
  // ページ内リンク（#id）は素の a、別ページは next/link
  if (link.href.startsWith("#")) {
    return (
      <a href={link.href} className={className}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

function renderInline(text: string | PolicyInline[], newTabNote: string) {
  if (typeof text === "string") return text;
  return text.map((part, i) =>
    typeof part === "string" ? (
      part
    ) : (
      <PolicyAnchor key={i} link={part} className={styles.inlineLink} newTabNote={newTabNote} />
    ),
  );
}

/**
 * プライバシーポリシーの1節の本文（段落・箇条・単独のリンク・お問い合わせ窓口）。
 * 行の長さは40em（約37字）までに抑える。お問い合わせ窓口は site.company から組んだものを contactWindow で受け取る。
 */
export function PolicyText({
  blocks,
  contactWindow,
  newTabNote,
}: {
  blocks: PolicyBlock[];
  contactWindow?: ReactNode;
  newTabNote: string;
}) {
  return (
    <div className={styles.text}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return <p key={i}>{renderInline(block.text, newTabNote)}</p>;
          case "list":
            return (
              <ul key={i} className={styles.list} role="list">
                {block.items.map((item) => (
                  <li key={item} className={styles.item}>
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "link":
            return (
              <p key={i}>
                <PolicyAnchor link={block.link} className={styles.blockLink} newTabNote={newTabNote} />
              </p>
            );
          case "contactWindow":
            return <div key={i}>{contactWindow}</div>;
        }
      })}
    </div>
  );
}
