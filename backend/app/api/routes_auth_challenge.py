# app/api/routes_auth_challenge.py

import random
import string
import time
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/challenge", tags=["Auth Challenge"])

challenge_store = {}

class ChallengeResponse(BaseModel):
    challenge: str
    expires_in: int

def generate_random_challenge():
    chars = string.ascii_uppercase + string.digits
    return " ".join(random.sample(chars, 5))

@router.get("/", response_model=ChallengeResponse)
def get_challenge(user_id: str):
    challenge = generate_random_challenge()
    challenge_store[user_id] = {
        "challenge": challenge,
        "timestamp": time.time(),
    }
    return ChallengeResponse(challenge=challenge, expires_in=10)
