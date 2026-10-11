"""画像の原本（reference/generated-originals/ の生成画像、reference/old-site-images/ の旧サイトの写真）を、サイトで使う大きさ・容量に最適化して public/images/ に出す。

- 長辺を「表示サイズの2倍（Retina）」を目安に縮小する（元より大きくはしない）
- JPEG（品質82・プログレッシブ・メタデータなし）。配信時の AVIF/WebP 変換は Next.js が行う（next.config.ts の images.formats）
- 原本が差し替わったら、このスクリプトを再実行する

実行: python3 scripts/optimize-images.py
"""
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "reference"  # 原本は reference/ 配下（generated-originals/ と old-site-images/）
OUT = ROOT / "public" / "images"

# (原本, 出力先, 出力の幅px)
JOBS = [
    ("generated-originals/services-home-visit.png", "services/home-visit.jpg", 1200),
    ("generated-originals/services-care-plan.png", "services/care-plan.jpg", 1200),
    ("generated-originals/services-home-help.png", "services/home-help.jpg", 1200),
    ("generated-originals/services-home-visit-alt1.png", "services/spare/home-visit-alt1.jpg", 1200),
    ("generated-originals/services-home-visit-alt2.png", "services/spare/home-visit-alt2.jpg", 1200),
    ("generated-originals/news-bg.png", "news/news-bg.jpg", 1400),
    ("generated-originals/recruit.png", "recruit/recruit.jpg", 900),
    # 9枚が並んだ一覧画像（staff-day-sheet-9tiles.png）の予定表の1枚を切り出したもの。元が553px幅なので、それ以上には大きくしない
    ("generated-originals/staff-day.png", "recruit/staff-day.jpg", 553),
    ("generated-originals/cta-panorama.png", "cta/cta-panorama.jpg", 2000),
    ("generated-originals/hero.png", "hero/hero.jpg", 1916),  # 原本が1916px幅。それ以上には大きくしない
    ("generated-originals/about-bg.png", "about/about-bg.jpg", 1800),
    ("generated-originals/about-oval.png", "about/about-oval.jpg", 1300),
    # 旧サイトの会社行事の写真（クライアント自身の写真。トップの最新4件）。縦長の写真も元の比率のまま出し、切り抜きはサイト側で行う
    ("old-site-images/2026-07-26-curry-party.jpg", "events/2026-07-26-curry-party.jpg", 1000),
    ("old-site-images/2026-05-26-ethics-training.jpg", "events/2026-05-26-ethics-training.jpg", 1000),
    ("old-site-images/2026-04-28-birthday.jpg", "events/2026-04-28-birthday.jpg", 1000),
    ("old-site-images/2026-04-28-dementia-training.jpg", "events/2026-04-28-dementia-training.jpg", 1000),
]


def main() -> None:
    total_before = total_after = 0
    for src_name, dest_rel, width in JOBS:
        src = SRC / src_name
        dest = OUT / dest_rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")  # スマホ写真の向き情報を反映する
        if img.width > width:
            img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
        img.save(dest, "JPEG", quality=82, optimize=True, progressive=True)
        before, after = src.stat().st_size, dest.stat().st_size
        total_before += before
        total_after += after
        print(f"{dest_rel}: {img.width}x{img.height}  {before/1024:.0f}KB → {after/1024:.0f}KB")
    print(f"合計 {total_before/1024/1024:.1f}MB → {total_after/1024/1024:.2f}MB")


if __name__ == "__main__":
    main()
