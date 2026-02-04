# backend/app/core/audio.py

import io
import numpy as np
import soundfile as sf
import torch
import torchaudio

TARGET_SR = 16000


def load_audio_from_bytes(audio_bytes: bytes, target_sr: int = TARGET_SR):
    """
    Load audio from raw bytes, convert to mono, resample to target_sr, normalize.
    Returns: waveform (1D torch.Tensor), sample_rate (int)
    """
    # Read using soundfile
    bio = io.BytesIO(audio_bytes)
    y, sr = sf.read(bio, dtype="float32")  # y: np.ndarray

    # If stereo, convert to mono
    if y.ndim == 2:
        y = np.mean(y, axis=1)

    # Convert to torch tensor
    wav = torch.from_numpy(y)

    # Resample if needed
    if sr != target_sr:
        wav = torchaudio.transforms.Resample(orig_freq=sr, new_freq=target_sr)(wav)
        sr = target_sr

    # Remove DC offset
    wav = wav - wav.mean()

    # Normalize to [-1, 1]
    max_val = wav.abs().max()
    if max_val > 0:
        wav = wav / max_val

    return wav, sr
