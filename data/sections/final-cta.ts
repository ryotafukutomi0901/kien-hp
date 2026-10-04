import type { FinalCtaContent } from "@/types/site";

// 担当: Sub-Agent 08（Final CTA）。写真の position はこのファイルで調整する
// 見出しは旧サイト「経営理念」末尾の「この地域になくてはならない企業実現を全員で目指します」
export const finalCta: FinalCtaContent = {
  title: ["この地域に、", "なくてはならない会社へ。"],
  cta: { label: "お問い合わせはこちら", href: "/contact" },
  image: { src: "/images/cta/cta-fuji.jpg", alt: "", position: "67% 54%" },
};
