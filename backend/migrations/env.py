from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

# Importa el engine y los modelos de tu aplicación
from common.database.database import Base, engine  # Base es donde defines tus modelos
from services.auth_service.models import Usuario  # Importar el modelo de Usuario

# Alembic Config object, which provides access to the .ini file values
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Establece el target_metadata con la información de tus modelos
target_metadata = Base.metadata  # Usamos los metadatos de los modelos

# Configuración para ejecutar migraciones offline
def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

# Configuración para ejecutar migraciones online
def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
