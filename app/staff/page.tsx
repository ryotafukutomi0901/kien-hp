import type { Metadata } from "next";

import { PageIntro } from "@/components/common/PageIntro";

export const metadata: Metadata = {
  title: "スタッフ紹介",
  description: "株式会社華護で働くスタッフをご紹介します。",
};

// PHASE 1: 下層ページは仮置き。トップの全セクション完成後に中身を作る
export default function Page() {
  return (
    <PageIntro title="スタッフ紹介">
      <p>このページは準備中です。</p>
    </PageIntro>
  );
}
