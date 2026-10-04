import type { DatedRecord } from "@/types/site";

/**
 * ニュース（旧サイト「INFO > ニュース」の全2件。新しい順）。本文は旧サイトの原文のまま。
 * 取得時点でページ送り（さらに表示）は無く、これで全件。
 */
export const newsRecords: DatedRecord[] = [
  {
    id: "2025-11-10-n-training",
    date: "2025-11-10",
    title: "定期研修",
    body: ["通常業務以外にも、定期的に研修を行い、法改正への対応やサービスの向上をしております！"],
  },
  {
    id: "2025-07-17-n-relocation",
    date: "2025-07-17",
    title: "事業所移転完了！",
    body: ["スタッフ数が増えて手狭になった事務所から引っ越ししました！看板もついてます！"],
  },
];
