# セクション担当サブエージェントへの引き継ぎ（PHASE 2）

統括エージェントが PHASE 1 で作った骨子の上に、各セクションの見た目を1つずつ仕上げてもらうための指示書。
01 Header は完了済み。02〜09 は**同時に並行して**作業する（2026-10-03 CEO指示）。
各セクションの仕様は [`docs/sections/`](./sections/)（定義書）。この文書は全員共通のルール。

## 1. 共通指示（全サブエージェントに必ず渡す）

> あなたは担当セクションのUI/UX・デザイン実装担当です。
>
> 添付された参考画像を詳細に分析し、担当セクションについて、レイアウト・サイズ・位置・余白・タイポグラフィ・色・写真・写真のトリミング・装飾・視覚的階層・レスポンシブ挙動・UXを可能な限り忠実に再現してください。
>
> UIUXPROMAX Skill（`ui-ux-pro-max`）を必ず使用してください。
>
> ただし、参考画像全体を画像として貼ることは禁止です。HTML / React / CSS / SVGで再構築できる部分はコードで実装し、写真・ロゴ・水彩風葉っぱなど必要なアセットのみ画像として使用してください。

参考画像: `reference/mock.png`（完成イメージ）、`reference/asset-sheet.png`（素材と配色の一覧）。
担当範囲だけを切り出して拡大すると細部が読みやすい（例: `python3 -c "from PIL import Image; Image.open('reference/mock.png').crop((0,62,869,470)).resize((1738,816)).save('/tmp/hero.png')"`）。

## 2. 着手前に読むもの

1. `CLAUDE.md`・`AGENTS.md`（Next.js 16。記憶と違うAPIがある。`next/image` は `priority` ではなく `preload`）
2. **担当セクションの定義書** `docs/sections/NN-*.md` と、境界の取り決め `docs/sections/README.md`
   補足として `docs/DESIGN.md`（トークンの根拠、6章の実測値）
3. `styles/tokens.css`（使ってよい値のすべて）
4. 担当ファイル（下表）と `data/site.ts` の該当キー

## 3. 担当ファイル

| # | セクション | 編集してよいファイル | 主に使う共通部品 |
|---|---|---|---|
| 01 | Header（完了） | — | — |
| 02 | Hero | `components/hero/*` `data/sections/hero.ts` | Button, LeafDecoration |
| 03 | Services | `components/services/*` `data/sections/services.ts` | SectionTitle(brush), ArrowLink, Icon, LeafDecoration |
| 04 | About | `components/about/*` `data/sections/about.ts` | SectionTitle(brush), Button, LeafDecoration |
| 05 | Events（会社行事） | `components/events/*` `data/sections/events.ts` | SectionTitle(mark), Button(outline) |
| 06 | News | `components/news/*` `data/sections/news.ts` | SectionTitle(mark), ArrowLink |
| 07 | Recruit / Blog | `components/recruit/*` `data/sections/promos.ts` | Button, Icon |
| 08 | Final CTA | `components/cta/*` `data/sections/final-cta.ts` | Button, BrushStroke |
| 09 | Footer | `components/layout/Footer.*`、`components/common/Logo.module.css` の `.light` を含むルールだけ | Logo, Icon |

- `data/sections/*.ts` で変えてよいのは写真の `position` と配列の改行位置まで。文言はモックの表記から変えない
- 上記以外（`styles/` のトークン、`components/common/` の共通部品、`components/icons/`、`data/site.ts`、`types/site.ts`、`app/`、Header、他セクション）は**編集しない**。
  変更が必要なら「何を・なぜ」を完了報告に書いて統括に返す。統括が判断して反映する
- セクション専用の似たボタン・見出し・アイコン部品を新しく作ることも禁止。見出しの筆線・三角マークは `SectionTitle` / `BrushStroke` に実装済み

## 4. 実装ルール

- 色・余白・文字サイズ・角丸・影は `tokens.css` の変数だけを使う。スケール外の値が必要なら理由をCSSコメントに残し、報告に書く
- ブレークポイントは 640 / 1024 / 1280px（モバイルファースト）。Desktopを縮小しただけのMobileは不可。Mobileでの並び・間引き・トリミングを設計する
- 写真は `next/image` の `fill` ＋ `object-fit: cover`。被写体位置は `data/site.ts` の `position`（object-position）で調整してよい
  → `position` の値を変えるのは担当セクションの項目に限り可。報告に変更内容を書く
- 葉っぱは `LeafDecoration`。位置はセクション側のclassNameで指定。モバイルでは小さく・数を減らす
- 写真の楕円マスク・波形の境界・フェード・三角マーク・筆線はCSS/SVGで作る
- 禁止: 参考画像の貼り付け、カードやテキストの画像化、過剰なグラデーション、ガラスモーフィズム、意味のない3D・アニメーション、ライブラリ追加
- 動きを付ける場合は `prefers-reduced-motion` で止まること（`styles/base.css` で一括停止している）

## 5. 確認手順（完了前に全部やる）

開発サーバは統括が `http://localhost:3461` で起動済み。**別のサーバを起動したり止めたりしない**（応答しないときは報告する）。
他のエージェントが同時に別ファイルを編集しているため、次を守る。

- **`npm run build` は実行しない**（同時実行で `.next` が壊れる。ビルドは統括が統合時に行う）
- `npx tsc --noEmit` / `npm run lint` で**担当外のファイル**のエラーが出たら、直さずに報告に書く
- 撮影ファイル名は `/tmp/kien-<セクション名>-<幅>.png` のように担当名を入れて他と衝突させない

1. 撮影: `node scripts/shot.mjs /tmp/kien-hero-1440.png --width 1440 --selector "<担当sectionのセレクタ>"`。
   1440・1024・768・375 の各幅で撮る（`--full` で全体、`--clip-y/--clip-h` で範囲指定も可）。Readツールで画像を見る。
   出力に「横スクロールあり」やコンソールのエラーが出たら原因を確認する
2. 参考画像の該当部分を拡大して並べて比較し、差分を直す（サイズ・位置・余白・色・トリミング）
3. UI/UX確認: コントラスト4.5:1（ピクセルを実測してよい）、タップ領域44px、フォーカスリング、見出し階層、alt
4. `npx tsc --noEmit` / `npm run lint`
5. 定義書の「合格条件」をすべて確認する

## 6. 完了報告の書式

```
### Sub-Agent NN（セクション名）完了報告
- 変更したファイル:
- 実装した内容:
- 使用したSkills:（使えなかったSkillがあれば理由）
- UIUXPROMAXで確認した内容:
- 参考画像との差分（残したもの・理由）:
- 残っている問題:
- 共通コンポーネント・トークンへの変更要望:
- 次のエージェントへの注意事項:
- 検証結果: tsc / lint / build / 1440・768・375の確認（未実施の項目は「未検証」と書く）
```

## 7. セクション別の仕様

`docs/sections/` の定義書を参照（PHASE 1時点の気づきも各定義書に反映済み）。
