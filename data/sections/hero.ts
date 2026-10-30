import type { HeroContent } from "@/types/site";

// 担当: Sub-Agent 02（Hero）。写真の position（object-position）調整はこのファイルで行う
// 文言は旧サイトの原文のまま（要約・言い換えをしない）。主コピーは「ご挨拶」の「人を大切にする会社になる」、リードは総合HPトップの紹介文の1文目。配列の区切りは改行位置だけ
// 2026-10-28 CEO指示: 「人を大切にする会社になる」をコンセプトに、それに合う写真を大きく置く。色の丸の演出は全ページの背景（SiteBackground）へ移した。
// 右下のカードは Instagram へ（2026-10-28 CEO指示。お知らせから差し替え。URLは data/site.ts の social.instagram）
// 写真は仮画像（スタッフが高齢の方の手にそっと手を重ねている生成画像）。撮影写真が届いたら hero-people.jpg を同じ名前で差し替える（docs/PHOTO_SHOTLIST.md #1）
export const hero: HeroContent = {
  title: ["人を大切にする", "会社になる"],
  lead: ["富士市にて訪問・居宅介護事業、", "家事支援事業を行っております。"],
  cta: { label: "私たちの想いを見る", href: "/about#company" },
  secondaryCta: { label: "採用情報を見る", href: "/recruit" },
  image: {
    src: "/images/hero/hero-people.jpg",
    alt: "介護スタッフが高齢の方の手にそっと手を重ねている様子",
    position: "42% 55%",
  },
  badge: "KIEN · FUJI CITY · SHIZUOKA · ",
};
