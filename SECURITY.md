# Security policy

TARMAC is an early-stage reference implementation and is not operated as a production service.

## Report a vulnerability

Use GitHub's private vulnerability reporting when available, or contact the repository owner privately through GitHub. Do not open a public issue containing vulnerability details, credentials, personal information, private certificates, production data, or confidential material.

Include the affected component and revision, prerequisites, reproduction steps, potential impact, and any suggested mitigation. Allow reasonable time for investigation before disclosure. Do not access data or systems you do not own or have explicit permission to test.

## Supported versions

Only the latest revision of `main` is evaluated during this pre-release phase. No production support or response-time commitment is provided.

## Current boundaries

The prototype does not yet provide production authentication, authorization, tenant isolation, secrets management, audit immutability, rate limiting, or formal privacy/retention controls. Do not deploy it with sensitive or regulated data. Review the [governance and compliance blueprint](flight-deck/07-governance-and-compliance.md) before extending these boundaries.

## Secure-development intent

The project maps its future delivery controls to NIST SP 800-218 SSDF v1.1 as documented in [`docs/governance/nist-ssdf.md`](docs/governance/nist-ssdf.md). This is a design mapping, not a certification claim.
