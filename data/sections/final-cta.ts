import type { FinalCtaContent } from "@/types/site";

// 担当: Sub-Agent 08（Final CTA）。写真の position はこのファイルで調整する
// 見出しは旧サイト「経営理念」末尾の原文のまま（「そして、この地域になくてはならない企業実現を全員で目指します。」）
// 2026-10-27: 手本（日本テレビアート）の「Contact Us!」の帯にした。見出しの下に、経営理念の結びの一文を添える
export const finalCta: FinalCtaContent = {
  en: "Contact Us!",
  heading: "お問い合わせ",
  title: ["そして、この地域に", "なくてはならない企業実現を", "全員で目指します。"],
  cta: { label: "お問い合わせはこちら", href: "/contact" },
};
