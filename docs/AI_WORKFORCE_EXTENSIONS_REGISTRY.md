# DentXpert AI workforce extension registry

This is a **proposal and security review inventory**, not proof that any integration is installed or connected.

| Category | Candidate | Source | Purpose | Default access | State |
| --- | --- | --- | --- | --- | --- |
| MCP | GitHub official MCP server | https://github.com/github/github-mcp-server | Issues, PR review, CI evidence | Read-only until approved | Candidate |
| MCP | Model Context Protocol filesystem reference | https://github.com/modelcontextprotocol/servers | Narrow local project file operations | Project folder only; no Obsidian vault | Candidate |
| Toolkit | Gitleaks | https://github.com/gitleaks/gitleaks | Secret detection | Repository scan | Candidate |
| Toolkit | Semgrep | https://github.com/semgrep/semgrep | Static security review | Repository scan | Candidate |
| Toolkit | Trivy | https://github.com/aquasecurity/trivy | Dependency and configuration audit | Repository scan | Candidate |
| Toolkit | Playwright | https://github.com/microsoft/playwright | Browser regression | Test environment | Existing in repo |
| Toolkit | axe-core | https://github.com/dequelabs/axe-core | Accessibility audit | Test environment | Configured in QA workflow; execution unverified |
| Marketplace | MCP Registry | https://registry.modelcontextprotocol.io | Discover MCP packages | No permissions by default | Discovery only |
| Marketplace | ChatGPT Plugin Directory | ChatGPT Settings > Plugins | Discover supported account integrations | Per-plugin approval | Discovery only |
| Marketing | Activepieces | https://github.com/activepieces/activepieces | Approval-gated content pipeline | Local sandbox, no publishing | Candidate |
| Marketing | Postiz | https://github.com/gitroomhq/postiz-app | Optional scheduling | No social-account access | Deferred |

## Rules for installation
1. Confirm official maintainer, license, release history, and compatibility.
2. Pin versions and review dependency tree; never execute marketplace install scripts automatically.
3. Start read-only, limit directory and API scopes, and keep credentials in approved secret storage.
4. Never expose the InsForge admin key, private Obsidian vault, health records, or publishing tokens.
5. Require review before any publishing, paid advertising, data transfer, or production deployment.
6. Record installed version, exact permissions, test result, rollback, and owner.
7. Clearly label mock and disconnected integrations.

## Proposed local Codex skills
- dentxpert-security-review: evidence-backed Gitleaks/Semgrep/Trivy findings.
- dentxpert-accessibility-audit: Playwright/axe results plus manual-test gaps.
- dentxpert-scientific-claims-review: source-grounded dental content gate.
- dentxpert-content-factory: research to approved export; no auto-publishing.

## Acceptance criteria
- Security tools run with non-secret test fixtures and produce redacted evidence.
- MCP adapters have documented permission scopes and explicit connection tests.
- No marketplace tool is represented as installed until verified.
- Existing InsForge/Obsidian/NotebookLM setup remains unchanged.
