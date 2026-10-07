"""生成画像の原本（reference/generated-originals/）を、サイトで使う大きさ・容量に最適化して public/images/ に出す。

- 長辺を「表示サイズの2倍（Retina）」を目安に縮小する（元より大きくはしない）
- JPEG（品質82・プログレッシブ・メタデータなし）。配信時の AVIF/WebP 変換は Next.js が行う（next.config.ts の images.formats）
- 原本が差し替わったら、このスクリプトを再実行する

実行: python3 scripts/optimize-images.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "reference" / "generated-originals"
OUT = ROOT / "public" / "images"

# (原本, 出力先, 出力の幅px)
JOBS = [
    ("services-home-visit.png", "services/home-visit.jpg", 1200),
    ("services-care-plan.png", "services/care-plan.jpg", 1200),
    ("services-home-help.png", "services/home-help.jpg", 1200),
    ("services-home-visit-alt1.png", "services/spare/home-visit-alt1.jpg", 1200),
    ("services-home-visit-alt2.png", "services/spare/home-visit-alt2.jpg", 1200),
    ("news-bg.png", "news/news-bg.jpg", 1400),
    ("recruit.png", "recruit/recruit.jpg", 900),
    ("cta-panorama.png", "cta/cta-panorama.jpg", 2000),
]


def main() -> None:
    total_before = total_after = 0
    for src_name, dest_rel, width in JOBS:
        src = SRC / src_name
        dest = OUT / dest_rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        img = Image.open(src).convert("RGB")
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
