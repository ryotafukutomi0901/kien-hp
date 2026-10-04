/**
 * サイトの内容（テキスト・リンク・画像）の型。
 * 別の介護事業者へ展開するときは data/site.ts の値だけを差し替える。
 * 見た目（色・余白・レイアウト）はここに持たせない。
 */

export type Tone = "yellow" | "green" | "orange" | "blue";

export type IconName = "house" | "person" | "sun" | "heart" | "clipboard" | "document";

export interface Link {
  label: string;
  href: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  /** 写真ごとの被写体位置。CSSの object-position にそのまま渡す（例: "50% 30%"） */
  position?: string;
}

export interface Company {
  /** 法人格（例: 株式会社） */
  legalForm: string;
  name: string;
  /** 社名の読み仮名。ロゴでは社名の下にふりがなとして表示する */
  nameReading: string;
  /** ロゴのマーク画像。未入手の間は省略し、社名のテキストだけで組む */
  logoMark?: ImageAsset;
  /** 暗い地（フッター）用の白一色のロゴ。省略するとlogoMarkを使う */
  logoMarkLight?: ImageAsset;
  /** 郵便番号。未確認の間は省略する（推測で入れない） */
  postalCode?: string;
  address: string;
  tel: string;
  fax: string;
  copyright: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
}

export interface HeroContent {
  /** 改行位置ごとに分けたメインコピー */
  title: string[];
  lead: string[];
  cta: Link;
  image: ImageAsset;
}

export interface ServiceItem {
  title: string;
  /** 「新設」などの補足ラベル */
  badge?: string;
  description: string[];
  icon: IconName;
  tone: Tone;
  image: ImageAsset;
  link: Link;
}

export interface ServicesContent {
  title: string;
  lead: string;
  items: ServiceItem[];
}

export interface AboutContent {
  title: string;
  body: string[];
  cta: Link;
  background: ImageAsset;
  photo: ImageAsset;
}

export interface EventPost {
  title: string[];
  /** ISO形式（YYYY-MM-DD） */
  date: string;
  href: string;
  image: ImageAsset;
}

/** 会社行事・ニュースの1件。トップの抜粋と一覧ページ（/events・/news）で共通に使う */
export interface DatedRecord {
  /** URLのハッシュ（#id）にも使う。例: "2026-07-26" */
  id: string;
  /** ISO形式（YYYY-MM-DD） */
  date: string;
  title: string;
  /** 本文（段落ごとの配列。旧サイトの原文のまま） */
  body: string[];
  image?: ImageAsset;
}

export interface EventsContent {
  title: string;
  more: Link;
  posts: EventPost[];
}

export interface NewsItem {
  date: string;
  category?: string;
  title: string;
  href: string;
}

export interface NewsContent {
  title: string;
  more: Link;
  items: NewsItem[];
  image: ImageAsset;
}

export interface PromoCard {
  title: string;
  body: string[];
  icon: IconName;
  tone: Tone;
  cta: Link;
  image: ImageAsset;
}

export interface FinalCtaContent {
  title: string[];
  cta: Link;
  image: ImageAsset;
}

export interface SeoContent {
  siteName: string;
  title: string;
  description: string;
  /** 本番ドメイン確定後に差し替える */
  siteUrl: string;
}

export interface SiteContent {
  seo: SeoContent;
  company: Company;
  nav: Link[];
  contact: Link;
  social: SocialLinks;
  hero: HeroContent;
  services: ServicesContent;
  about: AboutContent;
  events: EventsContent;
  news: NewsContent;
  promos: PromoCard[];
  finalCta: FinalCtaContent;
}
