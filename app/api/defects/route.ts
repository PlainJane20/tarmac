import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const defectInput = z.object({
  programId: z.string().cuid(),
  testCaseId: z.string().cuid().optional(),
  title: z.string().min(5).max(240),
  severity: z.enum(["SEV1_BLOCKER", "SEV2_CRITICAL", "SEV3_MAJOR", "SEV4_MINOR"]),
  detectedAt: z.string().datetime(),
  ownerId: z.string().cuid()
});

const slaHours = { SEV1_BLOCKER: 4, SEV2_CRITICAL: 24, SEV3_MAJOR: 72, SEV4_MINOR: 120 } as const;

export async function POST(request: NextRequest) {
  const parsed = defectInput.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid defect payload", details: parsed.error.flatten() }, { status: 400 });
  }

  const defect = parsed.data;
  const requiresRca = defect.severity === "SEV1_BLOCKER" || defect.severity === "SEV2_CRITICAL";
  const slaDueAt = new Date(new Date(defect.detectedAt).getTime() + slaHours[defect.severity] * 3_600_000).toISOString();

  return NextResponse.json({
    data: {
      ...defect,
      status: "OPEN",
      slaDueAt,
      requiresRca,
      rcaTask: requiresRca ? { template: "5_WHYS", status: "PENDING" } : null
    }
  }, { status: 201 });
}
