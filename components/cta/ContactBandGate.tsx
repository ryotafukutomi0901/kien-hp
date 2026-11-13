"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * 「Contact Us!」の帯（FinalCta）を、相談につながるページの最後にだけ出す（手本: 日本テレビアート）。
 * 2026-11-13 CEO指示「下層ページに料金とお問い合わせが多すぎる。必要なところだけ」で、全ページ（お問い合わせを除く）から
 * トップ・会社概要・3事業のページだけにした。採用は応募の欄があり、ニュース・会社行事・プライバシー・404には要らない。
 */
function needsContactBand(pathname: string) {
  return pathname === "/" || pathname === "/about" || pathname.startsWith("/services/");
}

export function ContactBandGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (!needsContactBand(pathname)) return null;
  return children;
}
