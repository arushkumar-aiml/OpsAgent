from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_service import ask_groq

router = APIRouter()

class IncidentInput(BaseModel):
    logs: str
    service: str = "unknown"

@router.post("/explain")
def explain_incident(data: IncidentInput):
    system = f"""You are a senior SRE (Site Reliability Engineer). Given error logs from {data.service}, explain:
1. Root cause in plain English
2. What went wrong technically
3. Immediate fix steps
4. Long-term prevention
Return JSON with keys: root_cause, technical_explanation, immediate_fix, prevention."""
    result = ask_groq(system, data.logs)
    return {"result": result}
