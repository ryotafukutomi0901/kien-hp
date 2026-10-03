import type { Metadata } from "next";

import { PageIntro } from "@/components/common/PageIntro";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "株式会社華護へのお問い合わせはこちらから。",
};

// PHASE 1: 下層ページは仮置き。トップの全セクション完成後に中身を作る
export default function Page() {
  return (
    <PageIntro title="お問い合わせ">
      <p>このページは準備中です。</p>
    </PageIntro>
  );
}
