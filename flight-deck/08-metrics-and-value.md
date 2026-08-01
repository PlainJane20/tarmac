# 08 — Metrics and value realization

## Measurement policy

Every number is one of the following:

- **Observed:** calculated from traceable source records.
- **Estimated:** forecast from observed data using a documented method.
- **Modeled:** scenario output based on chosen assumptions.
- **Hypothesis:** an improvement range to test in a pilot.
- **Target:** a desired future threshold, not a result.

The product site uses modeled scenarios and hypotheses only.

## Seven value categories

| Category | Definition | Proof required |
| --- | --- | --- |
| Capacity released | labor time made available for other work | baseline/actual effort and verified redeployment |
| Cost avoided | future expense that evidence shows did not occur | credible counterfactual and approved avoidance |
| Spend redirected | existing budget moved to a higher-value use | finance-approved reallocation |
| Cost-of-delay reduction | value captured by delivering an outcome earlier | delay duration and economic value curve |
| Risk-adjusted loss reduction | expected loss reduced by an intervention | probability, impact, control effect, confidence |
| Realized business benefits | observed movement from baseline toward target | owned metric actuals and attribution rationale |
| Cashable savings | actual reduction in cash or approved budget | Finance confirmation and ledger/budget evidence |

Capacity released is not automatically a cost saving. It becomes realized value only through evidenced redeployment, avoidance, or financial reduction.

## Modeled calculator

```text
capacity hours = initiatives × baseline hours × improvement hypothesis
capacity value = capacity hours × blended hourly cost
confidence-adjusted capacity = capacity value × confidence
cost-of-delay value = accelerated initiatives × weeks accelerated × value per week × confidence
risk reduction = annual risk exposure × modeled reduction × confidence
total modeled value = adjusted capacity + delay value + risk reduction
net modeled value = total modeled value − annual platform cost
modeled ROI = net modeled value ÷ annual platform cost
```

The calculator reports each category separately and never labels the total “savings.”

## DORA software delivery metrics

The current DORA model includes five measures, grouped into throughput and instability:

### Throughput

- Change lead time
- Deployment frequency
- Failed deployment recovery time

### Instability

- Change fail rate
- Deployment rework rate

Use them at the application or service level and improve performance over time. Do not rank unlike teams or turn one metric into a target that invites gaming. See DORA's [official five-metric guide](https://dora.dev/guides/dora-metrics/) and [metric history](https://dora.dev/insights/dora-metrics-history/).

## TARMAC decision metrics

- intake lead time and completeness;
- architecture decision cycle time and reopened findings;
- approval aging and evidence rejection rate;
- late dependency discovery;
- release readiness by status, never percentage alone;
- evidence preparation and audit preparation effort;
- benefit reviews completed on schedule; and
- evidence freshness and source coverage.

Full definitions live in the [metric catalog](../docs/metrics/catalog.md).

## Pilot method

Capture baselines before automation. Compare like-for-like cohorts. Publish sample size and exclusions. Use medians and percentiles for elapsed time. Pair speed metrics with quality guardrails. Have Finance review any translation to cash or budget impact.

## Claim standard

An observed public claim identifies timeframe, sample, baseline, result, method version, source coverage, and material confounders. Without those, label the number modeled, hypothesis, or target.
