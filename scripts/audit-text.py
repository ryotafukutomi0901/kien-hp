"""新サイトの表示テキストを、旧サイトの原文（reference/old-site-text/）と1文ずつ突き合わせる。

クライアントの希望（旧サイトの文章は要約・改修せず、そのまま使う）が守られているかを確認するための検査。
開発サーバ（既定 http://localhost:3461）が起動している前提。

判定:
  完全一致   空白を除いて、旧サイトの原文にそのまま含まれる
  表記の差   全角/半角・記号（：:、～〜、数字）などをそろえると一致する（文字は変わっている）
  不一致     そろえても原文に無い（要約・言い換え・新規の文言）
実行: python3 scripts/audit-text.py [出力ファイル]
"""
import re
import sys
import unicodedata
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = "http://localhost:3461"
PAGES = ["/", "/services/home-visit", "/services/care-plan", "/services/home-help", "/about", "/events", "/recruit", "/news", "/contact"]  # /privacy・404 は新規作成のため対象外


def strip(s: str) -> str:
    return re.sub(r"\s+", "", s.replace("\xa0", " "))


def loose(s: str) -> str:
    s = unicodedata.normalize("NFKC", s)
    s = s.replace("〜", "~").replace("～", "~").replace("：", ":")
    return strip(s)


corpus_raw = "".join(strip(p.read_text()) for p in (ROOT / "reference" / "old-site-text").glob("*.txt"))
corpus_loose = "".join(loose(p.read_text()) for p in (ROOT / "reference" / "old-site-text").glob("*.txt"))

BLOCK = {"p", "div", "li", "h1", "h2", "h3", "h4", "dt", "dd", "th", "td", "tr", "section", "article", "header", "footer", "nav", "br", "caption", "summary", "details", "ul", "ol", "dl", "main", "aside", "address", "small"}


class Extract(HTMLParser):
    def __init__(self):
        super().__init__()
        self.lines, self.buf, self.skip = [], [], 0
        self.hidden = 0

    def flush(self):
        t = "".join(self.buf).strip()
        if t:
            self.lines.append(t)
        self.buf = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("script", "style", "noscript", "svg"):
            self.skip += 1
        if tag == "rt":  # ふりがな（<ruby>）は本文と別に扱う
            self.flush()
        if tag in BLOCK:
            self.flush()

    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript", "svg") and self.skip:
            self.skip -= 1
        if tag in BLOCK or tag == "rt":
            self.flush()

    def handle_data(self, data):
        if not self.skip:
            self.buf.append(data)


def fetch(path: str) -> str:
    return urllib.request.urlopen(BASE + path).read().decode("utf-8")


results = {}  # text -> {"status": ..., "pages": set()}
for page in PAGES:
    ex = Extract()
    ex.feed(fetch(page))
    ex.flush()
    for line in ex.lines:
        line = line.strip()
        if not re.search(r"[ぁ-んァ-ヶ一-龠]", line):  # 日本語を含まない行（数字・記号・英字だけ）は対象外
            continue
        key = strip(line)
        if len(key) < 2:
            continue
        if key in corpus_raw:
            status = "完全一致"
        elif loose(line) in corpus_loose:
            status = "表記の差"
        else:
            status = "不一致"
        r = results.setdefault(line, {"status": status, "pages": []})
        if page not in r["pages"]:
            r["pages"].append(page)

counts = {"完全一致": 0, "表記の差": 0, "不一致": 0}
for v in results.values():
    counts[v["status"]] += 1
out = [f"# 文章の照合結果（自動）\n", f"検査対象: {', '.join(PAGES)}  / 旧サイト原文: reference/old-site-text/ （{len(list((ROOT/'reference'/'old-site-text').glob('*.txt')))}ファイル）\n"]
out.append(f"行数（重複除き）: 完全一致 {counts['完全一致']} ／ 表記の差 {counts['表記の差']} ／ 不一致 {counts['不一致']}\n")
for status in ("表記の差", "不一致"):
    out.append(f"\n## {status}（{counts[status]}件）\n")
    for line, v in results.items():
        if v["status"] == status:
            out.append(f"- [{' '.join(v['pages'])}] {line}")
dest = Path(sys.argv[1]) if len(sys.argv) > 1 else None
text = "\n".join(out)
if dest:
    dest.write_text(text)
print(text)
