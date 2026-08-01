# TARMAC metric catalog

Every metric identifies the decision it supports, formula, unit, source expectation, owner, freshness, and caveat. A deployment maps these product definitions to actual authoritative sources.

## Classification

Label every displayed number: **observed**, **estimated**, **modeled**, **hypothesis**, or **target**. Never combine categories without showing each component.

## Portfolio and decision flow

### Intake lead time

- **Decision:** Is demand moving through initial assessment at an acceptable pace?
- **Formula:** median working time from evidence-complete intake to accept/defer/decline.
- **Pause:** requester-wait time reported separately by reason code.
- **Guardrail:** completeness rejection/rework rate.

### Architecture decision cycle time

- **Decision:** Which review constraint needs capacity or process intervention?
- **Formula:** working time from evidence-complete request to accountable architecture decision.
- **Segment:** complexity, decision type, organization, and disposition.
- **Guardrail:** reopened decisions and material post-approval findings.

### Approval aging

- **Decision:** Which decision owner, workflow, or evidence gap threatens flow?
- **Formula:** working time since an approval became evidence-complete and actionable.
- **Display:** median, P75, P90, count outside SLA, and pause reasons.

### Late dependency discovery

- **Decision:** Is planning exposing cross-track constraints early enough?
- **Formula:** material dependencies first recorded after baseline divided by material dependencies.
- **Guardrail:** planning overhead and false-positive dependency count.

## DORA software delivery performance

DORA's current official model uses five application/service-level measures. Three describe throughput and two describe instability.

### Change lead time

- **Definition:** time from a change committed to version control to successful production deployment.
- **Source:** source and deployment systems.

### Deployment frequency

- **Definition:** number of deployments over a period or time between deployments.
- **Source:** deployment system.

### Failed deployment recovery time

- **Definition:** time to recover from a deployment failure requiring immediate intervention.
- **Source:** deployments, incidents, and service restoration.

### Change fail rate

- **Definition:** deployments requiring immediate intervention divided by total deployments.
- **Source:** deployment and remediation records.

### Deployment rework rate

- **Definition:** unplanned deployments made because of a production incident divided by total deployments.
- **Source:** deployment and incident correlation.

**Use:** measure one application or service over time. Do not rank unlike teams or optimize one metric in isolation. See DORA's [official metrics guide](https://dora.dev/guides/dora-metrics/).

## Release and governance

### Release readiness

- **Decision:** Which required controls remain unresolved for this release?
- **Formula:** counts of passed, failed, blocked, pending, waived, expired, and not applicable.
- **Rule:** a percentage never overrides a blocking control.

### Evidence freshness

- **Decision:** Can the current evidence support a decision?
- **Formula:** evidence within its declared freshness policy divided by applicable evidence.
- **Display:** source coverage, stale count, and connector health.

### Policy compliance

- **Formula:** applicable policy evaluations satisfied without waiver divided by applicable evaluations.
- **Display:** waived and expired counts separately.
- **Caveat:** recorded control result, not regulatory certification.

### Evidence preparation effort

- **Formula:** human hours locating, normalizing, validating, and assembling evidence per review.
- **Source:** sampled time study or workflow capture.
- **Guardrail:** evidence rejection and missing-record rate.

## Outcomes and value

### Benefit realization

- **Formula:** `(actual − baseline) ÷ (target − baseline)`, direction-normalized for lower-is-better measures.
- **Display:** baseline period, target date, actual period, unit, owner, source, and confidence.
- **Caveat:** unlike units are not aggregated without a separate documented financial model.

### Capacity released

- **Formula:** `initiatives × baseline effort hours × observed or modeled improvement`.
- **Type:** time capacity, not cash savings.
- **Proof:** baseline/actual effort and evidence of redeployment.

### Cost-of-delay reduction

- **Formula:** `initiatives accelerated × weeks accelerated × economic value per week × confidence`.
- **Proof:** approved value curve and evidenced acceleration.

### Risk-adjusted loss reduction

- **Formula:** `annual loss exposure × reduction in probability or impact × confidence`.
- **Proof:** documented threat/event model and control-effect rationale.

### Cashable savings

- **Formula:** Finance-confirmed reduction in actual cash outflow or approved budget.
- **Rule:** never infer from capacity released alone.

## Data quality

Metrics show last refresh, source coverage, missingness, method version, and status. Corrections preserve prior published values when auditability requires it. Owners review definitions at least quarterly during active pilots.
