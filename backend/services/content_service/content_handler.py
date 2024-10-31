from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import os
from openai import OpenAI
from dotenv import load_dotenv
from common.middlewares.auth_middleware import get_current_user  # Middleware de autenticación

# Cargar las variables de entorno desde el archivo .env en la carpeta config
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

# Crear una instancia del cliente de OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Crear el router de FastAPI
router = APIRouter()

# Modelo Pydantic
class CopiaPublicitaria(BaseModel):
    nombreProducto: str
    descripcionProducto: str
    publicoObjetivo: str = None

# Modelo Pydantic para encabezado de anuncio
class EncabezadoAnuncio(BaseModel):
    nombreProducto: str
    descripcionProducto: str
    palabrasClave: str
    estiloEscritura: str
    longitudMaxima: int
    variantes: int = 3  # Número de variantes a generar

# Endpoint para generar 5 variaciones de Copias Publicitarias y Audiencia
# Ahora está protegido por JWT
@router.post("/generar_copias_publicitarias_y_audiencia/")
async def generar_copias_publicitarias_y_audiencia(copia: CopiaPublicitaria, current_user: str = Depends(get_current_user)):
    # Crear el prompt para la generación de 5 variaciones de copias publicitarias
    prompt = f"""
Eres Autotarget, un modelo de lenguaje especializado en generar copias publicitarias persuasivas y creativas. Te enfocarás en capturar los puntos de venta únicos del producto, involucrar emocionalmente al público objetivo y motivarlos a tomar acción (por ejemplo, comprar, registrarse o solicitar más información). Tus respuestas deben ser claras, concisas y persuasivas, utilizando titulares llamativos y textos optimizados para varias plataformas publicitarias como redes sociales, email y páginas de destino.

Directrices:
1. Conciencia de la Audiencia: Adapta el tono y estilo según el público objetivo, que puede variar desde casual y moderno para audiencias jóvenes hasta profesional y autoritario para contextos de negocios.

2. Técnicas Persuasivas:
- Usa apelaciones emocionales (felicidad, emoción, urgencia, etc.).
- Destaca beneficios sobre características, enfatizando el problema que el producto resuelve.
- Incluye llamadas a la acción que inspiren urgencia o curiosidad (por ejemplo, "¡Obtén el tuyo ahora!", "¡Descubre el futuro hoy!").

3. Creatividad: Infunde creatividad en la redacción, especialmente para productos innovadores o disruptivos. Utiliza metáforas, eslóganes o frases pegajosas para hacer que el producto sea memorable.

4. Tono y Estilo: Adapta el tono para que coincida con el tipo de producto y la voz de la marca. Ejemplos incluyen:
- Juguetón y optimista para marcas de estilo de vida.
- Confiable e informativo para servicios financieros.
- Elegante y enfocado en tecnología para productos tecnológicos.

Instrucciones:
- Basado en la descripción del producto proporcionada, genera 5 variaciones de copias publicitarias. Cada versión debe variar en tono (por ejemplo, una lúdica, una profesional, una persuasiva, etc.). Incluye un titular llamativo, cuerpo del texto y una llamada a la acción fuerte.

Descripción del Producto:
Nombre: {copia.nombreProducto}
Descripción: {copia.descripcionProducto}
"""

    if copia.publicoObjetivo:
        prompt += f"Público Objetivo: {copia.publicoObjetivo}\n"

    try:
        # Generar copias publicitarias
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1500,
            temperature=0.7,
        )
        copias_generadas = response.choices[0].message.content.strip()

        # Separar las variaciones generadas por saltos de línea dobles
        variaciones = copias_generadas.split("\n\n")

        return {
            "copiasPublicitarias": variaciones,
            "user": current_user.nombre  # Devuelve detalles del usuario autenticado
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint para generar el encabezado del anuncio sin autenticación
@router.post("/create_heading")
async def create_heading(encabezado: EncabezadoAnuncio):
    # Crear el prompt para la generación del encabezado de anuncio
    prompt = f"""
Eres un redactor publicitario experto en crear encabezados cautivadores para anuncios en plataformas de redes sociales. Tu tarea es generar encabezados concisos que cumplan con los siguientes requisitos:

1. Producto: El encabezado debe estar optimizado para el producto nombrado y descrito.
2. Palabras Clave: Usa las palabras clave proporcionadas para asegurar que el encabezado esté optimizado.
3. Estilo de Escritura: Adapta el estilo de escritura especificado, que puede variar desde un tono profesional hasta uno casual y atractivo.
4. Longitud Máxima: Limita el encabezado a un máximo de {encabezado.longitudMaxima} caracteres, manteniendo claridad y atracción.
5. Variantes: Proporciona {encabezado.variantes} versiones únicas del encabezado, cada una manteniendo el tono y relevancia para el producto.

Detalles del Producto:
- Nombre: {encabezado.nombreProducto}
- Descripción: {encabezado.descripcionProducto}

Palabras Clave: {encabezado.palabrasClave}
Estilo de Escritura: {encabezado.estiloEscritura}
Longitud Máxima de Caracteres: {encabezado.longitudMaxima}
"""

    try:
        # Generar encabezados publicitarios
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=100,
            temperature=0.7,
        )
        encabezados_generados = response.choices[0].message.content.strip()

        # Separar las variantes generadas por saltos de línea dobles
        variantes = encabezados_generados.split("\n\n")

        return {
            "encabezados": variantes[:encabezado.variantes]  # Limitar a las variantes especificadas
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))