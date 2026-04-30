from sqlalchemy import Column, Integer, String, Text, ForeignKey
from backend.database import Base

class Resume(Base):
    __tablename__ = "resumes"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    target_role = Column(String)
    html_content = Column(Text)