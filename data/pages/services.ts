import { site } from "@/data/site";
import type { IconName, Tone } from "@/types/site";

/**
 * /services（サービス）の文言。旧サイトの原文から転記している
 * （正本: docs/CONTENT_SOURCE.md 5章・6章、原文: reference/old-site-text/kien-fuji_事業内容.txt、
 *  kien-fuji_ホーム.txt、homehelp_サービス.txt、homehelp_ホーム.txt、recruit_よくあるご質問.txt）。
 * 会社の代表電話は data/site.ts の company を参照し、ここで二重に持たない。
 *
 * CONTENT_SOURCE.md 9章の扱い（公開ページには注記を書かない）:
 *   #3 事業所名は原文の「水戸島」のまま。事業所ごとの所在地は載せない
 *   #4 家事支援の内容はホームヘルプの3つ。「洗濯」は書かない
 *      （2026-10-09 クライアントの希望「旧サイトの文章は要約・改修せず、そのまま使う」により、この文は原文の全文を訪問介護の紹介に使う。「洗濯」の食い違いはクライアントに確認する）
 *   #8 予約フォームは未実装。ご予約はお電話と /contact へ案内する
 *   #9 支援地域は事業ごと（訪問介護=富士・富士宮市、家事支援=富士市内のみ）
 *   #11 重要事項説明書のリンクは置かない（PDF未入手）
 *
 * 2026-10-21 引き継ぎで3事業を独立ページにした（/services は一覧、/services/home-visit・care-plan・home-help）。
 * 家事支援の料金表は PriceGuide（components/page/PriceGuide.tsx）が家事支援以外の全ページにも出す。値はここの fee だけを参照する。
 */

export type ServiceId = "home-visit" | "care-plan" | "home-help";

export interface ServiceOffice {
  /** 事業所名（原文のまま） */
  name: string;
  designationNumber: string;
  tel: string;
  /** サービス提供地域（原文にある事業だけ） */
  area?: string;
}

export interface ServiceSummary {
  id: ServiceId;
  /** h2 とページ内ナビの表示名 */
  title: string;
  /** h2 の下の一文（任意） */
  subtitle?: string;
  tone: Tone;
  icon: IconName;
  /** パネルの最初の一文（--t-body） */
  lead: string;
  /** 続く本文（段落ごと、--t-note） */
  body?: string[];
  /** 目立たせて置く一文 */
  message?: string;
  office?: ServiceOffice;
}

export interface HomeHelpMenuItem {
  title: string;
  /** 説明（段落ごと） */
  description: string[];
  /** ご利用条件などの補足（原文の「※」の文） */
  notes?: string[];
  /** 対象外となるもの（原文の文のまま） */
  excluded: string;
}

export interface FeeRow {
  label: string;
  value: string;
}

export interface FeeTableContent {
  /** <caption>（見出しと別に、表の中身を表す） */
  caption: string;
  headers: [string, string];
  rows: FeeRow[];
}

export interface ServicesPageContent {
  intro: string;
  /** ページ内ナビの名前（読み上げ用） */
  navLabel: string;
  services: ServiceSummary[];
  homeHelp: {
    /**
     * 「喜援ホームヘルプサービスについて」（ホームヘルプの旧サイト トップ・サービスページの原文。2026-10-28 に全ページを巡回して取り込み）
     * catch はトップの見出し、lead はトップの副見出し、body はサービスページの紹介文（段落・行ごと、原文のまま）
     */
    about: {
      title: string;
      catch: string;
      lead: string;
      body: string[];
    };
    menu: { title: string; items: HomeHelpMenuItem[]; excludedLabel: string };
    fee: { title: string; note: string; table: FeeTableContent };
    coverage: { title: string; items: { term: string; detail: string }[] };
    /** 原文の「※注意事項」の文をそのまま（表にしない） */
    cancel: { title: string; body: string[] };
    /**
     * はぐくむFUJI（富士市）の案内。家事支援事業のページの中の1節として置く（2026-10-21 引き継ぎ 06:
     * 「はぐくむ富士→家事支援事業となるようページ表示を変更する」）。
     * title・body は固有名詞が長く自動の文節判定では不自然に切れるため、折り返してよい位置で区切った配列で持つ（つなげると原文）。
     */
    hagukumu: {
      title: string[];
      body: string[];
      /** 旧サイトの「詳しくは、富士市 家事・育児サポートの『サービス内容』をご覧ください。」 */
      note: string;
      /** 登録済みの方: お問い合わせへ（2026-10-21 打ち合わせ） */
      registered: { text: string; contact: { label: string; href: string } };
      /** まだ登録していない方: 行政サービス（富士市）のページでご登録のうえ、お問い合わせへ */
      unregistered: { text: string; links: { label: string; href: string }[] };
    };
    reserve: { title: string; body: string; tel: string };
  };
  contactLabel: string;
  contactHref: string;
}

export const servicesPage: ServicesPageContent = {
  // 総合HPトップ紹介文の1文目
  intro: "富士市にて訪問・居宅介護事業、家事支援事業を行っております。",
  navLabel: "このページのサービス",

  services: [
    {
      id: "home-visit",
      title: "訪問介護事業",
      tone: "yellow",
      icon: "house",
      // 総合HPトップ紹介文「見守りや入浴介助、服薬管理等の介護支援から、〜でサポートいたします！」の介護支援の部分
      lead: "見守りや入浴介助、服薬管理等の介護支援から、掃除・洗濯や食事の用意、おむつ交換等の家事支援でサポートいたします！",
      office: {
        name: "水戸島訪問介護事業所",
        designationNumber: "2272303468",
        tel: "0545-67-8076",
        // 求人サイト よくあるご質問「富士・富士宮市にてサービス提供しております。」
        area: "富士・富士宮市",
      },
    },
    {
      id: "care-plan",
      title: "居宅介護支援事業",
      tone: "green",
      icon: "person",
      lead: "常に在宅医や歯科医師、福祉用具業者と連携して動いているので、安心してご利用いただけます。",
      body: ["現在ケアマネージャー6人在籍。"],
      message: "介護休暇や介護辞職の前にご検討してみてはいかがでしょう。",
      office: {
        name: "水戸島居宅介護支援事業所",
        designationNumber: "2202303784",
        tel: "0545-32-6232",
      },
    },
    {
      id: "home-help",
      title: "家事支援事業",
      subtitle: "喜援ホームヘルプサービス",
      tone: "orange",
      icon: "sun",
      lead: "介護で培われた細やかな気配り等を活かし、介護ヘルパーそれぞれのスキルを利用したサービスです。",
      body: ["整理収納アドバイザー・保育士・調理師等様々。日々の疲れなどでできないことをお任せください。"],
    },
  ],

  // 喜援ホームヘルプサービス「サービス」ページの原文（見出しは PAGES.md の3つの名前）
  homeHelp: {
    about: {
      title: "喜援ホームヘルプサービスについて",
      catch: "忙しくて育児が大変！疲れて家事に手が回らない！そんなあなたへ！",
      lead: "長年の介護とスタッフの個々のスキルを活かしたサービスを心を込めて！",
      body: [
        "女性の社会進出が進み、共働きが当たり前になった現代で「忙しくて育児が大変！」「疲れて家事に手が回らない！」ということが増え、つい後回しにしたり無理をしたりする方が多くなってまいりました。また、一人暮らしや高齢化で「できないこと」も増えております。",
        "そこで弊社では、そんな方々の手助けがしたいと思い、「家事支援サービス」を始めました。",
        "疲れを癒す時間が欲しい！たまの贅沢のために！",
        "そんなあなたに、喜援のサポートをご利用ください！",
        "長年の介護経験とスタッフ個々のスキルを活かしたサービスを提供いたします！",
      ],
    },
    menu: {
      title: "サービス内容",
      excludedLabel: "対象外",
      items: [
        {
          title: "お部屋のお掃除",
          description: [
            "ついつい後回しにしがちなご自宅のお掃除を、スタッフが丁寧に代行！",
            "綺麗なお部屋での快適な暮らしをサポートします。",
          ],
          notes: ["掃除機などの大型用具はお客様宅のものをお借りして行います。"],
          excluded: "高所作業などの危険作業や専用の知識・機材を用いる作業は、家事支援のサポート外となります。",
        },
        {
          title: "育児のお手伝い",
          description: ["大変な育児のサポートを行います！", "授乳やおむつ交換、お風呂介助やご兄姉の遊び相手等承ります。"],
          excluded: "医療行為やお客様ご不在時の支援、ベッドや玩具の組み立て等は対象外となります。",
        },
        {
          title: "お食事の用意",
          description: [
            "毎日大変なお食事の用意を代行します！",
            "バランスの取れた食事を提案し、健康を考えながら手間をなくしてご自宅での時間をゆっくりと！",
          ],
          // 原文は「※特別な手間をかける料理（お正月料理等）、来客の応接（飲物や食事の手配）は対象外です。お客様とご家族への支援となります。」の1つながり
          excluded: "特別な手間をかける料理（お正月料理等）、来客の応接（飲物や食事の手配）は対象外です。お客様とご家族への支援となります。",
        },
      ],
    },
    fee: {
      title: "料金",
      note: "1時間単位でのサービス提供となります。",
      table: {
        caption: "家事支援の料金",
        headers: ["時間", "料金"],
        // 「1回2時間 5,000円」は載せない（2026-10-21 引き継ぎ 05「2時間5,000円は非表示」）。
        // 1時間2,500円も正しい金額かどうかは田中さんに確認中（docs/CLIENT_CHECKLIST.md）。確定したらここだけ直す
        rows: [{ label: "1回1時間", value: "2,500円" }],
      },
    },
    coverage: {
      title: "対応エリア・日時",
      items: [
        { term: "対応エリア", detail: "富士市内" },
        { term: "対応日", detail: "祝祭日を除く月曜日〜金曜日" },
        { term: "対応時間", detail: "9：00〜17：00" },
      ],
    },
    cancel: {
      title: "※注意事項",
      body: [
        "サービス提供前日以降のキャンセルをされる場合は、キャンセル料2,000円頂戴します。",
        "2日前までのキャンセルに関してはキャンセル料は頂いておりませんのでご安心ください。",
      ],
    },
    hagukumu: {
      title: ["はぐくむFUJI", "家事育児サポート事業", "協力事業所"],
      body: [
        "はぐくむFUJI",
        "家事育児サポート",
        "ご利用のお客様なら、",
        "利用額の一部を",
        "富士市が負担するので、",
        "お手頃価格で",
        "ご利用いただけます！",
        "ぜひご活用ください！",
      ],
      note: "詳しくは、富士市 家事・育児サポートの「サービス内容」をご覧ください。",
      registered: {
        text: "はぐくむFUJIに登録済みの方は、こちらからお問い合わせください。",
        contact: { label: "お問い合わせ", href: site.contact.href },
      },
      unregistered: {
        text: "ご利用をご希望で、まだ登録されていない方は、こちらからご登録のうえ、お問い合わせください。",
        // 富士市の公式ページ（外部サイト）。2026-10-28 に、旧ホームヘルプサイトにあった「はぐくむFUJI家事育児サポート事業ページ」
        // へのリンク（転送先 p001498）を確認して差し替えた。この事業の利用は、富士市への利用申請（電子申請）→ 利用者証の郵送 →
        // 事業者（喜援）へ連絡、の流れ（富士市のページより）。10-27 に入れた p001523（子育てガイド）・p001528（子育て応援アプリ）は
        // この事業の案内ではないため外した
        links: [
          { label: "はぐくむFUJI家事育児サポート事業（富士市）", href: "https://www.city.fuji.shizuoka.jp/1023150000/p001498.html" },
          { label: "利用申請はこちら（富士市の電子申請）", href: "https://logoform.jp/form/5KXT/480451" },
        ],
      },
    },
    reserve: {
      title: "ご予約",
      // 原文「お電話でも承っております。」「お気軽にお電話ください。」。予約フォームは未実装のためお電話を案内する
      body: "ご予約いただけるようでしたら、下記のお電話番号にお気軽にお問合せください。",
      tel: site.company.tel,
    },
  },

  contactLabel: site.contact.label,
  contactHref: site.contact.href,
};
