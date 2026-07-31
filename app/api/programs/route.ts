import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { calculateBlastRadius, calculateSri } from "@/lib/lifecycle";

const createProgram = z.object({
  title: z.string().min(3).max(160), sponsorId: z.string().cuid(), itPgmId: z.string().cuid(),
  estimatedBudget: z.number().nonnegative(), targetLaunchWindow: z.string().datetime().optional(),
  businessImpact: z.number().int().min(1).max(5), strategicRoi: z.number().int().min(1).max(5),
  engineeringEffort: z.number().int().min(1).max(5), impactedBusinessUnits: z.number().int().min(1),
  dailyActiveUsers: z.number().int().min(0), criticalityTier: z.number().int().min(1).max(5)
});

export async function POST(request: NextRequest) {
  const parsed = createProgram.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid program payload", details: parsed.error.flatten() }, { status: 400 });
  const data = parsed.data;
  const blastRadius = calculateBlastRadius(data.impactedBusinessUnits, data.dailyActiveUsers, data.criticalityTier);
  const sri = calculateSri({ ...data, blastRadius });
  // Persist through Prisma in the service layer; this boundary stays deterministic and integration-safe.
  return NextResponse.json({ data: { ...data, blastRadius, sri } }, { status: 201 });
}
