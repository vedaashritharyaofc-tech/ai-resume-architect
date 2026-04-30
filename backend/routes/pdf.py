from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from backend.services.pdf_service import generate_pdf_from_html

router = APIRouter()

class PDFInput(BaseModel):
    html_content: str

@router.post("/download-pdf")
async def api_download_pdf(data: PDFInput):
    try:
        pdf_buffer = generate_pdf_from_html(data.html_content)
        return StreamingResponse(
            pdf_buffer, 
            media_type="application/pdf", 
            headers={"Content-Disposition": "attachment; filename=AI_Generated_Resume.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))