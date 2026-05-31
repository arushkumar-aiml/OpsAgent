import { NextRequest, NextResponse } from "next/server";
import { askGroq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { transcript } = await req.json();
    const result = await askGroq(
      "You are an expert meeting analyst. Extract decisions, action items with owners, blockers, and a summary. Return JSON with keys: summary, decisions, action_items, blockers.",
      transcript
    );
    return NextResponse.json({ result });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
