from pydantic import BaseModel
from typing import List

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
    palabrasClave: List[str]  # Cambiado a List[str]
    estiloEscritura: str
    longitudMaxima: int
    variantes: int  # Número de variantes a generar

class CampanaDetallesInput(BaseModel):
    nombreProducto: str
    descripcionProducto: str
    tipoCampana: str  # Por ejemplo: Pequeña, Mediana, Grande
    duracionPreferida: str  # Por ejemplo: Corta, Mediana, Larga
