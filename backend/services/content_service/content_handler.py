from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import os
from openai import OpenAI
from dotenv import load_dotenv
from .models import CampanaDetallesInput, PublicoObjetivoUbicacionesInput, FormatoCTAInput, ContenidoCreativoInput, EncabezadoAnuncio
import json
import re

# Cargar las variables de entorno desde el archivo .env en la carpeta config
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

# Crear una instancia del cliente de OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Crear el router de FastAPI
router = APIRouter()

# Endpoint 1: Definir el objetivo de la campaña y detalles como presupuesto y duración
@router.post("/definir_campana")
async def definir_campana(data: CampanaDetallesInput):
    prompt = f"""
Como experto en marketing digital y campañas de Meta Ads, proporciona tus recomendaciones en formato JSON **válido** siguiendo exactamente el siguiente esquema **sin agregar texto adicional**:

{{
  "objetivo_campana": {{
    "objetivo": "[Objetivo seleccionado]", Tener consideracion de lo siguiente: 
Reconocimiento: Aumenta el reconocimiento de tu negocio llegando a una gran audiencia con más probabilidad de recordar tu anuncio, ideal para nuevos negocios o marcas que cambiaron de nombre. Objetivos específicos: Reconocimiento de marca, Alcance, Reproducciones de video, Tráfico en el negocio.
Tráfico: Dirige a personas a destinos online como tu página de Facebook, tienda de Instagram, sitio web o app, útil para generar visitas a páginas promocionales o sitios web de servicios. Objetivo específico: Tráfico.
Interacción: Conecta con personas que probablemente interactúen con tu negocio, envíen mensajes o tomen acciones en tu anuncio o página. Ideal para generar conversaciones o engagement. Objetivos específicos: Interacción, Reproducciones de video, Mensajes, Conversiones.
Clientes potenciales: Captura clientes potenciales a través de registros, mensajes o llamadas telefónicas, como suscripciones a newsletters. Objetivos específicos: Generación de clientes potenciales, Mensajes, Conversiones.
Promoción de la app: Motiva a usuarios de dispositivos móviles a instalar tu app o a realizar acciones dentro de ella, como compras o probar nuevas funciones. Objetivo específico: Instalaciones de la app.
Ventas: Enfocado en personas con alta probabilidad de compra, ideal para comercio electrónico, y optimizable para acciones adicionales como agregar al carrito. Objetivos específicos: Conversiones, Ventas del catálogo.
    "explicacion": "[Explicación breve]"
  }},
  "presupuesto_total": {{
    "cantidad": "[Cantidad en soles]", Ejemplo: "1000 soles", además considera que el monto mínimo es de 5 soles por día por lo que para una campaña pequeña de 5 días sería 25 soles.
    "explicacion": "[Explicación breve]", Presupuesto total por toda la cantidad de días o por día en la respuesta.
  }},
  "duracion_optima": {{
    "duracion": "[Tiempo en días/semanas/meses]", 
    "explicacion": "[Explicación breve]"
  }}
}}

Utiliza la información del producto a continuación para hacer tus recomendaciones.

**Detalles del Producto:**
- Nombre: {data.nombreProducto}
- Descripción: {data.descripcionProducto}
- tipoCampana: {data.tipoCampana}
- duracionPreferida: {data.duracionPreferida}

**Importante**: Proporciona **solo** la respuesta en formato JSON válido. No incluyas ninguna explicación o texto adicional antes o después del JSON.
"""

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=300,
            temperature=0.7,
        )
        resultado = response.choices[0].message.content.strip()
        detalles_campana = json.loads(resultado)
        return {
            "detalles_campana": detalles_campana
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}\nRespuesta del modelo:\n{resultado}")
    
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
        {{
          "distrito": "[Distrito 2]",
          "provincia": "[Provincia 2]",
          "departamento": "[Departamento 2]"
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
    "ubicaciones_seleccionadas": ["[Ubicación 1]", "[Ubicación 2]", "..."],
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

Basándote en estas ubicaciones, genera una lista de ubicaciones objetivo (combinaciones de distrito, provincia y departamento) que consideres óptimas para la campaña, proporcionando opciones adicionales basadas en el input.

**Ubicaciones Disponibles de Meta Ads:**
Entre los cuales son estos los unicos en la lista
Sección de noticias de Facebook
Noticias de Instagram
Facebook Marketplace
Secciones de vídeo de Facebook
Columna derecha de Facebook
Sección «Explorar» de Instagram
Bandeja de entrada de Messenger
Noticias de grupos de Facebook
Facebook Stories
Instagram Stories 


**Importante**: Proporciona **solo** la respuesta en formato JSON válido. No incluyas ninguna explicación o texto adicional antes o después del JSON.

**Nota**: Asegúrate de que todas las cadenas en el JSON estén entre comillas dobles y que el JSON sea estructuralmente válido.
"""


    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=300,
            temperature=0.7,
        )
        resultado = response.choices[0].message.content.strip()
        print("Respuesta del modelo:", resultado)

        # Intentar extraer el JSON de la respuesta
        import re
        match = re.search(r'\{.*\}', resultado, re.DOTALL)
        if match:
            json_str = match.group()
            publico_ubicaciones = json.loads(json_str)
            return {"publico_objetivo_y_ubicaciones": publico_ubicaciones}
        else:
            raise HTTPException(status_code=500, detail=f"No se pudo encontrar un JSON válido en la respuesta.\nRespuesta del modelo:\n{resultado}")
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Error al parsear JSON: {e.msg}\nRespuesta del modelo:\n{resultado}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}\nRespuesta del modelo:\n{resultado}")


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
Entre otros

**Detalles del Producto:**
- Nombre: {data.nombreProducto}
- Descripción: {data.descripcionProducto}

**Importante**: Proporciona **solo** la respuesta en formato JSON válido. No incluyas ninguna explicación o texto adicional antes o después del JSON.

**Nota**: Asegúrate de que todas las cadenas en el JSON estén entre comillas dobles y que el JSON sea estructuralmente válido.
"""

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",  # Puedes usar el modelo que prefieras
            messages=[{"role": "user", "content": prompt}],
            max_tokens=300,
            temperature=0.7,
        )
        resultado = response.choices[0].message.content.strip()
        print("Respuesta del modelo:", resultado)  # Para depuración

        # Intentar extraer el JSON de la respuesta
        import re
        match = re.search(r'\{.*\}', resultado, re.DOTALL)
        if match:
            json_str = match.group()
            formato_y_cta = json.loads(json_str)
            return {"formato_y_cta": formato_y_cta}
        else:
            raise HTTPException(status_code=500, detail=f"No se pudo encontrar un JSON válido en la respuesta.\nRespuesta del modelo:\n{resultado}")
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Error al parsear JSON: {e.msg}\nRespuesta del modelo:\n{resultado}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}\nRespuesta del modelo:\n{resultado}")


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

    Incorpora en las variaciones:

    - **Llamados a la acción** sutiles y efectivos.
    - Testimonios auténticos.
    - Datos impactantes o estadísticas relevantes.
    - Frases inspiradoras o eslóganes memorables.

    **Detalles del Producto:**
    - Nombre: {data.nombreProducto}
    - Descripción: {data.descripcionProducto}

    **Importante**: Proporciona **solo** la respuesta en formato JSON válido. No incluyas ninguna explicación o texto adicional antes o después del JSON.

    **Nota**: Asegúrate de que todas las cadenas en el JSON estén entre comillas dobles y que el JSON sea estructuralmente válido.
    """
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",  # Puedes usar el modelo que prefieras
            messages=[{"role": "user", "content": prompt}],
            max_tokens=300,
            temperature=0.7,
        )
        resultado = response.choices[0].message.content.strip()
        print("Respuesta del modelo:", resultado)  # Para depuración

        # Intentar extraer el JSON de la respuesta
        match = re.search(r'\{.*\}', resultado, re.DOTALL)
        if match:
            json_str = match.group()
            contenido_creativo = json.loads(json_str)
            return {"contenido_creativo": contenido_creativo}
        else:
            raise HTTPException(status_code=500, detail=f"No se pudo encontrar un JSON válido en la respuesta.\nRespuesta del modelo:\n{resultado}")
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Error al parsear JSON: {e.msg}\nRespuesta del modelo:\n{resultado}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}\nRespuesta del modelo:\n{resultado}")
    
# Endpoint para generar el encabezado del anuncio
@router.post("/create_heading")
async def create_heading(encabezado: EncabezadoAnuncio):
    prompt = f"""
    Eres un redactor publicitario experto en crear **encabezados cautivadores** para anuncios en plataformas de redes sociales.

    Tu tarea es generar **encabezados concisos y atractivos** que cumplan con los siguientes requisitos y proporcionarlos en formato JSON **válido** siguiendo exactamente el siguiente esquema **sin agregar texto adicional**:

    {{
      "encabezados": [
        "[Encabezado 1]",
        "[Encabezado 2]",
        "[Encabezado 3]",
        "... hasta {encabezado.variantes} encabezados"
      ]
    }}

    Los encabezados deben:

    1. **Producto**: Estar optimizados para "{encabezado.nombreProducto}", destacando sus **beneficios** y **propuestas de valor únicas**.

    2. **Palabras Clave**: Incorporar las siguientes palabras clave para mejorar la optimización y relevancia del encabezado: {encabezado.palabrasClave}.

    3. **Estilo de Escritura**: Adaptarse al estilo de escritura especificado, que es "{encabezado.estiloEscritura}". Esto puede variar desde un tono profesional hasta uno casual y atractivo, según se indique.

    4. **Longitud Máxima**: Limitarse a un máximo de {encabezado.longitudMaxima} caracteres, asegurando **claridad** y **poder de atracción**.

    5. **Variantes**: Proporcionar {encabezado.variantes} versiones únicas del encabezado, cada una manteniendo el tono y relevancia para el producto, pero explorando diferentes enfoques creativos.

    Asegúrate de que cada encabezado:

    - **Capte la atención inmediata** del lector.
    - Genere **interés** y motive al lector a **interactuar** con el anuncio.
    - Sea coherente con la **imagen de marca** y los **objetivos de la campaña**.

    **Detalles del Producto:**
    - Nombre: {encabezado.nombreProducto}
    - Descripción: {encabezado.descripcionProducto}

    Palabras Clave: {encabezado.palabrasClave}
    Estilo de Escritura: "{encabezado.estiloEscritura}"
    Longitud Máxima de Caracteres: {encabezado.longitudMaxima}

    **Importante**: Proporciona **solo** la respuesta en formato JSON válido, sin incluir texto adicional antes o después del JSON.

    **Nota**: Asegúrate de que todas las cadenas en el JSON estén entre comillas dobles y que el JSON sea estructuralmente válido.
    """
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",  # Puedes usar el modelo que prefieras
            messages=[{"role": "user", "content": prompt}],
            max_tokens=300,
            temperature=0.7,
        )
        resultado = response.choices[0].message.content.strip()
        print("Respuesta del modelo:", resultado)  # Para depuración

        # Intentar extraer el JSON de la respuesta
        import re
        match = re.search(r'\{.*\}', resultado, re.DOTALL)
        if match:
            json_str = match.group()
            encabezados_data = json.loads(json_str)
            encabezados = encabezados_data.get("encabezados", [])
            return {
                "encabezados": encabezados[:encabezado.variantes]  # Limitar a las variantes especificadas
            }
        else:
            raise HTTPException(status_code=500, detail=f"No se pudo encontrar un JSON válido en la respuesta.\nRespuesta del modelo:\n{resultado}")
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Error al parsear JSON: {e.msg}\nRespuesta del modelo:\n{resultado}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}\nRespuesta del modelo:\n{resultado}")
