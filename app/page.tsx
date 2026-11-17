import { AboutSection } from "@/components/about/AboutSection";
import { CommunitySection } from "@/components/community/CommunitySection";
import { FinalCta } from "@/components/cta/FinalCta";
import { Hero } from "@/components/hero/Hero";
import { PhotoMarquee } from "@/components/marquee/PhotoMarquee";
import { NewsSection } from "@/components/news/NewsSection";
import { RecruitBlogSection } from "@/components/recruit/RecruitBlogSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { site } from "@/data/site";

/**
 * トップの並び（2026-10-21 引き継ぎ・打ち合わせ）:
 * ヘッダー → ヒーロー → 理念 → 事業内容 → Instagram｜会社行事 → お知らせ → 採用情報 → お問い合わせ → フッター。
 * 理念をヒーローの直後に置く（「人を大切にする会社になる」を軸に伝える）。料金の帯（PriceGuide）はトップには置かない（2026-11-17 CEO指示。訪問介護・居宅介護支援のページだけ）。
 * 見た目の手本は日本テレビアート（2026-10-27）。事業内容の後に、手本と同じく流れる欧文の帯を挟む。
 * 最後の「Contact Us!」の帯（FinalCta）はトップだけに置く（2026-11-18 CEO指示で会社概要・3事業のページから外した。それまでは layout が置いていた）。
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <div className="band-white">
        <PhotoMarquee content={site.marquees.philosophy} />
      </div>
      <CommunitySection />
      <NewsSection />
      <RecruitBlogSection />
      <FinalCta />
    </>
  );
}
