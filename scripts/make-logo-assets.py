"""喜援ロゴの原本（reference/logo/）から、サイトで使う派生画像を作る。

入力
  reference/logo/喜援ロゴ.png    縦組み（太陽＋KIEN）のカラー版。1010×714。背景は不透明な白（透過ではない）
  reference/logo/喜援ロゴ②.jpg   横組みの白抜き版。3508×2481。コーラル一色の背景

出力
  public/images/logo/kien-emblem.png         ヘッダー用。カラー版の背景を透過にして余白を詰めたもの
  public/images/logo/kien-emblem-white.png   フッター用。カラー版の形を白一色にしたもの
  public/og.jpg                              SNS共有用（1200×630）。②の中央を切り出したもの
  app/icon.png, app/apple-icon.png, app/favicon.ico   ②の太陽マークを使ったアイコン

ロゴの原本が差し替わったら、このスクリプトを再実行する。
実行: python3 scripts/make-logo-assets.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC_COLOR = ROOT / "reference" / "logo" / "喜援ロゴ.png"
SRC_WHITE = ROOT / "reference" / "logo" / "喜援ロゴ②.jpg"
OUT = ROOT / "public" / "images" / "logo"
OUT.mkdir(parents=True, exist_ok=True)


def color_to_alpha(img: Image.Image) -> Image.Image:
    """白を透明にする（GIMPの「色を透明度に」と同じ考え方）。薄い色の点も元の色味を保つ。"""
    rgb = img.convert("RGB")
    out = Image.new("RGBA", rgb.size)
    src, dst = rgb.load(), out.load()
    for y in range(rgb.height):
        for x in range(rgb.width):
            r, g, b = src[x, y]
            d = max(255 - r, 255 - g, 255 - b)
            if d == 0:
                dst[x, y] = (255, 255, 255, 0)
                continue
            a = d / 255
            dst[x, y] = tuple(round(255 - (255 - c) / a) for c in (r, g, b)) + (round(a * 255),)
    return out


def silhouette(img: Image.Image, solid_from: int = 40) -> Image.Image:
    """白以外をすべて白一色・不透明にする。薄い色の点（淡い緑など）も消えないよう、しきい値は低めにする。"""
    rgb = img.convert("RGB")
    out = Image.new("RGBA", rgb.size)
    src, dst = rgb.load(), out.load()
    for y in range(rgb.height):
        for x in range(rgb.width):
            r, g, b = src[x, y]
            d = max(255 - r, 255 - g, 255 - b)
            dst[x, y] = (255, 255, 255, min(255, round(d / solid_from * 255)))
    return out


def trim(img: Image.Image, pad: int) -> Image.Image:
    left, top, right, bottom = img.split()[3].getbbox()
    box = (max(0, left - pad), max(0, top - pad), min(img.width, right + pad), min(img.height, bottom + pad))
    return img.crop(box)


def keyed_white(img: Image.Image, bg: tuple[int, int, int]) -> Image.Image:
    """単色背景の上の白いロゴから、白一色＋透明度のロゴを取り出す。"""
    rgb = img.convert("RGB")
    out = Image.new("RGBA", rgb.size)
    src, dst = rgb.load(), out.load()
    for y in range(rgb.height):
        for x in range(rgb.width):
            p = src[x, y]
            a = sum((c - b) / (255 - b) for c, b in zip(p, bg)) / 3
            dst[x, y] = (255, 255, 255, max(0, min(255, round(a * 255))))
    return out


def main() -> None:
    color = Image.open(SRC_COLOR)
    emblem = trim(color_to_alpha(color), pad=6)
    emblem.save(OUT / "kien-emblem.png", optimize=True)
    trim(silhouette(color), pad=6).save(OUT / "kien-emblem-white.png", optimize=True)
    print("emblem:", emblem.size)

    white = Image.open(SRC_WHITE).convert("RGB")
    bg = white.getpixel((20, 20))
    print("coral background:", "#%02x%02x%02x" % bg)

    # OGP: 横長1.905:1で中央を切り出す
    h = round(white.width / (1200 / 630))
    top = (white.height - h) // 2
    white.crop((0, top, white.width, top + h)).resize((1200, 630), Image.LANCZOS).save(
        ROOT / "public" / "og.jpg", quality=88, optimize=True
    )

    # アイコン: ②の左側（太陽）だけを、コーラル地の正方形に白で置く
    keyed = keyed_white(white, bg)
    # 太陽とKIENの文字の間の空白列を探す（左から見て最初の空白が4%幅以上続く場所）
    alpha = keyed.split()[3]
    col_has = [alpha.crop((x, 0, x + 1, alpha.height)).getbbox() is not None for x in range(alpha.width)]
    first = next(i for i, v in enumerate(col_has) if v)
    gap_start = next(i for i in range(first, alpha.width) if not any(col_has[i : i + 40]))
    sun = trim(keyed.crop((0, 0, gap_start, keyed.height)), pad=0)
    print("sun mark:", sun.size)

    def icon(size: int, radius_ratio: float = 0.0) -> Image.Image:
        canvas = Image.new("RGB", (size, size), bg)
        inner = round(size * 0.74)
        mark = sun.copy()
        mark.thumbnail((inner, inner), Image.LANCZOS)
        canvas.paste(mark, ((size - mark.width) // 2, (size - mark.height) // 2), mark)
        return canvas

    app = ROOT / "app"
    icon(512).save(app / "icon.png", optimize=True)
    icon(180).save(app / "apple-icon.png", optimize=True)
    # Next.js はICOの中身がRGBAであることを要求する
    icon(256).convert("RGBA").save(app / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])


if __name__ == "__main__":
    main()
