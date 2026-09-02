import { describe, it, expect } from "vitest";
import { validateTransition, calculateSri, calculateBlastRadius, lifecycleStages } from "./lifecycle";

const baseInput = {
  programId: "clh3am1ny0000c1b2h8f8g9e0",
  openSev1Or2: 0,
  unapprovedRcas: 0,
  pendingRequiredApprovals: 0,
  hasActiveWaiver: false,
};

describe("validateTransition", () => {
  it("allows a clean single-stage advance", () => {
    const result = validateTransition({
      ...baseInput,
      currentStage: "INTAKE",
      targetStage: "DISCOVERY",
    });
    expect(result).toEqual({ allowed: true, reasons: [] });
  });

  it("blocks a skipped stage (advancing more than one step)", () => {
    const result = validateTransition({
      ...baseInput,
      currentStage: "INTAKE",
      targetStage: "PRD_REVIEW",
    });
    expect(result.allowed).toBe(false);
    expect(result.reasons).toContain("Lifecycle transitions must advance exactly one stage.");
  });

  it("blocks a backward transition", () => {
    const result = validateTransition({
      ...baseInput,
      currentStage: "EXECUTION",
      targetStage: "PLANNING",
    });
    expect(result.allowed).toBe(false);
    expect(result.reasons).toContain("Lifecycle transitions must advance exactly one stage.");
  });

  it("blocks when required approvals are pending and there is no waiver", () => {
    const result = validateTransition({
      ...baseInput,
      currentStage: "PLANNING",
      targetStage: "EXECUTION",
      pendingRequiredApprovals: 2,
    });
    expect(result.allowed).toBe(false);
    expect(result.reasons).toContain("Required digital approvals are still pending.");
  });

  it("allows pending approvals through when an active waiver covers them", () => {
    const result = validateTransition({
      ...baseInput,
      currentStage: "PLANNING",
      targetStage: "EXECUTION",
      pendingRequiredApprovals: 2,
      hasActiveWaiver: true,
    });
    expect(result.allowed).toBe(true);
  });

  it("blocks LAUNCH_READY when open SEV1/SEV2 defects exist", () => {
    const result = validateTransition({
      ...baseInput,
      currentStage: "UAT",
      targetStage: "LAUNCH_READY",
      openSev1Or2: 1,
    });
    expect(result.allowed).toBe(false);
    expect(result.reasons).toContain("Open SEV1/SEV2 defects block launch readiness.");
  });

  it("blocks LAUNCH_READY when RCAs are unapproved", () => {
    const result = validateTransition({
      ...baseInput,
      currentStage: "UAT",
      targetStage: "LAUNCH_READY",
      unapprovedRcas: 1,
    });
    expect(result.allowed).toBe(false);
    expect(result.reasons).toContain("Unapproved RCA actions block launch readiness.");
  });

  it("does not apply LAUNCH_READY-specific gates to other stages", () => {
    const result = validateTransition({
      ...baseInput,
      currentStage: "EXECUTION",
      targetStage: "UAT",
      openSev1Or2: 5,
      unapprovedRcas: 5,
    });
    expect(result.allowed).toBe(true);
  });

  it("accumulates multiple simultaneous blocking reasons", () => {
    const result = validateTransition({
      ...baseInput,
      currentStage: "UAT",
      targetStage: "LAUNCH_READY",
      openSev1Or2: 1,
      unapprovedRcas: 1,
      pendingRequiredApprovals: 1,
    });
    expect(result.allowed).toBe(false);
    expect(result.reasons).toHaveLength(3);
  });

  it("covers every declared lifecycle stage as a valid single-step transition", () => {
    for (let i = 0; i < lifecycleStages.length - 1; i++) {
      const result = validateTransition({
        ...baseInput,
        currentStage: lifecycleStages[i],
        targetStage: lifecycleStages[i + 1],
      });
      expect(result.allowed).toBe(true);
    }
  });
});

describe("calculateSri", () => {
  it("weights business impact, blast radius, and strategic ROI per the documented formula", () => {
    const sri = calculateSri({
      businessImpact: 100,
      blastRadius: 100,
      strategicRoi: 100,
      engineeringEffort: 10,
      confidence: 100,
    });
    // weightedValue = 100*0.35 + 100*0.3 + 100*0.2 = 85; effort factor = 10*0.15 = 1.5
    // sri = (85 / 1.5) * 1.0 = 56.666... -> rounded to 2 decimals
    expect(sri).toBeCloseTo(56.67, 2);
  });

  it("defaults confidence to 100% when omitted", () => {
    const withDefault = calculateSri({ businessImpact: 50, blastRadius: 50, strategicRoi: 50, engineeringEffort: 5 });
    const withExplicit100 = calculateSri({ businessImpact: 50, blastRadius: 50, strategicRoi: 50, engineeringEffort: 5, confidence: 100 });
    expect(withDefault).toBe(withExplicit100);
  });

  it("scales down proportionally with lower confidence", () => {
    const full = calculateSri({ businessImpact: 80, blastRadius: 80, strategicRoi: 80, engineeringEffort: 8, confidence: 100 });
    const half = calculateSri({ businessImpact: 80, blastRadius: 80, strategicRoi: 80, engineeringEffort: 8, confidence: 50 });
    // Both values are independently rounded to 2 decimals, so allow for
    // rounding drift at that boundary rather than requiring exact equality.
    expect(half).toBeCloseTo(full / 2, 1);
  });

  it("floors engineering effort at 1 to avoid division blow-up or by-zero", () => {
    const zeroEffort = calculateSri({ businessImpact: 10, blastRadius: 10, strategicRoi: 10, engineeringEffort: 0 });
    const oneEffort = calculateSri({ businessImpact: 10, blastRadius: 10, strategicRoi: 10, engineeringEffort: 1 });
    expect(zeroEffort).toBe(oneEffort);
    expect(Number.isFinite(zeroEffort)).toBe(true);
  });

  it("handles negative engineering effort the same as the floor (documents current behavior)", () => {
    const negativeEffort = calculateSri({ businessImpact: 10, blastRadius: 10, strategicRoi: 10, engineeringEffort: -5 });
    const flooredEffort = calculateSri({ businessImpact: 10, blastRadius: 10, strategicRoi: 10, engineeringEffort: 1 });
    expect(negativeEffort).toBe(flooredEffort);
  });
});

describe("calculateBlastRadius", () => {
  it("multiplies business units, daily active users, and criticality tier", () => {
    expect(calculateBlastRadius(3, 1000, 2)).toBe(6000);
  });

  it("returns zero when any factor is zero", () => {
    expect(calculateBlastRadius(0, 1000, 2)).toBe(0);
    expect(calculateBlastRadius(3, 0, 2)).toBe(0);
    expect(calculateBlastRadius(3, 1000, 0)).toBe(0);
  });
});
