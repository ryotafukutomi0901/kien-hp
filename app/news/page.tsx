import type { Metadata } from "next";

import { PageIntro } from "@/components/common/PageIntro";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "株式会社華護からのお知らせです。",
};

// PHASE 1: 下層ページは仮置き。トップの全セクション完成後に中身を作る
export default function Page() {
  return (
    <PageIntro title="お知らせ">
      <p>このページは準備中です。</p>
    </PageIntro>
  );
}
