# Independent artifact audit and backup verification — 21 November 2026

## Verified off-platform public-site backup
Google Drive backup: https://drive.google.com/file/d/1MxCCZ-mtv_FnkvttHbTrGzYGUZtnXgrz/view?usp=drivesdk (50,645 bytes). Local independent SHA-256 of downloaded ZIP: `ad9a824439b9d65b0125e25754ea1e975800fae9dd9a6bcd950b62f44d232b6b`, **exact match** with GitHub Actions artifact digest. ZIP CRC validation succeeded; nested `artifact.tar` extracted successfully. The tar includes 15 entries, including root index, hero WebP, eight HTML pages and three shared CSS/JS files. This verifies an extractable **public deployment artifact** backup, not a full Git repository or production restore rehearsal.

## Static production-artifact integrity audit
Checked all eight HTML pages against files inside the exact deployed publishing artifact. Found **27 references to missing local assets or pages**. Recurring missing paths include `insforge-config.js`, `auth.js`, `command-center.html`; `discover.html` additionally references `knowledge-api.js` and `module-registry.js`; `home.html` references missing `../scanner-hero-trimmed.png` and `../film-poster.webp`. This is a real defect in the artifact, regardless of passing GitHub Actions. Do **not** add authentication scripts or consent-dependent film assets to public deployment without security/rights review. Either remove unavailable references/links or intentionally build and review safe public replacements. Task 150 remains open.

## Contrast calculations (CSS token pairs, not full page WCAG audit)
Calculated WCAG relative luminance contrast from deployed CSS hex values:

| Foreground | Background | Ratio |
|---|---|---:|
| Dark body `#f1fbf8` | `#061114` | 18.12:1 |
| Dark muted `#9bb2b4` | `#061114` | 8.58:1 |
| Light body `#071c20` | `#edf5f2` | 15.84:1 |
| Light muted `#587075` | `#edf5f2` | 4.75:1 |
| Dark accent `#75ead7` | `#061114` | 13.21:1 |

These sampled pairs meet 4.5:1 for normal text **when used on the specified opaque backgrounds**. They do not establish actual contrast for every component, overlay, hover state, or transparency combination.

## Browser and production access limits
Independent web fetch of GitHub Pages failed. Local Chromium binary is installed, but Playwright navigation to `file://` extracted pages returned `ERR_BLOCKED_BY_ADMINISTRATOR`. Therefore do not claim screen-reader, browser zoom, complete rendered contrast or independent HTTP production tests. CI browser checks passed separately on commit `3de73b6`.

## Required fixes
1. P0: repair 27 missing artifact references without exposing private auth/config files or unconsented film.
2. P0: verify live HTTP 200 and assets externally after fixing the allowlisted artifact.
3. P1: perform full rendered keyboard, zoom, assistive-tech and both-theme contrast audits in an accessible browser.
4. P1: archive entire source repository off-platform and rehearse restoration separately.

**Conclusion:** Independent public-artifact integrity and extraction completed; source-level contrast sampled; production and full accessibility sign-offs remain open.
