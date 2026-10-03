import { AboutSection } from "@/components/about/AboutSection";
import { FinalCta } from "@/components/cta/FinalCta";
import { Hero } from "@/components/hero/Hero";
import { NewsSection } from "@/components/news/NewsSection";
import { RecruitBlogSection } from "@/components/recruit/RecruitBlogSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { StaffSection } from "@/components/staff/StaffSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <AboutSection />
      <StaffSection />
      <NewsSection />
      <RecruitBlogSection />
      <FinalCta />
    </>
  );
}
