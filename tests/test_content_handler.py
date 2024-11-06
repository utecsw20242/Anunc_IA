# tests/test_content_handler.py

import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock
from backend.main import app

client = TestClient(app)

# Mockear la función generar_respuesta_openai para evitar llamadas reales a la API de OpenAI
@pytest.fixture
def mock_generar_respuesta_openai():
    with patch('backend.services.content_service.content_handler.generar_respuesta_openai', new_callable=AsyncMock) as mock_func:
        yield mock_func

def test_definir_campana(mock_generar_respuesta_openai):
    # Configura el mock para devolver una respuesta específica
    mock_generar_respuesta_openai.return_value = '{"detalles_campana": {"objetivo_campana": {"objetivo": "Incrementar ventas", "explicacion": "Es el objetivo principal..."}}}'
    
    data = {
        "nombreProducto": "Producto de prueba",
        "descripcionProducto": "Descripción del producto de prueba",
        "tipoCampana": "Tipo de campaña de prueba",
        "duracionPreferida": "1 mes"
    }
    response = client.post("/content/definir_campana", json=data)
    assert response.status_code == 200
    json_response = response.json()
    assert "detalles_campana" in json_response

def test_definir_publico_ubicaciones(mock_generar_respuesta_openai):
    mock_generar_respuesta_openai.return_value = '{"publico_objetivo": {"demografico": {"edad": "18-35", "genero": "Todos", "ubicaciones": [{"distrito": "Miraflores", "provincia": "Lima", "departamento": "Lima"}], "otros": "N/A"}, "psicografico": {"intereses": "Tecnología", "comportamientos": "Compras en línea"}}, "ubicaciones_anuncios": {"ubicaciones_seleccionadas": ["Facebook", "Instagram"], "justificacion": "Mayor alcance en estas plataformas"}}'

    data = {
        "nombreProducto": "Producto de prueba",
        "descripcionProducto": "Descripción del producto",
        "distrito": "Miraflores",
        "provincia": "Lima",
        "departamento": "Lima"
    }
    response = client.post("/content/definir_publico_ubicaciones", json=data)
    assert response.status_code == 200
    json_response = response.json()
    assert "publico_objetivo" in json_response

def test_elegir_formato_cta(mock_generar_respuesta_openai):
    mock_generar_respuesta_openai.return_value = '{"formato_anuncio": {"formato": "Anuncios en carrusel", "explicacion": "Permite mostrar múltiples productos."}, "cta": {"llamada_a_la_accion": "Comprar", "explicacion": "Incentiva la acción de compra."}}'

    data = {
        "nombreProducto": "Producto de prueba",
        "descripcionProducto": "Descripción breve"
    }
    response = client.post("/content/elegir_formato_cta", json=data)
    assert response.status_code == 200
    json_response = response.json()
    assert "formato_anuncio" in json_response

def test_crear_contenido_creativo(mock_generar_respuesta_openai):
    mock_generar_respuesta_openai.return_value = '{"variaciones": [{"titulo": "Título 1", "contenido": "Contenido 1"}, {"titulo": "Título 2", "contenido": "Contenido 2"}, {"titulo": "Título 3", "contenido": "Contenido 3"}]}'

    data = {
        "nombreProducto": "Producto de prueba",
        "descripcionProducto": "Descripción del producto",
        "tonoEstilo": "Moderno y atractivo",
        "publicoObjetivo": "Jóvenes interesados en tecnología"
    }
    response = client.post("/content/crear_contenido_creativo", json=data)
    assert response.status_code == 200
    json_response = response.json()
    assert "variaciones" in json_response

def test_create_heading(mock_generar_respuesta_openai):
    mock_generar_respuesta_openai.return_value = '{"encabezados": ["Encabezado 1", "Encabezado 2", "Encabezado 3"]}'

    data = {
        "nombreProducto": "Producto de prueba",
        "descripcionProducto": "Un producto innovador para mejorar la productividad",
        "palabrasClave": ["eficiencia", "tecnología", "innovación"],
        "estiloEscritura": "Profesional",
        "longitudMaxima": 60,
        "variantes": 3
    }
    response = client.post("/content/create_heading", json=data)
    assert response.status_code == 200
    json_response = response.json()
    assert "encabezados" in json_response
