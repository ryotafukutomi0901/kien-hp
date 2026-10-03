# セクション担当サブエージェントへの引き継ぎ（PHASE 2）

統括エージェントが PHASE 1 で作った骨子の上に、各セクションの見た目を1つずつ仕上げてもらうための指示書。
起動順: 01 Header → 02 Hero → 03 Services → 04 About → 05 Staff → 06 News → 07 Recruit / Blog → 08 Final CTA → 09 Footer。

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
2. `docs/DESIGN.md`（トークンの根拠、**6章の担当セクションの実測値**）
3. `styles/tokens.css`（使ってよい値のすべて）
4. 担当ファイル（下表）と `data/site.ts` の該当キー

## 3. 担当ファイル

| # | セクション | 編集してよいファイル | 主に使う共通部品 |
|---|---|---|---|
| 01 | Header | `components/layout/Header.*` `MobileMenu.*` `components/common/Logo.*` | Button, Logo |
| 02 | Hero | `components/hero/*` | Button, LeafDecoration |
| 03 | Services | `components/services/*`、`SectionTitle.module.css` の `.brush` 部分 | SectionTitle(brush), ArrowLink, Icon, LeafDecoration |
| 04 | About | `components/about/*` | SectionTitle(brush), Button, LeafDecoration |
| 05 | Staff | `components/staff/*`、`SectionTitle.module.css` の `.mark` 部分 | SectionTitle(mark), Button(outline) |
| 06 | News | `components/news/*` | SectionTitle(mark), ArrowLink |
| 07 | Recruit / Blog | `components/recruit/*` | Button, Icon |
| 08 | Final CTA | `components/cta/*` | Button |
| 09 | Footer | `components/layout/Footer.*`（Logoの `tone="light"` の見た目調整を含む） | Logo, Icon |

上記以外のファイル（`styles/tokens.css`、`Button` `ArrowLink` `Container` `LeafDecoration` `data/site.ts` `types/site.ts` 等）は**編集しない**。
変更が必要なら「何を・なぜ」を完了報告に書いて統括に返す。統括が判断して反映する。
セクション専用の似たボタン・見出し部品を新しく作ることも禁止。

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

開発サーバは統括が `http://localhost:3461` で起動済みの前提。止まっていたら `npm run dev -- --port 3461` をバックグラウンドで起動する。

1. 撮影: `scripts/screenshot.sh 1440 /tmp/<名前>-1440.png / 4000`、同じく 768 と 375 でも撮る。Readツールで画像を見る
2. 参考画像の該当部分と並べて比較し、差分を直す（サイズ・位置・余白・色・トリミング）
3. UI/UX確認: コントラスト4.5:1、タップ領域44px、フォーカスリング、見出し階層、alt
4. `npx tsc --noEmit` / `npm run lint` / 必要に応じて `npm run build`
5. 横スクロールが出ていないこと（375px幅で確認）

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

## 7. セクション別メモ（PHASE 1時点で統括が気づいた点）

- 01 Header: 1024px付近でナビ7項目＋CTAが入りきらず、ナビ文字が折り返している。ナビの表示開始幅（1024→1280等）か字間を調整する。ロゴの太陽マーク下の「SAMPLE」とマーク画像の比率もモックに合わせる
- 02 Hero: 下端の白い不定形の波、四隅と右下（黄色い花つき）の葉っぱが未実装。写真は330px幅の仮素材なのでボケる（本番素材待ち）
- 03 Services: 写真帯からカード地へのフェード、アイコン円が写真にかかる配置、見出し下の緑の筆線、見出し左の葉っぱ
- 04 About: 背景写真のぼかし＋左側の白抜け、楕円写真の白い太枠
- 05 Staff: 三角マーク、写真比率約2.1:1、「一覧を見る」の位置
- 06 News: 区切り線、右側の富士山写真の左フェード
- 07 Recruit / Blog: 写真からカード地へのフェード、アイコンと見出しの組み
- 08 Final CTA: 帯の高さ、左の白抜け、ボタン位置
- 09 Footer: 白ロゴ、SNSの丸アイコン、ページ上部へ戻るボタンの配置
