import type { ServicesContent } from "@/types/site";

// 担当: Sub-Agent 03（Services）。写真の position と配列の改行位置はこのファイルで調整する
// 文言は旧サイトの原文のまま（総合HP「事業内容」・トップ紹介文）。配列の区切りは改行位置だけで、つなげると原文。見出しは原文の「事業内容」。写真は生成画像（reference/generated-originals/ を scripts/optimize-images.py で最適化）
export const services: ServicesContent = {
  title: "事業内容",
  en: "Our Service",
  items: [
    {
      title: "訪問介護事業",
      description: ["見守りや入浴介助、", "服薬管理等の介護支援から、", "掃除・洗濯や食事の用意、", "おむつ交換等の家事支援で", "サポートいたします！"],
      icon: "house",
      tone: "yellow",
      image: {
        src: "/images/services/home-visit.jpg",
        alt: "介護スタッフが高齢の方の手にそっと手を重ねている様子",
        position: "50% 52%",
      },
      link: { label: "詳しく見る", href: "/services/home-visit" },
    },
    {
      title: "居宅介護支援事業",
      description: ["常に在宅医や歯科医師、", "福祉用具業者と連携して", "動いているので、", "安心してご利用いただけます。", "現在ケアマネージャー6人在籍。"],
      icon: "person",
      tone: "green",
      image: {
        src: "/images/services/care-plan.jpg",
        alt: "ケアプランの書類を囲んで相談している手元",
        position: "50% 55%",
      },
      link: { label: "詳しく見る", href: "/services/care-plan" },
    },
    {
      title: "家事支援事業",
      // 家事支援事業＝はぐくむFUJI家事育児サポート事業の協力事業所（2026-10-28 CEO指摘「家事事業＝はぐくむFUJI」。別のカードにはしない）
      badge: "はぐくむFUJI 協力事業所",
      description: ["介護で培われた細やかな気配り等を", "活かし、介護ヘルパーそれぞれの", "スキルを利用したサービスです。", "1時間2500円～承っております。"],
      icon: "sun",
      tone: "orange",
      image: {
        src: "/images/services/home-help.jpg",
        alt: "台所のカウンターに家庭の料理が並び、スタッフが器を整えている様子",
        position: "50% 62%",
      },
      link: { label: "詳しく見る", href: "/services/home-help" },
    },
  ],
};
