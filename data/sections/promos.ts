import type { PromoCard } from "@/types/site";

// 担当: Sub-Agent 07（Recruit）。写真の position はこのファイルで調整する
// 文言は旧サイトの原文のまま（採用情報＝総合HPの採用案内、スタッフの一日＝求人サイトの導入文）。旧サイトにブログは無いため、2枚目は「スタッフの一日」
export const promos: PromoCard[] = [
  {
    title: "採用情報",
    body: ["喜援では、一緒に働くスタッフを", "募集しております。", "1日1～2時間程度でも大丈夫です。"],
    icon: "clipboard",
    tone: "green",
    cta: { label: "採用情報を見る", href: "/recruit" },
    image: { src: "/images/recruit/recruit.jpg", alt: "", position: "28% 50%" },
  },
  {
    title: "スタッフの一日",
    body: ["弊社スタッフの1日の業務一例です。", "ご相談いただければ柔軟に勤務時間等", "対応いたします。"],
    icon: "document",
    tone: "orange",
    cta: { label: "1日の流れを見る", href: "/recruit#day" },
    image: { src: "/images/blog/blog.jpg", alt: "", position: "100% 30%" },
  },
];
