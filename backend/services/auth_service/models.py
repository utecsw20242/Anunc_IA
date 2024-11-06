from sqlalchemy import Column, Integer, String, DateTime, Float
from datetime import datetime
from common.database.database import Base  # Asegúrate de que la ruta es correcta

class Usuario(Base):
    __tablename__ = "usuarios"

    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    contraseña = Column(String)
    fecha_registro = Column(DateTime, default=datetime.utcnow)

class Tracking(Base):
    __tablename__ = "tracking"

    TraceId = Column(Integer, primary_key=True, index=True)
    UserId = Column(Integer, nullable=False)
    Route = Column(String, nullable=False)
    HttpStatusCode = Column(Integer, nullable=False)
    StartDate = Column(DateTime, nullable=False)
    EndDate = Column(DateTime, nullable=False)
    Latency = Column(Float, nullable=False)
