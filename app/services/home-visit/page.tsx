import type { Metadata } from "next";

import { SimpleServicePage } from "@/components/pages/services/SimpleServicePage";

export const metadata: Metadata = {
  title: "訪問介護事業",
  // 総合HPトップ紹介文・求人サイト「よくあるご質問」から
  description: "富士・富士宮市の訪問介護事業所です。見守りや入浴介助、服薬管理等の介護支援から、掃除・洗濯や食事の用意、おむつ交換等の家事支援でサポートいたします！",
};

export default function Page() {
  return <SimpleServicePage id="home-visit" />;
}
