import io
import numpy as np
import torch
import torchaudio
import soundfile as sf

TARGET_SR = 16000


def load_audio_from_bytes(audio_bytes: bytes, target_sr: int = TARGET_SR):
    """
    Load audio from raw bytes (supports WAV + WebM),
    convert to mono, resample, normalize.
    """

    bio = io.BytesIO(audio_bytes)

    try:
        # First try soundfile (WAV)
        y, sr = sf.read(bio, dtype="float32")

        if y.ndim == 2:
            y = np.mean(y, axis=1)

        wav = torch.from_numpy(y)

    except Exception:
        # If soundfile fails → try torchaudio (WebM)
        bio.seek(0)
        wav, sr = torchaudio.load(bio)

        # convert to mono
        if wav.shape[0] > 1:
            wav = torch.mean(wav, dim=0)

        wav = wav.squeeze(0)

    # Resample
    if sr != target_sr:
        wav = torchaudio.transforms.Resample(orig_freq=sr, new_freq=target_sr)(wav)
        sr = target_sr

    # Remove DC offset
    wav = wav - wav.mean()

    # Normalize
    max_val = wav.abs().max()
    if max_val > 0:
        wav = wav / max_val

    return wav, sr