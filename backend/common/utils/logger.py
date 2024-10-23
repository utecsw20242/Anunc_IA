import logging

# Configurar el logging básico
logging.basicConfig(level=logging.INFO)

def get_logger(name: str):
    return logging.getLogger(name)
