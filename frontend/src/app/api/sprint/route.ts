import { NextRequest, NextResponse } from "next/server";
import { askGroq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { goals, team_size, duration_days } = await req.json();
    const result = await askGroq(
      "You are a senior agile coach. Generate a complete sprint plan with epics, user stories, story points, daily plan. Return JSON with keys: epics, stories, daily_plan, risk_flags.",
      `Goals: ${goals}\nTeam size: ${team_size}\nDuration: ${duration_days} days`
    );
    return NextResponse.json({ result });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
