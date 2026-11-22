# InsForge setup and verification for DentXpert

Status: configuration discovered in website2/insforge-config.js; backend connectivity and permissions **not yet verified**.

## Security boundaries
- Public browser configuration may contain only InsForge base URL and anonymous key.
- Never commit or send project admin API key (ik_), user API key (uak_), database URL, or passwords to a public repo or chat.
- Use a trusted local CLI/dashboard or secure server environment for admin operations.
- Do not use InsForge's full-access API key in GitHub Pages JavaScript.
- Keep health/patient data out of this research workspace.

## Configuration
1. Sign in to the existing InsForge dashboard and confirm the project matches the hostname in website2/insforge-config.js.
2. Confirm authentication email verification and allowed redirect URLs for the actual DentXpert origin.
3. Before migrations, take a database backup and review any existing dx_workspace_items table. Do not run CREATE/ALTER against unknown production data without checking compatibility.
4. Apply database/migrations/20261122_dx_workspace_items.sql using authorized admin tooling after review. This grants CRUD only to authenticated users with owner-scoped RLS.
5. Run the verification matrix below using two separate test accounts with non-sensitive dummy task titles.

## Verification matrix (required before production claim)
- [ ] Unauthenticated read/write denied
- [ ] Account A can create, read, update, and delete its own task
- [ ] Account B cannot read/update/delete A's task or create an item with A's user_id
- [ ] Invalid kind, stage, and oversized title rejected
- [ ] Sign-up, email verification, sign-in, sign-out, and expired session handling work
- [ ] No admin keys or tokens appear in public HTML/JS or workflow logs
- [ ] Browser keyboard focus, errors, loading states, and reduced-motion behavior checked
- [ ] Backup/restore test and rollback documented

## Local Obsidian and NotebookLM
Keep the Obsidian vault local and private. Do not upload it automatically. Export only approved non-sensitive source notes to NotebookLM, validate source citations, then link non-sensitive evidence IDs in GitHub issues. See docs/OBSIDIAN_NOTEBOOKLM_WORKFLOW.md.

The SQL file is a proposed migration, not evidence that a live database has been modified.
