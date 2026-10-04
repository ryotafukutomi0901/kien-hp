import type { HeroContent } from "@/types/site";

// 担当: Sub-Agent 02（Hero）。写真の position（object-position）調整はこのファイルで行う
// 主コピーは旧サイト「ご挨拶」の「人を大切にする会社になる」。リードは旧サイトの方針・紹介文の要約
export const hero: HeroContent = {
  title: ["人を大切にする", "会社になる。"],
  lead: ["富士市の居宅介護支援・", "訪問介護・家事支援。", "ご家族の安心を支えます。"],
  cta: { label: "私たちの想いを見る", href: "/about#company" },
  // 仮画像（モックの素材シートからの切り出し）。写真が確定したら差し替える（docs/IMAGE_QUALITY.md）
  image: {
    src: "/images/hero/hero-fuji.jpg",
    alt: "",
    position: "66% 20%",
  },
};
