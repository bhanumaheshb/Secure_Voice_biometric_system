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


# ---------------- REGISTER ----------------
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


# ---------------- LOGIN STEP 1 ----------------
def verify_step1(user, audio):
    if not user:
        return {"error": "Enter user ID"}, False
    if audio is None:
        return {"error": "Record audio"}, False

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
        result = safe_json(r)

        if result.get("success"):
            return result, True
        return result, False
    finally:
        os.remove(path)


# ---------------- GET CHALLENGE ----------------
def get_challenge(user):
    if not user:
        return ""

    r = requests.get(
        f"{API_BASE}/auth/challenge/",
        params={"user_id": user},
        timeout=5
    )

    data = safe_json(r)
    return data.get("challenge", "")


# ---------------- LOGIN STEP 2 ----------------
def verify_challenge(user, audio):
    if not user:
        return {"error": "Enter user ID"}, False
    if audio is None:
        return {"error": "Record audio"}, False

    path = save_audio(audio)

    try:
        with open(path, "rb") as f:
            r = requests.post(
                f"{API_BASE}/auth/verify/",
                data={"external_user_id": user},
                files={"file": f},
                timeout=25
            )
        result = safe_json(r)

        if result.get("verified"):
            return result, True
        return result, False
    finally:
        os.remove(path)


# ---------------- PAGE NAVIGATION ----------------
def go_to_login():
    return gr.update(visible=False), gr.update(visible=True), gr.update(visible=False)


def go_to_register():
    return gr.update(visible=True), gr.update(visible=False), gr.update(visible=False)


def go_to_dashboard():
    return gr.update(visible=False), gr.update(visible=False), gr.update(visible=True)


# ---------------- UI ----------------
with gr.Blocks(title="Voice Auth System", theme=gr.themes.Soft()) as demo:

    gr.Markdown("# 🔐 Secure Voice Authentication System")

    login_state = gr.State(False)

    # -------- REGISTER PAGE --------
    with gr.Column(visible=True) as register_page:
        gr.Markdown("## 📝 Register")

        reg_user = gr.Textbox(label="User ID")
        reg_audio = gr.Audio(sources=["microphone"], type="numpy")
        reg_btn = gr.Button("Register Voice")
        reg_out = gr.JSON()

        reg_btn.click(enroll, [reg_user, reg_audio], reg_out)

        go_login_btn = gr.Button("Already Registered? Login →")
        go_login_btn.click(go_to_login, outputs=[register_page, login_page := gr.Column(), gr.Column()])


    # -------- LOGIN PAGE --------
    with gr.Column(visible=False) as login_page:
        gr.Markdown("## 🔓 Login")

        log_user = gr.Textbox(label="User ID")

        gr.Markdown("### Step 1: Speaker Verification")
        log_audio1 = gr.Audio(sources=["microphone"], type="numpy")
        log_btn1 = gr.Button("Verify Speaker")
        log_out1 = gr.JSON()

        log_btn1.click(verify_step1, [log_user, log_audio1], [log_out1, login_state])

        gr.Markdown("### Step 2: Challenge Verification")
        challenge_box = gr.Textbox(label="Challenge", interactive=False)
        get_ch_btn = gr.Button("Generate Challenge")
        get_ch_btn.click(get_challenge, [log_user], challenge_box)

        log_audio2 = gr.Audio(sources=["microphone"], type="numpy")
        log_btn2 = gr.Button("Verify Challenge")
        log_out2 = gr.JSON()

        log_btn2.click(verify_challenge, [log_user, log_audio2], [log_out2, login_state])\
            .then(lambda x: go_to_dashboard() if x else (gr.update(), gr.update(), gr.update()),
                  login_state,
                  outputs=[register_page, login_page, dashboard_page := gr.Column()])


        back_btn = gr.Button("← Back to Register")
        back_btn.click(go_to_register, outputs=[register_page, login_page, dashboard_page])


    # -------- DASHBOARD PAGE --------
    with gr.Column(visible=False) as dashboard_page:
        gr.Markdown("## 🎉 Welcome to Dashboard")
        gr.Markdown("""
        ✅ Speaker Verified  
        ✅ Challenge Passed  
        🔒 You are securely authenticated  
        """)

        logout_btn = gr.Button("Logout")
        logout_btn.click(go_to_register, outputs=[register_page, login_page, dashboard_page])


demo.launch()