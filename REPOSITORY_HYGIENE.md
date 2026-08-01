# Repository hygiene

## Never commit

- `.env` files or credentials
- API keys, tokens, passwords, cookies, or private certificates
- production, customer, employee, or regulated data
- employer-confidential information
- `node_modules`, `.next`, caches, logs, or generated dependency folders
- symbolic links that can pull content from outside the repository
- unreviewed screenshots containing real data

## Before sharing or packaging

1. Run `npm run check:foundation`.
2. Review `git status --short` and the complete diff.
3. Confirm the All Rights Reserved `LICENSE` is unchanged unless an explicit ownership/license decision authorizes a change.
4. Package only tracked and intended untracked source files.
5. Verify archive integrity and confirm no `.env`, dependency folder, or symbolic link is included.
6. Record the archive SHA-256 checksum.

## Work-managed device boundary

Do not assume that a personal GitHub account resolves employer intellectual-property or acceptable-use questions. Keep [OD-001](flight-deck/11-open-decisions.md) open until ownership and publication authority are explicitly confirmed. Avoid company time, systems, data, examples, and proprietary concepts where policy creates uncertainty.
