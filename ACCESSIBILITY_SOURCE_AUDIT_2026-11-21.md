# DentXpert accessibility source audit — 21 November 2026

**Scope:** manual inspection of `website2/site.css`, `website2/site.js` and `tests/browser_website2.py` plus attempted independent production URL fetch. This is **not** a screen-reader session, contrast measurement or WCAG certification.

## Confirmed source observations
1. CSS provides a visible skip link on focus (`.skip:focus`) and `:focus-visible` outlines for anchors, buttons, summaries and tabindex controls. This supports keyboard visibility in principle, but browser/assistive-technology verification remains needed.
2. Navigation menu uses `aria-expanded`, responds to Escape, and returns focus to the menu button on Escape. The browser test previously covered 375 px but omitted the 768 px mobile-menu state despite CSS/JS handling up to 820 px. **Fixed:** test now exercises menu at 768 px too (commit `a17fb1f9a7af1ac014f6ce25c72925beffd3d44d`). Await exact-commit CI result before calling this verified.
3. Theme toggle synchronizes `aria-pressed` and announces changes via an `aria-live` region. Verify screen-reader announcement and persistence manually.
4. Scanner concept has keyboard Enter/Space and Escape handlers and an expanded-state attribute. Verify nested hotspot focus behavior and accessible name with an actual screen reader.
5. CSS has `prefers-reduced-motion` support in JavaScript, but dynamic reveal effects and animated components still warrant a reduced-motion browser audit.
6. CSS uses aqua, lime and muted text on dark surfaces, but no measured contrast report is available for both themes. Do not claim WCAG AA without computed ratios and visual checks.
7. Automated smoke tests cover eight routes at 375, 768 and 1440 px, screenshot generation, no horizontal overflow, theme and concept interactions. These are functional checks, not a substitute for manual accessibility review.

## Independent production verification
An independent external fetch of `https://reyansh-15.github.io/dentxpert-home-scanner/` failed in the available web checker. GitHub Pages workflow success does not prove a successful independent HTTP fetch. **Task 150 remains open.**

## Off-platform backup status
Attempted to download a complete source ZIP from GitHub to the independent working container; the container could not resolve `github.com` (DNS failure). No complete off-platform backup was created, and Task 146 remains open. A GitHub branch or Actions artifact alone is not off-platform storage.

## Next required evidence
- Record passing CI on the amended 768 px test.
- Test keyboard traversal, screen reader, 200–400% zoom, reduced motion and contrast in both themes using a real browser.
- Independently fetch production pages and assets.
- Obtain a complete repo archive in a separate storage provider, hash it and verify extraction; rehearse rollback without affecting production.

**Audit decision:** source inspection completed with a targeted test improvement. Full manual accessibility, production and backup gates **not passed**.

## Verified follow-up CI

The tablet-menu regression test introduced in commit `a17fb1f9a7af1ac014f6ce25c72925beffd3d44d` passed in browser-checks run `44878192661`. At subsequent commit `3de73b6d408313f28256b76df2695821b9d512f6`, the four workflows all concluded **success**: browser `44878209054`, static `44878209109`, custom publish `44878209092`, and Pages build/deployment `44878209062`. This verifies automated regression checks on that exact SHA, **not** a screen-reader or independent public-site audit.
