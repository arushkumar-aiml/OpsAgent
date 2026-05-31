from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_service import ask_groq

router = APIRouter()

class PRInput(BaseModel):
    diff: str
    language: str = "python"

@router.post("/review")
def review_pr(data: PRInput):
    system = f"""You are a senior {data.language} engineer doing a code review. Analyze the git diff and provide:
1. Summary of changes
2. Bugs or potential issues
3. Security concerns
4. Performance improvements
5. Code quality score (1-10)
Return as JSON with keys: summary, bugs, security, performance, score, suggestions."""
    result = ask_groq(system, data.diff)
    return {"result": result}
