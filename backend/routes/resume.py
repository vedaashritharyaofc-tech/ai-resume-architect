from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import traceback
from backend.services.ai_service import generate_resume, optimize_resume

router = APIRouter()

class UserDataInput(BaseModel):
    name: str
    email: str
    phone: str
    education: str
    skills: str
    projects: str
    experience: str
    target_role: str
    job_description: Optional[str] = None

class OptimizeInput(BaseModel):
    resume_html: str
    job_description: str

@router.post("/generate-resume")
async def api_generate_resume(data: UserDataInput):
    try:
        html = await generate_resume(data.model_dump(), data.target_role)
        return {"html": html}
    except Exception as e:
        print(f"🔥 AI CRASH REASON (Generate): {str(e)}")
        # This will print the exact line number of the crash
        traceback.print_exc() 
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/optimize-resume")
async def api_optimize_resume(data: OptimizeInput):
    try:
        html = await optimize_resume(data.resume_html, data.job_description)
        return {"html": html}
    except Exception as e:
        print(f"🔥 AI CRASH REASON (Optimize): {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))