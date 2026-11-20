"""Static checks for the public, concept-only DentXpert entry point."""
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.meta_refresh = []
        self.videos = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "a": self.links.append(a.get("href", ""))
        if tag == "meta" and a.get("http-equiv", "").lower() == "refresh": self.meta_refresh.append(a.get("content", ""))
        if tag == "video": self.videos += 1

def main():
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    page = Page(); page.feed(html)
    assert page.meta_refresh == ["0;url=website2/home.html"]
    assert "website2/home.html" in page.links
    assert page.videos == 0
    assert "not a working or clinically validated medical device" in html
    home = (ROOT / "website2/home.html").read_text(encoding="utf-8")
    assert "<video" not in home
    assert "withheld" in home.lower()
    assert "no working device" in home.lower()
    assert "Original site" not in home
    print("Public entry-point safety checks passed.")

if __name__ == "__main__":
    main()
