from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_service import ask_groq

router = APIRouter()

class MeetingInput(BaseModel):
    transcript: str

@router.post("/analyze")
def analyze_meeting(data: MeetingInput):
    system = """You are an expert meeting analyst. Given a meeting transcript, extract:
1. Key decisions made
2. Action items with owners
3. Blockers mentioned
4. Summary (3-5 sentences)
Return as structured JSON with keys: summary, decisions, action_items, blockers."""
    result = ask_groq(system, data.transcript)
    return {"result": result}
