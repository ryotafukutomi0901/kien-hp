import type { Link } from "@/types/site";

/**
 * プライバシーポリシー（app/privacy）の文面。
 * 旧サイトのプライバシーポリシーは本文が空だった（docs/CONTENT_SOURCE.md 9章 #6）ため、新たに起こした下書き。
 * 次の旧サイトの文言を軸にしている（reference/old-site-text/kien-fuji_お問い合わせ.txt）:
 *   - 「お客様の承諾が無い限り第三者に開示、提供を一切いたしません」→ 第三者への提供
 *   - 「その目的以外には利用いたしません」→ 利用目的の末尾
 *   - 「ご提供いただいた個人情報を取り扱うにあたり管理責任者を置き、適切な管理を行っております」→ 安全管理（原文のまま）
 * 会社名・所在地・電話はここに書かず data/site.ts の site.company から読む。
 * 制定日・管理責任者の氏名など、原文に無い事実は書かない。内容はクライアント確認待ち（docs/CLIENT_CHECKLIST.md 5章）。
 *
 * このファイルは型のみを import する（data/site.ts が privacyLink を読むため、site を読むと循環する）。
 */

/** プライバシーポリシーへのリンク。フッター（site.legal）とお問い合わせページから使う */
export const privacyLink: Link = { label: "プライバシーポリシー", href: "/privacy" };

/** 文中のリンク。external は別サイト（新しいタブで開く） */
export interface PolicyLink {
  label: string;
  href: string;
  external?: boolean;
}

export type PolicyInline = string | PolicyLink;

export type PolicyBlock =
  | { type: "paragraph"; text: string | PolicyInline[] }
  | { type: "list"; items: string[] }
  /** 1行に単独で置くリンク（押せる範囲を --tap-min 以上にする） */
  | { type: "link"; link: PolicyLink }
  /** お問い合わせ窓口（会社名・所在地・電話）。中身は site.company から組む */
  | { type: "contactWindow" };

export interface PolicySection {
  /** ページ内リンク（目次）の着地点 */
  id: string;
  title: string;
  blocks: PolicyBlock[];
}

export interface PrivacyPageContent {
  title: string;
  /** 前文。会社名は site.company から渡す */
  preamble: (companyName: string) => string[];
  description: (companyName: string) => string;
  tocLabel: string;
  sections: PolicySection[];
  contactWindow: {
    nameLabel: string;
    addressLabel: string;
    telLabel: string;
  };
  /** 別サイトへのリンクに付ける読み上げ用の補足 */
  newTabNote: string;
}

export const privacyPage: PrivacyPageContent = {
  title: privacyLink.label,
  // 1文が長くなりすぎないよう2文に分け、1段落にまとめている
  preamble: (companyName) => [
    `当社（${companyName}）は、居宅介護支援事業・訪問介護事業・家事支援事業を営んでいます。ご利用者様・ご家族・お問い合わせいただいた方・採用に応募された方の個人情報を、個人情報の保護に関する法律その他の法令と、個人情報保護委員会・厚生労働省「医療・介護関係事業者における個人情報の適切な取扱いのためのガイダンス」に沿って、適切に取り扱います。`,
  ],
  description: (companyName) =>
    `${companyName}のプライバシーポリシーです。ご利用者様・ご家族・お問い合わせいただいた方・採用に応募された方の個人情報の取り扱いについて定めています。`,
  tocLabel: "目次",
  sections: [
    {
      id: "collection",
      title: "取得する個人情報",
      blocks: [
        { type: "paragraph", text: "当社は、次のような個人情報をお預かりすることがあります。" },
        {
          type: "list",
          items: [
            "氏名・住所・電話番号・メールアドレス",
            "心身の状況や介護に関する情報（サービスの提供に必要な範囲に限ります）",
            "採用に応募された方の経歴・資格など",
          ],
        },
      ],
    },
    {
      id: "purpose",
      title: "利用目的",
      blocks: [
        { type: "paragraph", text: "お預かりした個人情報は、次の目的のために利用します。" },
        {
          type: "list",
          items: [
            "介護サービス（居宅介護支援・訪問介護）の提供と、そのための医療機関・他の介護サービス事業者・市町村・地域包括支援センターなどとの連携",
            "家事支援サービスの提供と、ご予約への対応",
            "介護保険に関する事務",
            "お問い合わせへの回答",
            "採用選考と、応募された方へのご連絡",
            "サービスの向上",
          ],
        },
        // 旧サイト「その目的以外には利用いたしません」
        { type: "paragraph", text: "これらの目的以外には利用いたしません。" },
      ],
    },
    {
      id: "third-party",
      title: "第三者への提供",
      blocks: [
        // 旧サイト「お客様の承諾が無い限り第三者に開示、提供を一切いたしません」。
        // 直後に法令上の例外を挙げるため「一切」は外し、応募者も含むため「お客様」を「ご本人」にしている
        {
          type: "paragraph",
          text: "当社は、ご本人の承諾が無い限り、個人情報を第三者に開示、提供いたしません。ただし、次の場合は除きます。",
        },
        {
          type: "list",
          // 個人情報の保護に関する法律 第27条第1項の例外を平易に言い換えたもの
          items: [
            "法令に基づく場合",
            "人の生命・身体・財産を守るために必要で、ご本人の同意を得ることが難しい場合",
            "公衆衛生の向上や、児童の健全な育成のために特に必要で、ご本人の同意を得ることが難しい場合",
            "国の機関や地方公共団体などが法令の定める事務を行うことに協力する必要があり、ご本人の同意を得ると、その事務に支障が出るおそれがある場合",
          ],
        },
        {
          type: "paragraph",
          text: "サービス担当者会議などで、医療機関や他の介護サービス事業者と情報を共有する場合は、あらかじめ同意をいただいた範囲で行います。",
        },
      ],
    },
    {
      id: "security",
      title: "安全管理",
      blocks: [
        // 旧サイトの文言のまま（主語「当社は、」だけ補っている）
        {
          type: "paragraph",
          text: "当社は、ご提供いただいた個人情報を取り扱うにあたり管理責任者を置き、適切な管理を行っております。",
        },
      ],
    },
    {
      id: "request",
      title: "開示・訂正・利用停止などのご請求",
      blocks: [
        {
          type: "paragraph",
          text: [
            "ご本人から、ご自身の個人情報の開示・訂正・利用停止などのご請求があった場合は、法令に従って対応いたします。下記の",
            { label: "お問い合わせ窓口", href: "#contact-window" },
            "までご連絡ください。",
          ],
        },
      ],
    },
    {
      id: "contact-window",
      title: "お問い合わせ窓口",
      blocks: [
        { type: "paragraph", text: "個人情報の取り扱いに関するお問い合わせ・ご請求は、下記までご連絡ください。" },
        { type: "contactWindow" },
      ],
    },
    {
      id: "website",
      title: "当サイトについて",
      blocks: [
        { type: "paragraph", text: "当サイトでは、現在、アクセス解析ツールを使用していません。" },
        {
          type: "paragraph",
          text: [
            "「",
            { label: "アクセス", href: "/about#offices" },
            "」のページでは、地図を表示するためにGoogleマップを埋め込んでいます。このページをご覧になると、Googleがその利用に関する情報を収集する場合があります。くわしくは、Googleのプライバシーポリシーをご覧ください。",
          ],
        },
        {
          type: "link",
          link: { label: "Googleのプライバシーポリシー", href: "https://policies.google.com/privacy", external: true },
        },
      ],
    },
    {
      id: "revision",
      title: "改定",
      blocks: [
        {
          type: "paragraph",
          text: "当社は、必要に応じて、このプライバシーポリシーを改定することがあります。改定した場合は、このページでお知らせします。",
        },
      ],
    },
  ],
  contactWindow: {
    nameLabel: "会社名",
    addressLabel: "所在地",
    telLabel: "電話番号",
  },
  newTabNote: "（新しいタブで開きます）",
};
