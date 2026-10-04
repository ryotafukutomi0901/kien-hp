import { AboutSection } from "@/components/about/AboutSection";
import { FinalCta } from "@/components/cta/FinalCta";
import { Hero } from "@/components/hero/Hero";
import { NewsSection } from "@/components/news/NewsSection";
import { RecruitBlogSection } from "@/components/recruit/RecruitBlogSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { EventsSection } from "@/components/events/EventsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <AboutSection />
      <EventsSection />
      <NewsSection />
      <RecruitBlogSection />
      <FinalCta />
    </>
  );
}
