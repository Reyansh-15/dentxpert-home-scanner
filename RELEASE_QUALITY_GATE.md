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
- [ ] All workflows green on the **same candidate commit**, including functional Command Center regressions
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
