# kien-hp 構成とテキスト（CONTENTS.md）

株式会社 華護（サンプル）のコーポレートサイト。トップページの構成と下層ページの一覧。

**テキストの正本は `data/site.ts`**（型は `types/site.ts`）。この文書に本文を二重に書かない
（`handbook/02_quality/documentation_standard.md` 単一情報源の原則）。文言を変えるときは data/site.ts を直す。

## メタ情報

`data/site.ts` の `seo`。本番ドメイン（`siteUrl`）は未確定で `https://example.com` を仮置き。

## トップページ（`app/page.tsx`）

| 順 | セクション | data/site.ts のキー | 担当 |
|---|---|---|---|
| 1 | Header（グローバルナビ7項目＋お問い合わせ） | `company` `nav` `contact` | Sub-Agent 01 |
| 2 | Hero「富士のまちで、ともに生きる。」 | `hero` | Sub-Agent 02 |
| 3 | 私たちのサービス（4事業） | `services` | Sub-Agent 03 |
| 4 | 私たちのこと | `about` | Sub-Agent 04 |
| 5 | スタッフ紹介（4件） | `staff` | Sub-Agent 05 |
| 6 | NEWS・ブログ（3件） | `news` | Sub-Agent 06 |
| 7 | 採用情報／スタッフブログ | `promos` | Sub-Agent 07 |
| 8 | これからも、地域の皆さまとともに。 | `finalCta` | Sub-Agent 08 |
| 9 | Footer（住所・ナビ・SNS） | `company` `nav` `social` | Sub-Agent 09 |

## 下層ページ（PHASE 1では「準備中」の仮置き）

`/services` `/about`（事業所 `#offices`・会社概要 `#company`） `/staff` `/news` `/recruit` `/blog` `/contact`

## 未確定・要差し替え（納品前に必ず解消する）

- 社名「華護」・住所・投稿・お知らせはモック上のサンプル値
- 写真・ロゴ・葉っぱは素材シートからの仮切り出し（低解像度）
- SNSのURLは各サービスのトップページを仮置き
- 本番ドメイン、OGP画像、問い合わせフォームの仕様
