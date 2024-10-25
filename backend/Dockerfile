# Usamos una imagen base de Python
FROM python:3.9-slim

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo de dependencias e instalamos las dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos el resto de los archivos de la aplicación
COPY . .

# Exponemos el puerto 8000 donde correrá FastAPI
EXPOSE 8000

# Comando para ejecutar migraciones y luego iniciar el servidor FastAPI
CMD ["sh", "-c", "alembic upgrade head && uvicorn main:app --host localhost --port 8000"]
