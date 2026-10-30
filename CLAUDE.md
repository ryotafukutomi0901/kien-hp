@AGENTS.md

# kien-hp — CLAUDE.md

株式会社喜援（きえん。静岡県富士市の居宅介護支援・訪問介護・家事支援）のコーポレートサイト。
**デザインの手本は日本テレビアートのサイト（https://www.ntvart.co.jp/ 、2026-10-27 CEO指示）**。手本の型をロゴの4色で組み直している（`docs/REFERENCE_NTVART.md`）。それ以前は参考モック `reference/mock.png`（サンプル社名「華護」）が手本だった。内容は旧サイト3つの原文から起こしている。
別の介護事業者にも展開できるよう、内容は `data/` に分離している。

> kaigo-hp（HTML/CSSテンプレート5種、Next.js禁止）とは別案件。2026-10-01 CEO判断で kaigo-hp の外に置いた。

## 技術スタック

Next.js 16.3（App Router, Turbopack）/ React 19 / TypeScript / CSS Modules + CSS変数。
Tailwind・UIライブラリは入れていない。アニメーションは **GSAP（ScrollTrigger）・@gsap/react・Lenis** を 2026-10-28 CEO指示で導入（登録は `lib/gsap.ts`、慣性スクロールは `components/motion/SmoothScroll.tsx`、演出の部品は `components/motion/`。どれも動きを減らす設定では止まる）。ほかのライブラリを追加する場合は統括エージェント経由でCEOに確認する。

## コマンド

- 開発: `npm run dev -- --port 3461`（Claude desktop のプレビューは `.claude/launch.json` の url 設定でこのサーバに接続する。
  プレビュー側から起動すると Google Fonts を取得できずフォントが読めないため、サーバはシェルから起動する）
- 検査: `npx tsc --noEmit` / `npm run lint` / `npm run build`
- 内部リンク検査: `node scripts/check-links.mjs`（全ページの内部リンク先と #id の存在）
- 全ページ×複数幅の実測検査: `node scripts/audit.mjs [--paths /,/services] [--widths 375,1440]`（文字のコントラスト比・横はみ出し・一文字残り・タップ領域・コンソールエラー。要開発サーバ）
- 撮影: `node scripts/shot.mjs <出力PNG> --width <幅> [--path /] [--full | --selector css]`
- 仮画像の再生成: `python3 scripts/extract-placeholders.py`
- 生成画像の最適化（原本 `reference/generated-originals/` → `public/images/`）: `python3 scripts/optimize-images.py`
- ロゴ派生画像（ヘッダー用・フッター用・ファビコン・OGP）の再生成: `python3 scripts/make-logo-assets.py`（原本は `reference/logo/`）

## ディレクトリ

```
app/            ページ（トップ＋下層: services［home-visit・care-plan・home-help の3事業ページ。一覧 /services は廃止してトップの #services へ転送］ about events recruit news contact privacy、not-found、sitemap・robots）
components/     background（全ページの固定背景。色の丸の演出）／トップのセクション（hero［大きな写真］about services marquee［流れる欧文］community［Instagram｜会社行事］news recruit cta［Contact Us! の帯。layout が全ページに置く］）。料金帯 `components/page/PriceGuide.tsx` は家事支援以外の全ページの最後に置く／layout common icons／page（下層ページ共通部品）／pages（ページ専用）
data/           site.ts（サイト全体）／sections/（トップの各セクション）／records/（会社行事・ニュース）／pages/（下層ページ）
types/site.ts   内容の型
styles/         tokens.css（デザイントークンの正本）/ base.css（リセット）
public/images/  写真・ロゴ・葉っぱ（現在は素材シートからの仮切り出し）
reference/      参考モック・素材シート・ロゴ原本・旧サイトの原文（old-site-text/）。実行時には使わない
docs/           REFERENCE_NTVART.md（デザインの手本の分析と置き換え）/ PHOTO_SHOTLIST.md（撮影カット）/ proposals/（配色・書体の提案シート）/ DESIGN.md / CONTENTS.md / CONTENT_SOURCE.md（内容の正本）/ PAGES.md / IMAGE_QUALITY.md / IMAGE_PROMPTS.md / CLIENT_CHECKLIST.md（クライアント確認依頼書）/ SECTION_HANDOFF.md / sections/
scripts/        仮画像の切り出し・撮影
```

## ルール

- **2026-10-21 引き継ぎ・打ち合わせの反映**（原本: `喜援様_制作引き継ぎ_20261021.pdf`）: トップの並びは ヒーロー → 理念 → 事業内容 → Instagram｜会社行事 → お知らせ → 採用情報 → 料金 → 最終CTA。3事業は独立ページ。家事支援の「2時間5,000円」は載せない。h1〜h3の書体は統一（サイズだけで調整）。配色・書体は**提案ベース**（CEO確認待ち。いまは仮適用）
- 見た目の値は `styles/tokens.css` の変数だけを使う（`handbook/02_quality/web_design_standard.md`）。根拠は `docs/DESIGN.md`
- セクションの実装はセクション担当サブエージェントが行う。担当範囲と報告書式は `docs/SECTION_HANDOFF.md`
- 共通部品（`components/common/` `components/icons/`）・トークン・型・データ構造の変更は統括エージェントが管理する
- 手本・参考画像を画像として貼らない。手本の画像・文章・ロゴ・コードは使わない。写真・ロゴ以外はコードで組む
- `public/images/` の仮画像は低解像度で、人物は架空（`docs/IMAGE_QUALITY.md`）。本番素材は同じファイル名で上書きする
- **旧サイトに無い事実は書かない。** 文言・数字は `docs/CONTENT_SOURCE.md` から。食い違い・要確認の項目は同9章
