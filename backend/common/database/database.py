import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv  # Asegúrate de cargar dotenv

# Cargar las variables de entorno desde el archivo .env
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

# Obtener la URL de la base de datos
DATABASE_URL = os.getenv("DATABASE_URL")

# Verificar si se ha cargado correctamente la URL de la base de datos
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL no está definida. Asegúrate de tener un archivo .env correctamente configurado.")

# Crear el motor y la sesión de SQLAlchemy
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

print(f"DATABASE_URL: {DATABASE_URL}")

# Dependencia para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
