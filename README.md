🚀 Features

🎤 Voice Enrollment (register user by voice)

🔓 Voice Authentication (verify speaker identity)

🧠 Deep Learning based speaker embeddings

🛡 Anti-spoofing (deepfake / replay detection – experimental)

🌐 REST API using FastAPI

🖥 Interactive UI using Gradio

🧰 Tech Stack

Backend: FastAPI

Frontend/UI: Gradio

ML Models:

speechbrain/spkrec-ecapa-voxceleb (Speaker embedding)

RawNet2 (ASVspoof anti-spoofing – optional)

Audio Processing: librosa, soundfile, numpy

Inference: PyTorch, ONNX Runtime

API Testing: curl / browser / Gradio UI

🧠 Models Used
1. Speaker Recognition Model

From Hugging Face:

speechbrain/spkrec-ecapa-voxceleb


Used to:

Extract speaker embeddings

Compare voice similarity using cosine similarity

2. Anti-Spoofing Model (optional)
RawNet2 (ASVspoof2019)


Used to detect:

Deepfake audio

Replay attacks

🏗 System Flow
Enrollment:

User records voice

System extracts voice embedding

Embedding is stored for that user

Authentication:

User records voice again

System extracts new embedding

Compares with stored embedding

If similarity > threshold → Auth Success

(Optional)
5. Anti-spoof & liveness check

📂 Project Structure
backend/
 ├── app/
 │   ├── api/        # API routes
 │   ├── core/       # ML engine
 │   ├── deps.py     # Dependencies
 │   └── main.py     # FastAPI entry
 ├── pretrained_models/
 └── requirements.txt

gradio_app.py        # UI

▶️ How to Run
1. Activate environment
source .venv/bin/activate

2. Run backend
cd backend
uvicorn app.main:app --reload --port 8000

3. Run UI
cd backend/app
python gradio_app.py


Open in browser:

http://127.0.0.1:7860

📡 API Endpoints
Method	Endpoint	Purpose
POST	/enroll/	Enroll voice
POST	/auth/	Authenticate voice
GET	/health	Server health

(Challenge-response was also experimented)

⚠️ Challenges Faced

Dependency conflicts (huggingface_hub vs gradio)

Model file path errors

ONNX model loading issues

Audio format mismatches

Routing errors in FastAPI

Challenge-response integration complexity

🤗 Why Hugging Face Was Used

Hugging Face provided:

Pretrained speaker recognition model

Model downloading and management

Reliable research-grade models

Easy integration with PyTorch

Without Hugging Face:
❌ Training model from scratch
❌ Large dataset requirement
❌ Weeks of training

With Hugging Face:
✅ Ready-to-use model
✅ High accuracy
✅ Faster development

🏦 Possible Applications

Banking login by voice

Call-center identity verification

Smart home authentication

Secure apps

IVR systems

KYC systems

📌 Future Improvements

Proper SQL database for embeddings

Stronger anti-spoofing

Mobile app integration

Multi-language support

Model fine-tuning

JWT authentication

Cloud deployment

👨‍💻 Author

Bhanu Mahesh
Computer Science (AI/ML)
Voice Biometrics Project
