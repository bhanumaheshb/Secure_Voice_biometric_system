# backend/app/core/liveness.py

import math
import torch
import torchaudio

from app.core.audio import load_audio_from_bytes


class LivenessModel:
    """
    Placeholder liveness model (anti-spoof).
    Uses simple spectral variation heuristic for now.
    Later you can replace this with a trained CNN model.
    """

    def __init__(self, path: str | None = None):
        self.path = path  # reserved for future real model

    def predict(self, audio_bytes: bytes) -> float:
        """
        Returns a "live probability" in [0, 1].
        Higher = more likely genuine live speech.
        """
        wav, sr = load_audio_from_bytes(audio_bytes)

        # Compute spectrogram
        spec = torchaudio.transforms.Spectrogram(n_fft=400, hop_length=160, power=2.0)(wav)
        # spec shape: (freq, time)

        # Look at energy variation over time
        energy_over_time = spec.mean(dim=0)  # (time,)
        var = float(energy_over_time.var().item())

        # Map variance to [0, 1] using a squashing function
        # These constants are heuristic; you can tune later
        live_prob = 1.0 - math.exp(-var * 5.0)
        live_prob = max(0.0, min(1.0, live_prob))
        return live_prob
