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
  /** Instagram のURL。未設定の間は、トップの Instagram の列とフッターのアイコンを出さない（URLは未入手: docs/CLIENT_CHECKLIST.md） */
  instagram?: string;
  facebook?: string;
}

/** トップの Instagram の列の文言 */
export interface InstagramContent {
  title: string;
  /** 改行位置ごとに分けた案内文 */
  body: string[];
  /** ボタンの文言 */
  cta: string;
}

export interface HeroContent {
  /** 改行位置ごとに分けたメインコピー */
  title: string[];
  lead: string[];
  cta: Link;
  /** 2つ目のボタン（枠のボタン） */
  secondaryCta?: Link;
  /** 大きく置く写真（「人を大切にする会社になる」に合う人物の写真。docs/PHOTO_SHOTLIST.md #1） */
  image: ImageAsset;
  /** 写真の角に添える丸いバッジの文字（円に沿って回る欧文の飾り） */
  badge: string;
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
  en: string;
  /** 見出しの下の一文（任意。原文に無ければ省く） */
  lead?: string;
  items: ServiceItem[];
}

export interface AboutContent {
  title: string;
  en: string;
  /** 経営理念の3か条（大きく中央に置く） */
  body: string[];
  cta: Link;
  /** 横に流れる色のタイル（手本の「Who We Are」の下のタイルの列）。写真はタイルの中に小さく入れる */
  gallery: { image: ImageAsset; tone: Tone; shape: "wide" | "tall" | "square" }[];
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

/** 会社行事の分類（記事の内容で分けたもの。一覧の絞り込みと、写真・日付の横の札に使う） */
export type EventCategory = "meal" | "training" | "celebration" | "season" | "gift";

/** 会社行事の写真1枚。ファイルは /images/events/<記事のid>/01.jpg … の並び順（data/records/events.ts の eventPhotoSrc） */
export interface EventPhoto {
  alt: string;
  width: number;
  height: number;
}

/** 会社行事の1件。DatedRecord に、分類・写真・下層ページ（/events/<id>）だけの本文を足したもの */
export interface EventRecord extends DatedRecord {
  /** 先頭が主な分類（写真の上の札）。2つ目以降は日付の横の小さな札 */
  categories: EventCategory[];
  /** 旧サイトの記事に載っていた写真（全部） */
  photos: EventPhoto[];
  /** 一覧のカードに出す写真の番号（0始まり。省略で先頭） */
  cover?: number;
  /** 一覧のカードでの写真の位置（object-position） */
  coverPosition?: string;
  /** 下層ページの本文。旧サイトの詳しいページに一覧の抜粋と違う本文があるときだけ持つ（無ければ body を出す） */
  detail?: string[];
}

export interface EventsContent {
  title: string;
  en: string;
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
  en: string;
  more: Link;
  items: NewsItem[];
}

export interface PromoCard {
  title: string;
  body: string[];
  icon: IconName;
  tone: Tone;
  cta: Link;
  /** 2つ目のボタン（任意。枠線のボタンで並べる） */
  secondaryCta?: Link;
  image: ImageAsset;
}

export interface FinalCtaContent {
  en: string;
  /** 「お問い合わせ」（欧文の下の日本語） */
  heading: string;
  title: string[];
  cta: Link;
}

export interface SeoContent {
  siteName: string;
  title: string;
  description: string;
  /** 本番ドメイン確定後に差し替える */
  siteUrl: string;
}

/** 横に流れる大きな欧文の帯（手本の「We are the creative group…」型）。言葉の間に写真の丸いタイルを挟む */
export interface MarqueeContent {
  /** 文の切れ目ごと。切れ目に images を順に挟む */
  segments: string[];
  images: { image: ImageAsset; tone: Tone }[];
  /** 欧文の意味（読み上げ用。帯そのものは飾りなので読み上げない） */
  label: string;
}

/** ヘッダーのナビの1項目。children があると、マウスを乗せたときに子項目のタブが開く（事業内容 → 3事業） */
export interface NavItem extends Link {
  children?: (Link & { tone?: Tone; icon?: IconName })[];
}

export interface FooterGroup {
  en: string;
  title: string;
  links: Link[];
}

export interface SiteContent {
  seo: SeoContent;
  company: Company;
  nav: NavItem[];
  /** フッターのサイトマップ（手本: 欧文の見出しの下に日本語のリンク） */
  footerNav: FooterGroup[];
  contact: Link;
  /** フッターのコピーライトの近くに置くリンク（プライバシーポリシー等） */
  legal: Link[];
  social: SocialLinks;
  instagram: InstagramContent;
  hero: HeroContent;
  services: ServicesContent;
  about: AboutContent;
  events: EventsContent;
  news: NewsContent;
  promos: PromoCard[];
  finalCta: FinalCtaContent;
  marquees: { philosophy: MarqueeContent; recruit: MarqueeContent };
  /** 採用セクションの欧文ラベル */
  recruitEn: string;
}
