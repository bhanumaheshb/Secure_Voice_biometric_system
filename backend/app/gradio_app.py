import gradio as gr
import requests
import soundfile as sf
import tempfile
import os

API_BASE = "http://127.0.0.1:8000"
API_KEY = "dev-secret-key"


# ---------------- Utils ----------------
def save_audio(audio):
    sr, data = audio
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
    sf.write(tmp.name, data, sr)
    return tmp.name


def safe_json(resp):
    try:
        return resp.json()
    except Exception:
        return {
            "error": "Invalid backend response",
            "status_code": resp.status_code,
            "text": resp.text
        }


# ---------------- ENROLL ----------------
def enroll(user, audio):
    if not user:
        return {"error": "Enter user ID"}
    if audio is None:
        return {"error": "Record audio"}

    path = save_audio(audio)

    try:
        with open(path, "rb") as f:
            r = requests.post(
                f"{API_BASE}/enroll/",
                headers={"x-api-key": API_KEY},
                data={
                    "external_user_id": user,
                    "display_name": user
                },
                files={"file": f},
                timeout=20
            )
        return safe_json(r)
    finally:
        os.remove(path)


# ---------------- STEP 1 AUTH ----------------
def verify_step1(user, audio):
    if not user:
        return {"error": "Enter user ID"}
    if audio is None:
        return {"error": "Record audio"}

    path = save_audio(audio)

    try:
        with open(path, "rb") as f:
            r = requests.post(
                f"{API_BASE}/auth/",
                headers={"x-api-key": API_KEY},
                data={"external_user_id": user},
                files={"file": f},
                timeout=20
            )
        return safe_json(r)
    finally:
        os.remove(path)


# ---------------- GET CHALLENGE ----------------
def get_challenge(user):
    if not user:
        return "", ""

    r = requests.get(
        f"{API_BASE}/auth/challenge/",
        params={"user_id": user},
        timeout=5
    )

    data = safe_json(r)
    return data.get("challenge", ""), data.get("challenge", "")


# ---------------- VERIFY CHALLENGE ----------------
def verify_challenge(user, audio, _):
    if not user:
        return {"error": "Enter user ID"}
    if audio is None:
        return {"error": "Record audio"}

    path = save_audio(audio)

    try:
        with open(path, "rb") as f:
            r = requests.post(
                f"{API_BASE}/auth/verify/",
                data={"external_user_id": user},
                files={"file": f},
                timeout=25
            )
        return safe_json(r)
    finally:
        os.remove(path)


# ---------------- UI ----------------
with gr.Blocks(title="Voice Authentication System") as demo:

    gr.Markdown("## 🔐 Voice Authentication (Anti-Spoof + Challenge)")

    user = gr.Textbox(label="User ID", placeholder="e.g. bhanu")

    # -------- ENROLL --------
    with gr.Tab("🎙 Enroll Voice"):
        audio_en = gr.Audio(sources=["microphone"], type="numpy")
        en_btn = gr.Button("Enroll")
        en_out = gr.JSON()
        en_btn.click(enroll, [user, audio_en], en_out)

    # -------- STEP 1 --------
    with gr.Tab("🔓 Authenticate (Step 1)"):
        audio1 = gr.Audio(sources=["microphone"], type="numpy")
        v1_btn = gr.Button("Verify Speaker")
        v1_out = gr.JSON()
        v1_btn.click(verify_step1, [user, audio1], v1_out)

    # -------- STEP 2 --------
    with gr.Tab("🔐 Challenge Verification (Step 2)"):
        challenge_box = gr.Textbox(label="Challenge", interactive=False)
        hidden = gr.Textbox(visible=False)

        g_btn = gr.Button("Generate Challenge")

        audio2 = gr.Audio(sources=["microphone"], type="numpy")
        v2_btn = gr.Button("Verify Challenge")
        v2_out = gr.JSON()

        g_btn.click(get_challenge, [user], [challenge_box, hidden])
        v2_btn.click(verify_challenge, [user, audio2, hidden], v2_out)

demo.launch()
