# Off-platform backup evidence — 2026-11-21

## Verified public-site backup
- GitHub Actions artifact: `github-pages`, artifact ID `14696572088`, from successful publish run `44878209092` on commit `3de73b6d408313f28256b76df2695821b9d512f6`.
- GitHub-reported artifact ZIP size: **50,645 bytes**; GitHub artifact digest: `sha256:ad9a824439b9d65b0125e25754ea1e975800fae9dd9a6bcd950b62f44d232b6b`.
- Downloaded using GitHub's authenticated artifact connector, then uploaded as an **independent Google Drive file** `dentxpert-public-site-2026-11-21.zip`.
- Drive file ID: `1MxCCZ-mtv_FnkvttHbTrGzYGUZtnXgrz`.
- Drive readback confirms the file exists with MIME `application/zip` and size **50,645 bytes**.
- Drive URL: https://drive.google.com/file/d/1MxCCZ-mtv_FnkvttHbTrGzYGUZtnXgrz/view?usp=drivesdk

## Scope and remaining verification
This is a **verified off-platform copy of the public-site deployment artifact**, not a full repository source backup. Matching sizes and connector success do not establish an independently recomputed SHA-256 checksum or successful extraction. A full repository archive and extraction/restore rehearsal remain outstanding before Task 146 can be considered entirely complete.

## Accessibility / production status
- Four GitHub workflows passed on commit `3de73b6`, including Chromium screenshot regression at 375, 768 and 1440 px.
- Independent public HTTP requests from the local container failed due DNS resolution; no production HTTP success is claimed.
- No screen reader was executed and no numerical contrast ratios were measured in this backup task. Tasks 142 and 150 remain open.
