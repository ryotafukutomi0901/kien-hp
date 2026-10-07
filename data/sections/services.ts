import type { ServicesContent } from "@/types/site";

// 担当: Sub-Agent 03（Services）。写真の position と配列の改行位置はこのファイルで調整する
// 3事業は旧サイト「事業内容」「喜援ホームヘルプサービス」の原文から。写真は生成画像（reference/generated-originals/ を scripts/optimize-images.py で最適化）
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
        src: "/images/services/home-visit.jpg",
        alt: "介護スタッフが高齢の方の手にそっと手を重ねている様子",
        position: "50% 52%",
      },
      link: { label: "詳しく見る", href: "/services#home-visit" },
    },
    {
      title: "居宅介護支援事業",
      description: ["在宅医や歯科医師、", "福祉用具業者と常に連携。", "ケアマネジャー6人在籍。"],
      icon: "person",
      tone: "green",
      image: {
        src: "/images/services/care-plan.jpg",
        alt: "ケアプランの書類を囲んで相談している手元",
        position: "50% 55%",
      },
      link: { label: "詳しく見る", href: "/services#care-plan" },
    },
    {
      title: "家事支援事業",
      description: ["お掃除・育児のお手伝い・", "お食事の用意。", "1時間2,500円～。"],
      icon: "sun",
      tone: "orange",
      image: {
        src: "/images/services/home-help.jpg",
        alt: "台所のカウンターに家庭の料理が並び、スタッフが器を整えている様子",
        position: "50% 62%",
      },
      link: { label: "詳しく見る", href: "/services#home-help" },
    },
  ],
};
