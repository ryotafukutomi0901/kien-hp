"""参考素材シート（reference/asset-sheet.png）から仮画像を切り出す。

本番素材（原寸の写真・ロゴ・葉っぱ）が届いたら、同じファイル名で public/images/ に
上書きするだけで差し替わる。このスクリプトはそれまでの仮置き用であり、
切り出した写真は200px前後しかないため本番には使わない。

実行: python3 scripts/extract-placeholders.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SHEET = ROOT / "reference" / "asset-sheet.png"
OUT = ROOT / "public" / "images"

# (出力パス, 切り出し範囲 (left, top, right, bottom), 背景を透過するか)
CROPS = [
    ("decor/leaf-top-left.png", (498, 58, 646, 176), True),
    ("decor/leaf-top-right.png", (718, 54, 872, 180), True),
    ("decor/leaf-single.png", (904, 78, 978, 196), True),
    ("decor/leaf-bottom-left.png", (494, 204, 632, 322), True),
    ("decor/leaf-bottom-right.png", (670, 226, 832, 324), True),
    ("decor/leaf-small.png", (866, 232, 1002, 322), True),
    ("recruit/recruit.jpg", (333, 854, 483, 950), False),
    ("blog/blog.jpg", (515, 854, 671, 950), False),
]


def knock_out_background(img: Image.Image) -> Image.Image:
    """素材シートの白っぽい地色を透過にする（仮素材用の簡易処理）。"""
    rgba = img.convert("RGBA")
    bg = (252, 252, 250)
    pixels = rgba.load()
    for y in range(rgba.height):
        for x in range(rgba.width):
            r, g, b, _ = pixels[x, y]
            diff = max(abs(r - bg[0]), abs(g - bg[1]), abs(b - bg[2]))
            alpha = max(0, min(255, int((diff - 6) * 255 / 50)))
            pixels[x, y] = (r, g, b, alpha)
    return rgba


def main() -> None:
    sheet = Image.open(SHEET).convert("RGB")
    for rel, box, transparent in CROPS:
        dest = OUT / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        part = sheet.crop(box)
        if transparent:
            knock_out_background(part).save(dest, optimize=True)
        else:
            part.save(dest, quality=90, optimize=True)
        print(f"{rel}: {part.width}x{part.height}")


if __name__ == "__main__":
    main()
