# backend/app/core/embeddings.py

import numpy as np
import torch
from speechbrain.pretrained import EncoderClassifier

from app.core.audio import load_audio_from_bytes


class EmbeddingModel:
    """
    Wraps SpeechBrain ECAPA-TDNN to generate speaker embeddings.
    """

    def __init__(self, model_name_or_path: str = "speechbrain/spkrec-ecapa-voxceleb", device: str = "cpu"):
        # This will download model on first use (requires internet once)
        self.device = device
        self.encoder = EncoderClassifier.from_hparams(
            source=model_name_or_path,
            run_opts={"device": self.device},
            savedir="pretrained_models/ecapa-voxceleb",
        )

    def get_embedding_from_wave(self, wav: torch.Tensor, sr: int) -> np.ndarray:
        """
        wav: 1D torch tensor at 16kHz
        Returns: L2-normalized numpy vector (embedding)
        """
        if wav.ndim == 1:
            wav = wav.unsqueeze(0)  # shape (1, N)

        with torch.no_grad():
            emb = self.encoder.encode_batch(wav.to(self.device))  # (1, 1, D) or (1, D)
            emb = emb.squeeze().cpu().numpy().astype("float32")

        # L2 normalize
        norm = np.linalg.norm(emb) + 1e-9
        emb = emb / norm
        return emb

    def get_embedding(self, audio_bytes: bytes) -> np.ndarray:
        wav, sr = load_audio_from_bytes(audio_bytes)
        return self.get_embedding_from_wave(wav, sr)
