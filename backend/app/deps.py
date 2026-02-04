# backend/app/deps.py

import os
from typing import Generator

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from app.core.engine import VoiceAuthEngine

# Load .env from backend folder
ENV_PATH = os.path.join(os.getcwd(), ".env")
load_dotenv(ENV_PATH)

DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "voiceauth_db")
DB_USER = os.getenv("DB_USER", "voiceuser")
DB_PASS = os.getenv("DB_PASS", "")
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# --- FastAPI DB dependency ---
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- VoiceAuthEngine singleton ---
_voice_engine: VoiceAuthEngine | None = None


def get_voice_engine() -> VoiceAuthEngine:
    global _voice_engine
    if _voice_engine is None:
        embedding_model_name = os.getenv("EMBEDDING_MODEL_NAME", "speechbrain/spkrec-ecapa-voxceleb")
        liveness_model_path = os.getenv("LIVENESS_MODEL_PATH", "")
        _voice_engine = VoiceAuthEngine(embedding_model_name, liveness_model_path)
    return _voice_engine
