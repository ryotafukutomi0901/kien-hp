import type { Link, Tone } from "@/types/site";

import { recruitPage } from "./recruit";

/**
 * お問い合わせページ（app/contact）の文言。
 * 原文: reference/old-site-text/kien-fuji_お問い合わせ.txt（総合HP）、homehelp_予約する.txt・homehelp_サービス.txt（ホームヘルプ）、
 * recruit_お問い合わせ.txt（営業電話お断り・駐車場あり）。正本は docs/CONTENT_SOURCE.md 1章・5章・8章。
 * 電話・FAX・所在地はここに書かず data/site.ts の site.company から読む。
 *
 * 旧サイトはメールフォーム＋電話の案内だった。2026-11-17 CEO指示「フォームを埋め込んでおいて。選ぶ質問はプルダウンで、喜援に合うものに」で、
 * フォームの画面（下の contactForm）を作った。送信先（メールの宛先・受け口）が未定（CONTENT_SOURCE.md 9章 #8）のため、送信はまだつないでいない。
 * 原文の「フォームか」「メールフォームをご利用いただくか」の部分は、そのためにいったん除いていたが、フォームを置いたので原文に戻した。
 */

/** プルダウンの質問1つ。選択肢は文字列の並び（送られる値も同じ文字列） */
export interface ContactQuestion {
  name: string;
  label: string;
  options: readonly string[];
  required?: boolean;
}

export type ContactTypeId = "home-visit" | "care-plan" | "home-help" | "recruit" | "other";

/** フォームの先頭で選ぶ「ご相談の種類」（タブ）。種類ごとに、続くプルダウンの質問が変わる */
export interface ContactType {
  id: ContactTypeId;
  label: string;
  /** タブの色（事業の色分けと同じ） */
  tone: Tone;
  questions: ContactQuestion[];
}

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

/** 「ご相談の内容」より後ろ、すべての種類に共通で聞くプルダウン */
const commonQuestions: ContactQuestion[] = [
  { name: "method", label: "ご希望の連絡方法", options: ["お電話", "メール", "どちらでもよい"], required: true },
  { name: "time", label: "ご連絡しやすい時間帯", options: ["午前中", "午後", "夕方", "いつでもよい"] },
];

/** お住まいの地域。サービスの提供地域は事業ごとに違うので、ここでは「お住まい」を聞くだけにする（可否は電話・返信でお答えする） */
const areaQuestion: ContactQuestion = {
  name: "area",
  label: "お住まいの地域",
  options: ["富士市内", "富士市以外の静岡県内", "静岡県外"],
};

const whoQuestion: ContactQuestion = {
  name: "who",
  label: "ご相談される方",
  options: ["ご本人", "ご家族", "ケアマネジャー", "病院・地域包括支援センターなどの相談員", "その他"],
  required: true,
};

/**
 * 喜援のフォーム（2026-11-17）。選ぶところはすべてプルダウン（先頭の「ご相談の種類」だけタブ）。
 * 選択肢は旧サイトの原文に出てくる言葉から作っている（家事支援の「お部屋のお掃除」「育児のお手伝い」「お食事の用意」、
 * 採用の「ケアマネジャー」「訪問介護ヘルパー」「家事支援スタッフ」と、働き方・必要資格［data/pages/recruit.ts］）。
 * 原文に無いサービス内容や条件は選択肢に入れない。
 */
export const contactForm = {
  id: "form",
  title: "メールでのお問い合わせ",
  lead: "ご相談の内容をお選びいただくと、それに合わせた質問が出ます。選ぶだけで進められます。",
  typeLegend: "ご相談の種類",
  /** 送信先が未定の間の案内（送信ボタンを押したときに出す） */
  pendingNotice: "ただいまフォームの送信は準備中です。お手数ですが、お電話でお問い合わせください。",
  submitLabel: "この内容で送信する",
  types: [
    {
      id: "home-visit",
      label: "訪問介護",
      tone: "yellow",
      questions: [
        whoQuestion,
        areaQuestion,
        {
          name: "topic",
          label: "ご相談の内容",
          options: ["サービスの内容を知りたい", "利用を始めたい・申し込みたい", "料金について知りたい", "いま利用中のサービスについて相談したい", "その他"],
          required: true,
        },
      ],
    },
    {
      id: "care-plan",
      label: "居宅介護支援",
      tone: "green",
      questions: [
        whoQuestion,
        areaQuestion,
        {
          name: "topic",
          label: "ご相談の内容",
          options: ["ケアプランについて相談したい", "担当のケアマネジャーを変えたい", "サービスの内容を知りたい", "利用を始めたい・申し込みたい", "その他"],
          required: true,
        },
      ],
    },
    {
      id: "home-help",
      label: "家事支援",
      tone: "orange",
      questions: [
        {
          name: "who",
          label: "ご利用される方",
          options: ["ご本人", "ご家族", "その他"],
          required: true,
        },
        {
          name: "menu",
          label: "ご希望のサービス",
          options: ["お部屋のお掃除", "育児のお手伝い", "お食事の用意", "まだ決まっていない・相談したい"],
          required: true,
        },
        {
          name: "topic",
          label: "ご相談の内容",
          options: ["ご予約・お申し込み", "料金について知りたい", "サービスの内容を知りたい", "その他"],
          required: true,
        },
      ],
    },
    {
      id: "recruit",
      label: "採用・求人",
      tone: "blue",
      questions: [
        {
          name: "position",
          label: "気になる職種",
          options: [...recruitPage.positions.map((position) => position.title), "まだ決めていない・相談したい"],
          required: true,
        },
        // 旧求人サイトの応募フォームにあった項目（介護経験・保有資格・雇用形態・職種）に合わせている（docs/CONTENT_SOURCE.md 6章）
        {
          name: "experience",
          label: "介護のご経験",
          options: ["あり", "なし"],
        },
        {
          name: "style",
          label: "ご希望の働き方",
          options: ["正社員", "アルバイト・パート", "週1日から・短時間", "ダブルワーク", "相談したい"],
        },
        {
          name: "license",
          label: "お持ちの資格",
          options: [
            "介護支援専門員（ケアマネージャー）",
            "介護職員初任者研修修了・ホームヘルパー2級",
            "普通自動車運転免許（AT限定可）",
            "これから取りたい・資格はない",
          ],
        },
        {
          name: "topic",
          label: "ご用件",
          options: ["応募したい", "仕事の内容を聞いてみたい", "勤務時間・条件を相談したい"],
          required: true,
        },
      ],
    },
    {
      id: "other",
      label: "その他",
      tone: "blue",
      questions: [
        {
          name: "topic",
          label: "ご用件",
          options: ["会社行事・ニュースについて", "事業所・会社について", "その他"],
          required: true,
        },
      ],
    },
  ] satisfies ContactType[],
  commonQuestions,
};

export const contactPage: ContactPageContent = {
  // 原文のまま（フォームを置いたので、2026-11-17 に「フォームか」を戻した）
  intro: "ご不明点やご相談がございましたら、お気軽に下記のお問い合わせフォームかお電話でご連絡ください。",
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
    // 原文（「下部のメールフォームをご利用いただくか…」）に戻した（2026-11-17）。フォームはこの節の上にあるので「下部」を「上部」にしている
    lead: "ご予約いただけるようでしたら、上部のメールフォームをご利用いただくか、下記のお電話番号にお気軽にお問合せください。",
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
