import pytest
from fastapi.testclient import TestClient
from backend.main import app  # Importa la app desde main.py en la carpeta backend
from sqlalchemy.orm import Session
from common.database.database import get_db  # Ruta corregida a common/database/database.py
from passlib.context import CryptContext
import uuid

client = TestClient(app)

# Contexto para manejar el hashing de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Fixture para configurar la sesión de la base de datos sin crear un usuario
@pytest.fixture(scope="module")
def test_db():
    db = next(get_db())  # Obtén la sesión de la base de datos
    yield db  # Proporciona la sesión para las pruebas
    db.close()  # Cierra la sesión después de las pruebas

# Prueba dinámica para registro e inicio de sesión de un usuario
def test_register_and_login_user(test_db):
    # Genera un correo único para evitar duplicados
    unique_email = f"testuser_{uuid.uuid4()}@example.com"

    # Registro del usuario con correo único
    response = client.post("/auth/register", json={
        "nombre": "Test User",
        "email": unique_email,
        "password": "passwordTest123"
    })
    assert response.status_code == 200  # Cambia a 200 o el código esperado en tu API
    assert "msg" in response.json()  # Verifica que el mensaje de éxito esté en la respuesta

    # Inicio de sesión con el usuario registrado
    response = client.post("/auth/login", json={
        "email": unique_email,
        "password": "passwordTest123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()  # Verifica que el token esté en la respuesta de login
