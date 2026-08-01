# 07 — Governance and compliance

## Objective

Prove who made each material delivery decision, under which authority, using which evidence, while protecting portfolio information and preserving separation of duties.

## Governance is cross-cutting

Compliance is not a final Release checklist. Policy applies from Triage through Monitoring:

| Pillar | Governance examples |
| --- | --- |
| Triage | data classification, sponsor authority, risk tier, investment threshold |
| Architecture | security/privacy assessment, standards, ADR, third-party risk |
| Release | test evidence, vulnerability disposition, change approval, operational readiness |
| Monitoring | incident obligations, control drift, retention, benefit and risk review |

## Decision record

A material decision includes actor, effective role, scope, request, policy version, evidence snapshot, findings, response, rationale, conditions, delegation, timestamps, correlation ID, and any exception.

## Exception standard

A waiver records accepted risk and includes owner, scope, rationale, compensating control, approval authority, creation, expiry, and review trigger. It never changes a failed finding into a pass. Expired exceptions block dependent transitions until resolved or renewed.

## Security priorities

1. Prevent unauthorized lifecycle advancement and approval.
2. Prevent cross-tenant or cross-program disclosure.
3. Detect forged, stale, replayed, or incomplete integration evidence.
4. Protect audit history from hidden alteration or deletion.
5. Constrain delegation, break-glass access, and role aggregation.
6. Prevent sensitive data leakage through logs, exports, or future AI workflows.

## Secure development mapping

TARMAC uses the four practice groups in NIST SP 800-218 SSDF v1.1 as a governance vocabulary:

- **Prepare the Organization (PO):** roles, policy, environments, supplier expectations.
- **Protect the Software (PS):** code, artifacts, credentials, and integrity.
- **Produce Well-Secured Software (PW):** requirements, design, review, testing, and release.
- **Respond to Vulnerabilities (RV):** identification, remediation, root-cause learning, and disclosure.

This is a design mapping, not a certification claim. A deployment must document actual practices and undergo the appropriate independent assessment.

## Evidence controls

Evidence includes source identity, native record ID, source and collection time, version/hash where possible, scope, classification, validation result, freshness policy, and access rule. TARMAC references source content when feasible and copies it only when retention or availability requirements justify the risk.

## References

- NIST, [Secure Software Development Framework (SSDF) Version 1.1, SP 800-218](https://csrc.nist.gov/pubs/sp/800/218/final)
- NIST, [SSDF project and publication status](https://csrc.nist.gov/Projects/ssdf/publications)
