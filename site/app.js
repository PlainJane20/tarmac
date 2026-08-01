import { calculateValue } from "./value-model.mjs";

document.documentElement.classList.add("js");

const pillars = [
  { letter: "T", title: "Accept demand into portfolio assessment", copy: "Clarify intended outcome, sponsor authority, urgency, feasibility, initial risk, and baseline plan before significant delivery capacity is committed.", owner: "ITPMO lead", evidence: "Outcome premise · sponsor · initial risk · baseline", feedback: "Reason, conditions, owner, and next review", automation: "Checks completeness, calculates explainable priority, routes the decision, and starts the SLA.", governance: "Applies intake policy, data classification, sponsor authority, and risk-tier requirements." },
  { letter: "A", title: "Approve the solution direction", copy: "Resolve material requirements, reusable patterns, integration and data choices, security/privacy risks, non-functional needs, and architecture decisions before commitment becomes expensive.", owner: "Enterprise or solution architect", evidence: "Requirements · ADRs · threats · data · dependencies · NFRs", feedback: "Approved direction, conditions, findings, and review triggers", automation: "Assembles source evidence, detects missing decisions, routes reviewers, and tracks architecture SLA.", governance: "Applies architecture standards, separation of duties, risk ownership, and decision-retention policy." },
  { letter: "R", title: "Authorize or block production release", copy: "Evaluate quality, security, operations, change, support, approval, and waiver readiness without allowing an aggregate score to conceal a blocker.", owner: "Release authority", evidence: "Test · security · deployment · operations · change · support", feedback: "Authorization, blockers, conditions, accepted risk, and audit event", automation: "Verifies evidence freshness, evaluates deterministic gates, gathers provenance, and publishes the governed result.", governance: "Applies release policy, approver authority, waiver scope/expiry, and retained rationale." },
  { letter: "M", title: "Stabilize service and evaluate impact", copy: "Connect deployments, service health, incidents, adoption, control drift, and business outcomes to the next operational or portfolio intervention.", owner: "Service owner and benefit owner", evidence: "SLOs · incidents · adoption · support · benefit actuals", feedback: "Intervention, corrective action, benefit variance, or new triage demand", automation: "Correlates releases and signals, updates evidence freshness, alerts accountable owners, and starts feedback workflows.", governance: "Applies incident, retention, outcome-review, control-drift, and benefit-closure policy." }
];

const pillarButtons = [...document.querySelectorAll("[data-pillar]")];
function selectPillar(index) {
  const item = pillars[index];
  pillarButtons.forEach((button, buttonIndex) => { button.setAttribute("aria-selected", String(index === buttonIndex)); button.tabIndex = index === buttonIndex ? 0 : -1; });
  document.querySelector("[data-pillar-letter]").textContent = item.letter;
  document.querySelector("[data-pillar-title]").textContent = item.title;
  document.querySelector("[data-pillar-copy]").textContent = item.copy;
  document.querySelector("[data-pillar-owner]").textContent = item.owner;
  document.querySelector("[data-pillar-evidence]").textContent = item.evidence;
  document.querySelector("[data-pillar-feedback]").textContent = item.feedback;
  document.querySelector("[data-auto]").textContent = item.automation;
  document.querySelector("[data-governance]").textContent = item.governance;
}
pillarButtons.forEach((button, index) => {
  button.addEventListener("click", () => selectPillar(index));
  button.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % pillarButtons.length;
    if (event.key === "ArrowLeft") next = (index - 1 + pillarButtons.length) % pillarButtons.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = pillarButtons.length - 1;
    selectPillar(next);
    pillarButtons[next].focus();
  });
});

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const integer = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const calculator = document.querySelector("[data-calculator]");
function updateCalculator() {
  const form = calculator.querySelector("form");
  const input = Object.fromEntries([...new FormData(form)].map(([key, value]) => [key, Number(value)]));
  for (const [key, value] of Object.entries(input)) {
    const target = document.querySelector(`[data-output="${key}"]`);
    if (!target) continue;
    if (["improvement", "riskReduction", "confidence"].includes(key)) target.textContent = `${value}%`;
    else if (["hourlyCost", "weeklyValue", "riskExposure", "platformCost"].includes(key)) target.textContent = money.format(value);
    else target.textContent = integer.format(value);
  }
  const result = calculateValue(input);
  document.querySelector('[data-result="total"]').textContent = money.format(result.totalValue);
  document.querySelector('[data-result="hours"]').textContent = `${integer.format(result.capacityHours)} hours`;
  document.querySelector('[data-result="capacity"]').textContent = `${money.format(result.capacityValue)} modeled value`;
  document.querySelector('[data-result="delay"]').textContent = money.format(result.delayValue);
  document.querySelector('[data-result="risk"]').textContent = money.format(result.riskValue);
  document.querySelector('[data-result="net"]').textContent = money.format(result.netValue);
  document.querySelector('[data-result="roi"]').textContent = `${result.roi.toFixed(1)}% modeled ROI`;
}
calculator.addEventListener("input", updateCalculator);
updateCalculator();

const observer = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
}, { threshold: 0.08 });
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
