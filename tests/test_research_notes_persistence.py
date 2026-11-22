from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = (ROOT / "website2" / "research-notes.js").read_text(encoding="utf-8")
AUTH = (ROOT / "website2" / "auth.js").read_text(encoding="utf-8")


def test_create_and_retrieve_are_owner_scoped():
    assert "stage:'todo'" in SCRIPT
    assert ".insert(payload).select('*')" in SCRIPT
    assert ".eq('kind','note').eq('user_id',currentUser.id)" in SCRIPT


def test_edit_and_delete_are_owner_scoped():
    assert ".update({title,body}).eq('id',editingId).eq('user_id',currentUser.id)" in SCRIPT
    assert ".delete().eq('id',editingId).eq('user_id',currentUser.id)" in SCRIPT


def test_refresh_and_auth_change_reload_notes():
    assert "window.addEventListener('dx-auth-changed',load)" in SCRIPT
    assert "getCurrentUser()" in SCRIPT
    assert "load()})();" in SCRIPT


def test_auth_session_events_are_emitted():
    assert "dx-auth-changed" in AUTH
    assert "detail:{user:currentUser}" in AUTH
    assert "detail:{user:null}" in AUTH


def test_browser_code_contains_no_admin_credentials():
    lowered = (SCRIPT + AUTH).lower()
    assert "service_role" not in lowered
    assert "admin_key" not in lowered
