# TARMAC

<img src="docs/tarmac-banner.svg" alt="TARMAC — The Enterprise Delivery Control Plane" width="100%" />
https://plainjane20.github.io/tarmac/

## The Enterprise Delivery Control Plane

> **From idea to impact. Governed by design.**

[![Foundation](https://img.shields.io/badge/Foundation-v0.1.0-5eead4)](flight-deck/README.md)
[![Next.js](https://img.shields.io/badge/Next.js-15-0b1220?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-All_Rights_Reserved-f59e0b)](LICENSE)

TARMAC is a source-visible, early-stage reference implementation for a modern Information Technology Portfolio Management Office (ITPMO). It connects strategic demand, architecture decisions, release readiness, production signals, automation, and compliance into one measurable operating model.

It is not a replacement for Jira, GitHub, Azure DevOps, ServiceNow, or other execution systems. TARMAC is the governance and orchestration layer that connects them.

> **Related work in this portfolio:** [tpm-agent-os](https://github.com/PlainJane20/tpm-agent-os)
> and [signalweave-ai](https://github.com/PlainJane20/signalweave-ai) also
> model TPM/portfolio decision-governance territory — worth being upfront
> about rather than presenting each as unrelated. Same underlying
> interest, three different shapes: this one is a web-app governance
> layer connecting Jira/GitHub/ServiceNow-style tools; tpm-agent-os is a
> lean six-agent pipeline modeling the Staff TPM operating model
> directly; signalweave-ai is a policy-gated decision control plane with
> a dashboard, aimed at the seams between teams.

**Explore:** [Product story](#why-tarmac) · [Operating model](#the-tarmac-operating-model) · [Flight Deck](flight-deck/README.md) · [Architecture](architecture/README.md) · [Metrics](docs/metrics/catalog.md) · [Roadmap](flight-deck/09-roadmap.md) · [Product site](site/README.md)

## Why TARMAC?

Every successful flight begins on the tarmac. Before movement, specialized teams coordinate readiness, sequence, risk, and clearance. Enterprise technology delivery has the same need, but its evidence and decisions are often fragmented across spreadsheets, tickets, meetings, pipelines, and dashboards.

TARMAC makes the path explicit:

- the right demand reaches the right decision makers;
- architecture and risk decisions are visible before commitment;
- release evidence is complete, current, and traceable;
- production signals feed the next portfolio decision; and
- automation and compliance operate across the entire lifecycle.

## What TARMAC means

| Letter | Capability | Decision enabled |
| --- | --- | --- |
| **T** | **Triage** | Is this demand valuable, complete, feasible, and ready to enter the portfolio? |
| **A** | **Architecture** | Is the solution direction sound, secure, reusable, and aligned? |
| **R** | **Release** | Is the change ready for production, with risk and evidence understood? |
| **M** | **Monitoring** | Is the service healthy, and is the intended outcome materializing? |
| **A** | **Automation & CI/CD** | Which evidence and transitions can be made fast, repeatable, and observable? |
| **C** | **Compliance & Governance** | Which policies, approvals, exceptions, and audit records apply end to end? |

The first four capabilities form a continuous delivery spine. Automation and Compliance are cross-cutting capabilities that strengthen every stage.

## The TARMAC operating model

```mermaid
flowchart LR
  T[Triage] --> A[Architecture]
  A --> R[Release]
  R --> M[Monitoring]
  M -->|Outcome and operational feedback| T

  AUTO[Automation & CI/CD] -. accelerates and evidences .-> T
  AUTO -.-> A
  AUTO -.-> R
  AUTO -.-> M

  GOV[Compliance & Governance] -. controls and assures .-> T
  GOV -.-> A
  GOV -.-> R
  GOV -.-> M
```

### Four delivery pillars

1. **Triage** turns demand into an explainable portfolio decision.
2. **Architecture** turns intent into an approved solution direction and control plan.
3. **Release** turns completed work into an evidence-backed production decision.
4. **Monitoring** turns production signals and realized outcomes into the next intervention.

### Two cross-cutting capabilities

- **Automation & CI/CD** gathers evidence, evaluates deterministic rules, routes work, and reduces manual reconstruction.
- **Compliance & Governance** defines policy, decision rights, separation of duties, exceptions, retention, and auditability.

## How TARMAC modernizes the ITPMO

| Traditional pattern | TARMAC operating model |
| --- | --- |
| Intake through email and spreadsheets | Structured triage with accountable outcomes and decision SLAs |
| Architecture review as a late meeting | Versioned decisions and reusable evidence before commitment |
| Release status assembled manually | Connected readiness evidence with explicit blockers and waivers |
| Executive reporting as a monthly reconstruction | Live exception, flow, value, and production feedback |
| Audit preparation as a separate project | Policy evidence and decision history retained in the workflow |
| Tools optimized in isolation | A neutral control plane coordinating authoritative systems |

TARMAC shifts the ITPMO from status collection to portfolio flow, decision enablement, and value realization.

## Current prototype

The existing Next.js application demonstrates:

- an executive command center;
- portfolio health, earned-value, dependency, and capacity signals;
- an explicit lifecycle and launch-gate engine;
- defect and root-cause-analysis governance; and
- a Prisma domain model for programs, approvals, risks, releases, audit, and benefits.

The application remains an early-stage reference implementation. Production identity, authorization, durable integrations, operational controls, and formal compliance assessment are roadmap work.

## Competencies demonstrated

| Competency | Observable evidence |
| --- | --- |
| Enterprise operating-model design | Triage, architecture, release, monitoring, automation, and governance form one lifecycle |
| Portfolio decision architecture | Explicit states, approvals, risks, benefits, and evidence freshness support governed transitions |
| Technical integration | Neutral control-plane architecture preserves Jira, GitHub, ServiceNow, CI/CD, and observability as systems of record |
| Value governance | Capacity, avoidance, redirection, delay, risk reduction, realized benefits, and cash savings remain distinct |
| Product and engineering leadership | Application, domain model, architecture catalog, flight deck, roadmap, standards, and contribution controls evolve together |

## Architecture

```mermaid
flowchart TB
  Experience[Command center and role workbenches] --> API[Validated API routes]
  API --> Domain[Lifecycle, policy, scoring, and decision services]
  Domain --> Data[(PostgreSQL through Prisma)]
  Domain --> Events[Outbox and integration events]
  Tools[Jira · GitHub · Azure DevOps · ServiceNow · CI/CD · Observability] --> Events
  Events --> Evidence[Evidence provenance and freshness]
  Evidence --> Domain
```

External systems remain authoritative for their native records. They cannot silently advance governed TARMAC state. Explore the [architecture catalog](architecture/README.md) and [diagram gallery](architecture/diagrams.md).

## Value without inflated claims

TARMAC distinguishes among:

- **capacity released** — labor time made available for other work;
- **cost avoided** — a future expense that evidence shows did not occur;
- **spend redirected** — budget deliberately moved to a higher-value use;
- **cost-of-delay reduction** — economic value from earlier outcome delivery;
- **risk-adjusted loss reduction** — expected loss reduced by a control or intervention;
- **realized business benefits** — observed movement from a defined baseline; and
- **cashable savings** — actual budget or cash reduction confirmed by Finance.

The [value model](flight-deck/08-metrics-and-value.md) and [interactive calculator](site/index.html#value) label assumptions and never convert recovered employee time into guaranteed savings.

## Repository map

```text
TARMAC/
├── app/                 Next.js reference application
├── components/          Command center and workbenches
├── prisma/              Enterprise delivery domain model
├── flight-deck/         Versioned product and operating blueprint
├── architecture/        System views, flowcharts, and ADRs
├── brand/               Identity, design tokens, and social preview
├── docs/                Metrics, governance, and product references
├── site/                Dependency-free GitHub Pages experience
├── scripts/             Documentation, site, value, and hygiene checks
└── .github/             CI, Pages, issues, RFCs, and review templates
```

## Local development

### Prerequisites

- Node.js 22+
- PostgreSQL 16+ or a compatible managed service

```bash
git clone https://github.com/PlainJane20/tarmac.git
cd tarmac
npm ci
cp .env.example .env
# Set DATABASE_URL in .env
npx prisma generate
npm run dev
```

Open `http://localhost:3000` for the Command Center and `/triage` for the RCA workbench.

### Login protection

The application uses GitHub sign-in and denies access unless the GitHub login is included in
`AUTHORIZED_GITHUB_USERS`. Configure a GitHub OAuth app with these URLs:

- Homepage URL: the deployed application URL
- Authorization callback URL: `<application-url>/api/auth/callback/github`

Set the following server-side environment variables locally and in the hosting environment:

```dotenv
AUTH_SECRET="a-random-secret-with-at-least-32-bytes"
AUTH_URL="https://your-deployed-application.example"
AUTH_GITHUB_ID="github-oauth-client-id"
AUTH_GITHUB_SECRET="github-oauth-client-secret"
AUTHORIZED_GITHUB_USERS="PlainJane20"
```

`AUTHORIZED_GITHUB_USERS` accepts a comma-separated list. If it is empty or missing, all GitHub
accounts are denied by default. Set `AUTH_URL` to the public origin in reverse-proxy environments
such as Railway so OAuth callbacks never use the container's internal address.

### Validate the foundation

```bash
npm run check:site
npm run check:docs
npm run check:value
npm run check:repo
DATABASE_URL='postgresql://tarmac:local@localhost:5432/tarmac?schema=public' npx prisma validate
npm run build
```

## Status, ownership, and license

TARMAC Foundation v0.1.0 is a personal portfolio and product-design milestone. It is not a production service and must not contain employer-confidential material, credentials, production data, or regulated information.

The repository currently remains **All Rights Reserved**. No open-source license has been selected. See [Open decisions](flight-deck/11-open-decisions.md) before publishing, accepting external contributions, or representing the project as open source.

Copyright © 2026 Navi Sohi. All rights reserved.

---

## Contact

<div align="center">

### **Navi Sohi**
*Technical Program Manager & Automation Engineer*

<br>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/navisohi/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/PlainJane20)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](https://mail.google.com/mail/?view=cm&fs=1&to=nks.ai.dev@gmail.com)

<br>

</div>
