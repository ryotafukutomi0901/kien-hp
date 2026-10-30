"""和文フォント「けいなんむぎまるJP」を、Webで配る小さなファイル（woff2）に分け、読み込み用のCSSを作る。

2026-10-28 CEO指示「日本語フォントは見出し・本文を問わず、けいなんむぎまるJPで」。元のTTFは 4.1MB・約9,400字あり、
そのまま配ると重いため、Google Fonts と同じく文字のまとまりごとに分け、ページで使う文字を含むファイルだけを
ブラウザが取りに行くようにする（@font-face の unicode-range）。
  kmjp-00 : かな・記号と、いまサイトで使っている漢字（どのページでも最初に要る。layout で先読みする）
  kmjp-01〜: 残りの漢字を文字コード順に区切ったもの（文章に新しい漢字が増えたときだけ取りに行く）
文章を変えても作り直さなくてよい（全部の字がどれかのファイルに入っている）。作り直すと、そのときの文章に合わせて
kmjp-00 に入る漢字が増え、表示が少し速くなる。

元のフォントには、点が2つ以下で面積のない輪郭が35字に入っている。描いても何も出ない輪郭だが、「わ」は
同じ位置の2点だけの輪郭のせいで、Mac の Chrome が字全体を描かない（「お問い合わせ」が「お問い合　せ」になる）。
小分けにするときにこの輪郭を取り除く（字の形は変わらない）。

ライセンス: SIL Open Font License 1.1（Webへの埋め込み・商用可）。名前表の著作権・ライセンスの記載は残す。
全文は public/fonts/keinan-mugimaru-jp/OFL.txt。英数字は Ubuntu で出すため、半角の英数字はここに入れない。

実行: python3 scripts/build-font.py   （fontTools と brotli が要る: pip3 install fonttools brotli）
"""
import re
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.ttLib.tables._g_l_y_f import GlyphCoordinates

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "reference/fonts/KeinanMugimaruJP.ttf"
OUT_DIR = ROOT / "public/fonts/keinan-mugimaru-jp"
CSS = ROOT / "styles/fonts.css"
FAMILY = "Keinan Mugimaru JP"
URL = "/fonts/keinan-mugimaru-jp"
CHUNK = 800  # kmjp-01 以降の1ファイルあたりの字数（woff2 で 1ファイル 150KB 前後）

# 最初のファイルに必ず入れる範囲: 全角・半角の記号、ひらがな、カタカナ、全角英数字
BASE_RANGES = [(0x2000, 0x206F), (0x2190, 0x21FF), (0x2460, 0x24FF), (0x25A0, 0x26FF), (0x3000, 0x30FF), (0xFF00, 0xFFEF)]
TEXT_DIRS = ["app", "components", "data", "lib"]


def used_chars() -> set[int]:
    """サイトの文章に出てくる字。ソースのコメント（/* */ と //）は除く（URL の // は残す）"""
    chars: set[int] = set()
    for d in TEXT_DIRS:
        for p in (ROOT / d).rglob("*"):
            if p.suffix in {".ts", ".tsx"}:
                text = re.sub(r"/\*.*?\*/", "", p.read_text(encoding="utf-8"), flags=re.S)
                text = re.sub(r"(?<![:\"'])//.*", "", text)
                chars.update(ord(c) for c in text if ord(c) > 0x7F)
    return chars


def unicode_range(codes: list[int]) -> str:
    parts, start, prev = [], None, None
    for c in sorted(codes) + [None]:
        if start is None:
            start = prev = c
        elif c is not None and c == prev + 1:
            prev = c
        else:
            parts.append(f"U+{start:X}" if start == prev else f"U+{start:X}-{prev:X}")
            start = prev = c
    return ", ".join(parts)


def drop_empty_contours(font: TTFont) -> int:
    """点が2つ以下の輪郭（面積がなく何も描かない）を取り除き、取り除いた数を返す"""
    glyf, dropped = font["glyf"], 0
    for name in font.getGlyphOrder():
        g = glyf[name]
        if g.isComposite() or g.numberOfContours <= 0:
            continue
        points, flags, ends, start = [], bytearray(), [], 0
        for end in g.endPtsOfContours:
            if end - start + 1 >= 3:
                points.extend(g.coordinates[start : end + 1])
                flags.extend(g.flags[start : end + 1])
                ends.append(len(points) - 1)
            start = end + 1
        if len(ends) != g.numberOfContours:
            dropped += g.numberOfContours - len(ends)
            g.coordinates, g.flags, g.endPtsOfContours = GlyphCoordinates(points), flags, ends
            g.numberOfContours = len(ends)
            g.program.fromBytecode(b"")  # 点の番号を使う命令（ヒンティング）は残さない
    return dropped


def write_woff2(codes: list[int], path: Path) -> None:
    options = subset.Options()
    options.flavor = "woff2"
    options.name_IDs = ["*"]  # 著作権・ライセンス（OFL）の記載を残す
    options.name_languages = ["*"]
    options.notdef_outline = True
    options.hinting = False
    options.drop_tables += ["FFTM"]  # FontForge の作成日時の表（表示に使わない）
    font = TTFont(SOURCE)
    drop_empty_contours(font)
    sub = subset.Subsetter(options)
    sub.populate(unicodes=codes)
    sub.subset(font)
    font.flavor = "woff2"
    font.save(path)


def main() -> None:
    source = TTFont(SOURCE)
    cmap = set(source.getBestCmap())
    print(f"面積のない輪郭を {drop_empty_contours(source)} 個取り除く")
    used = used_chars()
    base = {c for c in cmap if any(a <= c <= b for a, b in BASE_RANGES)} | (used & cmap)
    rest = sorted(c for c in cmap - base if c > 0x7F)
    chunks = [sorted(base)] + [rest[i : i + CHUNK] for i in range(0, len(rest), CHUNK)]

    for old in OUT_DIR.glob("kmjp-*.woff2"):
        old.unlink()
    faces, total = [], 0
    for i, codes in enumerate(chunks):
        name = f"kmjp-{i:02d}.woff2"
        write_woff2(codes, OUT_DIR / name)
        size = (OUT_DIR / name).stat().st_size
        total += size
        print(f"{name}: {len(codes):>4}字 {size / 1024:6.0f}KB")
        faces.append(
            "@font-face {\n"
            f'  font-family: "{FAMILY}";\n'
            f'  src: url("{URL}/{name}") format("woff2");\n'
            "  font-weight: 400;\n"
            "  font-style: normal;\n"
            "  font-display: swap;\n"
            f"  unicode-range: {unicode_range(codes)};\n"
            "}\n"
        )
    CSS.write_text(
        "/*\n"
        " * 和文フォント「けいなんむぎまるJP」（SIL Open Font License 1.1。public/fonts/keinan-mugimaru-jp/OFL.txt）。\n"
        " * このファイルは scripts/build-font.py が作る。手で書き換えない。\n"
        " * kmjp-00（かな・記号・サイトで使っている漢字）は app/layout.tsx で先読みする。\n"
        " */\n" + "\n".join(faces),
        encoding="utf-8",
    )
    missing = sorted(c for c in used - cmap if not (0x2000 <= c <= 0x206F))
    print(f"合計 {total / 1024:.0f}KB / {len(chunks)}ファイル → {CSS.relative_to(ROOT)}")
    if missing:
        print("このフォントに無い字（ほかの書体で出る）:", "".join(chr(c) for c in missing))


if __name__ == "__main__":
    main()
