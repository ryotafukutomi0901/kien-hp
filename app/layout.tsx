import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { SiteBackground } from "@/components/background/SiteBackground";
import { ButtonWipeColor } from "@/components/common/ButtonWipeColor";
import { Reveal } from "@/components/common/Reveal";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ContactBandGate } from "@/components/cta/ContactBandGate";
import { FinalCta } from "@/components/cta/FinalCta";
import { IntroReplay } from "@/components/hero/IntroReplay";
import { Header } from "@/components/layout/Header";
import { site } from "@/data/site";
import { INTRO_SCRIPT } from "@/lib/intro";

import "lenis/dist/lenis.css";
import "@/styles/fonts.css";
import "@/styles/tokens.css";
import "@/styles/base.css";

// 書体: 欧文・数字=Ubuntu（手本の日本テレビアートと同じ）、和文=けいなんむぎまるJP（2026-10-28 CEO指示。見出し・本文を問わずこの1書体で、
// 差は文字サイズだけ。それまでは M PLUS Rounded 1c → その前は BIZ UDPゴシック）。
// 1つの指定（--font-sans）にこの順で並べ、h1〜h3・本文・ボタンを同じ指定で組む（styles/tokens.css）。
// 和文は public/fonts に小分けにして置き（scripts/build-font.py → styles/fonts.css）、かな・サイトで使う漢字の入った kmjp-00 だけ先読みする
const ubuntu = Ubuntu({
  weight: ["500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ubuntu",
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
    // data-intro は最初の描画より前に INTRO_SCRIPT が付ける（トップのヒーローの登場演出。lib/intro.ts）。サーバーの HTML と違うのは想定どおり
    <html lang="ja" className={ubuntu.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
        <link rel="preload" href="/fonts/keinan-mugimaru-jp/kmjp-00.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body id="top">
        <SiteBackground />
        <a href="#main" className="skip-link">
          本文へスキップ
        </a>
        <Header />
        <main id="main">
          {children}
          <ContactBandGate>
            <FinalCta />
          </ContactBandGate>
        </main>
        <Footer />
        <Reveal />
        <SmoothScroll />
        <ButtonWipeColor />
        <IntroReplay />
      </body>
    </html>
  );
}
