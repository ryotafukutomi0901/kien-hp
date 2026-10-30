import type { AboutContent } from "@/types/site";

// 担当: Sub-Agent 04（About）。写真の position はこのファイルで調整する
// 本文は旧サイト「経営理念」3か条の原文のまま（要約しない。docs/CONTENT_SOURCE.md 3章）
// 2026-10-27: 手本（日本テレビアート）の「Who We Are」の型にした。欧文ラベル＋中央の大きな文＋横に流れる色のタイル＋ご挨拶の文。
// タイルの写真はすべて仮画像（docs/PHOTO_SHOTLIST.md）。撮影した写真が届いたら同じファイル名で差し替える
export const about: AboutContent = {
  title: "経営理念",
  en: "Philosophy",
  body: ["社員全員の物心両面の倖せを追求すること", "お客様一人ひとりに心を込めて向き合うこと", "事業を通じて地域社会の発展に貢献し続けること"],
  cta: { label: "会社案内を見る", href: "/about#company" },
  gallery: [
    { image: { src: "/images/services/home-visit.jpg", alt: "", position: "50% 55%" }, tone: "yellow", shape: "wide" },
    { image: { src: "/images/recruit/recruit.jpg", alt: "", position: "30% 40%" }, tone: "orange", shape: "tall" },
    { image: { src: "/images/services/care-plan.jpg", alt: "", position: "50% 55%" }, tone: "green", shape: "square" },
    { image: { src: "/images/events/2026-07-26-curry-party.jpg", alt: "", position: "50% 20%" }, tone: "blue", shape: "wide" },
    { image: { src: "/images/services/home-help.jpg", alt: "", position: "50% 60%" }, tone: "yellow", shape: "square" },
    { image: { src: "/images/about/about-oval.jpg", alt: "", position: "50% 60%" }, tone: "green", shape: "tall" },
    { image: { src: "/images/recruit/staff-day.jpg", alt: "", position: "40% 50%" }, tone: "orange", shape: "wide" },
  ],
};
