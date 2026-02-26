# backend/app/deps.py

import os
from typing import Generator

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from app.core.engine import VoiceAuthEngine
from app.models.orm_models import Base

load_dotenv()

# -----------------------
# DATABASE CONFIG
# -----------------------

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./voiceauth.db")

if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Create tables automatically
Base.metadata.create_all(bind=engine)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -----------------------
# VOICE ENGINE SINGLETON
# -----------------------

_voice_engine: VoiceAuthEngine | None = None


def get_voice_engine() -> VoiceAuthEngine:
    global _voice_engine
    if _voice_engine is None:
        embedding_model_name = os.getenv(
            "EMBEDDING_MODEL_NAME",
            "speechbrain/spkrec-ecapa-voxceleb"
        )
        liveness_model_path = os.getenv("LIVENESS_MODEL_PATH", "")

        _voice_engine = VoiceAuthEngine(
            embedding_model_name,
            liveness_model_path
        )

    return _voice_engine