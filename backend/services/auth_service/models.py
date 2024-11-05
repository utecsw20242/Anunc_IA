from sqlalchemy import Column, Integer, String, DateTime
from common.database.database import Base
from datetime import datetime, timezone

class Usuario(Base):
    __tablename__ = "usuarios"

    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    contraseña = Column(String)
    fecha_registro = Column(DateTime, default=datetime.now(timezone.utc))
