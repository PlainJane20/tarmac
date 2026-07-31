import { NextRequest, NextResponse } from "next/server";
import { transitionInput, validateTransition } from "@/lib/lifecycle";

export async function POST(request: NextRequest) {
  const parsed = transitionInput.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid transition payload", details: parsed.error.flatten() }, { status: 400 });
  const result = validateTransition(parsed.data);
  return NextResponse.json(result, { status: result.allowed ? 200 : 409 });
}
