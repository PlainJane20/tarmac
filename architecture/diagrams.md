# Architecture and flowchart gallery

The Mermaid diagrams remain diff-friendly and render directly in GitHub. SVG exports provide stable artifacts for presentations, documentation, and offline review.

## TARMAC operating model

```mermaid
flowchart LR
  T[Triage] --> A[Architecture]
  A --> R[Release]
  R --> M[Monitoring]
  M --> T
  AUTO[Automation & CI/CD] -.-> T
  AUTO -.-> A
  AUTO -.-> R
  AUTO -.-> M
  GOV[Compliance & Governance] -.-> T
  GOV -.-> A
  GOV -.-> R
  GOV -.-> M
```

[Open the SVG version](svg/tarmac-operating-model.svg)

## Enterprise context

```mermaid
flowchart LR
  S[Strategy & Finance] --> TARMAC
  P[Planning & Work] <--> TARMAC
  D[Source · CI/CD · Quality] --> TARMAC
  O[ITSM · Observability] --> TARMAC
  I[Identity & Policy] --> TARMAC
  TARMAC --> X[Governed Decisions]
  TARMAC --> V[Portfolio & Value Insight]
```

[Open the SVG version](svg/enterprise-context.svg)

## Governed release decision

```mermaid
sequenceDiagram
  participant Source as Evidence Sources
  participant Auto as Automation
  participant Policy as Compliance & Policy
  participant Owner as Release Authority
  participant Audit as Audit Record
  Source->>Auto: Signed events and evidence
  Auto->>Auto: Verify, normalize, deduplicate
  Auto->>Policy: Evidence snapshot
  Policy->>Policy: Evaluate versioned rules
  Policy-->>Owner: Findings, blockers, waivers
  Owner->>Audit: Authorize or block with rationale
  Audit-->>Auto: Governed decision event
```

[Open the SVG version](svg/governed-release.svg)

## Domain relationships

```mermaid
erDiagram
  PROGRAM ||--o{ PROJECT_TRACK : contains
  PROGRAM ||--o{ RELEASE_GATE : evaluates
  PROGRAM ||--o{ APPROVAL : requires
  PROGRAM ||--o{ RISK : carries
  PROGRAM ||--o{ DEFECT : discovers
  PROGRAM ||--o{ BENEFIT : realizes
  PROGRAM ||--o{ PROGRAM_METRIC : measures
  PROJECT_TRACK ||--o{ MILESTONE : plans
  PROJECT_TRACK }o--o{ PROJECT_TRACK : depends_on
  DEFECT ||--o| RCA : explains
  PROGRAM ||--o{ AUDIT_LOG : records
```

The current Prisma model uses `Program`; the public product language may evolve toward `Initiative` through an explicit migration decision.
