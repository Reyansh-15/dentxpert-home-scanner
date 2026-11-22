# Obsidian + NotebookLM research handoff (v1)

Status: documented workflow; **no automatic sync or connected account is claimed**.

## Roles
- GitHub: canonical source for code, tests, release logs, and issues.
- Obsidian: private project decisions, task notes, approved research summaries, and links to evidence. Do not overwrite or restructure existing completed Second Brain notes.
- NotebookLM: human-reviewed source-grounded synthesis from authorized, non-sensitive documents. Verify citations against primary sources before publishing.

## Research-to-release steps
1. Gather primary sources, publication dates, licenses, and precise claims. Never include patient information, credentials, or private account exports in public GitHub or NotebookLM.
2. Add permitted sources to NotebookLM manually, when available. Request a summary distinguishing supported findings, limitations, uncertainty, and unanswered questions.
3. Independently verify each source and write an append-only Obsidian note containing source title, URL/DOI, checked date, exact proposed website wording, reviewer, and approval status.
4. Create or update a GitHub issue referencing the approved note's non-sensitive identifier. Never publish a private Obsidian vault path or sensitive contents.
5. Implement on a development branch. Run static, browser, accessibility, security, and claims checks; attach logs and screenshots to the issue.
6. Publish only after all release gates pass, with rollback ready. Record commit, deployed URL, verification date, and any remaining limitations in Obsidian.

## Integration constraints
- A static GitHub Pages site cannot securely read a local Obsidian vault or authenticate to NotebookLM by itself.
- Do not embed API secrets, passwords, or private research notes in client-side JavaScript.
- Any future sync requires supported, authorized integration and explicit data-scope design, with least privilege and opt-in for transfers.
- Narrator and guardian consent and media licensing must be verified before public media publication.
- NotebookLM output is not medical validation. DentXpert is research-stage; no diagnosis or unsupported clinical claims.

## Verification checklist
- [ ] Obsidian vault access confirmed and existing content backed up
- [ ] NotebookLM access/integration path confirmed
- [ ] Authorized non-sensitive source transfer tested
- [ ] Citation traceability tested
- [ ] No sensitive data exposed
- [ ] Round-trip or manual handoff tested and documented
