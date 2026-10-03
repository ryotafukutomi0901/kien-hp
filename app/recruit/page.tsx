import type { Metadata } from "next";

import { PageIntro } from "@/components/common/PageIntro";

export const metadata: Metadata = {
  title: "採用情報",
  description: "株式会社華護の採用情報です。一緒に地域の暮らしを支える仲間を募集しています。",
};

// PHASE 1: 下層ページは仮置き。トップの全セクション完成後に中身を作る
export default function Page() {
  return (
    <PageIntro title="採用情報">
      <p>このページは準備中です。</p>
    </PageIntro>
  );
}
