# 🎙 Voice Authentication System

A secure **voice-based authentication system** built using **FastAPI, Deep Learning, and Gradio**.
This project performs **speaker verification** and basic **anti-spoofing** to prevent unauthorized access using recorded or fake voices.

---

## 📌 Features

* 🎤 **Voice Enrollment** – Register a user using their voice
* 🔐 **Voice Authentication** – Verify user identity using voice
* 🧠 **Deep Learning Speaker Embeddings**
* 🛡️ **Liveness Detection (Anti-Spoofing)**
* 🌐 **FastAPI Backend**
* 🖥️ **Gradio Web UI**
* 📡 REST API support for integration with other apps

---

## 🧠 Models Used

* **Speaker Embedding Model:**
  `speechbrain/spkrec-ecapa-voxceleb` (from Hugging Face)

* **Anti-Spoofing Model:**
  RawNet2 (ASVspoof) – ONNX format

* **Liveness Model:**
  Audio-based spoof detection

---

## 🧩 Tech Stack

* Python
* FastAPI
* Gradio
* PyTorch
* SpeechBrain
* NumPy, SciPy
* Hugging Face Hub
* ONNX Runtime

---

## 📂 Project Structure

```
Voice Auth/
│
├── backend/
│   ├── app/
│   │   ├── api/        # API routes (enroll, auth)
│   │   ├── core/       # ML engine (embedding, spoof, liveness)
│   │   ├── deps.py
│   │   └── main.py
│   └── pretrained_models/
│
├── gradio_app.py
└── README.md
```

---

## 🚀 How to Run

### 1️⃣ Activate Virtual Environment

```bash
source venv/bin/activate
```

### 2️⃣ Start Backend

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

### 3️⃣ Start Gradio UI

```bash
python gradio_app.py
```

Open browser:

```
http://127.0.0.1:7860
```

---

## 🔁 API Endpoints

| Endpoint   | Method | Description        |
| ---------- | ------ | ------------------ |
| `/enroll/` | POST   | Enroll user voice  |
| `/auth/`   | POST   | Authenticate voice |
| `/health`  | GET    | Server status      |

---

## 🧪 Workflow

1. User enrolls voice
2. System extracts voice embedding
3. Embedding stored in DB
4. On login:

   * New voice recorded
   * Compared with stored embedding
   * Liveness & spoof checks applied
5. Access granted if match

---

## 🧠 Why Hugging Face?

Hugging Face is used to:

* Download pretrained deep learning models
* Load speaker recognition models
* Use anti-spoofing ONNX models
* Avoid training models from scratch

---

## ⚠️ Challenges Faced

* Dependency conflicts (huggingface_hub, gradio)
* Model file path issues
* Audio format handling (WAV conversion)
* API route mismatches
* Anti-spoof model loading errors
* CORS and JSON errors
* File upload & microphone handling

---

## 🏦 Use Cases

* Banking login
* Secure apps
* Attendance systems
* Voice-based access control
* Call center authentication
* Smart lock systems

---

## 👨‍💻 Author

**Bhanu Mahesh B**
Voice Authentication using Deep Learning

---

## 📌 Future Improvements

* Multi-factor auth (voice + OTP)
* Database (MySQL/PostgreSQL)
* Mobile app integration
* Noise-robust models
* Cloud deployment

