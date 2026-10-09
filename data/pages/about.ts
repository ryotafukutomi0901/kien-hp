import { site } from "@/data/site";
import type { IconName, Link, Tone } from "@/types/site";

/**
 * /about（事業所・会社概要）の文言。旧サイトの原文から転記している
 * （正本: docs/CONTENT_SOURCE.md 1〜5章、原文: reference/old-site-text/kien-fuji_会社概要.txt ほか）。
 * 会社名・所在地・TEL・FAX は data/site.ts の company を参照し、ここで二重に持たない。
 *
 * CONTENT_SOURCE.md 9章の扱い（公開ページには注記を書かない）:
 *   #2 所在地は川成新町53番地のみ（旧住所は載せない）
 *   #3 事業所名は原文の「水戸島」のまま。事業所ごとの所在地は載せない
 *   #5 事業内容は家事支援を含む表記
 *   #10 地図はキー不要のGoogleマップ埋め込み
 *   #11 重要事項説明書のリンクは置かない（PDF未入手）
 *   #12 「介護業界の利用したい会社No１」は目標として原文どおり（実績表現にしない）
 */

export interface AboutPolicy {
  /** ①〜③の見出し（原文の「」付きのまま） */
  title: string;
  /** 原文の「⇒」に続く各文 */
  points: string[];
}

export interface AboutOffice {
  name: string;
  designationNumber: string;
  tel: string;
  /** /services の該当事業へのリンク */
  link: Link;
  /** トップのサービスカード（data/sections/services.ts）と同じアイコン・色で、同じ事業だと分かるようにする */
  icon: IconName;
  tone: Tone;
}

export interface AboutProfileItem {
  term: string;
  value: string;
  /** tel は発信リンクにし、営業電話お断りの注記を添える */
  kind?: "tel";
}

export interface AboutPageContent {
  metadata: { title: string; description: string };
  title: string;
  jumpLinks: Link[];
  salesCallNotice: string;
  company: {
    id: string;
    title: string;
    greeting: { title: string; opening: string; motto: string; body: string[] };
    philosophy: { title: string; principles: string[]; body: string[] };
    policies: { title: string; goalLabel: string; goal: string; items: AboutPolicy[] };
    profile: { title: string; items: AboutProfileItem[] };
  };
  offices: {
    id: string;
    title: string;
    list: { title: string; designationLabel: string; items: AboutOffice[] };
    access: {
      title: string;
      items: AboutProfileItem[];
      map: { embedSrc: string; title: string; openHref: string; openLabel: string };
    };
  };
}

const { company } = site;
const companyName = `${company.legalForm}${company.name}（${company.nameReading}）`;
const mapQuery = encodeURIComponent(company.address);

export const aboutPage: AboutPageContent = {
  metadata: {
    title: "会社概要",
    description: `${companyName}の会社概要（ご挨拶・経営理念・喜援の3つの方針）と、水戸島訪問介護事業所・水戸島居宅介護支援事業所のご案内です。${company.address}、新富士駅から徒歩7分。駐車場あり。`,
  },

  title: "会社概要",

  /** ページ冒頭のページ内リンク */
  jumpLinks: [
    { label: "会社概要", href: "#company" },
    { label: "アクセス", href: "#offices" },
  ],

  /** 求人サイトの全ページ末尾の注記 */
  salesCallNotice: "※営業のお電話はご遠慮ください。",

  company: {
    id: "company",
    title: "会社概要",

    greeting: {
      title: "ご挨拶",
      opening: "弊社は2024年3月に開業したばかりの事業所です。",
      motto: "「人を大切にする会社になる」",
      body: [
        "社員一人ひとり、年齢も環境も性格も価値観も違う。違うからイイ！年配者を敬い、若者に多くの経験を語り、支え合う、まるで家族のような会社にしたい。",
        "子育ても病気治療も、みんなで一緒にやろう！一人では出来ないことも、きっとここでなら乗り越えていけるはず。",
        "明るく元気に、楽しい1日だった～を積み重ねる。その為に時間を惜しみなく使いたい。",
        "そんな集団こそが、我々の目指す会社です。",
      ],
    },

    philosophy: {
      title: "経営理念",
      principles: [
        "社員全員の物心両面の倖せを追求すること",
        "お客様一人ひとりに心を込めて向き合うこと",
        "事業を通じて地域社会の発展に貢献し続けること",
      ],
      body: [
        "ココに集う【人】以上に大切のものはない。全ての判断基準は、ここにある。経営者と労働者という分け隔てをすることなく仕事に従事する人全てを社員と位置づけ、その人達の物心両面の倖せを追求します。",
        "お客様の喜びこそが私たちの喜びそのもの。そのために、決して近道を探さず、誰にも負けない地道な努力を惜しまないことを約束します。",
        "そして、この地域になくてはならない企業実現を全員で目指します。",
      ],
    },

    policies: {
      title: "喜援の3つの方針",
      /** 9章#12: 目標であることを明示する */
      goalLabel: "目標",
      // 「No１」の「１」は原文どおり全角
      goal: "富士市で「介護業界の利用したい会社No１」になる！",
      items: [
        {
          title: "「特定事業所加算取得」",
          points: ["令和6年介護報酬改定の重点項目である質の高い介護サービスの推進の為"],
        },
        {
          title: "「24時間・365日連絡が取れる環境の維持継続」",
          points: [
            "医療・介護連携を図り、利用者様の緊急時に備える為",
            "ボイスワープシステム導入により、主要メンバー全員で管理を実施しております。",
            "利用者様情報の一元管理システムによる全員情報共有します。",
          ],
        },
        {
          title: "「ご家族及びご利用者様に寄り添い、お困りごとを一緒に解決する」",
          points: [
            "自立支援・重度化防止の取組の推進によるご家族及び利用者様の安心安全の為",
            "介護経験30年の経験と人脈を活用しながら、寄り添います。",
          ],
        },
      ],
    },

    profile: {
      title: "会社の基本情報",
      items: [
        { term: "会社名", value: companyName },
        { term: "所在地", value: company.address },
        { term: "TEL", value: company.tel, kind: "tel" },
        { term: "FAX", value: company.fax },
        { term: "事業内容", value: "居宅介護支援事業・訪問介護事業・家事支援事業・その他の事業" },
        { term: "開業", value: "2024年3月" },
        { term: "駐車場", value: "あり" },
      ],
    },
  },

  offices: {
    id: "offices",
    title: "アクセス",

    list: {
      title: "事業所",
      designationLabel: "事業所指定番号",
      items: [
        {
          name: "水戸島訪問介護事業所",
          designationNumber: "2272303468",
          tel: "0545-67-8076",
          link: { label: "訪問介護事業について", href: "/services#home-visit" },
          icon: "house",
          tone: "yellow",
        },
        {
          name: "水戸島居宅介護支援事業所",
          designationNumber: "2202303784",
          tel: "0545-32-6232",
          link: { label: "居宅介護支援事業について", href: "/services#care-plan" },
          icon: "person",
          tone: "green",
        },
      ],
    },

    access: {
      title: "アクセス",
      items: [
        { term: "所在地", value: company.address },
        { term: "交通", value: "新富士駅から徒歩7分" },
        { term: "駐車場", value: "あり" },
      ],
      map: {
        // APIキー不要の埋め込み（旧サイトのアクセスページと同じ地点）
        embedSrc: `https://www.google.com/maps?q=${mapQuery}&output=embed`,
        title: `${companyName}の所在地（${company.address}）の地図`,
        openHref: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
        openLabel: "Googleマップで開く",
      },
    },
  },
};
