import { z } from "zod";

export const lifecycleStages = [
  "INTAKE", "DISCOVERY", "BRD_REVIEW", "PRD_REVIEW", "ARCHITECTURE_REVIEW",
  "PLANNING", "EXECUTION", "UAT", "LAUNCH_READY", "LAUNCH", "HYPERCARE", "CLOSED"
] as const;
export type LifecycleStage = (typeof lifecycleStages)[number];

export const transitionInput = z.object({
  programId: z.string().cuid(),
  currentStage: z.enum(lifecycleStages),
  targetStage: z.enum(lifecycleStages),
  openSev1Or2: z.number().int().nonnegative(),
  unapprovedRcas: z.number().int().nonnegative(),
  pendingRequiredApprovals: z.number().int().nonnegative(),
  hasActiveWaiver: z.boolean().default(false)
});

export type TransitionInput = z.infer<typeof transitionInput>;
export type GateResult = { allowed: boolean; reasons: string[] };

const stageOrder = new Map(lifecycleStages.map((stage, i) => [stage, i]));

export function validateTransition(input: TransitionInput): GateResult {
  const reasons: string[] = [];
  const current = stageOrder.get(input.currentStage)!;
  const target = stageOrder.get(input.targetStage)!;
  if (target !== current + 1) reasons.push("Lifecycle transitions must advance exactly one stage.");
  if (input.pendingRequiredApprovals && !input.hasActiveWaiver) reasons.push("Required digital approvals are still pending.");
  if (input.targetStage === "LAUNCH_READY") {
    if (input.openSev1Or2) reasons.push("Open SEV1/SEV2 defects block launch readiness.");
    if (input.unapprovedRcas) reasons.push("Unapproved RCA actions block launch readiness.");
  }
  return { allowed: reasons.length === 0, reasons };
}

export function calculateSri(input: {
  businessImpact: number; blastRadius: number; strategicRoi: number; engineeringEffort: number; confidence?: number;
}) {
  const effort = Math.max(1, input.engineeringEffort);
  const weightedValue = input.businessImpact * 0.35 + input.blastRadius * 0.3 + input.strategicRoi * 0.2;
  const confidence = (input.confidence ?? 100) / 100;
  return Math.round((weightedValue / (effort * 0.15)) * confidence * 100) / 100;
}

export function calculateBlastRadius(businessUnits: number, dailyActiveUsers: number, criticalityTier: number) {
  return businessUnits * dailyActiveUsers * criticalityTier;
}
