# DentXpert — Codex Master Build Specification

## Important outcome

Build a genuinely usable DentXpert website and Second Brain OS Command Center. Do not produce a visual mockup, repeated cards, dead buttons, fake integrations, or a page that only looks interactive.

The result must be a working browser prototype that can be tested by a real person.

The YouTube reference is an interaction reference only. Recreate the useful operating-system patterns with original DentXpert branding, code, copy, artwork, and layout. Do not copy private code, proprietary assets, exact branding, or pixel-perfect design.

## Repository

Repository: `Reyansh-15/dentxpert-home-scanner`

Existing public pages:

- Home
- Explore
- Learn
- Discover
- Technology
- Availability
- FAQ
- About

Existing project assets must be inspected and reused where appropriate.

## Safety and truthfulness

DentXpert is an early-stage student research and industrial-design concept.

Never claim:

- Clinical validation
- Diagnostic accuracy
- Medical advice
- Regulatory approval
- A working or available device
- Guaranteed health outcomes
- Real external-agent execution unless it actually happened

Do not collect personal or medical information.

Do not invent testimonials, user reviews, customer logos, funding, partnerships, or star counts.

Do not promise or guarantee 200,000 GitHub stars. Marketing may invite genuine exploration and starring, but GitHub activity must be organic.

## Product quality bar

The website must feel like a real product interface:

- Strong visual hierarchy
- Distinct screens with different purposes
- Clear state changes
- Responsive controls
- Visible feedback after every action
- Meaningful overlays and panels
- Smooth transitions
- Keyboard support
- Mobile support
- Error handling
- Loading states
- Empty states
- Offline states
- Honest connector states

No generic purple-gradient button rows. Use the DentXpert charcoal, aqua, teal, and lime system consistently.

## Second Brain OS application shell

Create a persistent application shell with:

- Left navigation rail on desktop
- Bottom navigation or collapsible rail on mobile
- Top command bar
- Workspace switcher
- Search field
- Notifications/status area
- Theme toggle
- Voice assistant control
- Current workspace indicator
- Keyboard shortcut help
- Global overlay layer

The shell must remain present while switching views. Do not simulate navigation by merely changing a heading.

## Required Command Center views

### 1. Overview

Show:

- Daily brief
- Active research focus
- Open questions
- Current progress
- Recent activity
- Memory signals
- Connector health
- Suggested next actions

Each item must be actionable and open a relevant view or panel.

### 2. Jarvis voice workspace

Include:

- Voice orb with listening animation
- Start/stop voice control
- Text command fallback
- Transcript panel
- Spoken response using speech synthesis where supported
- Listening, processing, success, unavailable, and error states
- Command history
- Cancel command control
- Keyboard shortcut

Commands to support locally:

- Open memory
- Open progress
- Open connections
- Open research graph
- Show today’s brief
- Switch theme
- Create local task
- Read the current panel aloud
- Reset workspace

If browser speech recognition is unavailable, show a clear fallback instead of silently doing nothing.

### 3. Memory core

Create a real local memory workspace with:

- Notes
- Research questions
- Design decisions
- Evidence records
- Unknowns
- Tags
- Relationships
- Search
- Filter
- Sort
- Create
- Edit
- Archive
- Restore
- Delete with confirmation
- Detail drawer
- Timeline view

Persist local data with localStorage. Use InsForge persistence only when configured.

Do not store personal or medical information.

### 4. Research graph

Create an interactive graph with:

- Nodes
- Edges
- Node selection
- Node detail drawer
- Zoom in/out
- Reset graph
- Pan/drag graph
- Focus selected node
- Keyboard selection
- Narrative explanation
- Filter by category

Use DentXpert nodes such as Design, Evidence, Privacy, Accessibility, Hygiene, Technology, Human Oversight, and Open Questions.

The graph must explain the relationship represented by each edge. Do not use decorative nodes with no behavior.

### 5. Progress and goals

Support:

- Goals
- Strategies
- Weekly focus
- Monthly milestones
- Evidence gates
- Completion progress
- Blockers
- Next actions
- Local task creation
- Task completion
- Undo

Progress must change when the user interacts with tasks.

### 6. Daily brief

Create a generated local brief from stored DentXpert data:

- What changed
- What needs attention
- Open research questions
- Suggested next step
- Evidence boundary reminder

Clearly label it as a local prototype brief unless a real model generates it.

### 7. Connections

Show connection cards for:

- InsForge
- Claude
- Perplexity
- Codex
- Manus
- Hermes
- Kimi
- Obsidian
- Voice

Each card must show:

- Connected
- Not configured
- Unavailable
- Error
- Last checked
- Required setup
- Test connection action

Never display a fake Connected state.

### 8. Studio

Create local utilities for:

- Research brief
- Concept comparison
- Evidence checklist
- Timeline builder
- Narrative builder
- Export JSON
- Export Markdown

### 9. Settings

Include:

- Theme
- Reduced motion
- Voice preferences
- Data storage mode
- Clear local workspace
- Export backup
- Import backup
- Privacy explanation

Destructive actions need confirmation.

## Interaction requirements

Every visible button must do something meaningful.

Test all of the following:

- Navigation links
- View tabs
- Search
- Filters
- Sort controls
- Toggle controls
- Theme switch
- Reduced-motion switch
- Voice start
- Voice stop
- Text command submission
- Overlay open
- Overlay close
- Escape dismissal
- Graph selection
- Graph zoom
- Graph pan
- Panel drag
- Panel resize
- Task creation
- Task completion
- Undo
- Memory creation
- Memory editing
- Memory archive
- Export
- Import
- Mobile menu

Every action must produce visual feedback through state, animation, toast, or panel update.

## Motion system

Use a coherent motion language:

- Page transitions
- View transitions
- Overlay fade and scale
- Drawer slide-in
- Toast entrance and exit
- Button press state
- Focus state
- Graph node emphasis
- Voice orb pulse
- Loading shimmer
- Progress animation
- Dragging feedback

Respect `prefers-reduced-motion: reduce` and provide an accessible non-animated mode.

Avoid excessive animation that harms readability.

## Visual system

Use:

- Deep charcoal background
- Aqua and teal primary accents
- Lime for important status signals
- High-contrast text
- Thin technical borders
- Layered panels
- Soft depth and glow
- Clear spacing rhythm
- Premium typography
- Responsive composition

Do not repeat the same three-card layout in every view. Each view must have a different information structure appropriate to its purpose.

## Website pages

Rebuild the public DentXpert pages so they feel like one product ecosystem:

- Home: high-impact product story and scanner concept
- Explore: concept directions and interactive comparisons
- Learn: principles, limitations, and responsible design
- Discover: research journal and evidence timeline
- Technology: proposed system with diagrams and uncertainty labels
- Availability: explicitly not offered or for sale
- FAQ: direct answers about what DentXpert is and is not
- About: student research and design origin

The Command Center should feel like the private/workspace layer of the same product, not a separate unrelated website.

## Backend and integrations

Use InsForge only through configured environment values.

Never hard-code secrets.

Implement:

- Auth status
- Sign in
- Sign out
- Current user
- Local fallback
- Database persistence when available
- Realtime status when available
- Graceful offline mode

External AI connectors must be adapter-based and server-side. Never put private API keys in browser code.

## Error handling

Add visible handling for:

- Missing JavaScript
- Unsupported browser APIs
- Failed connection
- Timeout
- Rate limit
- Unauthorized API
- Empty data
- Invalid import
- Failed export
- Offline mode
- Missing asset

Do not swallow errors silently.

## Testing gate

Before claiming completion, run:

1. JavaScript syntax checks.
2. Existing Python tests.
3. Browser smoke tests.
4. Mobile viewport tests.
5. Keyboard-only tests.
6. Reduced-motion tests.
7. Accessibility checks.
8. Link and asset checks.
9. HTTP status checks.
10. Console error checks.
11. Interaction coverage checks.
12. Duplicate-content audit.
13. Visual hierarchy audit.
14. Contrast audit.
15. Performance audit.

## Quality-control report

Create `DENTXPERT_QUALITY_CONTROL_REPORT.md` containing:

- Build commit
- Preview URL
- Public URL
- Browser tested
- Viewports tested
- Tests run
- Test results
- Console errors
- Failed interactions
- Accessibility findings
- Contrast findings
- Duplicate layout findings
- Simulated versus connected features
- Deployment status
- Known limitations
- Screenshots or screenshot paths

The report must explicitly answer:

1. Is this an actual working prototype?
2. Which buttons were tested?
3. Which views change state?
4. Does voice work in the tested browser?
5. Is persistence working?
6. Are connectors real or simulated?
7. Is the public URL HTTP 200?
8. Is the design duplicated or genuinely differentiated?
9. Are there console errors?
10. What remains unfinished?

## Completion rule

Do not call the project complete if:

- The public URL is 404.
- Buttons do not change state.
- Voice silently fails.
- The Command Center is only static cards.
- External integrations are falsely presented as connected.
- Tests have not been run.
- The quality-control report is missing.
- The browser console contains errors.

Return the exact verified URL and the quality-control report. If blocked, say exactly what is blocked and why.
