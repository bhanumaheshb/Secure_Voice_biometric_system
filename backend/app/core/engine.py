# backend/app/core/engine.py

from typing import Optional

import numpy as np
from app.core.antispoof import AntiSpoofingModel

from app.core.embeddings import EmbeddingModel
from app.core.liveness import LivenessModel
from app.core.antispoof import AntiSpoofingModel
from app.core.mic_detector import MicReplayDetector



def serialize_embedding(emb: np.ndarray) -> str:
    """
    Convert embedding vector to a comma-separated string for DB storage.
    """
    return ",".join(f"{x:.8f}" for x in emb.astype("float32"))


def deserialize_embedding(s: str) -> np.ndarray:
    """
    Convert comma-separated string back to numpy vector.
    """
    if not s:
        return np.zeros(1, dtype="float32")
    parts = s.split(",")
    arr = np.array([float(x) for x in parts], dtype="float32")
    # Normalize just in case
    norm = np.linalg.norm(arr) + 1e-9
    return arr / norm


class VoiceAuthEngine:
    def __init__(self, embedding_model_name: str | None = None, liveness_model_path: str | None = None):
        self.embedder = EmbeddingModel(
            model_name_or_path=embedding_model_name or "speechbrain/spkrec-ecapa-voxceleb",
            device="cpu",
        )
        self.liveness = LivenessModel(liveness_model_path)

    def extract_embedding(self, audio_bytes: bytes) -> np.ndarray:
        return self.embedder.get_embedding(audio_bytes)

    def check_liveness(self, audio_bytes: bytes) -> float:
        return self.liveness.predict(audio_bytes)

    def verify(
        self,
        audio_bytes: bytes,
        stored_embedding_str: Optional[str],
        liveness_threshold: float = 0.7,
        similarity_threshold: float = 0.55,
    ) -> dict:
        """
        Full verification step:
        - check liveness
        - compare embedding to stored template
        Returns dict with fields: auth, similarity, live_prob, reason
        """
        # 1) Liveness
        live_prob = self.check_liveness(audio_bytes)
        if live_prob < liveness_threshold:
            return {
                "auth": False,
                "reason": "spoof_detected",
                "live_prob": float(live_prob),
                "similarity": None,
            }

        # 2) Check template exists
        if stored_embedding_str is None:
            return {
                "auth": False,
                "reason": "no_template",
                "live_prob": float(live_prob),
                "similarity": None,
            }

        # 3) Embedding similarity
        test_emb = self.extract_embedding(audio_bytes)
        ref_emb = deserialize_embedding(stored_embedding_str)

        # cosine similarity
        dot = float(np.dot(test_emb, ref_emb))
        sim = dot  # both are L2 normalized, so dot = cosine similarity in [-1, 1]

        if sim < similarity_threshold:
            return {
                "auth": False,
                "reason": "not_same_speaker",
                "live_prob": float(live_prob),
                "similarity": float(sim),
            }

        return {
            "auth": True,
            "reason": "ok",
            "live_prob": float(live_prob),
            "similarity": float(sim),
        }
