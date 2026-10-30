import type { Metadata } from "next";

import { SimpleServicePage } from "@/components/pages/services/SimpleServicePage";

export const metadata: Metadata = {
  title: "居宅介護支援事業",
  description: "常に在宅医や歯科医師、福祉用具業者と連携して動いているので、安心してご利用いただけます。現在ケアマネージャー6人在籍。",
};

export default function Page() {
  return <SimpleServicePage id="care-plan" />;
}
