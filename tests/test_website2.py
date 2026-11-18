"""Offline structural checks for the private DentXpert Website 2.0 draft."""
from html.parser import HTMLParser
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "website2"
SLUGS = ("home", "explore", "learn", "discover", "technology", "pricing", "faq", "about")

class Markup(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.duplicates = []
        self.links = []
        self.assets = []
        self.headings = []
        self.current = []
        self.in_h1 = False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"):
            if a["id"] in self.ids: self.duplicates.append(a["id"])
            self.ids.add(a["id"])
        if tag == "a" and a.get("href"): self.links.append(a["href"])
        if tag in ("script", "source", "track", "img", "link"):
            value = a.get("src") or a.get("href", "")
            if value and not value.startswith(("http:", "https:", "data:", "#")) and (tag != "link" or a.get("rel") == "stylesheet"):
                self.assets.append(value)
        if tag == "h1": self.in_h1 = True
        if a.get("aria-current") == "page": self.current.append(a.get("href"))
    def handle_endtag(self, tag):
        if tag == "h1": self.in_h1 = False
    def handle_data(self, data):
        if self.in_h1 and data.strip(): self.headings.append(data.strip())

class SiteChecks(unittest.TestCase):
    def test_all_pages(self):
        for slug in SLUGS:
            with self.subTest(page=slug):
                path = SITE / (slug + ".html")
                self.assertTrue(path.is_file(), str(path))
                content = path.read_text(encoding="utf-8")
                parser = Markup(); parser.feed(content)
                self.assertEqual(parser.duplicates, [], "duplicate IDs")
                self.assertEqual(len(parser.headings), 1, "exactly one H1")
                self.assertEqual(parser.current, [slug + ".html"], "current page indicator")
                self.assertIn("not replace professional dental care", content.lower())
                self.assertIn("no working device", content.lower())
                self.assertIn("viewport", content)
                self.assertIn('href="#main"', content)
                self.assertIn('id="main"', content)
                self.assertIn('aria-expanded="false"', content)
                for target in parser.links + parser.assets:
                    if target.startswith(("mailto:", "tel:", "http:", "https:", "data:")): continue
                    base, _, fragment = target.partition("#")
                    destination = path.parent / base if base else path
                    self.assertTrue(destination.is_file(), f"{slug}: missing {target}")
                    if fragment:
                        target_html = destination.read_text(encoding="utf-8")
                        self.assertRegex(target_html, r'id=["\']' + re.escape(fragment) + r'["\']')
                for other in SLUGS:
                    self.assertIn(other + ".html", parser.links, f"missing nav: {other}")
    def test_shared_assets(self):
        css = (SITE / "site.css").read_text(encoding="utf-8")
        js = (SITE / "site.js").read_text(encoding="utf-8")
        self.assertIn("prefers-reduced-motion", css)
        self.assertIn(":focus-visible", css)
        self.assertIn("aria-expanded", js)
        self.assertIn("Escape", js)
        self.assertIn("localStorage", js)
        self.assertIn("[data-theme=dark]", css)
    def test_film_caption_disclosure(self):
        home = (SITE / "home.html").read_text(encoding="utf-8")
        self.assertIn('kind="subtitles"', home)
        self.assertIn("require manual audio verification", home)
        self.assertIn("usage rights", home)


    def test_accessible_navigation_structure(self):
        for slug in SLUGS:
            with self.subTest(page=slug):
                html = (SITE / (slug + ".html")).read_text(encoding="utf-8")
                self.assertIn('aria-controls="primary-nav"', html)
                self.assertIn('aria-label="Main navigation"', html)
                self.assertIn('id="menu-button"', html)
                self.assertIn('id="theme-toggle"', html)
                self.assertIn('aria-pressed="false"', html)
                self.assertIn('lang="en"', html)

    def test_mobile_menu_dismissal_handlers(self):
        js = (SITE / "site.js").read_text(encoding="utf-8")
        self.assertIn("closeMenu(true)", js)
        self.assertIn("nav?.addEventListener('click'", js)
        self.assertIn("document.addEventListener('click'", js)
        self.assertIn("window.addEventListener('resize'", js)
        self.assertIn("menu.setAttribute('aria-expanded','false')", js)

if __name__ == "__main__":
    unittest.main(verbosity=2)
