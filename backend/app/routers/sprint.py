from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_service import ask_groq

router = APIRouter()

class SprintInput(BaseModel):
    goals: str
    team_size: int
    duration_days: int

@router.post("/plan")
def plan_sprint(data: SprintInput):
    system = """You are a senior agile coach. Given sprint goals, team size, and duration, generate a complete sprint plan.
Include: epic breakdown, user stories, story points, priority order, and daily task suggestions.
Return structured JSON with keys: epics, stories, daily_plan, risk_flags."""
    prompt = f"Goals: {data.goals}\nTeam size: {data.team_size}\nDuration: {data.duration_days} days"
    result = ask_groq(system, prompt)
    return {"result": result}
