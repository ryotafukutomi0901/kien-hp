import type { MetadataRoute } from "next";

import { site } from "@/data/site";

// 公開するページの一覧（検索エンジン向け）。ページを足したらここにも足す。
// URLの基点は site.seo.siteUrl。本番ドメインが確定するまでは仮の値（docs/CLIENT_CHECKLIST.md）
const routes = ["/", "/services", "/about", "/events", "/recruit", "/news", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, site.seo.siteUrl).toString(),
    changeFrequency: route === "/events" || route === "/news" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
