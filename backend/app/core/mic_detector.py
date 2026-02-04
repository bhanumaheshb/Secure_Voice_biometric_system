import librosa
import numpy as np

class MicReplayDetector:
    def predict(self, wav_path):
        y, sr = librosa.load(wav_path, sr=16000)

        # 1. High-frequency energy drops heavily in recordings
        hf_energy = np.mean(np.abs(librosa.stft(y, n_fft=512)[200:]))
        # 2. Replay audio has unusual reverberation tail
        rt60 = np.sum(np.abs(y[-2000:]))

        replay_score = (rt60 > 30_000) + (hf_energy < 0.003)

        return {
            "is_replay": replay_score > 1,
            "hf_energy": float(hf_energy),
            "rt60_tail": float(rt60)
        }
