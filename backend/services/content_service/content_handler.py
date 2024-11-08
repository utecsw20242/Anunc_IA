from fastapi import APIRouter, HTTPException
import os
import re
import json
import logging
from openai import OpenAI
from dotenv import load_dotenv
from .models import (
    CampanaDetallesInput,
    PublicoObjetivoUbicacionesInput,
    FormatoCTAInput,
    ContenidoCreativoInput,
    EncabezadoAnuncio,
)

logger = logging.getLogger(__name__)

# Cargar las variables de entorno desde el archivo .env en la carpeta config
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

# Verificar que la clave de API esté configurada
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    logger.error("OPENAI_API_KEY no está configurada en las variables de entorno.")
    raise HTTPException(status_code=500, detail="OPENAI_API_KEY no está configurada en las variables de entorno.")

# Crear una instancia del cliente de OpenAI
client = OpenAI(api_key=OPENAI_API_KEY)

# Crear el router de FastAPI
router = APIRouter()

# Función auxiliar para generar respuestas de OpenAI
async def generar_respuesta_openai(prompt: str, max_tokens: int = 300):
    try:
        # Simulación de llamada a OpenAI (para pruebas)
        resultado = "Respuesta simulada de OpenAI"
        return resultado
    except Exception as e:
        logger.exception("Error en generar_respuesta_openai")
        raise HTTPException(status_code=500, detail=f"Error en la llamada a OpenAI: {str(e)}")

# Función auxiliar para extraer y parsear JSON de la respuesta
def extraer_json_de_respuesta(respuesta: str):
    match = re.search(r'\{.*\}', respuesta, re.DOTALL)
    if match:
        json_str = match.group()
        try:
            data = json.loads(json_str)
            return data
        except json.JSONDecodeError as e:
            raise HTTPException(status_code=500, detail=f"Error al parsear JSON: {e.msg}\nRespuesta del modelo:\n{respuesta}")
    else:
        raise HTTPException(status_code=500, detail=f"No se pudo encontrar un JSON válido en la respuesta.\nRespuesta del modelo:\n{respuesta}")

# Endpoint 1: Definir el objetivo de la campaña y detalles como presupuesto y duración
@router.post("/definir_campana")
async def definir_campana(data: CampanaDetallesInput):
    prompt = f"""
Como experto en marketing digital y campañas de Meta Ads, proporciona tus recomendaciones en formato JSON **válido** siguiendo exactamente el siguiente esquema **sin agregar texto adicional**:

{{"detalles_campana": {{

  "objetivo_campana": {{
    "objetivo": "[Objetivo seleccionado]",
    "explicacion": "[Explicación breve]"
  }},
  "presupuesto_total": {{
    "cantidad": "[Cantidad en soles]",
    "explicacion": "[Explicación breve]"
  }},
  "duracion_optima": {{
    "duracion": "[Tiempo en días/semanas/meses]",
    "explicacion": "[Explicación breve]"
  }}
}}}}

Utiliza la información del producto a continuación para hacer tus recomendaciones.

**Detalles del Producto:**
- Nombre: {data.nombreProducto}
- Descripción: {data.descripcionProducto}
- tipoCampana: {data.tipoCampana}
- duracionPreferida: {data.duracionPreferida}

**Importante**: Proporciona **solo** la respuesta en formato JSON válido. No incluyas ninguna explicación o texto adicional antes o después del JSON.
"""

    resultado = await generar_respuesta_openai(prompt)
    detalles_campana = extraer_json_de_respuesta(resultado)
    return detalles_campana

# Endpoint 2: Definir público objetivo y ubicaciones
@router.post("/definir_publico_ubicaciones")
async def definir_publico_ubicaciones(data: PublicoObjetivoUbicacionesInput):
    prompt = f"""
Como estratega de marketing enfocado en segmentación y ubicaciones de anuncios en Meta Ads, proporciona tus recomendaciones en formato JSON **válido** siguiendo exactamente el siguiente esquema **sin agregar texto adicional**:

{{
  "publico_objetivo": {{
    "demografico": {{
      "edad": "[Rango de edad]",
      "genero": "[Género(s)]",
      "ubicaciones": [
        {{
          "distrito": "[Distrito 1]",
          "provincia": "[Provincia 1]",
          "departamento": "[Departamento 1]"
        }},
        "... (más ubicaciones si es necesario)"
      ],
      "otros": "[Otros datos demográficos clave]"
    }},
    "psicografico": {{
      "intereses": "[Intereses específicos relacionados con el producto]",
      "comportamientos": "[Comportamientos de compra y otros]"
    }}
  }},
  "ubicaciones_anuncios": {{
    "ubicaciones_seleccionadas": ["[Ubicación 1]", "..."],
    "justificacion": "[Explicación breve de por qué se eligieron estas ubicaciones]"
  }}
}}

Utiliza la información del producto y las ubicaciones base a continuación para hacer tus recomendaciones.

**Detalles del Producto:**
- Nombre: {data.nombreProducto}
- Descripción: {data.descripcionProducto}

**Ubicaciones Base:**
- Distrito: {data.distrito}
- Provincia: {data.provincia}
- Departamento: {data.departamento}

**Importante**: Proporciona **solo** la respuesta en formato JSON válido. No incluyas ninguna explicación o texto adicional antes o después del JSON.

**Nota**: Asegúrate de que todas las cadenas en el JSON estén entre comillas dobles y que el JSON sea estructuralmente válido.
"""

    resultado = await generar_respuesta_openai(prompt)
    publico_ubicaciones = extraer_json_de_respuesta(resultado)
    return publico_ubicaciones

# Endpoint 3: Elegir formato y CTA
@router.post("/elegir_formato_cta")
async def elegir_formato_cta(data: FormatoCTAInput):
    prompt = f"""
Como experto en creatividad publicitaria y plataformas de Meta Ads, proporciona tus recomendaciones en formato JSON **válido** siguiendo exactamente el siguiente esquema **sin agregar texto adicional**:

{{
  "formato_anuncio": {{
    "formato": "[Formato seleccionado]",
    "explicacion": "[Explicación breve de por qué este formato es el más efectivo]"
  }},
  "cta": {{
    "llamada_a_la_accion": "[CTA seleccionada]",
    "explicacion": "[Explicación breve de por qué este CTA es el más impactante]"
  }}
}}

Utiliza las opciones predefinidas a continuación para hacer tus selecciones.

**Opciones de Formato de Anuncio:**
Anuncios en carrusel
Anuncios en secuencia
Colecciones
Experiencias dinámicas
Anuncios de Messenger
Anuncios de Canvas 

**Opciones de Llamada a la Acción (CTA):**
Enviar solicitud
Reservar
Comprar
Realizar pedido
Cotizar
Obtener oferta
Más información
Contactarnos
Descargar
Registrarte

**Detalles del Producto:**
- Nombre: {data.nombreProducto}
- Descripción: {data.descripcionProducto}

**Importante**: Proporciona **solo** la respuesta en formato JSON válido. No incluyas ninguna explicación o texto adicional antes o después del JSON.

**Nota**: Asegúrate de que todas las cadenas en el JSON estén entre comillas dobles y que el JSON sea estructuralmente válido.
"""

    resultado = await generar_respuesta_openai(prompt)
    formato_y_cta = extraer_json_de_respuesta(resultado)
    return formato_y_cta

# Endpoint 4: Crear contenido creativo
@router.post("/crear_contenido_creativo")
async def crear_contenido_creativo(data: ContenidoCreativoInput):
    prompt = f"""
Como redactor creativo especializado en anuncios de Meta Ads, genera **contenido publicitario persuasivo y atractivo** para "{data.nombreProducto}" en formato JSON **válido**, siguiendo exactamente el siguiente esquema **sin agregar texto adicional**:

{{
  "variaciones": [
    {{
      "titulo": "[Título de la variación 1]",
      "contenido": "[Contenido de la variación 1]"
    }},
    {{
      "titulo": "[Título de la variación 2]",
      "contenido": "[Contenido de la variación 2]"
    }},
    {{
      "titulo": "[Título de la variación 3]",
      "contenido": "[Contenido de la variación 3]"
    }}
  ]
}}

El contenido debe:

- Resaltar las **características y beneficios clave** del producto.
- Adaptarse al **tono y estilo** especificado: "{data.tonoEstilo}".
- Alinear el mensaje con los **intereses y necesidades** del público objetivo: "{data.publicoObjetivo}".
- Utilizar un lenguaje que **resuene** con la audiencia y **genere una conexión emocional**.

**Detalles del Producto:**
- Nombre: {data.nombreProducto}
- Descripción: {data.descripcionProducto}

**Importante**: Proporciona **solo** la respuesta en formato JSON válido. No incluyas ninguna explicación o texto adicional antes o después del JSON.

**Nota**: Asegúrate de que todas las cadenas en el JSON estén entre comillas dobles y que el JSON sea estructuralmente válido.
"""

    resultado = await generar_respuesta_openai(prompt)
    contenido_creativo = extraer_json_de_respuesta(resultado)
    return contenido_creativo

# Endpoint 5: Generar encabezados de anuncio
@router.post("/create_heading")
async def create_heading(encabezado: EncabezadoAnuncio):
    prompt = f"""
Eres un redactor publicitario experto en crear **encabezados cautivadores** para anuncios en plataformas de redes sociales.

Tu tarea es generar **encabezados concisos y atractivos** que cumplan con los siguientes requisitos y proporcionarlos en formato JSON **válido** siguiendo exactamente el siguiente esquema **sin agregar texto adicional**:

{{
  "encabezados": [
    "[Encabezado 1]",
    "[Encabezado 2]",
    "... hasta {encabezado.variantes} encabezados"
  ]
}}

Los encabezados deben:

1. **Producto**: Estar optimizados para "{encabezado.nombreProducto}", destacando sus **beneficios** y **propuestas de valor únicas**.

2. **Palabras Clave**: Incorporar las siguientes palabras clave para mejorar la optimización y relevancia del encabezado: {encabezado.palabrasClave}.

3. **Estilo de Escritura**: Adaptarse al estilo de escritura especificado, que es "{encabezado.estiloEscritura}".

4. **Longitud Máxima**: Limitarse a un máximo de {encabezado.longitudMaxima} caracteres, asegurando **claridad** y **poder de atracción**.

5. **Variantes**: Proporcionar {encabezado.variantes} versiones únicas del encabezado, cada una manteniendo el tono y relevancia para el producto, pero explorando diferentes enfoques creativos.

**Detalles del Producto:**
- Nombre: {encabezado.nombreProducto}
- Descripción: {encabezado.descripcionProducto}

**Importante**: Proporciona **solo** la respuesta en formato JSON válido, sin incluir texto adicional antes o después del JSON.

**Nota**: Asegúrate de que todas las cadenas en el JSON estén entre comillas dobles y que el JSON sea estructuralmente válido.
"""

    resultado = await generar_respuesta_openai(prompt)
    encabezados_data = extraer_json_de_respuesta(resultado)
    encabezados = encabezados_data.get("encabezados", [])[:encabezado.variantes]
    return {"encabezados": encabezados}
