"""Offline regression checks for the public Research Notes entry point.

These checks do not establish GitHub Pages deployment or database persistence.
"""
from html.parser import HTMLParser
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "website2"

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
    def handle_starttag(self, tag, attrs):
        if tag == "a":
            href = dict(attrs).get("href")
            if href:
                self.links.append(href)

class ResearchNotesPublicChecks(unittest.TestCase):
    def test_public_navigation(self):
        home = (SITE / "home.html").read_text(encoding="utf-8")
        parser = Links()
        parser.feed(home)
        self.assertIn("research-notes.html", parser.links)

    def test_page_and_assets_exist(self):
        page = SITE / "research-notes.html"
        html = page.read_text(encoding="utf-8")
        self.assertIn("<h1>Research Notes</h1>", html)
        self.assertIn('id="noteForm"', html)
        self.assertIn('id="notesList"', html)
        for asset in ("site.css", "research-notes.css", "research-notes.js", "auth.js", "insforge-config.js"):
            self.assertTrue((SITE / asset).is_file(), asset)
        self.assertIn('href="research-notes.css"', html)
        self.assertIn('src="research-notes.js"', html)

    def test_user_scoped_note_queries(self):
        js = (SITE / "research-notes.js").read_text(encoding="utf-8")
        self.assertIn("getCurrentUser()", js)
        self.assertIn(".eq('user_id',currentUser.id)", js)
        self.assertIn(".eq('kind','note')", js)
        self.assertIn("escapeHtml", js)

if __name__ == "__main__":
    unittest.main()
