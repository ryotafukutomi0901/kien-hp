import type { PromoCard } from "@/types/site";

// 担当: Sub-Agent 07（Recruit）。写真の position はこのファイルで調整する
// 旧サイトにブログは無いため、2枚目は求人サイトの「スタッフの一日」。写真は仮画像
export const promos: PromoCard[] = [
  {
    title: "採用情報",
    body: ["一緒に働くスタッフを募集しています。", "1日1〜2時間程度でも", "大丈夫です。"],
    icon: "clipboard",
    tone: "green",
    cta: { label: "採用情報を見る", href: "/recruit" },
    image: { src: "/images/recruit/recruit.jpg", alt: "", position: "28% 50%" },
  },
  {
    title: "スタッフの一日",
    body: ["ヘルパー・ケアマネジャーの", "1日の流れの例を", "ご紹介します。"],
    icon: "document",
    tone: "orange",
    cta: { label: "1日の流れを見る", href: "/recruit#day" },
    image: { src: "/images/blog/blog.jpg", alt: "", position: "100% 30%" },
  },
];
