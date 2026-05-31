import { NextRequest, NextResponse } from "next/server";
import { askGroq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { logs, service } = await req.json();
    const result = await askGroq(
      `You are a senior SRE. Analyze logs from ${service}. Return JSON with keys: root_cause, technical_explanation, immediate_fix, prevention.`,
      logs
    );
    return NextResponse.json({ result });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
