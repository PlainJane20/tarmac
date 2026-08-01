# ADR 0002 — Model Automation and Compliance as cross-cutting capabilities

- **Status:** Accepted
- **Date:** 2026-07-31
- **Owners:** TARMAC maintainers

## Context

The TARMAC acronym names six capabilities. Triage, Architecture, Release, and Monitoring form a natural continuous delivery sequence. Automation and Compliance do not belong after Monitoring: both affect the behavior and trust of every stage.

## Decision

Model Triage, Architecture, Release, and Monitoring as the delivery spine. Model Automation & CI/CD and Compliance & Governance as cross-cutting capabilities with explicit contracts and controls at each pillar.

## Consequences

Product experiences and architecture diagrams must show the distinction. Automation cannot become a disconnected feature area, and compliance cannot be deferred to a final gate. Teams must define automation and governance behavior for each decision workflow.

## Validation

Test the model with representative users and workflows. Revisit if users consistently misunderstand the acronym or if a future capability cannot map cleanly to a pillar/cross-cutting responsibility.
