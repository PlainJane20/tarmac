import assert from "node:assert/strict";
import { calculateValue } from "../site/value-model.mjs";

const baseline = { initiatives: 40, hours: 100, improvement: 25, hourlyCost: 95, accelerated: 8, weeks: 2, weeklyValue: 15000, riskExposure: 250000, riskReduction: 10, confidence: 65, platformCost: 125000 };
const result = calculateValue(baseline);
assert.equal(result.capacityHours, 1000);
assert.equal(result.capacityValue, 61750);
assert.equal(result.delayValue, 156000);
assert.equal(result.riskValue, 16250);
assert.equal(result.totalValue, 234000);
assert.equal(result.netValue, 109000);
assert.equal(result.roi, 87.2);
assert.equal(result.cashableSavings, 0, "The model must never infer cashable savings.");

const zero = calculateValue({ ...baseline, initiatives: 0, accelerated: 0, riskExposure: 0, platformCost: 0 });
assert.equal(zero.totalValue, 0);
assert.equal(zero.netValue, 0);
assert.equal(zero.roi, 0);

const fullConfidence = calculateValue({ ...baseline, confidence: 100 });
assert.equal(fullConfidence.capacityValue, 95000);
assert.equal(fullConfidence.delayValue, 240000);
assert.equal(fullConfidence.riskValue, 25000);

console.log("Value model validated: baseline, zero case, confidence scaling, ROI, and cashable-savings boundary.");
