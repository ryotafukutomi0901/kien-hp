import type { HeroContent } from "@/types/site";

// 担当: Sub-Agent 02（Hero）。写真の position（object-position）調整はこのファイルで行う
// 文言は旧サイトの原文のまま（要約・言い換えをしない）。主コピーは「ご挨拶」の「人を大切にする会社になる」、リードは総合HPトップの紹介文の1文目。配列の区切りは改行位置だけ
export const hero: HeroContent = {
  title: ["人を大切にする", "会社になる"],
  lead: ["富士市にて訪問・居宅介護事業、", "家事支援事業を", "行っております。"],
  cta: { label: "私たちの想いを見る", href: "/about#company" },
  // 生成画像（reference/generated-originals/hero.png を scripts/optimize-images.py で最適化）
  image: {
    src: "/images/hero/hero.jpg",
    alt: "",
    position: "75% 40%",
  },
};
