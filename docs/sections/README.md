# セクション定義書

トップページ9セクションの「何を・どの大きさで・どう振る舞わせるか」の定義。担当サブエージェントはこれを仕様として実装する。
座標は `reference/mock.png`（幅869px）上のpx、→の右は1440px換算（×1.657）。値はトークンの最寄りのステップに丸めて使う。

| # | セクション | 定義書 | 状態 |
|---|---|---|---|
| 01 | Header | [01-header.md](./01-header.md) | 完了（2026-10-03） |
| 02 | Hero | [02-hero.md](./02-hero.md) | 完了（2026-10-03） |
| 03 | Services | [03-services.md](./03-services.md) | 完了（2026-10-03） |
| 04 | About | [04-about.md](./04-about.md) | 完了（2026-10-03） |
| 05 | Events（会社行事） | [05-events.md](./05-events.md) | 完了（2026-10-03） |
| 06 | News | [06-news.md](./06-news.md) | 完了（2026-10-03） |
| 07 | Recruit / Blog | [07-recruit-blog.md](./07-recruit-blog.md) | 完了（2026-10-03） |
| 08 | Final CTA | [08-final-cta.md](./08-final-cta.md) | 完了（2026-10-03） |
| 09 | Footer | [09-footer.md](./09-footer.md) | 完了（2026-10-03） |

## セクション間の約束（境界の取り決め）

- 地色: Services・Events・News・Recruit/Blog は `--color-bg-soft`。Hero下端の波は `--color-bg-soft` で塗り、Servicesと継ぎ目なくつなぐ
- Heroの写真は波の形で切り抜き、下部を `--hero-bleed` でServicesの上余白に重ねる（波の下はServicesの地色が透けて見える）。**Servicesの上余白（`--section-pad-block`）と `--hero-bleed` は連動**しているので、変えるときは両方を同時に直す。右下の葉っぱはServicesの見出し行にかかる
- Events と News の間の細い区切り線は News 側が持つ。Newsは上下の余白を持たず、間隔は Events の下余白（`--space-6`）と Recruit / Blog の上余白（`--space-5`）で決まる
- Recruit / Blog の下余白は `--space-5`。Final CTA の帯はその直後から始まる（モックの間隔 約14px）
- About・Final CTA は全幅の写真背景。左右の端まで写真が届く
- ヘッダーは sticky（高さ `--header-height`）。Heroはヘッダーの下から始まる
- すべての画面幅で横スクロールを出さない。装飾が画面外にはみ出す場合はセクション側で `overflow-x: clip`
