import type { Link } from "@/types/site";

/**
 * お問い合わせページ（app/contact）の文言。
 * 原文: reference/old-site-text/kien-fuji_お問い合わせ.txt（総合HP）、homehelp_予約する.txt・homehelp_サービス.txt（ホームヘルプ）、
 * recruit_お問い合わせ.txt（営業電話お断り・駐車場あり）。正本は docs/CONTENT_SOURCE.md 1章・5章・8章。
 * 電話・FAX・所在地はここに書かず data/site.ts の site.company から読む。
 *
 * 旧サイトはメールフォーム＋電話の案内だったが、新サイトのフォームは未実装（送信先が不明。CONTENT_SOURCE.md 9章 #8）。
 * そのため原文の「フォームか」「メールフォームをご利用いただくか」の部分だけを除いている。それ以外は原文のまま。
 */

export interface ContactPageContent {
  /** ページ冒頭の一文 */
  intro: string;
  tel: {
    title: string;
    /** 電話ボタンの上段（番号の前に読み上げる動作名） */
    callLabel: string;
    /** タッチ端末でだけ出す補足 */
    touchHint: string;
    salesNotice: string;
  };
  access: {
    title: string;
    parking: string;
    map: Link;
  };
  homeHelp: {
    title: string;
    /** 見出しの下の副題（事業の名称） */
    serviceName: string;
    lead: string;
    area: string;
    days: string;
    hours: string;
    detail: Link;
  };
  privacy: {
    title: string;
    body: string[];
  };
}

export const contactPage: ContactPageContent = {
  // 原文: 「ご不明点やご相談がございましたら、お気軽に下記のお問い合わせフォームかお電話でご連絡ください。」
  intro: "ご不明点やご相談がございましたら、お気軽にお電話でご連絡ください。",
  tel: {
    title: "お電話でのお問い合わせ",
    callLabel: "電話をかける",
    touchHint: "ボタンを押すと、そのまま電話をかけられます。",
    salesNotice: "※営業のお電話はご遠慮ください。",
  },
  access: {
    title: "所在地",
    // 原文「駐車場あり」を「駐車場：あり」の行にしている
    parking: "あり",
    map: { label: "地図・アクセスを見る", href: "/about#offices" },
  },
  homeHelp: {
    // 「家事支援（喜援ホームヘルプサービス）のご予約」を1行の見出しにすると、狭い画面で語の途中で折り返すため名称は副題に分けている
    title: "家事支援のご予約",
    serviceName: "喜援ホームヘルプサービス",
    // 原文: 「ご予約いただけるようでしたら、下部のメールフォームをご利用いただくか、下記のお電話番号にお気軽にお問合せください。」
    lead: "ご予約いただけるようでしたら、下記のお電話番号にお気軽にお問合せください。",
    // 原文では「サービス対応エリア」の項。予約の受付時間ではなく、サービスを提供する曜日・時間
    area: "富士市内",
    days: "祝祭日を除く月曜日〜金曜日",
    hours: "9:00〜17:00",
    detail: { label: "家事支援のサービス・料金を見る", href: "/services/home-help" },
  },
  privacy: {
    // 原文の見出しは「個人情報の取り扱いについて」（ホームヘルプ）。375pxで末尾の「て」だけが次の行に落ちるため「について」を省いている
    title: "個人情報の取り扱い",
    body: [
      "当サイトは、お客様の個人情報について、お客様の承諾が無い限り第三者に開示、提供を一切いたしません。",
      "お客様から個人情報をご提供していただき、お客様へのサービスにご利用させていただく場合がありますが、その目的以外には利用いたしません。そして、ご提供いただいた個人情報を取り扱うにあたり管理責任者を置き、適切な管理を行っております。",
    ],
  },
};
