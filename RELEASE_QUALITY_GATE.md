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
