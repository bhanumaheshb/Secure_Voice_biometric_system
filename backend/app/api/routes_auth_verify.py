# app/api/routes_auth_verify.py

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.deps import get_voice_engine
from app.api.routes_auth_challenge import challenge_store
import time
import speech_recognition as sr
import tempfile
import os

router = APIRouter(prefix="/verify", tags=["Verify"])

def speech_to_text(audio_file_path: str) -> str:
    r = sr.Recognizer()
    with sr.AudioFile(audio_file_path) as source:
        audio = r.record(source)
    try:
        return r.recognize_google(audio)
    except Exception:
        return ""

@router.post("/")
def verify_audio(
    external_user_id: str = Form(...),
    file: UploadFile = File(...)
):
    engine = get_voice_engine()

    if external_user_id not in challenge_store:
        raise HTTPException(status_code=400, detail="Challenge not generated")

    stored = challenge_store[external_user_id]

    if time.time() - stored["timestamp"] > 12:
        del challenge_store[external_user_id]
        raise HTTPException(status_code=400, detail="Challenge expired")

    expected_challenge = stored["challenge"]

    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
        tmp.write(file.file.read())
        audio_path = tmp.name

    try:
        # Anti-spoof
        spk = engine.check_spoof(audio_path)
        if not spk["anti_spoof_ok"]:
            return {
                "auth": False,
                "reason": "spoof_detected",
            }

        # Speaker verification
        auth_result = engine.authenticate_voice(external_user_id, audio_path)

        # Speech recognition
        spoken = speech_to_text(audio_path).upper().replace(" ", "")
        expected = expected_challenge.upper().replace(" ", "")
        text_match = spoken == expected

        final_auth = (
            auth_result["auth"]
            and auth_result["similarity"] >= 0.75
            and spk["live_prob"] >= 0.85
            and text_match
        )

        return {
            "auth": final_auth,
            "speaker_match": auth_result["auth"],
            "similarity": auth_result["similarity"],
            "live_prob": spk["live_prob"],
            "text_match": text_match,
            "expected": expected,
            "heard": spoken,
        }

    finally:
        os.remove(audio_path)
