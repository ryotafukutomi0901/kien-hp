import type { FaqItem } from "@/components/page/Faq";
import type { TimelineItem } from "@/components/page/Timeline";
import type { IconName, Tone } from "@/types/site";

/**
 * /recruit（採用情報）の文言。旧サイト（求人サイト・総合HP）の原文から転記している。
 * 正本: docs/CONTENT_SOURCE.md 6章、原文: reference/old-site-text/recruit_*.txt・kien-fuji_採用情報.txt
 *
 * - 時刻は CONTENT_SOURCE.md の表記（8:30〜9:00）にそろえた。値は原文のまま
 * - 訪問介護ヘルパーの時給は CONTENT_SOURCE.md 9章#1 により下限のみ（上限は総合HPと求人サイトで食い違い）
 * - スタッフの一日（ヘルパーBさん）は時刻の重複・前後と「提供移動」を原文のまま載せている。直さないこと
 */

export interface RecruitPosition {
  /** カード見出しの id（ページ内リンク用） */
  id: string;
  title: string;
  icon: IconName;
  tone: Tone;
  /** 時給。カード内で強調する */
  wage: string;
  /** 時給以外の募集要項。全職種で同じ項目を同じ順に並べる（横に並べたとき行がそろう） */
  terms: { term: string; detail: string[] }[];
}

export interface RecruitDay {
  id: string;
  title: string;
  icon: IconName;
  tone: Tone;
  items: TimelineItem[];
}

export const recruitPage = {
  metadata: {
    title: "採用情報",
    description:
      "株式会社喜援（きえん）公式求人ページ。ケアマネージャー、ヘルパー、家事支援スタッフの求人、正社員、アルバイト・パート共に募集中。週1から短時間・ダブルワークOK！新富士駅から徒歩7分の事務所です。",
  },

  intro: {
    title: "採用情報",
    /** 文ごとに分ける（幅が足りるときは文の途中で折り返さない。「1～2時間」が割れるのを防ぐ） */
    lead: ["喜援では、一緒に働くスタッフを募集しております。", "1日1～2時間程度でも大丈夫です。"],
    /** 働き方の特徴。先頭を最も目立たせる */
    points: [
      "週1から短時間・ダブルワークOK！",
      "正社員、アルバイト・パート共に募集中",
      "新富士駅から徒歩7分の事務所",
      "女性活躍中の職場",
    ],
  },

  /** ページ内リンク（PageSection の id と対応） */
  sections: {
    positions: { id: "positions", title: "募集職種" },
    day: {
      id: "day",
      title: "スタッフの一日",
      lead: "弊社スタッフの1日の業務一例です。ご相談いただければ柔軟に勤務時間等対応いたします。",
    },
    faq: { id: "faq", title: "よくあるご質問" },
    apply: { id: "apply", title: "応募方法" },
  },

  positions: [
    {
      id: "position-caremanager",
      title: "ケアマネジャー",
      icon: "person",
      tone: "green",
      wage: "1,300円～",
      terms: [
        { term: "通勤手当", detail: ["支給あり"] },
        { term: "勤務時間", detail: ["8:30〜17:30", "相談に応じます"] },
        { term: "休日", detail: ["会社カレンダー表に準じます"] },
        { term: "保険", detail: ["労災保険：加入", "雇用保険・社会保険：加入条件に準ずる"] },
        { term: "必要資格", detail: ["介護支援専門員（ケアマネージャー）"] },
      ],
    },
    {
      id: "position-helper",
      title: "訪問介護ヘルパー",
      icon: "house",
      tone: "yellow",
      wage: "1,400円～",
      terms: [
        { term: "通勤手当", detail: ["支給あり"] },
        { term: "勤務時間", detail: ["8:30〜17:30の間の3時間程度", "相談に応じます"] },
        { term: "休日", detail: ["シフト表に準じます（相談に応じます）"] },
        { term: "保険", detail: ["労災保険：加入"] },
        { term: "必要資格", detail: ["介護職員初任者研修修了者、ホームヘルパー2級をお持ちの方"] },
      ],
    },
    {
      id: "position-homehelp",
      title: "家事支援スタッフ",
      icon: "sun",
      tone: "orange",
      wage: "1,200円",
      terms: [
        { term: "通勤手当", detail: ["支給あり"] },
        { term: "勤務時間", detail: ["8:30〜17:30の間で相談に応じます"] },
        { term: "休日", detail: ["シフト表に準じます（相談に応じます）"] },
        { term: "保険", detail: ["労災保険：加入"] },
        { term: "必要資格", detail: ["普通自動車運転免許（AT限定可）"] },
      ],
    },
  ] satisfies RecruitPosition[],

  days: [
    {
      id: "day-helper-a",
      title: "ヘルパーAさんの場合",
      icon: "house",
      tone: "yellow",
      items: [
        { time: "8:30〜9:00", text: "自宅から利用者様宅へ移動" },
        { time: "9:00〜10:00", text: "Aさん宅へ生活介助の提供" },
        { time: "10:00〜10:30", text: "移動" },
        { time: "10:30〜11:30", text: "Bさん宅で身体介護の提供" },
        { time: "12:00〜13:30", text: "移動、休憩" },
        { time: "13:30〜14:00", text: "移動" },
        { time: "14:00〜15:00", text: "Cさん宅で生活介助の提供" },
        { time: "15:00", text: "帰宅" },
      ],
    },
    {
      // 原文のまま（11:00〜14:00が直前の10:45〜11:45と重なる、15:00帰宅が15:00〜15:30の移動と重なる、「提供移動」）
      id: "day-helper-b",
      title: "ヘルパーBさんの場合",
      icon: "house",
      tone: "yellow",
      items: [
        { time: "8:30〜9:30", text: "自宅から利用者様宅へ移動" },
        { time: "9:30〜10:30", text: "Aさん宅へ生活介助の提供" },
        { time: "10:30〜10:45", text: "移動" },
        { time: "10:45〜11:45", text: "Bさん宅で生活介助の提供" },
        { time: "11:00〜14:00", text: "移動、休憩" },
        { time: "14:00〜15:00", text: "Cさん宅で身体介護の提供移動" },
        { time: "15:00〜15:30", text: "移動" },
        { time: "15:00", text: "帰宅" },
      ],
    },
    {
      id: "day-caremanager-c",
      title: "ケアマネージャーCさんの場合",
      icon: "person",
      tone: "green",
      items: [
        { time: "8:30〜9:30", text: "メールチェック、書類作成" },
        { time: "9:30〜10:00", text: "担当者会議（週1〜2回）" },
        { time: "10:00〜12:00", text: "事業所との連絡や調整" },
        { time: "12:00〜13:00", text: "休憩" },
        { time: "13:00〜15:00", text: "書類作成、市役所への書類提出" },
        { time: "15:00〜16:00", text: "モニタリング訪問" },
        { time: "16:00〜17:00", text: "担当者会議" },
        { time: "17:00", text: "帰宅" },
      ],
    },
  ] satisfies RecruitDay[],

  faq: [
    {
      question: "勤務時間について",
      answer: ["8:30〜18:00までの間でフルタイム、パートタイム共に柔軟に対応いたします。"],
    },
    {
      question: "勤務日数について",
      answer: ["週ごとのシフト制になります。毎週水曜日にご希望のシフトを仰っていただければOKです。"],
    },
    {
      question: "支援の地域について",
      answer: ["富士・富士宮市にてサービス提供しております。"],
    },
    {
      question: "休日について",
      answer: [
        "事前に仰っていただければもちろんOKです。また、急な場合もサービス責任者に仰っていただければ、すぐに対応いたします。",
      ],
    },
    {
      question: "支援の同行について",
      answer: [
        "未経験、経験者にかかわらず、ご自分の不安が除かれるまで同行いたします。自信のある方は1回で一人立ちの方もおります。",
      ],
    },
    {
      question: "服装について",
      answer: ["制服としてポロシャツを支給しております。基本自由ですが、派手なものや露出の多いものはご遠慮ください。"],
    },
  ] satisfies FaqItem[],

  apply: {
    heading: "お電話でご応募ください",
    salesNote: "※営業のお電話はご遠慮ください。",
    closing: "ご応募お待ちしております。",
    contactText: "お気軽にお問い合わせください。",
    contactLink: { label: "お問い合わせ", href: "/contact" },
  },
};
