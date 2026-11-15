"""Static smoke checks for DentXpert; run from the repository root."""
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "index.html"
CSS = ROOT / "player.css"

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.anchors = []
        self.tags = []
        self.sources = []
    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        self.tags.append(tag)
        if "id" in data:
            assert data["id"] not in self.ids, f"Duplicate ID: {data['id']}"
            self.ids.add(data["id"])
        if tag == "a" and data.get("href", "").startswith("#"):
            self.anchors.append(data["href"][1:])
        if tag in ("script", "source", "track", "img"):
            value = data.get("src", "") or data.get("srcset", "").split()[0]
            if value and not value.startswith(("https:", "http:", "data:")):
                self.sources.append(value)

def main():
    html = HTML.read_text(encoding="utf-8")
    css = CSS.read_text(encoding="utf-8")
    page = Page()
    page.feed(html)
    assert all(anchor in page.ids for anchor in page.anchors), "Broken fragment link"
    assert {"main", "nav", "header", "footer", "video"}.issubset(set(page.tags))
    assert {"concepts", "visionstand", "research", "faq", "film"}.issubset(page.ids)
    for name in ("Compact Wand", "SmartGrip", "ScanDock", "VisionStand", "SmartCase"):
        assert name in html, f"Missing concept: {name}"
    for notice in ("not a validated medical device", "does not diagnose", "not clinically validated"):
        assert notice.lower() in html.lower(), f"Missing safety notice: {notice}"
    assert "@media (max-width: 650px)" in css
    assert "@media (prefers-reduced-motion: reduce)" in css
    missing = [name for name in page.sources if not (ROOT / name).is_file()]
    assert not missing, f"Missing media/script assets: {missing}"
    print("Static site checks passed; browser and clinical checks still required.")

if __name__ == "__main__":
    main()
