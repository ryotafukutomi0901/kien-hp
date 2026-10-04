import type { ServicesContent } from "@/types/site";

// 担当: Sub-Agent 03（Services）。写真の position と配列の改行位置はこのファイルで調整する
// 3事業は旧サイト「事業内容」「喜援ホームヘルプサービス」の原文から。写真は仮画像（docs/IMAGE_QUALITY.md）
export const services: ServicesContent = {
  title: "私たちのサービス",
  lead: "あなたの暮らしに、寄り添う3つのサービス",
  items: [
    {
      title: "訪問介護事業",
      description: ["見守りや入浴介助、", "服薬管理など、ご自宅での", "生活を支えます。"],
      icon: "house",
      tone: "yellow",
      image: {
        src: "/images/services/home-care.jpg",
        alt: "スタッフが高齢の女性と笑顔で話している様子",
        position: "50% 25%",
      },
      link: { label: "詳しく見る", href: "/services#home-visit" },
    },
    {
      title: "居宅介護支援事業",
      description: ["在宅医や歯科医師、", "福祉用具業者と常に連携。", "ケアマネジャー6人在籍。"],
      icon: "person",
      tone: "green",
      image: {
        src: "/images/services/care-planning.jpg",
        alt: "ケアマネジャーが利用者様と相談している様子",
        position: "50% 28%",
      },
      link: { label: "詳しく見る", href: "/services#care-plan" },
    },
    {
      title: "家事支援事業",
      description: ["お掃除・育児のお手伝い・", "お食事の用意。", "1時間2,500円～。"],
      icon: "sun",
      tone: "orange",
      image: {
        src: "/images/services/business-support.jpg",
        alt: "笑顔で作業をするスタッフ",
        position: "50% 34%",
      },
      link: { label: "詳しく見る", href: "/services#home-help" },
    },
  ],
};
