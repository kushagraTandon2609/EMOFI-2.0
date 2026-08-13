import os
from dotenv import load_dotenv

load_dotenv()


class Config:

    SECRET_KEY = os.getenv("SECRET_KEY")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{os.getenv('DB_USER')}:"
        f"{os.getenv('DB_PASSWORD')}@"
        f"{os.getenv('DB_HOST')}:"
        f"{os.getenv('DB_PORT')}/"
        f"{os.getenv('DB_NAME')}"
    )

    SQLALCHEMY_ENGINE_OPTIONS = {
        # Check whether a pooled connection is still alive
        # before using it.
        "pool_pre_ping": True,

        # Recycle old connections before they become stale.
        # 1800 seconds = 30 minutes.
        "pool_recycle": 1800,

        # Keep the pool small for Render's deployment.
        "pool_size": 5,
        "max_overflow": 2,

        "connect_args": {
            "ssl": {}
        }
    }

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv("SECRET_KEY")