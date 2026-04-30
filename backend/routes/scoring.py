from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.services.ai_service import score_resume

router = APIRouter()

class ScoreInput(BaseModel):
    resume_html: str
    target_role: str

@router.post("/score-resume")
async def api_score_resume(data: ScoreInput):
    try:
        score_data = await score_resume(data.resume_html, data.target_role)
        return score_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))