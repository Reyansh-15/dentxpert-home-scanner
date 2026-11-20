# DentXpert public-claims and release audit

Audit date: 2026-11-20. Scope: source review of the eight-page research-concept site, **not** a clinical or independent production audit.

## Findings
- Technology page explicitly calls the architecture hypothetical and disclaims a working device, validated AI model, diagnostic accuracy, clinical validation and regulatory approval.
- Discover page identifies concept definition as the current stage and places feasibility, safety, clinical evidence and regulatory questions in future gates.
- Pricing page explicitly states no checkout, preorder, price, subscription or product is offered.
- Public site has no diagnostic upload form or patient data collection interface in the inspected pages. Do not treat this as a privacy penetration test.
- No claim of device accuracy, treatment benefit or clinical efficacy is supported by trial data; do not add such claims without independent review and evidence.

## Public-media hold
Narration, concept film and captions remain excluded from the allowlisted GitHub Pages artifact. Media must not be published until narrator/guardian permission, transcript accuracy and synchronization are documented. This is a release blocker for **media only**, not for the concept-only website.

## Independent checks outstanding
- Verify each deployed route, all internal links and assets from a public browser after latest Pages deployment.
- Measure WCAG contrast for both themes and test screen reader and 200–400% zoom. Automated Chromium checks alone do not establish conformance.
- Obtain a downloadable off-platform backup archive and test rollback. The GitHub backup branch is not an off-platform backup.
- Confirm scientific wording with qualified subject-matter review before making future efficacy claims.

## No fabricated evidence
This document is a source-code and process audit. It is not medical validation, a certified accessibility audit, user study, security penetration test or proof of narrator consent.
