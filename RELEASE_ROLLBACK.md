# DentXpert release and rollback runbook

Updated 2026-11-20. This is an operational procedure, not evidence that a rollback has been rehearsed.

## Public scope
- Production URL: https://reyansh-15.github.io/dentxpert-home-scanner/
- Source branch: `main`; entry point `index.html` redirects to `website2/home.html`.
- Research concept only: no working scanner, diagnostic claims, medical data collection, or products for sale.
- Do not publish concept film, captions or narration without documented narrator/guardian permission and content verification. Keep public pages media-free where rights are uncertain.

## Pre-release checks
1. Confirm both `DentXpert static site checks` and `Website 2.0 browser checks` succeeded on the **exact candidate commit**.
2. Inspect nine pages at 375, 768 and 1440 px, including overflow, menus, theme, overlay, and keyboard access. Download the workflow's screenshot artifact.
3. Review all public text for unsupported medical performance, claims of clinical validation, sales or diagnostic capability.
4. Confirm the GitHub Pages publishing workflow succeeded and test the public URL in an independent browser. Do not assume a workflow success proves accessibility or content correctness.
5. Record the release SHA and keep a copy of the prior release archive outside GitHub before any major release.

## Rollback
1. Identify last known good `main` SHA from GitHub Actions successful deployment run. Do not confuse the pre-website-refresh backup with a verified current production snapshot.
2. Prefer a revert pull request targeting the bad commit(s) instead of force-pushing or deleting history. Run both test workflows on the revert candidate.
3. Merge only after checks pass; wait for GitHub Pages deployment success.
4. Recheck production root and all nine routes, and record the rollback SHA, time, reason, and test evidence.
5. If a dangerous claim or unconsented media is live, immediately unpublish/remove the offending reference in a minimal safe change, then complete full review.

## Release gate
Follow `RELEASE_QUALITY_GATE.md` before declaring a final release. A successful GitHub Actions workflow is necessary but insufficient. Record an independent production audit, an off-platform current-release backup, a safe rollback rehearsal, and qualified content review. Never mark a manual verification as complete without evidence.\n\n## Evidence gaps
- Off-platform backup archive not yet confirmed.
- Manual screen-reader, keyboard zoom and contrast audit not yet confirmed.
- Narrator/guardian permission not confirmed; film must stay withheld.
- Actual pitch and teacher feedback belong to the student; November 30 retrospective requires future evidence.
