from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from common.database.database import Base

# Modelo para el contenido generado por OpenAI
class GeneratedContent(Base):
    __tablename__ = "documents"
    
    id = Column(Integer, primary_key=True, index=True)
    prompt = Column(String, index=True)
    content = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
