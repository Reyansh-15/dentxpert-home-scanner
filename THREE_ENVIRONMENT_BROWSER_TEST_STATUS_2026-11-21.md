# Three-environment browser test status — 21 November 2026

## 1. GitHub Actions / Playwright
At commit `0b2d2e76414d3343086a044d58331c7aed89c0cd`, static checks succeeded (run 44901742493), Pages build/deployment succeeded (44901741748), browser checks were still in progress when inspected (44901742477), and custom Publish workflow failed (44901742389). Job inspection: checkout, public artifact assembly, configure-pages and upload-pages-artifact **passed**; **deploy-pages** failed and the post-deploy route verification step was skipped. Do not call the custom publish workflow green. Prior commit `2b2519745` passed all four workflows.

## 2. Separate local Chromium environment
Independently launched `/usr/bin/chromium` through Playwright with `--no-sandbox` against extracted public-site files. Both `file://` and a fresh Python HTTP server at `http://127.0.0.1:18765/website2/home.html` returned `net::ERR_BLOCKED_BY_ADMINISTRATOR`. This is a sandbox navigation restriction, not evidence of a production website defect. No browser-interaction or screen-reader pass is claimed from this environment.

## 3. ChatGPT Work Cloud Browser
Cloud Browser can be used in a separate **Work-mode** session to inspect the live URL `https://reyansh-15.github.io/dentxpert-home-scanner/`. This chat cannot initiate a Work Cloud Browser session. No independent visual audit was executed here. A Work-mode task should inspect all eight routes, keyboard and focus, 200–400% zoom, theme contrast, missing assets, reduced motion, and screenshot evidence.

## Current gates
- Diagnose deploy-pages failure from workflow logs and re-run sequentially after concurrent deployment jobs settle.
- Complete browser checks and external production inspection, including 27 previously identified missing references.
- Complete screen-reader and full rendered contrast verification in a browser permitted to navigate.

Do not represent restricted local browser navigation or unlaunched Work as completed tests.
