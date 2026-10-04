import { newsRecords } from "@/data/records/news";
import type { NewsContent } from "@/types/site";

// 担当: Sub-Agent 06（News）。写真の position はこのファイルで調整する
// 一覧は data/records/news.ts（旧サイトのニュース全2件）。右側の写真は仮画像で装飾
export const news: NewsContent = {
  title: "お知らせ",
  more: { label: "一覧を見る", href: "/news" },
  items: newsRecords.map((record) => ({
    date: record.date,
    category: "ニュース",
    title: record.title,
    href: `/news#${record.id}`,
  })),
  image: { src: "/images/news/news-fuji.jpg", alt: "", position: "62% 40%" },
};
