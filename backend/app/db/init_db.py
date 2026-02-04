# backend/app/db/init_db.py

import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

from app.models.orm_models import Base

# --- Load .env from the backend folder (current working dir when we run from backend) ---
ENV_PATH = os.path.join(os.getcwd(), ".env")
print("Looking for .env at:", ENV_PATH)

if os.path.exists(ENV_PATH):
    load_dotenv(ENV_PATH)
else:
    print("⚠️ .env file not found at", ENV_PATH)

# --- Read DB settings from env ---
DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "voiceauth_db")
DB_USER = os.getenv("DB_USER", "voiceuser")
DB_PASS = os.getenv("DB_PASS")

print("Loaded DB env vars:")
print("  DB_HOST =", DB_HOST)
print("  DB_PORT =", DB_PORT)
print("  DB_NAME =", DB_NAME)
print("  DB_USER =", DB_USER)
print("  DB_PASS =", DB_PASS)

if not DB_PASS:
    raise RuntimeError("DB_PASS is not set in .env!")

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
print("Using DB URL:", DATABASE_URL)

engine = create_engine(DATABASE_URL, echo=False)


def init_db():
    """
    Create all tables defined in ORM models.
    """
    print("📦 Creating tables (if not exist)...")
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created / verified.")


def test_connection():
    """
    Simple SELECT 1 test.
    """
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        print("✅ DB connection OK, SELECT 1 ->", result.scalar())


if __name__ == "__main__":
    # First test connection, then create tables
    try:
        test_connection()
        init_db()
    except Exception as e:
        print("❌ Error:", e)
