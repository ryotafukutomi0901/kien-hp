import type { Metadata } from "next";

import { NotFoundView, type NotFoundContent } from "@/components/pages/not-found/NotFoundView";
import { site } from "@/data/site";

/*
 * 404。存在しないURL（と notFound() の呼び出し）でルートレイアウトの中に表示される（Next.js 16 の app/not-found.tsx）。
 * 404で返る場合は Next.js が <meta name="robots" content="noindex"> を自動で入れるが、ストリーミングの応答では
 * 状態コードが200になることがあるため、metadata でも明示して検索エンジンに載せない。
 */
export const metadata: Metadata = {
  title: "ページが見つかりません",
  robots: { index: false, follow: true },
};

/** 文言はこのページでしか使わないためここに置く（data/pages/ に分ける場合は統括に相談） */
const content: NotFoundContent = {
  title: ["お探しのページが", "見つかりませんでした"],
  body: [
    "ページが移動したか、削除された可能性があります。",
    "お手数ですが、トップページに戻るか、主なページの一覧からお探しください。",
  ],
  home: { label: "トップページへ戻る", href: "/" },
  pages: {
    title: "主なページ",
    // 説明はリンク先のページにある内容だけ（docs/CONTENT_SOURCE.md）
    items: [
      { label: "事業内容", href: "/#services", description: "訪問介護・居宅介護支援・家事支援", tone: "yellow" },
      { label: "アクセス", href: "/about#offices", description: "事業所の一覧・所在地・地図", tone: "green" },
      { label: "採用情報", href: "/recruit", description: "ケアマネジャー・ヘルパー・家事支援スタッフの募集", tone: "orange" },
      { label: site.contact.label, href: site.contact.href, description: "お電話でのご相談・家事支援のご予約", tone: "blue" },
    ],
  },
  tel: {
    title: "お電話でのお問い合わせ",
    // 「お問い合わせください」は狭い画面で「お問い／合わせ」と語の途中で折れるため「ご相談ください」にしている
    lead: "ご不明な点は、お電話でもお気軽にご相談ください。",
    salesNotice: "※営業のお電話はご遠慮ください。",
  },
};

export default function NotFound() {
  return <NotFoundView content={content} tel={site.company.tel} />;
}
