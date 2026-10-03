import type { SiteContent } from "@/types/site";

/**
 * kien-hp のサイト内容。テキストは参考モック（reference/mock.png）の表記に合わせている。
 * 事業所名・住所・投稿などはモック上のサンプル値であり、納品前に実データへ差し替える。
 */
export const site: SiteContent = {
  seo: {
    siteName: "株式会社 華護",
    title: "株式会社 華護｜富士市の訪問介護・居宅介護支援・訪問看護",
    description:
      "静岡県富士市の株式会社華護です。訪問介護・居宅介護支援・事業支援・訪問看護の4つのサービスで、ご利用者様の「その人らしさ」とご家族の安心を支えます。",
    siteUrl: "https://example.com",
  },

  company: {
    legalForm: "株式会社",
    name: "華護",
    nameEn: "SAMPLE",
    logoMark: { src: "/images/logo/logo-mark.png", alt: "" },
    postalCode: "417-0061",
    address: "静岡県富士市富士見台251番地の1",
    copyright: "© 2025 SAMPLE. All rights reserved.",
  },

  nav: [
    { label: "トップ", href: "/" },
    { label: "サービス", href: "/services" },
    { label: "事業所", href: "/about#offices" },
    { label: "スタッフ紹介", href: "/staff" },
    { label: "採用情報", href: "/recruit" },
    { label: "お知らせ", href: "/news" },
    { label: "会社概要", href: "/about#company" },
  ],

  contact: { label: "お問い合わせ", href: "/contact" },

  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },

  hero: {
    title: ["富士のまちで、", "ともに生きる。"],
    lead: ["地域に根ざしたサービスで", "ご利用者様の「その人らしさ」と", "ご家族の安心を支えます。"],
    cta: { label: "私たちの想いを見る", href: "/about" },
    image: {
      src: "/images/hero/hero-fuji.jpg",
      alt: "",
      position: "70% 40%",
    },
  },

  services: {
    title: "私たちのサービス",
    lead: "あなたの暮らしに、寄り添う4つのサービス",
    items: [
      {
        title: "訪問介護事業",
        description: ["ご自宅での生活を", "安心して続けられるように、", "支援いたします。"],
        icon: "house",
        tone: "yellow",
        image: {
          src: "/images/services/home-care.jpg",
          alt: "スタッフが高齢の女性と笑顔で話している様子",
          position: "50% 30%",
        },
        link: { label: "詳しく見る", href: "/services#home-care" },
      },
      {
        title: "居宅介護事業",
        description: ["ケアプランの作成や", "地域での生活をサポートします。"],
        icon: "person",
        tone: "green",
        image: {
          src: "/images/services/care-planning.jpg",
          alt: "ケアマネジャーが利用者様と相談している様子",
          position: "50% 30%",
        },
        link: { label: "詳しく見る", href: "/services#care-planning" },
      },
      {
        title: "事業支援事業",
        description: ["事業の継続を支援し、", "質の向上をサポートします。"],
        icon: "sun",
        tone: "orange",
        image: {
          src: "/images/services/business-support.jpg",
          alt: "笑顔で作業をするスタッフ",
          position: "50% 25%",
        },
        link: { label: "詳しく見る", href: "/services#business-support" },
      },
      {
        title: "訪問看護事業",
        badge: "新設",
        description: ["医療の視点から、", "ご利用者さまを支えます。"],
        icon: "heart",
        tone: "blue",
        image: {
          src: "/images/services/home-nursing.jpg",
          alt: "看護師が高齢の女性に寄り添っている様子",
          position: "50% 30%",
        },
        link: { label: "詳しく見る", href: "/services#home-nursing" },
      },
    ],
  },

  about: {
    title: "私たちのこと",
    body: ["富士の自然とともに、", "地域の皆さまの暮らしを支える。", "それが、私たちの使命です。"],
    cta: { label: "事業所・会社案内", href: "/about" },
    background: { src: "/images/about/about-fuji.jpg", alt: "", position: "50% 60%" },
    photo: {
      src: "/images/about/about-fuji.jpg",
      alt: "富士山と富士市の街並み",
      position: "50% 45%",
    },
  },

  staff: {
    title: "スタッフ紹介",
    more: { label: "一覧を見る", href: "/staff" },
    posts: [
      {
        title: ["スタッフの笑顔が", "私たちの力です"],
        date: "2025-06-10",
        href: "/staff#smile",
        image: { src: "/images/services/business-support.jpg", alt: "", position: "50% 25%" },
      },
      {
        title: ["仲間と働くことの", "意義を感じて"],
        date: "2025-06-05",
        href: "/staff#team",
        image: { src: "/images/staff/staff-group-outdoor.jpg", alt: "", position: "50% 40%" },
      },
      {
        title: ["利用者様の声を", "ご紹介します"],
        date: "2025-05-28",
        href: "/staff#voice",
        image: { src: "/images/staff/staff-meeting.jpg", alt: "", position: "50% 35%" },
      },
      {
        title: ["新しい仲間が", "加わりました"],
        date: "2025-05-20",
        href: "/staff#new-member",
        image: { src: "/images/staff/staff-table.jpg", alt: "", position: "50% 35%" },
      },
    ],
  },

  news: {
    title: "NEWS・ブログ",
    more: { label: "一覧を見る", href: "/news" },
    items: [
      {
        date: "2025-06-08",
        category: "スタッフ紹介",
        title: "新しい仲間が加わりました。",
        href: "/news#2025-06-08",
      },
      { date: "2025-06-02", title: "夏のレクリエーションを行いました", href: "/news#2025-06-02" },
      { date: "2025-05-20", title: "富士市の事業所でのイベントを開催しました", href: "/news#2025-05-20" },
    ],
    image: { src: "/images/news/news-fuji.jpg", alt: "", position: "50% 50%" },
  },

  promos: [
    {
      title: "採用情報",
      body: ["一緒に働く仲間を募集しています。", "私たちと一緒に、地域の暮らしを", "支えていきませんか?"],
      icon: "clipboard",
      tone: "green",
      cta: { label: "採用情報を見る", href: "/recruit" },
      image: { src: "/images/recruit/recruit.jpg", alt: "", position: "50% 25%" },
    },
    {
      title: "スタッフブログ",
      body: ["現場での出来事や、", "スタッフの日常をお届けします。"],
      icon: "document",
      tone: "orange",
      cta: { label: "ブログを読む", href: "/blog" },
      image: { src: "/images/blog/blog.jpg", alt: "", position: "40% 30%" },
    },
  ],

  finalCta: {
    title: ["これからも、", "地域の皆さまとともに。"],
    cta: { label: "お問い合わせはこちら", href: "/contact" },
    image: { src: "/images/cta/cta-fuji.jpg", alt: "", position: "50% 60%" },
  },
};
