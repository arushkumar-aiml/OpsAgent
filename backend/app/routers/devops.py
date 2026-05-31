from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_service import ask_groq

router = APIRouter()

class DevOpsInput(BaseModel):
    command: str
    context: str = "linux server"

@router.post("/command")
def natural_devops(data: DevOpsInput):
    system = f"""You are a DevOps expert on a {data.context}. Convert natural language requests to executable shell commands.
Provide: the exact command, explanation, warnings, and alternatives.
Return JSON with keys: command, explanation, warnings, alternatives."""
    result = ask_groq(system, data.command)
    return {"result": result}
