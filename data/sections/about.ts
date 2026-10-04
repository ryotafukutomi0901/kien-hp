import type { AboutContent } from "@/types/site";

// 担当: Sub-Agent 04（About）。写真の position はこのファイルで調整する
// 本文は旧サイト「経営理念」3か条の要約（原文は docs/CONTENT_SOURCE.md 3章）
export const about: AboutContent = {
  title: "私たちのこと",
  body: ["社員全員の倖せを追求し、", "お客様一人ひとりに、心を込めて。", "地域の発展に貢献し続けます。"],
  cta: { label: "会社案内", href: "/about#company" },
  // 仮画像。富士山の写真は旧サイトに無いため、確定させる場合は新たに用意する（docs/IMAGE_QUALITY.md）
  background: { src: "/images/about/about-fuji.jpg", alt: "", position: "50% 55%" },
  photo: {
    src: "/images/about/about-fuji.jpg",
    alt: "富士山と富士市の街並み",
    position: "85% 50%",
  },
};
