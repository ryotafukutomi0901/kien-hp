import type { SiteContent } from "@/types/site";

import { privacyLink } from "./pages/privacy";
import { about } from "./sections/about";
import { events } from "./sections/events";
import { finalCta } from "./sections/final-cta";
import { hero } from "./sections/hero";
import { news } from "./sections/news";
import { promos } from "./sections/promos";
import { services } from "./sections/services";

/**
 * 株式会社喜援（きえん）のサイト内容。文言・数字は旧サイト3つの原文から起こしている
 * （正本: docs/CONTENT_SOURCE.md、原文: reference/old-site-text/）。
 * 旧サイトに無い事実は書かない。食い違い・未確認の項目は docs/CONTENT_SOURCE.md 9章を参照。
 *
 * サイト全体の情報（会社・ナビ・SNS・SEO）はこのファイル、各セクションの内容は data/sections/、
 * 会社行事・ニュースの記事は data/records/ に置く。
 */
export const site: SiteContent = {
  seo: {
    siteName: "株式会社喜援（きえん）",
    title: "株式会社喜援（きえん）｜富士市の居宅介護支援・訪問介護・家事支援",
    description:
      "静岡県富士市の株式会社喜援（きえん）です。居宅介護支援・訪問介護・家事支援（家事代行）を行っています。ケアマネジャー・ヘルパー・家事支援スタッフも募集中です。",
    // 本番ドメインは未確定。確定したら差し替える（docs/CONTENT_SOURCE.md）
    siteUrl: "https://example.com",
  },

  company: {
    legalForm: "株式会社",
    name: "喜援",
    nameReading: "きえん",
    logoMark: { src: "/images/logo/kien-emblem.png", alt: "" },
    logoMarkLight: { src: "/images/logo/kien-emblem-white.png", alt: "" },
    // 郵便番号は旧サイトに記載がないため載せない（推測で入れない）
    address: "静岡県富士市川成新町53番地",
    tel: "0545-32-7860",
    fax: "0545-32-7886",
    copyright: "© 株式会社喜援（きえん）",
  },

  nav: [
    { label: "トップ", href: "/" },
    { label: "サービス", href: "/services" },
    { label: "事業所", href: "/about#offices" },
    { label: "会社行事", href: "/events" },
    { label: "採用情報", href: "/recruit" },
    { label: "お知らせ", href: "/news" },
    { label: "会社概要", href: "/about#company" },
  ],

  contact: { label: "お問い合わせ", href: "/contact" },

  // フッターのコピーライトの近くに出す
  legal: [privacyLink],

  // SNSは載せない（2026-10-04 CEO指示。旧サイトにあったInstagramは掲載しない）
  social: {},

  hero,
  services,
  about,
  events,
  news,
  promos,
  finalCta,
};
