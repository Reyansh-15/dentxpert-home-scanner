from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / "website2" / "research-notes.html").read_text(encoding="utf-8")
AUTH = (ROOT / "website2" / "auth.js").read_text(encoding="utf-8")


def test_research_notes_exposes_auth_shell():
    assert '<header class="site-header nav-shell">' in HTML


def test_auth_script_requires_shell_and_creates_sign_in_control():
    assert "document.querySelector('.nav-shell')" in AUTH
    assert "account.textContent='Sign in'" in AUTH


def test_research_notes_loads_auth_script():
    assert '<script src="auth.js" defer></script>' in HTML
