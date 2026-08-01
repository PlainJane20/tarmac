# Contributing to TARMAC

TARMAC welcomes thoughtful product and architecture discussion. The repository is currently **All Rights Reserved**, not open source. Viewing source does not grant permission to copy, modify, distribute, or reuse it.

Until [OD-001 and OD-002](flight-deck/11-open-decisions.md) are resolved, external code contributions require explicit maintainer invitation and terms. You may still open a structured issue to report a defect, challenge an assumption, or propose an outcome.

By participating, follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Good entry points

- Report a reproducible behavior defect.
- Propose a product capability with an evidence-backed outcome.
- Use an RFC for a material operating-model or metric change.
- Use an architecture proposal for a trust, data, integration, or deployment decision.
- Challenge an assumption in the relevant [Flight Deck](flight-deck/README.md) brief.

## Authorized development workflow

1. Create a focused branch from `main`.
2. Keep the change scoped to one decision or user outcome.
3. Use synthetic data in examples, screenshots, and tests.
4. Run the foundation and application validation.
5. Explain outcome, evidence, tradeoffs, and control impact in the pull request.

```bash
npm ci
npm run check:foundation
DATABASE_URL='postgresql://tarmac:local@localhost:5432/tarmac?schema=public' npx prisma validate
npm run build
```

## Engineering principles

- Validate untrusted input at every boundary.
- Treat lifecycle gates as domain rules, not UI conditions.
- Preserve evidence provenance and material decision auditability.
- Never commit credentials, production data, private certificates, employer-confidential material, or generated dependency folders.
- Label modeled metrics and do not infer cash savings from time capacity.
- Preserve accessibility and reduced-motion behavior.
- Record durable architecture decisions with an ADR.

## Review standard

Reviewers look for a clear outcome, proportional tests, server-side control enforcement, safe data handling, accessible interaction, migration/recovery behavior, and consistency with the TARMAC operating model.
