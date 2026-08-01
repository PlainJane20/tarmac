# 11 — Open decisions

Foundation v0.1.0 records unresolved choices instead of silently making them. Owners should update a decision only with explicit evidence and an Architecture Decision Record where indicated.

## OD-001 — Ownership and license

- **Status:** Open — blocks describing TARMAC as open source or accepting ordinary external code contributions
- **Current state:** Copyright © 2026 Navi Sohi. All rights reserved.
- **Decision needed:** Confirm independent ownership, review applicable employer/device/time policies, and select whether the project remains proprietary/source-visible or adopts an open-source license.
- **Options to evaluate:** remain All Rights Reserved; Apache-2.0; another license with appropriate legal review.
- **Required evidence:** ownership confirmation and any necessary policy/legal review.
- **Owner:** Project owner

No contributor or automated process may change the license by default.

## OD-002 — Public contribution model

- **Status:** Open — depends on OD-001
- **Decision needed:** Decide whether to accept external pull requests, require a Developer Certificate of Origin or contributor agreement, and define maintainer/review authority.
- **Current behavior:** Issues and discussion may be welcomed; pull requests require maintainer direction and do not grant reuse rights to repository users.

## OD-003 — Product name and trademark

- **Status:** Open
- **Decision needed:** Perform name/domain/trademark review before commercial use, public launch, or ecosystem branding.
- **Current behavior:** TARMAC is a project name and acronym, not a registered-mark claim.

## OD-004 — Pilot data boundary

- **Status:** Open — blocks enterprise pilot
- **Decision needed:** Define allowed data classes, tenancy, retention, residency, integrations, environment ownership, and approval authority.
- **Required evidence:** threat model, privacy review, data flow, and operational responsibility.

## OD-005 — Deployment and identity architecture

- **Status:** Open — blocks production architecture
- **Decision needed:** Select the identity provider, tenant model, authorization strategy, deployment environment, secrets platform, audit store, and recovery objectives.

## OD-006 — Financial model governance

- **Status:** Open
- **Decision needed:** Identify Finance owners, approved cost/benefit definitions, source systems, and evidence needed before publishing observed ROI.
- **Current behavior:** The calculator is a transparent model, not an observed result or business case approval.

## OD-007 — Open-source ecosystem and marketplace

- **Status:** Deferred
- **Decision needed:** Revisit only after licensing, product fit, trust model, extension contracts, and support economics are demonstrated.
