from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import meeting, sprint, pr_review, incident, devops

app = FastAPI(title="OpsAgent API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(meeting.router, prefix="/api/meeting", tags=["Meeting"])
app.include_router(sprint.router, prefix="/api/sprint", tags=["Sprint"])
app.include_router(pr_review.router, prefix="/api/pr", tags=["PR Review"])
app.include_router(incident.router, prefix="/api/incident", tags=["Incident"])
app.include_router(devops.router, prefix="/api/devops", tags=["DevOps"])

@app.get("/")
def root():
    return {"status": "OpsAgent API is live 🚀"}
