from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.deps import engine
from app.models.orm_models import Base

# create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="VoiceAuth Core")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}


# -------- ROUTERS --------
from app.api import routes_enroll, routes_auth
from app.api.routes_signup import router as signup_router
from app.api.routes_auth_challenge import router as challenge_router
from app.api.routes_auth_verify import router as verify_router

app.include_router(routes_enroll.router)
app.include_router(routes_auth.router)
app.include_router(signup_router)
app.include_router(challenge_router)
app.include_router(verify_router)