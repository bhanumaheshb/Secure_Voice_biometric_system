# backend/app/api/routes_enroll.py

import os

from fastapi import APIRouter, Depends, UploadFile, File, Header, HTTPException, Form
from sqlalchemy.orm import Session

from app.deps import get_db, get_voice_engine
from app.models.orm_models import Client, User, VoiceProfile
from app.core.engine import serialize_embedding

router = APIRouter()


def verify_api_key(x_api_key: str | None) -> None:
    expected = os.getenv("API_MASTER_KEY", "dev-secret-key")
    if x_api_key is None or x_api_key != expected:
        raise HTTPException(status_code=401, detail="Invalid API key")


def get_or_create_default_client(db: Session) -> Client:
    name = "default-client"
    api_key = os.getenv("API_MASTER_KEY", "dev-secret-key")
    client = db.query(Client).filter_by(name=name).first()
    if client:
        return client
    client = Client(name=name, api_key=api_key)
    db.add(client)
    db.commit()
    db.refresh(client)
    return client


@router.post("/")
async def enroll_user(
    external_user_id: str = Form(...),
    display_name: str | None = Form(None),
    file: UploadFile = File(...),
    x_api_key: str | None = Header(default=None),
    db: Session = Depends(get_db),
    engine=Depends(get_voice_engine),
):
    """
    Enroll or update a user's voice profile.
    """
    # 1) Check API key
    verify_api_key(x_api_key)

    # 2) Read audio
    audio_bytes = await file.read()
    if not audio_bytes:
        raise HTTPException(status_code=400, detail="Empty audio file")

    # 3) Liveness check (anti-spoof)
    live_prob = engine.check_liveness(audio_bytes)
    if live_prob < 0.7:
        return {
            "success": False,
            "reason": "not_live_or_spoof",
            "live_prob": live_prob,
        }

    # 4) Extract embedding
    emb = engine.extract_embedding(audio_bytes)
    emb_str = serialize_embedding(emb)

    # 5) Get or create client
    client = get_or_create_default_client(db)

    # 6) Get or create user
    user = (
        db.query(User)
        .filter(User.client_id == client.id, User.external_user_id == external_user_id)
        .first()
    )
    if not user:
        user = User(
            client_id=client.id,
            external_user_id=external_user_id,
            display_name=display_name or external_user_id,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    # 7) Create or update voice profile (only one profile per user for now)
    profile = db.query(VoiceProfile).filter(VoiceProfile.user_id == user.id).first()
    if not profile:
        profile = VoiceProfile(
            user_id=user.id,
            embedding=emb_str,
            model_name="ecapa-tdnn",
        )
        db.add(profile)
    else:
        profile.embedding = emb_str

    db.commit()

    return {
        "success": True,
        "user_id": user.id,
        "live_prob": live_prob,
        "message": "Voice enrolled/updated successfully",
    }
