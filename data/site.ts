import type { SiteContent } from "@/types/site";

import { privacyLink } from "./pages/privacy";
import { about } from "./sections/about";
import { events } from "./sections/events";
import { finalCta } from "./sections/final-cta";
import { hero } from "./sections/hero";
import { news } from "./sections/news";
import { philosophyMarquee, recruitMarquee } from "./sections/marquee";
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
    // 旧サイトのナビの文言と順（ホーム／会社概要／事業内容／アクセス／採用情報／INFO［ニュース・会社行事］）に合わせる。
    // 「お問い合わせ」はヘッダーのボタン（contact）、「INFO」は下位の2項目をそのまま並べている
    { label: "ホーム", href: "/" },
    { label: "会社概要", href: "/about#company" },
    // 事業内容: マウスを乗せると3事業のタブが開く（2026-10-28 CEO指示。一覧ページ /services は廃止）。
    // href はトップの事業内容の節。子項目はトップの事業カードと同じ data/sections/services.ts から作る
    {
      label: "事業内容",
      href: "/#services",
      children: services.items.map((item) => ({
        label: item.title,
        href: item.link.href,
        tone: item.tone,
        icon: item.icon,
      })),
    },
    { label: "アクセス", href: "/about#offices" },
    { label: "採用情報", href: "/recruit" },
    { label: "ニュース", href: "/news" },
    { label: "会社行事", href: "/events" },
  ],

  footerNav: [
    {
      en: "Company",
      title: "会社案内",
      links: [
        { label: "会社概要", href: "/about#company" },
        { label: "アクセス", href: "/about#offices" },
      ],
    },
    {
      en: "Service",
      title: "事業内容",
      links: [
        { label: "訪問介護事業", href: "/services/home-visit" },
        { label: "居宅介護支援事業", href: "/services/care-plan" },
        { label: "家事支援事業", href: "/services/home-help" },
      ],
    },
    {
      en: "Recruit",
      title: "採用情報",
      links: [
        { label: "採用情報 TOP", href: "/recruit" },
        { label: "スタッフの一日", href: "/recruit#day" },
        { label: "よくあるご質問", href: "/recruit#faq" },
      ],
    },
    {
      en: "Information",
      title: "お知らせ",
      links: [
        { label: "ニュース", href: "/news" },
        { label: "会社行事", href: "/events" },
        { label: "お問い合わせ", href: "/contact" },
      ],
    },
  ],

  contact: { label: "お問い合わせ", href: "/contact" },

  // フッターのコピーライトの近くに出す
  legal: [privacyLink],

  // Instagram: 2026-10-04 は「載せない」だったが、2026-10-21 引き継ぎで「Instagramへつながる導線を整える」に変わった。
  // アカウントのURLが未入手のため未設定（旧サイトのHTMLにもリンクが無い）。URLを入れると、トップの Instagram の列が出て、
  // ヒーローのカードとフッターの Official SNS（未入手の間は仮のリンク）が本物のリンクになる。確認事項は docs/CLIENT_CHECKLIST.md。
  social: {
    // instagram: "https://www.instagram.com/（アカウント名）/",
  },

  // トップの Instagram の列の文言。旧サイトの「インスタグラムを始めました！よろしければフォローをお願いします！」から
  instagram: {
    title: "Instagram",
    body: ["インスタグラムを始めました！", "よろしければフォローをお願いします！"],
    cta: "Instagramを見る",
  },

  hero,
  services,
  about,
  events,
  news,
  promos,
  finalCta,
  marquees: { philosophy: philosophyMarquee, recruit: recruitMarquee },
  recruitEn: "Recruit",
};
