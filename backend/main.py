from fastapi import FastAPI
from services.content_service.content_handler import router as content_router
from services.auth_service.auth_handler import router as auth_router  # Importa las rutas de autenticación
from dotenv import load_dotenv
import os

# Cargar las variables de entorno
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), 'config/.env'))

# Crear la instancia de FastAPI
app = FastAPI()

# Incluir el router del servicio de autenticación
app.include_router(auth_router, prefix="/auth", tags=["auth"])  # Ruta para autenticación

# Incluir el router del servicio de contenido
app.include_router(content_router, prefix="/content", tags=["content"])  # Ruta para el contenido

# Punto de entrada básico para verificar si la API está funcionando
@app.get("/")
async def root():
    return {"message": "Bienvenido a la API publicitaria"}

# Si estamos ejecutando directamente este archivo
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
