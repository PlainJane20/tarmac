# NIST SSDF mapping

TARMAC uses NIST SP 800-218, Secure Software Development Framework (SSDF) v1.1, as a common vocabulary for secure software development governance. This design mapping is not a certification or assertion that a deployment satisfies every practice.

## Prepare the Organization (PO)

| SSDF intent | TARMAC capability |
| --- | --- |
| Define security requirements, roles, and environments | Triage risk tier, accountable roles, architecture/control plan |
| Implement roles and responsibilities | scoped authorization, decision rights, separation of duties |
| Maintain secure development environments | environment evidence, pipeline policy, access review |

## Protect the Software (PS)

| SSDF intent | TARMAC capability |
| --- | --- |
| Protect code and artifacts from unauthorized access/tampering | source/build provenance evidence and policy findings |
| Provide mechanisms to verify release integrity | signed artifact/provenance requirements in Release |
| Archive/protect releases and data | retention policy, evidence reference, immutable audit intent |

## Produce Well-Secured Software (PW)

| SSDF intent | TARMAC capability |
| --- | --- |
| Design to meet security requirements | Architecture decisions, threat/privacy evidence, control plan |
| Review and analyze code | CI/CD evidence for review, SAST, SCA, DAST, and test |
| Configure and compile securely | pipeline and build configuration evidence |
| Test executable code | quality/security results and release findings |

## Respond to Vulnerabilities (RV)

| SSDF intent | TARMAC capability |
| --- | --- |
| Identify and confirm vulnerabilities | security-source integrations and finding normalization |
| Assess, prioritize, remediate | risk owner, SLA, exception/waiver, release blocker |
| Analyze root causes | Defect/RCA workbench and corrective-action audit |

## Implementation rule

Each deployed practice needs an owner, actual procedure, evidence source, frequency, exception path, retention rule, and independent review appropriate to risk.

## References

- NIST, [SP 800-218 SSDF Version 1.1](https://csrc.nist.gov/pubs/sp/800/218/final)
- NIST, [SSDF publications and revisions](https://csrc.nist.gov/Projects/ssdf/publications)
