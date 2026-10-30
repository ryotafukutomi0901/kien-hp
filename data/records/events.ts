import type { EventCategory, EventPhoto, EventRecord } from "@/types/site";

/**
 * 会社行事（旧採用サイト「INFO > 会社行事」の全20件。新しい順）。
 * - 本文（body）は旧サイトの一覧の抜粋の原文のまま（reference/old-site-text/recruit_会社行事*.txt）
 * - 下層ページの本文（detail）は、旧サイトの詳しいページに抜粋と違う本文があった2件だけ（原文のまま）
 * - 写真は旧サイトの各記事に載っていた全53枚（クライアント自身の写真。2026-10-28 取り込み）。
 *   原本は reference/old-site-images/events/<id>/、サイト用は scripts/optimize-images.py で public/images/events/<id>/ に出す。
 *   顔は旧サイトの段階でスタンプ・ぼかしで隠してある。掲載してよいかの確認は docs/CLIENT_CHECKLIST.md
 * - 分類（categories）は旧サイトには無く、記事の内容から分けたもの（2026-10-28）。変えるときはここだけ直す
 * トップの抜粋（data/sections/events.ts）、一覧（app/events）、下層ページ（app/events/[id]）で共通に使う。
 */

/** 分類の並び（一覧の絞り込みの順）と表記 */
export const eventCategories: { id: EventCategory; label: string }[] = [
  { id: "meal", label: "食事会" },
  { id: "training", label: "研修" },
  { id: "celebration", label: "お祝い・記念" },
  { id: "season", label: "季節の行事" },
  { id: "gift", label: "いただきもの・ご来所" },
];

export function eventCategoryLabel(id: EventCategory): string {
  return eventCategories.find((category) => category.id === id)?.label ?? id;
}

/** 分類ごとの件数（「すべて」は all）。一覧と下層ページの目次に添える */
export function eventCategoryCounts(records: EventRecord[]): Record<EventCategory | "all", number> {
  const counts = { all: records.length } as Record<EventCategory | "all", number>;
  for (const { id } of eventCategories) counts[id] = records.filter((record) => record.categories.includes(id)).length;
  return counts;
}

/** 写真のファイルの場所（0始まりの番号 → 01.jpg） */
export function eventPhotoSrc(id: string, index: number): string {
  return `/images/events/${id}/${String(index + 1).padStart(2, "0")}.jpg`;
}

const photo = (alt: string, width: number, height: number): EventPhoto => ({ alt, width, height });

export const eventRecords: EventRecord[] = [
  {
    id: "2026-07-26-curry-party",
    date: "2026-07-26",
    title: "恒例カレーパーティー",
    body: ["恒例となっているケアマネージャーの高本さんのカレーパーティーが催されました。前日から仕込んでいただき、大変美味しいカレーを頂くことができました。いつもありがとうございます！"],
    categories: ["meal"],
    cover: 5,
    photos: [
      photo("エプロン姿のスタッフが、カレーの大鍋を前に調理している様子", 1110, 1474),
      photo("台所で鍋を囲んで料理の支度をするスタッフ", 1047, 1465),
      photo("テーブルを囲んでカレーを食べるスタッフ", 1600, 1201),
      photo("長机に並んで食事をするスタッフ", 1291, 1600),
      photo("並んでピースサインをするスタッフ2人", 1288, 1600),
      photo("カレーライスとサラダ、デザートを並べた食卓", 1600, 1177),
      photo("エプロン姿で台所に並んで立つスタッフ2人", 1101, 1304),
      photo("カップに入ったデザートが並ぶテーブルと、エプロン姿のスタッフ", 1110, 1289),
    ],
  },
  {
    id: "2026-05-26-ethics-training",
    date: "2026-05-26",
    title: "職業倫理と法令遵守の研修",
    body: ["職業倫理と法令遵守の研修を行いました。", "皆さん自分の考えや意見を発表しており、有意義な時間となりました。"],
    categories: ["training"],
    photos: [
      photo("会議室で机をロの字に並べて研修を受ける参加者", 1477, 1108),
      photo("研修中の会議室の様子", 1477, 1108),
    ],
  },
  {
    id: "2026-04-28-birthday",
    date: "2026-04-28",
    title: "弊社ケアマネさんのお誕生日",
    body: ["先日、ケアマネさんのお誕生日だったとのことで、出勤時にちゃんちゃんこを着て出勤してくださり人気者でした。お誕生日おめでとうございます！", "また、高本さんがご実家へ帰り、農作業のお手伝いをされたそうです。お土産の野沢菜美味しかったです。ありがとうございました！"],
    categories: ["celebration", "gift"],
    cover: 2,
    coverPosition: "50% 22%",
    photos: [
      photo("赤いちゃんちゃんこと帽子を身につけたケアマネジャー（「お誕生日おめでとうございます」の文字入り）", 959, 1278),
      photo("事務所で、ちゃんちゃんこ姿のケアマネジャーを囲むスタッフ", 1108, 1477),
      photo("赤いちゃんちゃんこ姿で扇子を持つケアマネジャー", 900, 1600),
      photo("お土産の野沢菜や牛乳パン、塩羊羹", 1477, 1108),
    ],
  },
  {
    id: "2026-04-28-dementia-training",
    date: "2026-04-28",
    title: "研修を行いました！",
    body: ["南部地域包括支援センターの方にお越しいただき、認知症サポーター養成講座を実施していただきました。"],
    categories: ["training"],
    photos: [
      photo("会議室で机を囲んで認知症サポーター養成講座を受ける参加者", 1477, 1108),
      photo("講座中、机ごとに分かれて話し合う参加者", 1477, 1108),
    ],
  },
  {
    id: "2026-04-20-burger",
    date: "2026-04-20",
    title: "オーストラリア風ハンバーガー！",
    body: ["オーストラリアで有名なマスターフーズのバーベキューソースをゲットしたので、ハンバーガーの会が行われました。チーズやバターもオーストラリア産のものを使用。"],
    categories: ["meal"],
    cover: 4,
    photos: [
      photo("ハンバーガーをのせたお盆を持つエプロン姿のスタッフ", 1108, 1477),
      photo("台所でハンバーガーの具材を準備するスタッフ", 1477, 1108),
      photo("ひき肉やパン、付け合わせが並んだ調理台", 1477, 1108),
      photo("テーブルでハンバーガーを組み立てるスタッフ", 1477, 1108),
      photo("包み紙にのせたハンバーガーがずらりと並んだテーブル", 1477, 1108),
    ],
  },
  {
    id: "2026-03-28-housework-guests",
    date: "2026-03-28",
    title: "家事支援のかわいいお客様！",
    body: ["はぐくむFUJI家事育児サポート事業で家事支援に入らせていただいているご家庭が事務所に遊びに来てくださいました。ミルクプリンを食べ、事業所内の保育士と大きなスクリーンで動画を見たり、ブロック遊びなどをして楽しんでいました。"],
    categories: ["gift"],
    cover: 1,
    coverPosition: "50% 40%",
    photos: [
      photo("事務所の床で、ブロック遊びをする子どもたちと大人", 1477, 1108),
      photo("テーブルでおやつを食べる子どもたち", 1477, 1108),
    ],
  },
  {
    id: "2026-02-25-chief-birthday",
    date: "2026-02-25",
    title: "主任ケアマネージャー高本さんのお誕生日！",
    body: ["先日は弊社主任ケアマネージャーの高本さんのお誕生日でした！利用者様だけでなく、他社や関係各所との連携を大事にしている方なので、他事業所からもお祝いのお言葉やプレゼントを頂いていました！良い1年になりますように！"],
    categories: ["celebration", "gift"],
    photos: [photo("お誕生日にいただいたケーキや苺、花の贈り物", 1477, 1108)],
  },
  {
    id: "2026-02-21-wreath-training",
    date: "2026-02-21",
    title: "ヘルパーさんからのいただきものと研修",
    body: ["ヘルパーさんからお花のリースをいただきました！フロアに華やかさが出てとても良いです！", "いただいた大根で、主任ケアマネージャーの高本さんがおでんを振る舞ってくださいました。", "また、研修も行われました。"],
    categories: ["gift", "meal", "training"],
    photos: [
      photo("いただいたお花のリースや額、お菓子", 1440, 1080),
      photo("大鍋で煮込んだおでん", 1108, 1477),
      photo("器に盛ったおでん（大根・卵・さつま揚げ）", 1477, 1108),
      photo("会議室で研修を受ける参加者", 1200, 1600),
    ],
  },
  {
    id: "2025-12-25-kiritanpo-xmas",
    date: "2025-12-25",
    title: "クリスマスきりたんぽ会",
    body: ["Merry Christmas！", "こちらも恒例になってきたきりたんぽ会を行いました！ケアマネージャー高本さんの手作りです！"],
    categories: ["meal", "season"],
    cover: 2,
    photos: [
      photo("手作りのきりたんぽ", 1110, 1474),
      photo("テーブルにずらりと並んだ料理の大皿", 1600, 900),
      photo("大鍋で煮込んだきりたんぽ鍋", 1600, 900),
      photo("お盆にのせた料理とお椀", 1477, 1108),
      photo("会議室で料理を囲んで食事をするスタッフ", 1477, 1108),
      photo("料理を手にしたエプロン姿のスタッフ", 1110, 836),
    ],
  },
  {
    id: "2025-12-12-farewell",
    date: "2025-12-12",
    title: "退職されるヘルパーさんの記念撮影",
    body: ["ご主人の転勤でご退職されるヘルパーさんが最終挨拶に来られ、記念撮影をしました！"],
    detail: ["ご主人の転勤でご退職されるヘルパーさんが最終挨拶に来られ、記念撮影をしました！", "お引越し先でもお元気で！"],
    categories: ["celebration"],
    coverPosition: "50% 70%",
    photos: [photo("事業所の看板の前で記念撮影をするスタッフ（奥に富士山）", 1108, 1477)],
  },
  {
    id: "2025-10-31-tonjiru",
    date: "2025-10-31",
    title: "豚汁！",
    body: ["寒くなってきましたね。今回は豚汁が振る舞われました。ついでに初冠雪の富士山もパシャリ。"],
    categories: ["meal"],
    coverPosition: "50% 45%",
    photos: [
      photo("豚汁の大鍋の前で、鍋のふたを持つエプロン姿のスタッフ", 1108, 1477),
      photo("事業所の看板と、初冠雪の富士山", 1108, 1477),
    ],
  },
  {
    id: "2025-10-31-curry-salad",
    date: "2025-10-31",
    title: "カレー＆ポテトサラダ！",
    body: ["恒例になっているカレーと、ポテトサラダが振る舞われました。写真のものは人参を何本もすり下ろして作ったドレッシング。他にも、ジェノベーゼ風ドレッシングもあったみたいです！"],
    categories: ["meal"],
    coverPosition: "50% 60%",
    photos: [
      photo("大鍋でカレーを作るスタッフ", 1110, 1474),
      photo("台所でカレーとポテトサラダを作るスタッフ", 1200, 1600),
    ],
  },
  {
    id: "2025-06-20-farewell-party",
    date: "2025-06-20",
    title: "事務所移転に伴うお別れパーティー",
    body: ["来月に事務所を移転するので、現在の事務所でのお別れパーティーが開かれました！振る舞われたのはご存知主任ケアマネージャーの高本さんのカレー！"],
    categories: ["meal", "celebration"],
    cover: 1,
    photos: [
      photo("大皿に盛った揚げ野菜や焼き野菜", 1108, 1477),
      photo("カレーの鍋を囲むエプロン姿のスタッフ", 1474, 1111),
    ],
  },
  {
    id: "2025-04-23-gift-flowers",
    date: "2025-04-23",
    title: "利用者様からのプレゼント",
    body: ["利用者様より、お花をいただきました！事務所が明るくなりました！"],
    detail: ["利用者様からプレゼントでお花をいただきました。", "事務所が明るくなり、一同大変喜んでおります。", "誠にありがとうございます。"],
    categories: ["gift"],
    coverPosition: "50% 35%",
    photos: [photo("花瓶に生けた、いただきもののお花", 1110, 1474)],
  },
  {
    id: "2025-04-19-first-anniversary",
    date: "2025-04-19",
    title: "１周年記念食事会！",
    body: ["開業１周年を記念して、日頃のスタッフへの感謝を込めて食事会を開きました。"],
    categories: ["celebration", "meal"],
    coverPosition: "50% 45%",
    photos: [
      photo("えびや貝がのったパエリア", 1200, 1600),
      photo("皿に盛ったパスタ", 1200, 1600),
    ],
  },
  {
    id: "2025-03-31-pizza",
    date: "2025-03-31",
    title: "ピザパーティー",
    body: ["ケアマネジャーの高本さんがピザを振る舞ってくださいました！"],
    categories: ["meal"],
    cover: 1,
    photos: [
      photo("ホットプレートで作ったナポリタン", 1110, 1474),
      photo("生地にチーズをのせてピザを作るスタッフ", 1474, 1110),
    ],
  },
  {
    id: "2025-02-14-setsubun",
    date: "2025-02-14",
    title: "節分！",
    body: ["節分ということで、ちらし寿司と豚汁が振る舞われました。大変美味しゅうございました。"],
    categories: ["season", "meal"],
    photos: [photo("器に盛ったちらし寿司と豚汁", 1477, 1108)],
  },
  {
    id: "2025-01-06-new-year",
    date: "2025-01-06",
    title: "新年明けましておめでとうございます！",
    body: ["明けましておめでとうございます！", "今年もよろしくお願いいたします。", "お昼はお汁粉を作っていただきました！"],
    categories: ["season", "meal"],
    photos: [
      photo("お盆にのせたお汁粉とおかず", 1600, 1200),
      photo("台所でお汁粉の鍋の前に立つスタッフ", 1200, 1600),
    ],
  },
  {
    id: "2024-12-19-bounenkai",
    date: "2024-12-19",
    title: "大忘年会！",
    body: ["忘年会を行いました！きりたんぽです！", "今回もケアマネージャー髙本さん作です！"],
    categories: ["season", "meal"],
    cover: 1,
    coverPosition: "50% 35%",
    photos: [
      photo("料理を囲んで座るスタッフ", 800, 602),
      photo("きりたんぽ鍋の大鍋の前に立つエプロン姿のスタッフ", 1110, 1474),
    ],
  },
  {
    id: "2024-10-11-thanks-curry",
    date: "2024-10-11",
    title: "慰労カレーパーティー！",
    body: ["スタッフへの感謝を込めて、事務所にてカレーパーティーを開催しました！", "主任ケアマネージャーの高本さん手作りのカレーは、とても美味しいです！"],
    categories: ["meal"],
    cover: 1,
    coverPosition: "50% 40%",
    photos: [
      photo("台所でカレーの鍋を前にしたエプロン姿のスタッフ", 1110, 1474),
      photo("料理を囲んで食事をするスタッフ", 1110, 1474),
    ],
  },
];
