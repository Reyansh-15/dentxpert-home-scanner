# DentXpert Website 2.0: working design brief

**Scope:** Eight-page research-stage educational website. All five device concepts remain hypothetical and unvalidated.

## Visitor goals and content map
- **Home:** explain what DentXpert is in five seconds, concept status, film and routes.
- **Explore:** compare five conceptual product directions and their limitations.
- **Learn:** accessible oral-health education, clearly separated from personal medical advice.
- **Discover:** project milestones, research questions and open problems.
- **Technology:** proposed architecture and engineering unknowns, not demonstrated functionality.
- **Pricing:** hypothetical business-model scenarios only; no products available to purchase.
- **FAQ:** status, safety, availability, privacy, professional care.
- **About:** mission, research-stage status, authorship and contact guidance without collecting patient data.

## Three visual directions
1. **Clinical clarity:** light neutral background, teal accents, editorial headings, restrained cards. Strongest legibility and closest to current branding; less dramatic.
2. **Research notebook:** warm off-white, structured timelines and annotated concept sketches. Communicates experimentation; can feel less polished.
3. **Future lab:** dark navy, luminous teal, subtle motion. Memorable; higher contrast and animation QA burden.

**Working shortlist:** Clinical clarity first, Research notebook second. Future lab only as a selective visual accent, not an entire interface.

## Homepage text wireframes
- **A: Editorial:** header → hero with research notice and two actions → concept visualization → five cards → film → limitations → FAQ → footer.
- **B: Research-first:** header → status banner → project questions → concept cards → research milestones → film → FAQ.
- **C: Film-first:** header → concise hero → video with captions and transcript → status notice → concepts → research questions.

**Preferred:** A. It puts the status notice high, explains the project quickly, and retains the existing film.

## Navigation patterns
- Top navigation with eight explicit page links: easiest to understand on desktop but needs a compact mobile menu.
- Grouped menu (Explore, Learn, Discover under one label): saves space but hides routes.
- Sidebar navigation: strong for long research content but wastes mobile width.

**Decision:** explicit desktop links, accessible mobile menu with a visible label and Escape behavior. Provide skip link and active-page indication.

## Typography and themes
- Use existing system sans-serif and brand teal/navy for continuity. Body minimum 16px; headings use responsive clamp sizes.
- Light theme: pale neutral background, dark text, teal controls. Dark theme: deep navy background, light text, muted teal accents. Verify WCAG AA contrast in both; no automatic claim of compliance.
- Preserve visible focus outlines, 200% zoom readability, semantic headings, alt text, and captions.

## Motion and media
- Welcome text: “Welcome to the DentXpert Journey.” Optional short opacity reveal, no forced audio, no blocking splash screen.
- Provide immediate skip navigation; honor prefers-reduced-motion by rendering static content without delay.
- Use existing concept video only after rights/permissions review; provide captions, transcript, native playback controls and failure fallback.
- Avoid scroll hijacking, parallax, flashing, and long animations.

## Acceptance criteria
All eight routes and headings work; mobile menu and keyboard work; no broken links; 375/768/1440px layouts tested; 200% zoom and reduced-motion checked; video captions verified; medical claims reviewed; no patient data collection; rollback possible. These checks are **not yet performed**.
