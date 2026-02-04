from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import routes_enroll, routes_auth

app = FastAPI(title="VoiceAuth Core")

# Allow frontend (5500) to call backend (8000)
origins = [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

app.include_router(routes_enroll.router, prefix="/enroll", tags=["enroll"])
app.include_router(routes_auth.router, prefix="/auth", tags=["auth"])
from app.api.routes_auth_challenge import router as challenge_router
from app.api.routes_auth_verify import router as verify_router

app.include_router(challenge_router, prefix="/auth", tags=["auth"])
app.include_router(verify_router, prefix="/auth", tags=["auth"])
