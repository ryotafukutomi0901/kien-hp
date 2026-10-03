import type { Metadata } from "next";

import { PageIntro } from "@/components/common/PageIntro";

export const metadata: Metadata = {
  title: "サービス",
  description: "訪問介護・居宅介護支援・事業支援・訪問看護の4つのサービスをご紹介します。",
};

// PHASE 1: 下層ページは仮置き。トップの全セクション完成後に中身を作る
export default function Page() {
  return (
    <PageIntro title="サービス">
      <p>このページは準備中です。</p>
    </PageIntro>
  );
}
