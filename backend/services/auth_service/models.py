from sqlalchemy import Column, Integer, String, DateTime, Float
from datetime import datetime, timezone  # Incluye timezone si lo usas
from common.database.database import Base  # Asegúrate de que la ruta es correcta

class Usuario(Base):
    __tablename__ = "usuarios"

    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    contraseña = Column(String)
    fecha_registro = Column(DateTime, default=datetime.now(timezone.utc))  # Usa la versión que prefieras

class Tracking(Base):  # Mantén esta clase si la necesitas
    __tablename__ = "tracking"

    TraceId = Column(Integer, primary_key=True, index=True)
    UserId = Column(Integer, nullable=False)
    Route = Column(String, nullable=False)
    HttpStatusCode = Column(Integer, nullable=False)
    StartDate = Column(DateTime, nullable=False)
    EndDate = Column(DateTime, nullable=False)
    Latency = Column(Float, nullable=False)
