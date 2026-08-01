export function calculateValue(input) {
  const confidence = input.confidence / 100;
  const capacityHours = input.initiatives * input.hours * (input.improvement / 100);
  const capacityValue = capacityHours * input.hourlyCost * confidence;
  const delayValue = input.accelerated * input.weeks * input.weeklyValue * confidence;
  const riskValue = input.riskExposure * (input.riskReduction / 100) * confidence;
  const totalValue = capacityValue + delayValue + riskValue;
  const netValue = totalValue - input.platformCost;
  const roi = input.platformCost > 0 ? (netValue / input.platformCost) * 100 : 0;
  return { capacityHours, capacityValue, delayValue, riskValue, totalValue, netValue, roi, cashableSavings: 0 };
}
