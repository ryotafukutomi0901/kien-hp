import type { Metadata } from "next";

import { PageIntro } from "@/components/common/PageIntro";

export const metadata: Metadata = {
  title: "事業所・会社概要",
  description: "株式会社華護の事業所と会社概要をご案内します。",
};

// PHASE 1: 下層ページは仮置き。トップの全セクション完成後に中身を作る
export default function Page() {
  return (
    <PageIntro title="事業所・会社概要">
      <p>このページは準備中です。</p>
    </PageIntro>
  );
}
