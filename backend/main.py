from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.content_service.content_handler import router as content_router
from services.auth_service.auth_handler import router as auth_router
from dotenv import load_dotenv
import os
from mangum import Mangum  # Importar Mangum para Lambda

# Cargar las variables de entorno
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

# Crear la instancia de FastAPI
app = FastAPI(debug=True)

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Cambia esto a la URL de producción cuando despliegues
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Incluir el router del servicio de autenticación
app.include_router(auth_router, prefix="/auth", tags=["auth"])

# Incluir el router del servicio de contenido
app.include_router(content_router, prefix="/content", tags=["content"])

# Punto de entrada básico para verificar si la API está funcionando
@app.get("/")
async def root():
    return {"message": "Bienvenido a la API publicitaria"}

# Adaptador Mangum para ejecutar en AWS Lambda
handler = Mangum(app)

# Este bloque solo es necesario si deseas ejecutar la aplicación localmente con Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
