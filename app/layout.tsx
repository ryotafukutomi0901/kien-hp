import type { Metadata } from "next";
import { Klee_One, Zen_Maru_Gothic } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/data/site";

import "@/styles/tokens.css";
import "@/styles/base.css";

// 和文フォントはグリフ数が多いためpreloadしない（next/fontが自動でunicode-range分割する）
// 見出しは600だけを使う（400を読み込むと@font-faceが約120件増えCSSが重くなる）
const klee = Klee_One({
  weight: ["600"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-klee",
});

const zenMaru = Zen_Maru_Gothic({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-zen-maru",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.siteUrl),
  title: {
    default: site.seo.title,
    template: `%s｜${site.seo.siteName}`,
  },
  description: site.seo.description,
  openGraph: {
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.seo.siteName }],
    locale: "ja_JP",
    siteName: site.seo.siteName,
    title: site.seo.title,
    description: site.seo.description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${klee.variable} ${zenMaru.variable}`} data-scroll-behavior="smooth">
      <body id="top">
        <a href="#main" className="skip-link">
          本文へスキップ
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
