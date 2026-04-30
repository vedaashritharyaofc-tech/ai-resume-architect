from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database import engine, Base
from backend.routes import resume, scoring, pdf

# Initialize DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Resume Platform API")

# Configure CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Change to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(resume.router, prefix="/api", tags=["Resume"])
app.include_router(scoring.router, prefix="/api", tags=["Scoring"])
app.include_router(pdf.router, prefix="/api", tags=["PDF"])

@app.get("/")
def read_root():
    return {"status": "Backend is running successfully!"}