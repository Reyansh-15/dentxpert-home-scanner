"""Real Chromium smoke tests for the eight-page DentXpert research draft."""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "website2"
OUT = ROOT / "browser-evidence"
SLUGS = ("home", "explore", "learn", "discover", "technology", "pricing", "faq", "about")


def main():
    OUT.mkdir(exist_ok=True)
    errors = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for width in (375, 768, 1440):
            page = browser.new_page(viewport={"width": width, "height": 900}, device_scale_factor=1)
            page.on("pageerror", lambda error: errors.append(str(error)))
            for slug in SLUGS:
                page.goto((SITE / (slug + ".html")).as_uri(), wait_until="load")
                assert page.locator("h1").count() == 1, (width, slug, "H1")
                assert page.locator('nav[aria-label="Main navigation"] a[aria-current="page"]').count() == 1
                assert page.locator("body").evaluate("(el) => el.scrollWidth <= innerWidth + 2"), (width, slug, "horizontal overflow")
                page.screenshot(path=str(OUT / f"{slug}-{width}.png"), full_page=True)
                toggle = page.locator("#theme-toggle")
                toggle.click()
                assert toggle.get_attribute("aria-pressed") == "true", (width, slug, "theme toggle")
                toggle.click()
                assert toggle.get_attribute("aria-pressed") == "false", (width, slug, "theme reset")
                if width <= 720:
                    menu = page.locator("#menu-button")
                    menu.click()
                    assert menu.get_attribute("aria-expanded") == "true"
                    page.keyboard.press("Escape")
                    assert menu.get_attribute("aria-expanded") == "false"
                    assert menu.evaluate("(el) => el === document.activeElement")
                    menu.click()
                    page.locator("#primary-nav a").first.click()
                    assert menu.get_attribute("aria-expanded") == "false"
            page.close()
        browser.close()
    assert not errors, f"Browser JavaScript exceptions: {errors}"
    print("PASS: 24 responsive page views, navigation, theme, menu, overflow, and console checks")


if __name__ == "__main__":
    main()
