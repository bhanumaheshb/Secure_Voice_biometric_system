from fastapi import APIRouter, UploadFile, File, Form, Header, Depends, HTTPException
from sqlalchemy.orm import Session
import os
import numpy as np

from app.deps import get_db, get_voice_engine
from app.models.orm_models import Client, User, VoiceProfile
from app.core.engine import serialize_embedding

router = APIRouter(prefix="/signup/enroll", tags=["Signup"])

API_KEY = os.getenv("API_MASTER_KEY", "dev-secret-key")


@router.post("/enroll/")
async def enroll_double(
    external_user_id: str = Form(...),
    display_name: str = Form(...),
    file1: UploadFile = File(...),
    file2: UploadFile = File(...),
    x_api_key: str | None = Header(default=None),
    db: Session = Depends(get_db),
    engine=Depends(get_voice_engine),
):
    if x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")

    # Read both files
    audio1 = await file1.read()
    audio2 = await file2.read()

    if not audio1 or not audio2:
        raise HTTPException(status_code=400, detail="Empty audio")

    # Extract embeddings
    emb1 = engine.extract_embedding(audio1)
    emb2 = engine.extract_embedding(audio2)

    # Average them (stronger biometric profile)
    final_embedding = np.mean([emb1, emb2], axis=0)
    emb_str = serialize_embedding(final_embedding)

    # Get or create client
    client = db.query(Client).filter_by(name="default-client").first()
    if not client:
        client = Client(name="default-client", api_key=API_KEY)
        db.add(client)
        db.commit()
        db.refresh(client)

    # Get or create user
    user = (
        db.query(User)
        .filter(User.client_id == client.id, User.external_user_id == external_user_id)
        .first()
    )

    if not user:
        user = User(
            client_id=client.id,
            external_user_id=external_user_id,
            display_name=display_name,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    # Save voice profile
    profile = db.query(VoiceProfile).filter_by(user_id=user.id).first()

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
        "message": "Voice enrolled successfully",
        "user_id": user.id,
    }