# Research Notes Persistence PASS/FAIL Report

Branch: `dev/dentxpert-approved-refresh`

## Diagnosis

The Research Notes page loaded its own data once while authentication was initializing. After a successful sign-in, the auth module updated its local user state but did not notify the notes module, so the list could remain in the anonymous/error state until a manual reload. The notes queries also relied entirely on RLS filtering and omitted the table's normal `stage` value.

## Fixes

- Research Notes now listens for `dx-auth-changed` and reloads after sign-in/sign-out.
- Create payload includes `stage: 'todo'`.
- List, update, and delete queries explicitly scope to `user_id = currentUser.id` in addition to RLS.
- Insert requests request the inserted row with `.select('*')`.
- Auth emits a non-sensitive session-change event after sign-in and sign-out.
- No admin/service-role credentials, migrations, or production changes.

## Verification

| Check | Result | Evidence |
|---|---|---|
| `node --check research-notes.js` | PASS | Development-branch file |
| `node --check auth.js` | PASS | Development-branch file |
| Persistence contract tests | PASS | 5 tests in `tests/test_research_notes_persistence.py` |
| Existing auth regression tests | PASS | 3 tests in `tests/test_research_notes_auth.py` |
| Existing notes contract tests | PASS | 4 tests in `tests/test_research_notes.py` |
| Live create/retrieve/edit/delete | NOT VERIFIED | Requires authenticated browser session |
| Anonymous denial | NOT VERIFIED | Requires live InsForge request |
| Cross-user isolation | NOT VERIFIED | Requires two safe test sessions |
| Browser UI run | BLOCKED | Local server was not reachable from the browser automation surface |

The static tests prove the authenticated client calls, ownership filters, refresh event, and absence of admin credentials. They do not substitute for live RLS or browser verification.

## Commits

- `5c6aa47bc8737e9d77fb9ef099bd2000e785c224` — persistence and auth-refresh fix
- `475769ff10d030a8f8c99a2e967a9892a412da29` — auth session-change events
- `3c6158a09108c394f94011610efcf1bc3858edcc` — persistence regression tests
