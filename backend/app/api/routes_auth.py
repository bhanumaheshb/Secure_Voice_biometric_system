# backend/app/api/routes_auth.py

import os

from fastapi import APIRouter, Depends, UploadFile, File, Header, HTTPException, Form
from sqlalchemy.orm import Session

from app.deps import get_db, get_voice_engine
from app.models.orm_models import Client, User, VoiceProfile, AuthLog

router = APIRouter()


def verify_api_key(x_api_key: str | None) -> None:
    expected = os.getenv("API_MASTER_KEY", "dev-secret-key")
    if x_api_key is None or x_api_key != expected:
        raise HTTPException(status_code=401, detail="Invalid API key")


def get_default_client(db: Session) -> Client:
    name = "default-client"
    client = db.query(Client).filter_by(name=name).first()
    if not client:
        raise HTTPException(status_code=400, detail="Default client not found; enroll first.")
    return client


@router.post("/")
async def authenticate_user(
    external_user_id: str = Form(...),
    file: UploadFile = File(...),
    x_api_key: str | None = Header(default=None),
    db: Session = Depends(get_db),
    engine=Depends(get_voice_engine),
):
    """
    Authenticate a user by voice.
    """
    # 1) API key check
    verify_api_key(x_api_key)

    # 2) Read audio
    audio_bytes = await file.read()
    if not audio_bytes:
        raise HTTPException(status_code=400, detail="Empty audio file")

    # 3) Find client & user
    client = get_default_client(db)
    user = (
        db.query(User)
        .filter(User.client_id == client.id, User.external_user_id == external_user_id)
        .first()
    )
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    profile = db.query(VoiceProfile).filter(VoiceProfile.user_id == user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Voice profile not enrolled")

    # 4) Run verification
    result = engine.verify(
        audio_bytes,
        stored_embedding_str=profile.embedding,
        liveness_threshold=0.7,
        similarity_threshold=0.55,
    )

    # 5) Log attempt
    log = AuthLog(
        user_id=user.id,
        client_id=client.id,
        success=bool(result.get("auth")),
        similarity=result.get("similarity"),
        live_prob=result.get("live_prob"),
        reason=result.get("reason"),
    )
    db.add(log)
    db.commit()

    return result
