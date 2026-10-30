import type { MetadataRoute } from "next";

import { eventRecords } from "@/data/records/events";
import { site } from "@/data/site";

// 公開するページの一覧（検索エンジン向け）。ページを足したらここにも足す。
// URLの基点は site.seo.siteUrl。本番ドメインが確定するまでは仮の値（docs/CLIENT_CHECKLIST.md）
const routes = [
  "/",
  "/services/home-visit",
  "/services/care-plan",
  "/services/home-help",
  "/about",
  "/events",
  "/recruit",
  "/news",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: new URL(route, site.seo.siteUrl).toString(),
    changeFrequency: route === "/events" || route === "/news" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
  // 会社行事の下層ページ（/events/<id>。data/records/events.ts の全件）
  const events: MetadataRoute.Sitemap = eventRecords.map((record) => ({
    url: new URL(`/events/${record.id}`, site.seo.siteUrl).toString(),
    lastModified: record.date,
    changeFrequency: "yearly",
    priority: 0.5,
  }));
  return [...pages, ...events];
}
