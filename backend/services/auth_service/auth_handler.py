from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from common.database.database import get_db
from .models import Usuario
from .security import verify_password, get_password_hash, create_access_token
from datetime import timedelta
from datetime import datetime
from common.utils.tracking_helper import TrackingHelper


router = APIRouter()

# Modelos para la solicitud de registro y login
class RegisterRequest(BaseModel):
    nombre: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/register")
async def register_user(request: RegisterRequest, db: Session = Depends(get_db)):
    # Inicia el tiempo de la solicitud
    start_date = datetime.utcnow()
    http_status_code = 200  # Código de estado por defecto
    user_id = None  # Asignado después de la creación del usuario
    tracking_helper = TrackingHelper(db)

    try:
        # Verificar si el email ya está registrado
        existing_user = db.query(Usuario).filter(Usuario.email == request.email).first()
        if existing_user:
            http_status_code = 400
            raise HTTPException(status_code=http_status_code, detail="El email ya está registrado")

        # Registrar el usuario si no existe
        hashed_password = get_password_hash(request.password)
        usuario = Usuario(nombre=request.nombre, email=request.email, contraseña=hashed_password)
        db.add(usuario)
        db.commit()
        db.refresh(usuario)
        user_id = usuario.id_usuario  # Guarda el ID del usuario recién creado
        return {"msg": "Usuario registrado con éxito"}

    except HTTPException as e:
        # Captura el código de estado en caso de excepción HTTP
        http_status_code = e.status_code
        raise e

    except Exception as e:
        # En caso de error inesperado
        http_status_code = 500
        raise HTTPException(status_code=http_status_code, detail="Error en el registro del usuario")

    finally:
        # Finaliza el tiempo de la solicitud y registra la métrica
        end_date = datetime.utcnow()
        
        # Registrar la métrica solo si hay un user_id, o asigna un valor por defecto (e.g., 0 o -1)
        tracking_helper.create_metric(user_id if user_id is not None else -1, "/auth/register", http_status_code, start_date, end_date)




# Inicio de sesión (Login)
@router.post("/login")
async def login_user(request: LoginRequest, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.email == request.email).first()
    if not usuario or not verify_password(request.password, usuario.contraseña):
        raise HTTPException(status_code=400, detail="Email o contraseña incorrectos")

    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(data={"sub": usuario.email}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}
