import { NextRequest, NextResponse } from "next/server";
import { askGroq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { command, context } = await req.json();
    const result = await askGroq(
      `You are a DevOps expert on ${context}. Convert natural language to shell command. Return JSON with keys: command, explanation, warnings, alternatives.`,
      command
    );
    return NextResponse.json({ result });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
