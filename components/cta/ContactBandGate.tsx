"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * 「Contact Us!」の帯（FinalCta）を、お問い合わせページ以外の全ページの最後に出す（手本: 日本テレビアート）。
 * お問い合わせページでは同じページへのリンクになるので出さない。
 */
export function ContactBandGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/contact") return null;
  return children;
}
