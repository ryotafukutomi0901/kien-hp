import type { MarqueeContent } from "@/types/site";

// 横に流れる大きな欧文の帯（手本の「We are the creative group…」型）。
// 欧文は飾りで、意味は日本語の原文から取った（理念: 「人を大切にする会社になる」、採用: 「一緒に働くスタッフを募集しております」）。
// 新しい事実は書かない。写真はすべて仮画像（docs/PHOTO_SHOTLIST.md）
export const philosophyMarquee: MarqueeContent = {
  label: "人を大切にする会社になる",
  segments: ["We aim to be", "a company that", "values people."],
  images: [
    { image: { src: "/images/services/home-visit.jpg", alt: "", position: "50% 55%" }, tone: "orange" },
    { image: { src: "/images/events/2026-04-28-dementia-training.jpg", alt: "", position: "50% 45%" }, tone: "green" },
  ],
};

export const recruitMarquee: MarqueeContent = {
  label: "一緒に働くスタッフを募集しております",
  segments: ["We are looking for", "people to work", "with us."],
  images: [
    { image: { src: "/images/recruit/recruit.jpg", alt: "", position: "30% 40%" }, tone: "yellow" },
    { image: { src: "/images/events/2026-07-26-curry-party.jpg", alt: "", position: "50% 20%" }, tone: "blue" },
  ],
};
