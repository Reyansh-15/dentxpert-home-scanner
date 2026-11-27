# DentXpert zero-unresolved-defects release gate

Motto: **Zero errors, 100% launch.** Priorities: **smoothness and flawless execution**. This is an engineering acceptance standard, not a guarantee that all software is infallible.

## Change-control principle (website and Second Brain OS)
Before adding anything, record:
1. **User problem and unique value:** what new action becomes possible? Reject repeated cards, duplicate copy, decorative gradients, and fake buttons.
2. **Interaction contract:** each control's expected click, keyboard, touch, Escape, focus, loading, empty, error and recovery behavior.
3. **Safety and truthfulness:** distinguish research concepts from functioning devices, clinical claims, deployed AI agents or connected services.
4. **Accessibility:** WCAG 2.2 AA target, keyboard-only, visible focus, screen reader, 200% and 400% zoom, light/dark contrast, reduced motion.
5. **Performance and smoothness:** measure layout shift, slow interactions, unnecessary scripts and network errors; honor reduced-motion preference.
6. **Security and privacy:** publish only allowlisted assets, no credentials, sensitive data, private documents, or unapproved media.
7. **Tests and evidence:** unit/integration/browser regression, production HTTP and visual checks, screenshots and reproducible defects.
8. **Rollback:** verified current-release off-platform backup, restoration steps, and owner.
9. **Decision:** approve only when every launch blocker has an owner, fix and retest evidence. Do not equate historical red workflow runs with current defects.

## Release quality-control checklist
- [x] All four GitHub workflows green on commit `d9e5ae1a` (Nov 21, 2026): browser checks `44918975507`, static checks `44918975336`, custom publishing `44918975378`, and default Pages deployment `44918975465`. This is automated evidence only.
- [ ] Production nine-page navigation and actual buttons tested on mobile, tablet, desktop
- [ ] No browser console errors, missing assets, dead links or unexpected public files
- [ ] Keyboard navigation, focus order/trap, Escape and screen-reader testing performed on live site
- [ ] 200% and 400% zoom, light/dark contrast and reduced-motion checks performed on live site
- [ ] Scientific, safety, pricing and concept-only wording independently reviewed
- [ ] Media rights and guardian permissions documented; otherwise media excluded
- [ ] Current exact-release off-platform backup restored successfully in a safe test location
- [ ] Independent quality-control review and release decision recorded

## Potential additions backlog (not approved for implementation)
- A real task board with editable status, persistence and clear data ownership
- Command Center workspace layout with keyboard-operable rearrangement and reset
- Evidence gate detail pages with cited source and review state
- Search across research modules and documentation
- Integration setup/status screens that do not impersonate connected agents
- Optional original media only after consent and accessibility review

## Known verification limits
Automated GitHub Actions browser checks use local file URLs, not the live production site. CI success alone does not verify a real screen reader, 400% zoom, production security, clinical correctness or rollback restoration. Keep these marked **unverified** until evidence exists.

## November 21, 2026 automated evidence and release status
- GitHub Actions at `6f35ea48`: static checks `44908639795`, browser checks `44908639815`, allowlisted publish and production HTTP probes `44908639864`, and default Pages build/deployment `44908639576` all reported success. These are automated checks, not independent manual accessibility evidence.
- Publishing workflow now runs both static and Chromium regression tests **before** assembling and deploying the public artifact; commit `6f35ea48`.
- Command palette accessibility correction in commit `d053b2f`: command buttons are an ARIA group, not incorrectly declared as listbox options; focus trap ignores invisible controls. Confirmed by browser, static, custom publishing and Pages workflow results on `d9e5ae1a`.
- **Potential deployment configuration risk:** GitHub runs a separate default `pages build and deployment` in addition to the explicit allowlisted deployment workflow. Both reported success on the prior commit, but the duplicate publishing configuration should be reconciled through GitHub Pages settings and its effective published artifact verified. CI success does not prove there is only one deployment authority.
- Independent production browser access was not available in this run; do not label live navigation, screen reader, mobile, 400% zoom or restored backup as passed.
- Scientific/clinical claims, pricing representations, and any future device claims still require qualified review. Keep this site clearly research-stage and non-diagnostic.
- **Decision: HOLD.** The candidate has unverified manual and independent release gates, not a substantiated zero-blocker release.

## November 22 verification refresh
- Checked GitHub Actions again: all four workflows completed successfully for `d9e5ae1a`. Historical failures on older commits are not unresolved failures on this candidate.
- The separate default Pages deployment and custom allowlisted Pages deployment are **both still configured**. Both passing does not prove the live artifact cannot be overwritten by the other workflow. Repository Pages source settings must be reconciled; do not claim this risk resolved.
- No independent live interactive browser, real screen-reader, 200–400% zoom or off-platform restoration evidence was obtained in this verification refresh. Those gates remain open.
- **Release decision remains HOLD**, pending independent production audit, deployment authority reconciliation, backup restore, and qualified scientific/safety review.

## Standing product direction (November 22, 2026)
- Rebuild Second Brain OS as a genuinely functional workspace, not copies of decorative graph/card dashboards; preserve editable tasks, meaningful voice commands, state persistence and useful project workflows.
- Build original DentXpert content factory for Codex-assisted campaign drafts, storyboards, copy and platform-specific assets with approval before publication; advertising placement on third-party platforms is not assumed free or authorized.
- DentXpert public website requires verified interactions, accessible overlays and reduced-motion behavior, authentication and database-backed features with tested security, responsive performance and transparent research-stage claims.
- Use the user's forthcoming Jack Roberts YouTube reference for design/workflow analysis, without copying protected media or asserting it was viewed before the link is provided.
- Never label untested gates green; run automated and production verification, report blockers honestly. No purchases or paid commitments without separate approval.

## November 22 evening automated repair evidence
- GitHub Actions failures were traced to the **separate** `dev/dentxpert-approved-refresh` branch at `a9be28d3`, not to the default `main` branch. The branch-specific browser test failed at 375px on home-page horizontal overflow; the axe runner failed before auditing because it used `browser.newPage()` instead of an explicit `browser.newContext()`.
- Repair commits on `dev/dentxpert-approved-refresh`: `3e1f034c` changes axe to create and close an explicit browser context; `507b0058` makes large image/video/SVG media fluid within the viewport. These are targeted source fixes; automated retests were running at the time of this record.
- The development branch is a different website implementation from `main`. **Do not merge or deploy it as a replacement for the production Second Brain OS without a reviewed comparison and release decision.** The dev branch's Command Center and research pages must be evaluated independently.
- Attempted public HTTP inspection of both the root Pages URL and the Command Center URL, but the inspection tool could not access either. This is an **unverified production probe**, not evidence that the public site is down or up.
- Scientific safety language reviewed in the dev homepage source: it states the scanner is illustrative, with no working device, clinical validation, regulatory approval, AI diagnosis or sale. This is a source-level wording observation only, not qualified scientific/clinical approval. Independent evidence review remains open.
- No off-platform backup restore or rollback rehearsal was performed; existing backup branch is not evidence of a restorable off-platform release archive. Do not mark backup gate passed.
- Security review limited to source and workflow inspection. No authenticated penetration test, backend permission/RLS audit or live security verification was performed.
- **Decision: HOLD.** Require latest branch-specific CI results, production functional and accessibility audit, authenticated backend checks, scientific review and demonstrated rollback before zero-blocker release approval.

## November 23, 2026 evening repair and evidence (21:06 IST)
- Latest pre-repair main commit `7ae1be41`: all four workflows **success** (static run `45114763673`, browser run `45114763665`, allowlisted publisher run `45114763757`, Pages deployment run `45114763369`). These verify the previous candidate, not subsequent commits.
- **Reproducible source defect, Command Center sign-in:** `website2/command-center.html` loaded `auth.js` and `knowledge-api.js` but omitted `insforge-config.js`. Both scripts capture `window.DX_INSFORGE_CONFIG || {}` at startup, so Command Center sign-in and API requests lacked the backend URL and public anonymous key even though the home page loaded them. Corrected in `ea3964e8` by inserting the public config script before both dependent scripts. Added regression `test_command_center_auth_config_order` in `d359b1ce`. This fixes bootstrap only; it **does not verify real authentication, authorization or database RLS**.
- Public configuration contains an anonymous client key, not an admin key by its documented purpose. This observation alone cannot establish safe backend permissions. Never place admin/service-role credentials in frontend files.
- Production HTTP attempts for root and `/command-center.html` again returned inaccessible in the available inspection tool. Do not interpret as an outage or as successful production audit. Browser tests in CI operate on local file URLs, not authenticated production sessions.
- Source-level research claims remain explicitly conceptual and non-diagnostic on the homepage. No clinical review or independent scientific substantiation has been performed in this run.
- Existing `backup/pre-website-refresh-2026-11-15` branch exists at `6aae6c4a`, but is not a verified exact-release **off-platform** backup. No restoration or rollback rehearsal was conducted.
- Dual Pages publishing mechanisms remain an unresolved configuration risk. Neither real screen-reader operation nor 200–400% live zoom, authenticated database policy testing, independent security penetration testing or production restore has been verified.
- **Decision: HOLD.** Zero unresolved launch blockers has not been demonstrated. Require latest post-fix CI results, live production checks, auth/RLS verification, qualified scientific review, and tested restoration before approval.

## November 24, 2026 repair evidence
- Prior candidate 0c6afe59: all four workflows succeeded (static 45207471761, browser 45207471829, publisher 45207471701, Pages 45207472061).
- Source defect: workspace persistence failure warning was overwritten by renderWorkspace's saved-item count, falsely implying durable storage. Commit c2e9bb0c preserves the failure state until a successful write. Commit 43350051 adds a Playwright storage-denial regression at each viewport. New CI results pending verification.
- Production root and command-center URL inspection again unavailable; no live accessibility or security pass claimed. Homepage source explicitly states no working device, diagnosis, accuracy claim or regulatory approval; qualified scientific review remains outstanding. Backup branch backup/pre-website-refresh-2026-11-15 confirmed at 6aae6c4a; no restoration performed.
- HOLD: independent production accessibility, authentication and database authorization, deployment authority reconciliation, qualified scientific review and demonstrated backup restoration remain open. No purchases or paid commitments.

## November 25 repair evidence
- Main candidate 2e5a561c: static 45423466539, browser 45423466800 and default Pages 45423466002 succeeded. Custom publisher 45423466433 failed retrieving github-pages artifact metadata; failed-job rerun requested successfully, outcome pending. Duplicate deployment authority remains unresolved.
- Fixed initial workspace read failure warning being overwritten by saved-item count (9d5d44a4); added read-denial regression across viewports (447b6b1a). Static/browser/publisher runs 45635601683/45635601644/45635601643 queued or pending at inspection; no pass claimed.
- Production Command Center URL inaccessible through independent web inspection. No live accessibility, authenticated security or physical test pass claimed. Homepage source retains explicit non-diagnostic, no working device or regulatory approval wording; qualified review remains pending. Backup branch name confirmed via branch search; exact off-platform restore not performed.
- HOLD: pending new CI, publisher recovery, single deployment authority, live accessibility and auth/database policy verification, qualified review and demonstrated rollback. No purchases or paid commitments.

## November 26 repair evidence
- Candidate 23a5604e (Research Notes allowlist merge PR #7): static 45757715836, browser 45757715786, custom publisher 45757715779, default Pages 45757715272 all completed successfully. Prior 80f3efab static/browser/custom publisher also succeeded; storage read regression verified. Historical publisher failure no longer reproduces on latest tested candidate.
- Source-level keyboard defect: repeated Ctrl/Cmd+K while palette already open overwrites returnFocus with a dialog control; Escape then cannot restore original trigger focus. Guarded open in 4d312765; added repeated shortcut focus restoration regression at three widths in a61a6271. New static/browser/publisher/Pages runs 45847058991/45847059040/45847059036/45847058823 queued or pending at inspection. No new pass claimed.
- Independent root and command-center production web probes inaccessible; not evidence of outage. Pages settings API endpoint rejected by connector; duplicate publishing authority remains unresolved. Backup branch backup/pre-website-refresh-2026-11-15 confirmed by branch search, no off-platform restore. Homepage truth bar explicitly excludes working device, diagnosis, accuracy claims, approval and sale; qualified scientific review not performed. Auth/RLS, real screen-reader, physical-device, live zoom and rollback evidence remain absent.
- HOLD: require latest regression results and independent release gates. No purchases or paid commitments.

## November 27, 2026 verification
- Main candidate 669a6c95: static 45847090952, Playwright 45847091057, publisher 45847090951 and Pages 45847090244 all completed successfully. Prior repeated-shortcut focus regression passed.
- Source-level keyboard defect: palette command execution used close(false), leaving focus in a hidden dialog for commands without explicit focus targets (theme toggle). Commit 69147411 restores prior focus before command execution; 5b13b69f adds regression at all three viewport widths. New CI outcome not yet verified.
- Live root and /command-center.html inaccessible via independent web inspection; no production pass or outage inferred. Homepage source retains explicit non-diagnostic research-stage wording. SQL source enables RLS on three tables, with public module/link reads and owner-only note policy; deployed policies and authenticated behavior remain unverified. Public research tables must contain no private information. Homepage no-personal-data wording requires reconciliation with actual authentication behavior before launch.
- Backup branch confirmed at 6aae6c4a; no off-platform restoration or rollback rehearsal. No manual screen-reader, physical-device or clinical review performed. Duplicate publishing authority unresolved.
- HOLD: zero unresolved launch blockers not demonstrated. No purchases or paid commitments.
