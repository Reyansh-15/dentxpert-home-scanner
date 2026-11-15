# DentXpert development verification

## Branch safety
- Production branch: `main`. Working branch: `dev/dentxpert-approved-refresh`.
- Snapshot branch: `backup/pre-website-refresh-2026-11-15`.
- Do not assume a branch snapshot is an off-platform backup.

## Automated static checks
Run `python3 tests/site_smoke.py` from the repository root. This checks local HTML links, key research-stage notices, accessible landmarks, the five concept names, and referenced local media paths. It does not replace browser testing.

## Manual acceptance checks (not yet verified)
- [ ] At 375, 768, and 1440 px: no horizontal overflow; navigation and all cards remain usable.
- [ ] At 200% browser zoom: text, buttons, and navigation remain readable.
- [ ] Keyboard only: skip link, navigation, details/summary, video controls and caption button are operable.
- [ ] With screen reader: heading hierarchy, landmarks, labels and caption state are announced.
- [ ] Reduced-motion preference: no forced smooth scrolling or distracting transitions.
- [ ] Video: narrator and guardian publication permission (if applicable), full playback, captions checked cue-by-cue against audio, and captions visually synchronized.
- [ ] Review every medical claim: research concept only, no diagnosis, no validation, no sale or approval implied.
- [ ] Check all site links and media after deployment.

## Release criteria
Do not treat a passing static check as proof of accessibility, clinical validity, or media permission. Record human review evidence before release.
