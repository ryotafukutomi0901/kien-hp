import type { AboutContent } from "@/types/site";

// 担当: Sub-Agent 04（About）。写真の position はこのファイルで調整する
// 本文は旧サイト「経営理念」3か条の要約（原文は docs/CONTENT_SOURCE.md 3章）
export const about: AboutContent = {
  title: "私たちのこと",
  body: ["社員全員の倖せを追求し、", "お客様一人ひとりに、心を込めて。", "地域の発展に貢献し続けます。"],
  cta: { label: "会社案内", href: "/about#company" },
  // 生成画像。富士山はヒーロー・最終CTA・お知らせだけに使うため、ここでは写さない（docs/IMAGE_PROMPTS.md）
  background: { src: "/images/about/about-bg.jpg", alt: "", position: "50% 60%" },
  photo: {
    src: "/images/about/about-oval.jpg",
    alt: "新緑の木々が並ぶ、朝の光の住宅街の小道",
    position: "50% 60%",
  },
};
