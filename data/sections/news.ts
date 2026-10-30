import { newsRecords } from "@/data/records/news";
import type { NewsContent } from "@/types/site";

// 担当: Sub-Agent 06（News）。写真の position はこのファイルで調整する
// 一覧は data/records/news.ts（旧サイトのニュース全2件）。写真は無いので、一覧の正方形には会社のマークを入れる（NewsSection）
export const news: NewsContent = {
  title: "ニュース",
  en: "News",
  more: { label: "一覧を見る", href: "/news" },
  items: newsRecords.map((record) => ({
    date: record.date,
    category: "ニュース",
    title: record.title,
    href: `/news#${record.id}`,
  })),
};
