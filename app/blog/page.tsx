import type { Metadata } from "next";

import { PageIntro } from "@/components/common/PageIntro";

export const metadata: Metadata = {
  title: "スタッフブログ",
  description: "現場での出来事やスタッフの日常をお届けします。",
};

// PHASE 1: 下層ページは仮置き。トップの全セクション完成後に中身を作る
export default function Page() {
  return (
    <PageIntro title="スタッフブログ">
      <p>このページは準備中です。</p>
    </PageIntro>
  );
}
