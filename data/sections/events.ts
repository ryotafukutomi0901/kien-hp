import { eventRecords } from "@/data/records/events";
import type { EventsContent, ImageAsset } from "@/types/site";

// 担当: Sub-Agent 05（Events）。写真の position はこのファイルで調整する
// 記事は data/records/events.ts の新しい順の先頭4件。カードは各記事の下層ページ（/events/<id>）へ飛ぶ（2026-10-28）。
// 写真は旧サイト（recruit の会社行事）に載っていた、クライアント自身の写真（reference/old-site-images/ → scripts/optimize-images.py）。
// 記事ごとに対応する写真を id で引く。写真が無い記事を先頭4件に入れる場合は、ここに追加する。
const photos: Record<string, ImageAsset> = {
  "2026-07-26-curry-party": {
    src: "/images/events/2026-07-26-curry-party.jpg",
    alt: "カレーの鍋を前に調理をしているスタッフの様子",
    position: "50% 10%",
  },
  "2026-05-26-ethics-training": {
    src: "/images/events/2026-05-26-ethics-training.jpg",
    alt: "会議室で机を囲んで研修を受けている参加者の様子",
    position: "50% 45%",
  },
  "2026-04-28-birthday": {
    src: "/images/events/2026-04-28-birthday.jpg",
    alt: "お誕生日のお祝いの衣装を着たスタッフの写真（「お誕生日おめでとうございます」の文字入り）",
    position: "50% 34%",
  },
  "2026-04-28-dementia-training": {
    src: "/images/events/2026-04-28-dementia-training.jpg",
    alt: "会議室で机を囲んで認知症サポーター養成講座を受けている参加者の様子",
    position: "50% 45%",
  },
};

export const events: EventsContent = {
  title: "会社行事",
  en: "Events",
  more: { label: "一覧を見る", href: "/events" },
  posts: eventRecords.slice(0, 4).map((record) => {
    const image = photos[record.id];
    if (!image) throw new Error(`会社行事の写真が未登録です: ${record.id}（data/sections/events.ts の photos に追加する）`);
    return { title: [record.title], date: record.date, href: `/events/${record.id}`, image };
  }),
};
