# Task 155 — DentXpert post-pitch review and retrospective

**Prepared:** 2026-11-21. **Formal review date:** 2026-11-30. **Status:** evidence-backed preliminary review, not a completed November 30 sign-off.

## Evidence confirmed through November 21
- Repository: `Reyansh-15/dentxpert-home-scanner`.
- Eight-page concept-only website has been merged and publicly deployed. Original PR #1 merged at `9d085e65224399bdd2be6dfba07157e2ed3d53ab`.
- Commit `cbc7fc1879c96ddd38972bb272bf34968bab0013`: static checks passed (run 44869045017); browser checks passed (run 44869044999); GitHub Pages build and deployment passed (run 44869044746). Separate custom publish workflow failed (run 44869044984). Investigate that failure; do not call all deployment checks green.
- Previous allowlisted publish commit `cb16079f6c4d67b1cc2d3a3042f5cfcfab7450c7` succeeded in custom publishing and GitHub Pages runs. No consent-dependent film is intentionally included in the allowlisted site.
- `PUBLIC_CLAIMS_AUDIT_2026-11-20.md` reviews concept-only wording. `RELEASE_ROLLBACK.md` documents rollback instructions but does not establish an off-platform archive or rehearsal.

## What worked
1. Concept-only disclosures were retained during publication.
2. Automated Chromium and static checks were integrated into the main branch.
3. A restricted publishing artifact was introduced to avoid copying repository internals and unconsented media into the hosted artifact.
4. Release decisions and outstanding evidence are recorded rather than inferred.

## What needs improvement
1. Two GitHub Pages deployment mechanisms exist and can race or fail independently; simplify to one verified publishing path.
2. Browser automation is not a full accessibility certification. Check screen readers, zoom and theme contrast separately.
3. Off-platform archive and rollback rehearsal are still unverified.
4. Media rights and captions remain unverified; keep media withheld.
5. Classroom presentation and teacher feedback are owned by the student; no feedback has been provided to this report.

## Prioritized follow-up
- **P0 — Release integrity:** resolve failing custom publish workflow and verify the live site externally; do not expose development files or media.
- **P0 — Medical safety:** preserve explicit concept-only labels; never imply validated diagnostic performance.
- **P1 — Accessibility:** screen-reader, keyboard, 200–400% zoom, reduced-motion and light/dark contrast audit.
- **P1 — Resilience:** create off-platform backup, test rollback on a safe branch, record recovery steps.
- **P2 — Experience:** refine visual polish and interactive components with browser regression checks.
- **P2 — Presentation evidence:** incorporate actual teacher feedback if the student shares it.

## November 30 finalization checklist
- [ ] Re-run and record exact-SHA CI and deployment results on November 30.
- [ ] Recheck production URLs, navigation, accessibility and privacy/medical copy.
- [ ] Compare completed vs unverified tasks without retroactive guesswork.
- [ ] Include real pitch feedback only if supplied by the student.
- [ ] Record lessons, owners, next milestones and final decision.
- [ ] Sign off task 155 **only after** the dated review is actually performed.

**Decision as of November 21:** Preliminary retrospective prepared. Task 155 is not yet complete because the specified November 30 review has not occurred.
