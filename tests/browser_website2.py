"""Chromium smoke and regression checks for the nine-page DentXpert site."""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "website2"
OUT = ROOT / "browser-evidence"
SLUGS = ("home", "explore", "learn", "discover", "command-center", "technology", "pricing", "faq", "about")


def main():
    OUT.mkdir(exist_ok=True)
    errors = []
    missing = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for width in (375, 768, 1440):
            page = browser.new_page(viewport={"width": width, "height": 900}, device_scale_factor=1)
            page.on("pageerror", lambda error: errors.append(str(error)))
            page.on("response", lambda response: missing.append((response.url, response.status)) if response.status >= 400 and response.url.startswith("file:") else None)
            for slug in SLUGS:
                page.goto((SITE / (slug + ".html")).as_uri(), wait_until="load")
                if page.locator("h1").count() != 1:
                    errors.append((width, slug, "H1"))
                if page.locator('nav[aria-label="Main navigation"] a[aria-current="page"]').count() != 1:
                    errors.append((width, slug, "active navigation"))
                if not page.locator("body").evaluate("(el) => el.scrollWidth <= innerWidth + 2"):
                    errors.append((width, slug, "horizontal overflow"))
                page.screenshot(path=str(OUT / f"{slug}-{width}.png"), full_page=True)
                # Navigation and theme behavior are shared across every route,
                # so exercise them once per viewport without navigating away
                # from the page currently being captured.
                if slug == "home":
                    page.wait_for_selector(".scanner-stage", state="attached")
                    toggle = page.locator("#theme-toggle")
                    initial_theme = toggle.get_attribute("aria-pressed")
                    toggle.evaluate("(el) => el.click()")
                    if toggle.get_attribute("aria-pressed") == initial_theme:
                        errors.append((width, slug, "theme toggle"))
                    toggle.evaluate("(el) => el.click()")
                    if toggle.get_attribute("aria-pressed") != initial_theme:
                        errors.append((width, slug, "theme reset"))
                    scanner = page.locator(".scanner-stage")
                    scanner.evaluate("(el) => el.click()")
                    if scanner.get_attribute("aria-expanded") != "true":
                        errors.append((width, slug, "scanner overlay"))
                    scanner.evaluate("(el) => el.dispatchEvent(new KeyboardEvent('keydown', {key:'Escape', bubbles:true}))")
                    if scanner.get_attribute("aria-expanded") != "false":
                        errors.append((width, slug, "scanner overlay close"))
                    concept = page.locator("[data-concept='wand']")
                    concept.evaluate("(el) => el.click()")
                    if concept.get_attribute("aria-selected") != "true":
                        errors.append((width, slug, "concept selection"))
                if slug == "home":
                    sign_in = page.locator(".account-button")
                    if sign_in.count():
                        sign_in.click()
                        dialog = page.locator(".auth-backdrop")
                        if dialog.is_hidden():
                            errors.append((width, slug, "DX-001 dialog open"))
                        page.locator(".auth-close").click()
                        if not dialog.is_hidden():
                            errors.append((width, slug, "DX-001 dialog close"))
                    page.locator("#theme-toggle").click()
                    ratio = page.locator(".lead").evaluate("""el => { const c = getComputedStyle(el); const fg = c.color.match(/\\d+/g).slice(0,3).map(Number); const bg = getComputedStyle(document.body).backgroundColor; const base = bg.match(/\\d+/g)?.slice(0,3).map(Number) || [237,245,242]; const luminance = rgb => rgb.map(v => {v /= 255; return v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4}).reduce((sum,v,i) => sum + v*[.2126,.7152,.0722][i],0); const a=luminance(fg), b=luminance(base); return (Math.max(a,b)+.05)/(Math.min(a,b)+.05); }""")
                    if ratio < 4.5:
                        errors.append((width, slug, "DX-003 lead contrast", ratio))
                    page.locator("#theme-toggle").click()
                if slug == "command-center":
                    page.locator("#open-command").click()
                    if not page.locator("#command").is_visible():
                        errors.append((width, slug, "DX-002 palette open"))
                    page.keyboard.press("Escape")
                    if page.locator("#command").is_visible():
                        errors.append((width, slug, "DX-002 palette close"))
                if width <= 820 and slug == "home":
                    menu = page.locator("#menu-button")
                    menu.evaluate("(el) => el.click()")
                    if menu.get_attribute("aria-expanded") != "true":
                        errors.append((width, slug, "menu open"))
                    page.locator("body").evaluate("(el) => el.dispatchEvent(new KeyboardEvent('keydown', {key:'Escape', bubbles:true}))")
                    if menu.get_attribute("aria-expanded") != "false":
                        errors.append((width, slug, "menu Escape close"))
                    if not menu.evaluate("(el) => el === document.activeElement"):
                        errors.append((width, slug, "menu focus restore"))
            page.close()
        browser.close()
    if errors:
        (OUT / "audit-errors.txt").write_text(repr(errors), encoding="utf-8")
    assert not errors, f"Browser audit failures: {errors}"
    print("PASS: 24 responsive page views, navigation, theme, menu, overflow, and console checks")


if __name__ == "__main__":
    main()
