import { eventRecords } from "@/data/records/events";
import type { EventsContent } from "@/types/site";

// 担当: Sub-Agent 05（Events）。写真の position はこのファイルで調整する
// 記事は data/records/events.ts の新しい順の先頭4件。写真は仮画像で、記事の内容とは関係がない
// （旧サイトの写真は未取得）。差し替えは docs/IMAGE_QUALITY.md を参照
const placeholders = [
  { src: "/images/services/business-support.jpg", position: "50% 35%" },
  { src: "/images/staff/staff-group-outdoor.jpg", position: "50% 25%" },
  { src: "/images/services/home-nursing.jpg", position: "50% 30%" },
  { src: "/images/staff/staff-table.jpg", position: "50% 15%" },
];

export const events: EventsContent = {
  title: "会社行事",
  more: { label: "一覧を見る", href: "/events" },
  posts: eventRecords.slice(0, 4).map((record, i) => ({
    title: [record.title],
    date: record.date,
    href: `/events#${record.id}`,
    image: { src: placeholders[i].src, alt: "", position: placeholders[i].position },
  })),
};
