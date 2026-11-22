"""Static contract tests for the authenticated Research Notes interface.

These checks are intentionally credential-free: they verify that the UI calls the
authenticated InsForge client and scopes records to note items. Live RLS behavior
must still be exercised with an authenticated test account.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = (ROOT / "website2" / "research-notes.js").read_text(encoding="utf-8")
HTML = (ROOT / "website2" / "research-notes.html").read_text(encoding="utf-8")


def test_notes_use_workspace_table_and_note_kind():
    assert "dx_workspace_items" in SCRIPT
    assert "kind:'note'" in SCRIPT or 'kind:"note"' in SCRIPT
    assert ".eq('kind','note')" in SCRIPT


def test_notes_require_authenticated_session():
    assert "getCurrentUser" in SCRIPT
    assert "Sign in to access your private notes." in SCRIPT
    assert "currentUser.id" in SCRIPT


def test_notes_support_crud_and_persistence():
    assert ".insert(payload)" in SCRIPT
    assert ".update({title,body})" in SCRIPT
    assert ".delete().eq('id',editingId)" in SCRIPT
    assert ".select('*')" in SCRIPT
    assert "updated_at" in SCRIPT


def test_notes_surface_ui_states():
    assert 'role="status"' in HTML
    assert "Unable to load notes" in SCRIPT
    assert "Note created." in SCRIPT
    assert "Note updated." in SCRIPT


def test_no_admin_credentials_in_browser_code():
    lowered = SCRIPT.lower()
    assert "service_role" not in lowered
    assert "admin_key" not in lowered
