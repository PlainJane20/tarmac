# 10 — Engineering standards

## Definition of done

A change is complete when its user decision, domain behavior, security impact, data/migration impact, observability, accessibility, tests, documentation, and recovery behavior are addressed in proportion to risk.

## Code standards

- TypeScript strict mode and explicit external-input validation.
- Deterministic domain rules independent of UI components.
- Lifecycle transitions implemented as commands with reasoned failures.
- Server-side authorization for every protected action.
- Small modules named for domain responsibility.
- No secrets, tokens, sensitive evidence, employer material, or unnecessary personal data in code, tests, logs, or examples.

## Testing strategy

| Layer | Focus |
| --- | --- |
| Unit | lifecycle, policy, scoring, value-model, and validation rules |
| Integration | transactions, constraints, audit, outbox, and adapter idempotency |
| Contract | API, event, evidence, and policy schema compatibility |
| End-to-end | critical TARMAC decisions and negative authorization paths |
| Non-functional | accessibility, security, resilience, and performance where risk warrants |

Gate logic requires positive, negative, boundary, waiver-expiry, replay, and concurrent-transition tests.

## Secure development

Engineering work uses the NIST SSDF practice groups as a design vocabulary: prepare the organization, protect software, produce well-secured software, and respond to vulnerabilities. This project mapping does not constitute compliance or certification.

The intended release baseline includes reviewed changes, dependency and secret scanning, static analysis, schema validation, threat modeling for new trust boundaries, authorization tests, signed provenance, and an SBOM as the delivery system matures.

## Reliability

Define service-level indicators for availability, workflow completion, decision latency, integration freshness, and event-processing failure. Retried work is idempotent. Alerts identify user/control impact and link to a runbook. Correlation IDs connect decisions, evidence, integrations, and logs.

## Documentation

Documentation lives near the decision it explains. Every public metric has a definition. Every integration states ownership, permissions, failure behavior, and reconciliation. Examples and screenshots use synthetic data.

## Repository checks

Foundation v0.1.0 validates site structure, local documentation links, metric claims, value-model scenarios, workflow configuration, secret patterns, environment hygiene, and symbolic links. Application compilation and Prisma schema validation remain continuous-integration gates.
