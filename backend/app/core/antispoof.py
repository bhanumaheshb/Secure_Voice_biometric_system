import numpy as np
import onnxruntime as ort
import librosa


class AntiSpoofingModel:
    def __init__(self, model_path):
        providers = ["CPUExecutionProvider"]
        self.session = ort.InferenceSession(model_path, providers=providers)

    def predict(self, wav_path):
        audio, sr = librosa.load(wav_path, sr=16000)
        audio = audio.astype(np.float32)

        ort_inputs = {"input": audio.reshape(1, -1)}
        out = self.session.run(None, ort_inputs)[0]

        # Output ~ [bonafide_score, spoof_score]
        bonafide = float(out[0][0])
        spoof = float(out[0][1])

        return {
            "real_score": bonafide,
            "spoof_score": spoof,
            "deepfake_prob": spoof / (bonafide + spoof + 1e-6)
        }
