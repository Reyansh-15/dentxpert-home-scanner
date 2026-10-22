# DENTXPERT video player package

This folder contains a static, self-contained player package for local review or later deployment. No publishing has been performed.

## Included files

- `index.html`, `player.css`, `player.js` — player interface and controls.
- `DENTXPERT_Web_Player.mp4` — caption-free 56.2-second video with the original narration.
- `dentxpert_en_draft.vtt` — selectable English caption track.
- `dentxpert_en_draft.srt` — downloadable SRT captions.
- `assets/dentxpert-brand-mark-trimmed.png`, `assets/scanner-hero-trimmed.png` — local brand mark and video poster.

## Local review

Open `index.html` in a current desktop browser. If the browser blocks media or subtitle loading from a `file:` URL, serve this folder through a local static HTTP server. Do not publish it during local review. Check desktop and narrow mobile layouts, caption visibility/position, seek behavior, and the full 56.2-second playback.

The player offers 12 rates from 0.25× to 3.00× and defaults to 1.00×. Native browser controls provide play/pause, seeking, and volume. The custom button toggles English captions. Captions are draft and have not been independently verified against every spoken word; do not describe them as verified.

## Before any public deployment

1. Obtain the narrator's explicit permission to publish the recording, plus guardian permission if the narrator is a minor.
2. Have a human compare every caption cue with the audio and visually confirm subtitle readability and synchronization in a normal browser.
3. Review the package contents for privacy. It contains the narrated video and is intended to be public if hosted; it excludes the raw narration file, transcripts, source footage, and rendering scripts.
4. Choose a static host and confirm its current limits. A public GitHub Pages site requires a public repository on GitHub Free, so repository contents and the published site are visible on the internet.
5. After the separate publication decision, upload only this package's site files. Test the hosted video and seek behavior over HTTP/HTTPS.

## GitHub Pages deployment (only after approval)

Create a dedicated repository containing only the contents of this package, keep the MP4 below GitHub's 100 MB per-file limit, then configure Pages to publish from the repository root or a dedicated branch. Do not make the repository public until narrator/guardian permission and caption review are complete. GitHub Pages has a 1 GB published-site maximum and a soft 100 GB/month bandwidth limit; it is suitable only for modest educational viewing, not guaranteed high-traffic video delivery.

No analytics, external libraries, remote fonts, or third-party assets are used by this package.
