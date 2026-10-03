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
  /** ロゴ下・社名下に入る欧文表記 */
  nameEn: string;
  logoMark: ImageAsset;
  postalCode: string;
  address: string;
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

export interface StaffPost {
  title: string[];
  /** ISO形式（YYYY-MM-DD） */
  date: string;
  href: string;
  image: ImageAsset;
}

export interface StaffContent {
  title: string;
  more: Link;
  posts: StaffPost[];
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
  staff: StaffContent;
  news: NewsContent;
  promos: PromoCard[];
  finalCta: FinalCtaContent;
}
