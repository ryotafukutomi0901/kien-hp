@AGENTS.md

# kien-hp — CLAUDE.md

株式会社喜援（きえん。静岡県富士市の居宅介護支援・訪問介護・家事支援）のコーポレートサイト。
参考モック `reference/mock.png`（サンプル社名「華護」）のデザインを Next.js でコードとして再構築し、内容は旧サイト3つの原文から起こしている。
別の介護事業者にも展開できるよう、内容は `data/` に分離している。

> kaigo-hp（HTML/CSSテンプレート5種、Next.js禁止）とは別案件。2026-10-01 CEO判断で kaigo-hp の外に置いた。

## 技術スタック

Next.js 16.3（App Router, Turbopack）/ React 19 / TypeScript / CSS Modules + CSS変数。
Tailwind・UIライブラリ・アニメーションライブラリは入れていない。追加する場合は統括エージェント経由でCEOに確認する。

## コマンド

- 開発: `npm run dev -- --port 3461`（Claude desktop のプレビューは `.claude/launch.json` の url 設定でこのサーバに接続する。
  プレビュー側から起動すると Google Fonts を取得できずフォントが読めないため、サーバはシェルから起動する）
- 検査: `npx tsc --noEmit` / `npm run lint` / `npm run build`
- 撮影: `node scripts/shot.mjs <出力PNG> --width <幅> [--path /] [--full | --selector css]`
- 仮画像の再生成: `python3 scripts/extract-placeholders.py`
- ロゴ派生画像（ヘッダー用・フッター用・ファビコン・OGP）の再生成: `python3 scripts/make-logo-assets.py`（原本は `reference/logo/`）

## ディレクトリ

```
app/            ページ（トップ＋下層: services about events recruit news contact）
components/     トップのセクション（hero services about events news recruit cta）／layout common icons／page（下層ページ共通部品）／pages（ページ専用）
data/           site.ts（サイト全体）／sections/（トップの各セクション）／records/（会社行事・ニュース）／pages/（下層ページ）
types/site.ts   内容の型
styles/         tokens.css（デザイントークンの正本）/ base.css（リセット）
public/images/  写真・ロゴ・葉っぱ（現在は素材シートからの仮切り出し）
reference/      参考モック・素材シート・ロゴ原本・旧サイトの原文（old-site-text/）。実行時には使わない
docs/           DESIGN.md / CONTENTS.md / CONTENT_SOURCE.md（内容の正本）/ PAGES.md / IMAGE_QUALITY.md / SECTION_HANDOFF.md / sections/
scripts/        仮画像の切り出し・撮影
```

## ルール

- 見た目の値は `styles/tokens.css` の変数だけを使う（`handbook/02_quality/web_design_standard.md`）。根拠は `docs/DESIGN.md`
- セクションの実装はセクション担当サブエージェントが行う。担当範囲と報告書式は `docs/SECTION_HANDOFF.md`
- 共通部品（`components/common/` `components/icons/`）・トークン・型・データ構造の変更は統括エージェントが管理する
- 参考画像を画像として貼らない。写真・ロゴ・葉っぱ以外はコードで組む
- `public/images/` の仮画像は低解像度で、人物は架空（`docs/IMAGE_QUALITY.md`）。本番素材は同じファイル名で上書きする
- **旧サイトに無い事実は書かない。** 文言・数字は `docs/CONTENT_SOURCE.md` から。食い違い・要確認の項目は同9章
