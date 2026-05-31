import { NextRequest, NextResponse } from "next/server";
import { askGroq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { diff, language } = await req.json();
    const result = await askGroq(
      `You are a senior ${language} engineer. Review this git diff. Return JSON with keys: summary, bugs, security, performance, score, suggestions.`,
      diff
    );
    return NextResponse.json({ result });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
