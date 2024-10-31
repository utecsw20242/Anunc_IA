import pytest
from fastapi.testclient import TestClient
from backend.main import app 
from sqlalchemy.orm import Session
from common.database.database import get_db 
from passlib.context import CryptContext
import uuid

client = TestClient(app)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@pytest.fixture(scope="module")
def test_db():
    db = next(get_db())  # Obtén la sesión de la base de datos
    yield db  # Proporciona la sesión para las pruebas
    db.close()  # Cierra la sesión después de las pruebas

def test_register_and_login_user(test_db):
    # Genera un correo único para evitar duplicados
    unique_email = f"testuser_{uuid.uuid4()}@example.com"

    # Registro del usuario con correo único
    response = client.post("/auth/register", json={
        "nombre": "Test User",
        "email": unique_email,
        "password": "passwordTest123"
    })
    assert response.status_code == 200  
    assert "msg" in response.json()  

    response = client.post("/auth/login", json={
        "email": unique_email,
        "password": "passwordTest123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json() 
