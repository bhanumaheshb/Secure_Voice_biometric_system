from fastapi import APIRouter, UploadFile, File, Form, Depends, Header, HTTPException
from sqlalchemy.orm import Session
from app.deps import get_db, get_voice_engine
from app.models.orm_models import Client, User, VoiceProfile
from app.core.engine import serialize_embedding
import os
import numpy as np

router = APIRouter(tags=["Signup"])  # ❌ NO prefix here


def verify_api_key(x_api_key: str | None):
    expected = os.getenv("API_MASTER_KEY", "dev-secret-key")
    if x_api_key != expected:
        raise HTTPException(status_code=401, detail="Invalid API key")


@router.post("/signup/enroll")
async def enroll_double(
    external_user_id: str = Form(...),
    display_name: str = Form(...),
    file1: UploadFile = File(...),
    file2: UploadFile = File(...),
    x_api_key: str | None = Header(default=None),
    db: Session = Depends(get_db),
    engine=Depends(get_voice_engine),
):
    verify_api_key(x_api_key)

    audio1 = await file1.read()
    audio2 = await file2.read()

    if not audio1 or not audio2:
        raise HTTPException(status_code=400, detail="Both recordings required")

    # Liveness
    live1 = engine.check_liveness(audio1)
    live2 = engine.check_liveness(audio2)

    if live1 < 0.7 or live2 < 0.7:
        return {"success": False, "reason": "spoof_detected"}

    # Embeddings
    emb1 = engine.extract_embedding(audio1)
    emb2 = engine.extract_embedding(audio2)
 

    emb1 = np.array(emb1)
    emb2 = np.array(emb2)

    # similarity check between recording 1 and 2
    similarity = float(np.dot(emb1, emb2) / (np.linalg.norm(emb1) * np.linalg.norm(emb2)))

    if similarity < 0.65:
        return {
            "success": False,
            "reason": "voice_samples_not_matching",
            "similarity": similarity,
        }

    final_embedding = (emb1 + emb2) / 2
    emb_str = serialize_embedding(final_embedding)
    # Client
    client = db.query(Client).filter_by(name="default-client").first()
    if not client:
        client = Client(name="default-client", api_key="dev-secret-key")
        db.add(client)
        db.commit()
        db.refresh(client)

    # User (avoid duplicate)
    user = (
        db.query(User)
        .filter(User.external_user_id == external_user_id)
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

    profile = VoiceProfile(
        user_id=user.id,
        embedding=emb_str,
        model_name="ecapa-tdnn",
    )

    db.add(profile)
    db.commit()

    return {
        "success": True,
        "message": "Double enrollment successful",
        "similarity": similarity,
        "user_id": user.id,
    }