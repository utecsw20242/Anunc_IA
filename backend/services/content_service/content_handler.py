from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import os
from openai import OpenAI
from dotenv import load_dotenv

# Cargar las variables de entorno desde el archivo .env en la carpeta config
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

# Crear una instancia del cliente de OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Crear el router de FastAPI
router = APIRouter()

# Modelos Pydantic para cada endpoint

class ObjetivoCampanaInput(BaseModel):
    nombreProducto: str
    descripcionProducto: str

class PresupuestoDuracionInput(BaseModel):
    nombreProducto: str
    tipoCampana: str  # Pequeña, Mediana, Grande
    duracion: str  # Corta, Mediana, Larga

class PublicoObjetivoUbicacionesInput(BaseModel):
    nombreProducto: str
    descripcionProducto: str
    distrito: str
    provincia: str
    departamento: str
    ubicacionesMeta: str  # Lista de ubicaciones de anuncios predefinidas de Meta

class FormatoCTAInput(BaseModel):
    nombreProducto: str
    descripcionProducto: str

class ContenidoCreativoInput(BaseModel):
    nombreProducto: str
    descripcionProducto: str
    publicoObjetivo: str
    tonoEstilo: str  # Por ejemplo, 'casual y juvenil', 'profesional y serio'

class EncabezadoAnuncio(BaseModel):
    nombreProducto: str
    descripcionProducto: str
    palabrasClave: str
    estiloEscritura: str
    longitudMaxima: int
    variantes: int = 3  # Número de variantes a generar

# Endpoint 1: Definir el objetivo de la campaña + Asignar un nombre a la campaña
@router.post("/definir_objetivo_campana")
async def definir_objetivo_campana(data: ObjetivoCampanaInput):
    prompt = f"""
Como experto en marketing digital y campañas de Meta Ads, selecciona el objetivo de campaña más adecuado para "{data.nombreProducto}" de entre los objetivos predefinidos por Meta (por ejemplo, 'Reconocimiento de marca', 'Tráfico', 'Interacciones', 'Conversiones', etc.).

Ten en cuenta:

- **Beneficios únicos** y **características diferenciadoras** de "{data.nombreProducto}".
- **Necesidades y deseos** del público objetivo.
- **Objetivos comerciales** de la empresa.

Asegúrate de que el objetivo seleccionado maximice el impacto de la campaña y esté alineado con la estrategia general de marketing.

Además, crea un **nombre de campaña atractivo y memorable** que:

- Refleje el propósito principal de la campaña.
- Resalte la propuesta de valor de "{data.nombreProducto}".
- Capte la atención del público objetivo y genere interés inmediato.

Proporciona tu respuesta en un formato claro y estructurado, explicando brevemente las razones detrás de la selección del objetivo y del nombre de la campaña.

**Detalles del Producto:**
- Nombre: {data.nombreProducto}
- Descripción: {data.descripcionProducto}
"""
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500,
            temperature=0.7,
        )
        resultado = response.choices[0].message.content.strip()
        return {
            "detalles_completos": resultado
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint 2: Establecer el presupuesto + Determinar la duración de la campaña
@router.post("/establecer_presupuesto_duracion")
async def establecer_presupuesto_duracion(data: PresupuestoDuracionInput):
    prompt = f"""
Como especialista en planificación de campañas publicitarias, tu tarea es recomendar un **presupuesto total** y una **duración específica** para la campaña de "{data.nombreProducto}".

Considera:

- **Tipo de campaña**: {data.tipoCampana} (Pequeña, Mediana, Grande).
- **Duración preferida**: {data.duracion} (Corta, Mediana, Larga).
- **Objetivos de marketing** y **expectativas de rendimiento**.

Basándote en estos parámetros:

- Calcula un **presupuesto apropiado** que maximice el retorno de inversión (ROI).
- Establece la **duración óptima** en días, semanas o meses.
- Justifica tus recomendaciones considerando el sector del producto, el comportamiento del consumidor y las prácticas actuales del mercado.

Proporciona una respuesta detallada y estructurada que apoye tus decisiones.

**Detalles del Producto:**
- Nombre: {data.nombreProducto}
"""
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500,
            temperature=0.7,
        )
        resultado = response.choices[0].message.content.strip()
        return {"presupuesto_y_duracion": resultado}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint 3: Definir el público objetivo + Seleccionar las ubicaciones de los anuncios
@router.post("/definir_publico_ubicaciones")
async def definir_publico_ubicaciones(data: PublicoObjetivoUbicacionesInput):
    prompt = f"""
Como estratega de marketing enfocado en segmentación y ubicaciones de anuncios en Meta Ads, define el **público objetivo ideal** para la campaña de "{data.nombreProducto}" utilizando criterios demográficos, geográficos y psicográficos.

Considera:

- **Ubicaciones geográficas**:
  - Distrito: {data.distrito}
  - Provincia: {data.provincia}
  - Departamento: {data.departamento}

- **Características del producto** y cómo se alinean con las **preferencias del público**.

Selecciona **criterios de segmentación relevantes**, incluyendo:

- Edad, género, intereses, comportamientos de compra, y otros datos demográficos clave.
- Intereses específicos relacionados con "{data.descripcionProducto}".

Luego, elige las **ubicaciones de anuncios más efectivas** de la lista predefinida de Meta ({data.ubicacionesMeta}), como Feed de Facebook, Historias de Instagram, Marketplace, etc.

Justifica tu selección basándote en:

- **Tendencias actuales del mercado**.
- **Hábitos de consumo de medios** del público objetivo.
- **Rendimiento histórico** de esas ubicaciones para productos similares.

Proporciona tu respuesta de manera estructurada, incluyendo las razones detrás de cada elección.

**Detalles del Producto:**
- Nombre: {data.nombreProducto}
- Descripción: {data.descripcionProducto}
"""
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=600,
            temperature=0.7,
        )
        resultado = response.choices[0].message.content.strip()
        return {"publico_objetivo_y_ubicaciones": resultado}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint 4: Elegir el formato del anuncio + Definir la llamada a la acción (CTA)
@router.post("/elegir_formato_cta")
async def elegir_formato_cta(data: FormatoCTAInput):
    prompt = f"""
Como experto en creatividad publicitaria y plataformas de Meta Ads, tu tarea es:

1. **Seleccionar el formato de anuncio más efectivo** para promocionar "{data.nombreProducto}" de entre las opciones predefinidas por Meta:

   - Imagen única
   - Video
   - Carrusel
   - Colección

   Explica por qué este formato:

   - **Maximiza el engagement** con la audiencia objetivo.
   - Resalta las **características y beneficios clave** de "{data.nombreProducto}".
   - Se adapta a las **preferencias de consumo de contenido** de la audiencia.

2. **Definir la llamada a la acción (CTA) más impactante** de la lista proporcionada por Meta:

   - Comprar ahora
   - Más información
   - Registrarse
   - Enviar mensaje
   - Otros

   Justifica tu elección del CTA basándote en:

   - Los **objetivos de la campaña**.
   - El **comportamiento esperado** de los usuarios.
   - Cómo el CTA elegido **impulsa a la acción** al público objetivo.

Proporciona una respuesta clara, estructurada y enfocada en maximizar los resultados de marketing.

**Detalles del Producto:**
- Nombre: {data.nombreProducto}
- Descripción: {data.descripcionProducto}
"""
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500,
            temperature=0.7,
        )
        resultado = response.choices[0].message.content.strip()
        return {"formato_y_cta": resultado}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint 5: Crear el contenido creativo
@router.post("/crear_contenido_creativo")
async def crear_contenido_creativo(data: ContenidoCreativoInput):
    prompt = f"""
Como redactor creativo especializado en anuncios de Meta Ads, genera **contenido publicitario persuasivo y atractivo** para "{data.nombreProducto}".

El contenido debe:

- Resaltar las **características y beneficios clave** del producto.
- Adaptarse al **tono y estilo** especificado: {data.tonoEstilo}.
- Alinear el mensaje con los **intereses y necesidades** del público objetivo ({data.publicoObjetivo}).
- Utilizar un lenguaje que **resuene** con la audiencia y **genere una conexión emocional**.

Incluye:

- **Llamados a la acción** sutiles y efectivos.
- Al menos **tres variaciones** del contenido para pruebas A/B, incorporando:
  - Testimonios auténticos.
  - Datos impactantes o estadísticas relevantes.
  - Frases inspiradoras o eslóganes memorables.

Presenta tu respuesta de manera organizada y clara, asegurando que cada variación sea única pero mantenga la coherencia con la marca y el objetivo de la campaña.

**Detalles del Producto:**
- Nombre: {data.nombreProducto}
- Descripción: {data.descripcionProducto}
- Público Objetivo: {data.publicoObjetivo}
"""
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=700,
            temperature=0.7,
        )
        resultado = response.choices[0].message.content.strip()
        return {"contenido_creativo": resultado}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint para generar el encabezado del anuncio
@router.post("/create_heading")
async def create_heading(encabezado: EncabezadoAnuncio):
    prompt = f"""
Eres un redactor publicitario experto en crear **encabezados cautivadores** para anuncios en plataformas de redes sociales.

Tu tarea es generar **encabezados concisos y atractivos** que cumplan con los siguientes requisitos:

1. **Producto**: El encabezado debe estar optimizado para "{encabezado.nombreProducto}", destacando sus **beneficios** y **propuestas de valor únicas**.

2. **Palabras Clave**: Incorpora las siguientes palabras clave para mejorar la optimización y relevancia del encabezado: {encabezado.palabrasClave}.

3. **Estilo de Escritura**: Adapta el estilo de escritura especificado, que es {encabezado.estiloEscritura}. Esto puede variar desde un tono profesional hasta uno casual y atractivo, según se indique.

4. **Longitud Máxima**: Limita el encabezado a un máximo de {encabezado.longitudMaxima} caracteres, asegurando **claridad** y **poder de atracción**.

5. **Variantes**: Proporciona {encabezado.variantes} versiones únicas del encabezado, cada una manteniendo el tono y relevancia para el producto, pero explorando diferentes enfoques creativos.

Asegúrate de que cada encabezado:

- **Capte la atención inmediata** del lector.
- Genere **interés** y motive al lector a **interactuar** con el anuncio.
- Sea coherente con la **imagen de marca** y los **objetivos de la campaña**.

**Detalles del Producto:**
- Nombre: {encabezado.nombreProducto}
- Descripción: {encabezado.descripcionProducto}

Palabras Clave: {encabezado.palabrasClave}
Estilo de Escritura: {encabezado.estiloEscritura}
Longitud Máxima de Caracteres: {encabezado.longitudMaxima}
"""
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=300,
            temperature=0.7,
        )
        encabezados_generados = response.choices[0].message.content.strip()

        # Separar las variantes generadas por saltos de línea dobles o líneas numeradas
        variantes = [line.strip() for line in encabezados_generados.split('\n') if line.strip() != '']

        return {
            "encabezados": variantes[:encabezado.variantes]  # Limitar a las variantes especificadas
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
