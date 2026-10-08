# トップページ 画像の配置案と生成プロンプト

## 差し替えの進み具合（2026-10-07）

生成画像を `reference/generated-originals/` に保存し、`python3 scripts/optimize-images.py` で最適化して `public/images/` に出力している（14.9MB → 0.79MB）。

### 差し替え済み
サービス3枚（`services/home-visit.jpg` `care-plan.jpg` `home-help.jpg`。予備2枚は `services/spare/`）、お知らせ右の写真（`news/news-bg.jpg`）、採用情報カード（`recruit/recruit.jpg`）、最終CTA（`cta/cta-panorama.jpg`）、**ヒーロー（`hero/hero.jpg`）、私たちのこと背景（`about/about-bg.jpg`）、同・楕円（`about/about-oval.jpg`）**（2026-10-08）。

### 画質が荒いまま残っている箇所（トップページ。実測）

すべて素材シート（モック添付の1536×1024）から切り出した仮画像で、幅92〜186px。次の3種類が残っている。

| # | 場所（画面上の位置） | 現在のファイル | 元サイズ | 表示サイズ（1440px幅） | 拡大率 | 使うプロンプト |
|---|---|---|---|---|---|---|
| 6〜9 | 会社行事カード4枚（トップ。`/events` には写真なし） | `services/business-support.jpg` `staff/staff-group-outdoor.jpg` `services/home-nursing.jpg` `staff/staff-table.jpg` | 92〜186px幅 | 262×126 | 1.4〜2.8倍 | No.6〜9 |
| 12 | 採用情報の右隣「スタッフの一日」カードの写真 | `blog/blog.jpg` | 156×96 | 237×178 | 1.9倍 | No.12 |
| 葉 | 葉っぱの装飾（トップ・事業所・404に計9か所） | `decor/leaf-*.png` 5種 | 74〜162px幅 | 128〜314px | 2〜4倍 | 葉っぱ6種 |

- 会社行事の写真は、画像が入るとトップの4件の記事に順に当てはまる。記事の実際の写真が届いたら置き換える（下の注意）。
- 使われていない仮画像（`staff/staff-group-indoor.jpg` `staff/staff-meeting.jpg` `decor/leaf-small.png`）は、差し替え完了後に削除する。
- 原本が増えたら、`scripts/optimize-images.py` の `JOBS` に1行足して再実行し、`data/sections/*.ts` の `src` を書き換える。

### 富士山の使用ルール（使いすぎを避ける）

富士山が写る画像は**ヒーロー・最終CTA・お知らせの3か所だけ**にする（お知らせは遠景で小さく）。
**それ以外のすべての画像は、富士山を写さない。** 私たちのこと（No.4・5）は、富士山をやめて「緑の街並み」「住宅街の小道」にした。プロンプトにも `no Mount Fuji` を入れてある。
富士山を写さなくても、ロゴの水彩の点に合う若草色と、やわらかい光で、富士市らしさは出せる。

## 画像の現状（2026-10-04 時点の記録）

| 種類 | 枚数 | 内訳 |
|---|---|---|
| 写真 | 14か所／12ファイル | **使い回し2件**: `services/business-support.jpg`（家事支援カード＋会社行事1枚目）、`about/about-fuji.jpg`（私たちのことの背景＋楕円） |
| 葉っぱ（装飾） | 9か所／5ファイル | `leaf-bottom-left.png` 4回、`leaf-top-right.png` 2回 ほか |
| ロゴ | 2 | ヘッダー（カラー）・フッター（白） |

→ **ヒーローを除く写真13か所をすべて別の画像にする。** 生成後は表の「保存先」に保存し、`data/sections/*.ts` の `src` を書き換える。

## 生成の費用（2026-10-04 時点・Higgsfield GPT Image 2.5 の見積もり）

サイトから生成を試みたが、Higgsfield の残高が 0.4 クレジット（無料プラン）で、最小の設定（1k・中画質 0.5 クレジット）でも1枚も生成できなかった。
各1回ずつ生成した場合の見積もり（作り直しは別）:

| 画像 | 設定 | 1枚 | 枚数 | 小計 |
|---|---|---|---|---|
| #4 私たちのこと背景・#13 最終CTA | 4k・高画質（横長） | 4.25 | 2 | 8.5 |
| #1〜3 サービス・#5 楕円・#10 お知らせ | 2k・高画質 | 2.75 | 5 | 13.75 |
| #6〜9 会社行事・#11 採用・#12 スタッフの一日 | 2k・中画質 | 1.0 | 6 | 6.0 |
| **合計** | | | **13** | **約28.25** |

葉っぱ6種も作り直す場合は、2k・中画質で約6クレジット追加。クレジットの購入はご本人の操作が必要。
ChatGPT など別の生成ツールでも、下のプロンプトはそのまま使える（比率と最小サイズを守る。足りない場合は長辺2048px以上で出力できる設定を選ぶ）。

## 共通のトンマナ（全プロンプトの前提）

- 明るく柔らかい自然光、ハイキー、白とベージュを基調に、ロゴのコーラル・やさしい黄・若草色・淡いピンクを小物や植物で少しだけ。清潔で温かい、静岡県富士市の日常
- 写実的な写真（イラスト・3D・過度なボケ・彩度の高すぎる色・ドラマチックな光は避ける）
- **人物は顔を出さない**（手元・後ろ姿・遠景）。架空の人物を実在のスタッフ・利用者に見せないため（`IMAGE_QUALITY.md` 4章）
- 文字・ロゴ・看板の文字・透かしを入れない
- 解像度は下表の「最小サイズ」以上。横長・余白多めで生成し、切り抜きはサイト側で行う

共通のネガティブプロンプト（使えるツールでは毎回指定）:
```
text, letters, logo, watermark, signature, faces in focus, identifiable faces, distorted hands, extra fingers, illustration, 3d render, cartoon, oversaturated, harsh shadows, dramatic lighting, cluttered background, blur artifacts
```

## 画像ごとの配置案とプロンプト

| # | 挿入位置 | 保存先 | 比率・最小サイズ | 何を見せるか |
|---|---|---|---|---|
| 1 | サービス: 訪問介護 | `public/images/services/home-visit.jpg` | 3:2・1200×800 | 自宅での見守り・介助 |
| 2 | サービス: 居宅介護支援 | `public/images/services/care-plan.jpg` | 3:2・1200×800 | ケアプランの相談 |
| 3 | サービス: 家事支援 | `public/images/services/home-help.jpg` | 3:2・1200×800 | 掃除・育児・食事の手伝い |
| 4 | 私たちのこと: 背景（ぼかして使う） | `public/images/about/about-bg.jpg` | 4:1・2880×720 | 緑の丘から見下ろす街並み（富士山なし） |
| 5 | 私たちのこと: 楕円写真 | `public/images/about/about-oval.jpg` | 16:9・1300×730 | 新緑の住宅街の小道（富士山なし） |
| 6〜9 | 会社行事カード4枚 | `public/images/events/event-1〜4.jpg` | 2:1・800×400 | **推奨は記事の実際の写真**（下の注意） |
| 10 | お知らせ: 右の写真（装飾） | `public/images/news/news-bg.jpg` | 5:2・800×320 | 富士市の茶畑と富士山 |
| 11 | 採用情報カード | `public/images/recruit/recruit.jpg` | 4:3・600×450 | 働く準備をするスタッフ |
| 12 | スタッフの一日カード | `public/images/recruit/staff-day.jpg` | 4:3・600×450 | 1日の予定と道具 |
| 13 | 最終CTA（帯） | `public/images/cta/cta-panorama.jpg` | 3:1・1500×500 | 夕方の富士山と街並み |

> **会社行事（6〜9）の注意**: カードには最新4件の記事が順に入れ替わって表示される。特定の行事（例: カレーパーティー）を生成画像で描くと、実際には無かった光景を記録写真のように見せることになる。**推奨は各記事の実際の写真**（クライアントの元写真）。生成する場合は、行事を特定しない「事務所の日常」の静物にし、記事の写真が入ったら置き換える。

### 1. 訪問介護（3:2、被写体は画面の上寄り。上下を切って横長の帯にしても成立する構図）
```
Photorealistic, bright natural window light, a Japanese home living room in Fuji City. A caregiver in a navy polo shirt gently supports an elderly person's hands as they stand up from a low sofa; shot from the side at chest height, faces out of frame, focus on the caring hands. Soft beige and white interior, a small coral cushion and green houseplant. Warm, calm, clean. Landscape 3:2, subject in the upper-middle third, generous space above and below.
```

### 2. 居宅介護支援（3:2）
```
Photorealistic, bright soft daylight, a care manager and an elderly person's family sitting at a wooden dining table in a Japanese home, reviewing a care plan document together; view from behind the care manager's shoulder, faces not visible, hands pointing at the paper, a cup of green tea and a pen. Warm beige tones with a small yellow flower in a vase. Calm and trustworthy. Landscape 3:2, subject in the upper-middle third.
```

### 3. 家事支援（3:2）
```
Photorealistic, bright morning light in a tidy Japanese apartment kitchen and living room. A housekeeping staff member's hands folding small children's clothes next to a neatly prepared simple homemade meal (rice, miso soup, vegetables) on the table; a toddler's wooden toy blocks in soft focus. No faces. White, beige and soft coral accents. Warm and helpful mood. Landscape 3:2, subject in the upper-middle third.
```

### 0. ヒーロー（任意。構図は今のまま、高解像度にする）
ヒーローの富士山は変更しない方針だが、今の画像は330×143pxで、4.8倍に引き伸ばされてぼけている。構図を保って高解像度で作り直す場合は、これを使う（保存先 `public/images/hero/hero-fuji.jpg`、3:1以上の横長、3000×1400以上）。
```
Photorealistic wide landscape of Mount Fuji from a hill above Fuji City on a clear spring day: the snow-capped summit right of center, its broad slopes in soft blue, a low residential town and fresh green trees spread across the lower third, bright blue sky with thin soft clouds. The left third is calm pale sky and haze (headline text will be placed there). Airy, high-key, natural colors, no people, no text. Landscape 21:9.
```

### 4. 私たちのこと: 背景（ぼかして使うので細部は不要。富士山は写さない）
```
Photorealistic wide panorama looking down from a green hillside onto a low-rise Japanese town with a river and fresh spring greenery, pale blue sky with light clouds, soft morning light. No Mount Fuji, no mountains dominating the frame, no people, no text. Airy, high-key, pastel greens and whites. Ultra-wide 4:1 landscape, left half calm and bright (text will be placed there), details soft because it will be blurred.
```

### 5. 私たちのこと: 楕円写真（背景と別の写真に。富士山は写さない）
```
Photorealistic, a quiet residential street in a Japanese town in fresh spring green: a gently curving lane lined with leafy trees and low houses, dappled morning sunlight on the road, a bicycle parked by a hedge, a few white and pink flowers in a planter. No Mount Fuji, no people, no cars in focus, no text. Warm, calm and welcoming. Landscape 16:9, the lane leading toward the center of the frame.
```

### 6〜9. 会社行事（生成する場合の代替。行事を特定しない静物、人物なし）
```
6: Photorealistic still life on an office break-room table in Japan: a large pot of homemade curry and stacked bowls, soft daylight, beige and white, warm and friendly. Landscape 2:1, no people.
7: Photorealistic still life in a small bright meeting room: notebooks, pens and printed training handouts on a wooden table, a whiteboard softly out of focus, no readable text. Landscape 2:1, no people.
8: Photorealistic still life on an office desk: a small bouquet of pastel flowers and a wrapped gift, soft window light, coral and yellow accents. Landscape 2:1, no people.
9: Photorealistic still life: a cozy office corner with a houseplant, a teapot and cups on a tray, morning light, calm atmosphere. Landscape 2:1, no people.
```

### 10. お知らせ: 右の写真（装飾。左側は白へフェードして使う）
```
Photorealistic, rows of bright green tea fields in Fuji City with Mount Fuji small in the distance on the right, clear sky, soft morning light. Wide 5:2 landscape, main subject on the right half, left half simple.
```

### 11. 採用情報カード（顔なし）
```
Photorealistic, a care staff member in a navy polo shirt seen from behind at the entrance of a small bright office, holding a tote bag and a clipboard, ready to visit clients; a bicycle or small car softly in the background. Morning light, friendly and welcoming. Landscape 4:3, subject on the left half.
```

### 12. スタッフの一日カード（静物）
```
Photorealistic flat-lay on a light wooden desk: a daily schedule notebook with time slots (no readable text), a navy polo shirt neatly folded, car keys, a water bottle and a small potted plant. Soft daylight, beige, white, coral and green accents. Landscape 4:3, items arranged on the right two thirds.
```

### 13. 最終CTA（帯。左は空色〜白へフェードして文字を載せる）
```
Photorealistic ultra-wide panorama of Mount Fuji at late afternoon from Fuji City: soft golden light on the snow cap, layered green hills and the town below, pale blue sky. Mount Fuji on the right third, the left half mostly open sky. Landscape 3:1.
```

## サービスカード3枚の追加案（帯の切り抜きを前提にした版）

「私たちのサービス」の3事業カードに入れる写真の追加案。上の No.1〜3 と同じ場所の差し替え用で、どちらを使ってもよい。
カードの写真は**横長の帯**（1440px幅の画面で約378×110px、およそ3.4:1）に切り抜かれる。元画像は3:2で生成し、**見せたいものを画面の上から40〜60%の高さの帯に収める**。上下の端に大事なものを置かない。保存先と最小サイズは No.1〜3 と同じ（`public/images/services/` の `home-visit.jpg` `care-plan.jpg` `home-help.jpg`、1200×800以上）。人物は顔を出さない。

### A. 訪問介護（`home-visit.jpg`）
```
Photorealistic, soft morning light through a sheer curtain in a Japanese home. Close crop on a caregiver's hands in navy sleeves resting gently over an elderly person's hands on a wooden table, a cup of tea and a small coral flower beside them. Faces completely out of frame. The hands and tea sit in a horizontal band across the middle of the image, with calm blurred beige background above and below. Warm, quiet, trustworthy. Landscape 3:2.
```

### B. 居宅介護支援（`care-plan.jpg`）
```
Photorealistic, bright daylight at a wooden table in a Japanese living room. Over-the-shoulder view of a care manager's hands and an elderly couple's hands around an open care plan notebook (no readable text), a pen, reading glasses and a cup of green tea. No faces visible. The notebook and hands form a horizontal band across the middle of the frame, soft beige blur above and below, a touch of yellow from a flower. Calm and reliable. Landscape 3:2.
```

### C. 家事支援（`home-help.jpg`）
```
Photorealistic, bright morning light in a tidy Japanese kitchen counter. A row of simple homemade dishes (rice, miso soup, grilled fish, greens) on a light wooden counter, with a housekeeping staff member's hands in a navy apron arranging a bowl; a stack of neatly folded small children's clothes at the edge. No faces. Everything sits in a horizontal band across the middle of the image, soft white and beige blur above and below, coral and green accents. Warm and helpful. Landscape 3:2.
```

## 葉っぱ（装飾）について

装飾の使い回しは一般的で、写真と違い内容の誤解は生まない。差し替える場合は、水彩の葉の枝を白背景で6種類生成し、背景を透過にしてから `public/images/decor/` に同名で上書きする（幅600px以上）。
```
Watercolor illustration of a single small leafy branch, fresh light green and yellow-green, soft translucent washes, isolated on pure white background, no shadow, high resolution. Variation: [branch curving to the upper right / hanging down / two leaves only / small sprig / long branch / round leaves].
```
