# ADR 0001 — Adopt a control-plane product boundary

- **Status:** Accepted
- **Date:** 2026-07-31
- **Owners:** TARMAC maintainers

## Context

Enterprise delivery data already exists across portfolio, planning, development, service, security, finance, and analytics systems. Reimplementing those systems would create duplication, migration cost, and unclear authority.

## Decision

TARMAC is an Enterprise Delivery Control Plane. It owns its operating-model state, normalized evidence references, policy findings, decisions, waivers, and audit history. It integrates with—not replaces—systems that own work items, code, tests, deployments, incidents, and financial actuals.

## Consequences

The product depends on clear integration contracts and visible data freshness. Users may navigate to source systems for detailed work. TARMAC can focus on cross-system decisions and avoid duplicating mature execution capabilities.

## Validation

Pilot workflows will measure evidence-preparation time, decision latency, duplicate data entry, and navigation burden. Revisit if a critical decision cannot be governed without owning substantially more source data.
