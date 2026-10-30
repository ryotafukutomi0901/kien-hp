import type { PromoCard } from "@/types/site";

// 担当: Sub-Agent 07（Recruit）。写真の position はこのファイルで調整する
// 文言は旧サイトの原文のまま（採用情報＝総合HPの採用案内）。
// 2026-10-21 引き継ぎ「スタッフの一日は採用ページに入れる」: トップの「スタッフの一日」カードはやめ、採用情報のカード1枚にまとめた。
// 一日の流れは /recruit#day にあり、2つ目のボタンから案内する。採用がサイトの主な目的（KPI）なので、トップの採用カードは全幅の1枚にする。
export const promos: PromoCard[] = [
  {
    title: "採用情報",
    body: ["喜援では、一緒に働くスタッフを", "募集しております。", "1日1～2時間程度でも大丈夫です。"],
    icon: "clipboard",
    tone: "green",
    cta: { label: "採用情報を見る", href: "/recruit" },
    secondaryCta: { label: "スタッフの一日を見る", href: "/recruit#day" },
    image: { src: "/images/recruit/recruit.jpg", alt: "", position: "28% 50%" },
  },
];
