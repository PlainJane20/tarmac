# Contributing to TARMAC

## Development workflow

1. Create a focused branch from `main`.
2. Keep changes scoped to a single user outcome or control.
3. Run `npm run build` and `DATABASE_URL=... npx prisma validate` before opening a pull request.
4. Describe the delivery, security, and lifecycle-control impact in the pull request.

## Engineering principles

- Validate untrusted input at every API boundary.
- Treat lifecycle gates as domain rules, not UI conditions.
- Preserve auditability for material approvals, changes, and waivers.
- Never commit credentials, production data, or generated build artifacts.
- Favor small, well-named modules and explicit error handling.
