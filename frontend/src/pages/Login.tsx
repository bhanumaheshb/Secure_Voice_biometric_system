import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000";
const API_KEY = "dev-secret-key";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0b0f;
    --surface: #111318;
    --surface2: #181b22;
    --border: rgba(255,255,255,0.07);
    --border-active: rgba(99,179,237,0.4);
    --text: #e8eaf0;
    --text-muted: #6b7280;
    --accent: #63b3ed;
    --accent2: #9f7aea;
    --accent-glow: rgba(99,179,237,0.15);
    --green: #48bb78;
    --red: #fc8181;
    --radius: 12px;
    --radius-lg: 18px;
  }

  body { background: var(--bg); }

  .login-wrapper {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
  }

  .login-card {
    width: 100%;
    max-width: 460px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03);
  }

  .card-header {
    padding: 36px 36px 28px;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(135deg, rgba(99,179,237,0.04) 0%, rgba(159,122,234,0.04) 100%);
  }

  .logo-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .logo-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
  }

  .logo-text {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 0.02em;
    color: var(--text);
  }

  .logo-badge {
    font-size: 10px;
    font-weight: 500;
    color: var(--accent);
    background: rgba(99,179,237,0.1);
    border: 1px solid rgba(99,179,237,0.2);
    padding: 2px 7px;
    border-radius: 20px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .card-title {
    font-family: 'Syne', sans-serif;
    font-size: 26px;
    font-weight: 800;
    color: var(--text);
    line-height: 1.2;
    margin-bottom: 6px;
  }

  .card-subtitle {
    font-size: 14px;
    color: var(--text-muted);
    font-weight: 300;
    line-height: 1.5;
  }

  .card-body {
    padding: 32px 36px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field-label {
    font-size: 11px;
    font-weight: 500;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .field-input {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 11px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--text);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
  }

  .field-input::placeholder { color: var(--text-muted); }

  .field-input:focus {
    border-color: var(--border-active);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .divider-label {
    font-size: 11px;
    color: var(--text-muted);
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .recording-block {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .recording-block.is-recording {
    border-color: rgba(252,129,129,0.3);
    box-shadow: 0 0 0 3px rgba(252,129,129,0.06);
  }

  .recording-block.has-audio {
    border-color: rgba(72,187,120,0.25);
  }

  .rec-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .rec-title-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .rec-icon {
    width: 22px;
    height: 22px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
  }

  .rec-title {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: var(--text);
  }

  .rec-badge {
    font-size: 11px;
    color: var(--text-muted);
  }

  .rec-timer {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: var(--red);
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .rec-timer-dot {
    width: 6px;
    height: 6px;
    background: var(--red);
    border-radius: 50%;
    animation: blink 1s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }

  .canvas-wrap {
    background: #0d0e12;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.04);
  }

  canvas {
    display: block;
    width: 100%;
    height: 56px;
  }

  .status-indicator {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--green);
    font-weight: 500;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    background: var(--green);
    border-radius: 50%;
  }

  .rec-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .btn {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 13px;
    padding: 9px 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    gap: 6px;
    letter-spacing: 0.01em;
  }

  .btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--accent), #4299e1);
    color: white;
  }

  .btn-primary:not(:disabled):hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99,179,237,0.3);
  }

  .btn-danger {
    background: rgba(252,129,129,0.12);
    color: var(--red);
    border: 1px solid rgba(252,129,129,0.2);
  }

  .btn-danger:not(:disabled):hover {
    background: rgba(252,129,129,0.2);
  }

  .btn-ghost {
    background: var(--surface);
    color: var(--text-muted);
    border: 1px solid var(--border);
  }

  .btn-ghost:not(:disabled):hover {
    color: var(--text);
    border-color: rgba(255,255,255,0.12);
  }

  audio {
    width: 100%;
    filter: invert(1) hue-rotate(180deg) brightness(0.7);
    border-radius: 6px;
    height: 32px;
  }

  .card-footer {
    padding: 0 36px 32px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .btn-verify {
    width: 100%;
    padding: 14px;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
    color: white;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .btn-verify:not(:disabled):hover {
    filter: brightness(1.08);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(99,179,237,0.25);
  }

  .btn-verify:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .login-hint {
    text-align: center;
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.5;
  }

  .login-hint a {
    color: var(--accent);
    text-decoration: none;
  }

  .login-hint a:hover { text-decoration: underline; }
`;

export default function Login() {
  const [userId, setUserId] = useState("");
  const [recording, setRecording] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timeoutRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ---------- VISUALIZER ----------
  const setupVisualizer = (stream: MediaStream) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!ctx || !canvas) return;
      analyser.getByteTimeDomainData(dataArray);
      ctx.fillStyle = "#0d0e12";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#63b3ed";
      ctx.beginPath();
      const sliceWidth = canvas.width / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
      animationRef.current = requestAnimationFrame(draw);
    };
    draw();
  };

  const drawIdle = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    ctx.fillStyle = "#0d0e12";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(99,179,237,0.2)";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  };

  // ---------- RECORD ----------
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setupVisualizer(stream);

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      chunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      stream.getTracks().forEach((track) => track.stop());

      const webmBlob = new Blob(chunksRef.current, { type: "audio/webm" });
      const wavBlob = await convertToWav(webmBlob);
      setBlob(wavBlob);
      setRecording(false);
      setSeconds(0);
      drawIdle();
    };

    mediaRecorder.start();
    setRecording(true);
    timerRef.current = window.setInterval(() => setSeconds((p) => p + 1), 1000);
    timeoutRef.current = window.setTimeout(() => mediaRecorder.stop(), 30000);
  };

  const stopRecording = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    mediaRecorderRef.current?.stop();
  };

  const resetRecording = () => {
    setBlob(null);
    drawIdle();
  };

  // ---------- Convert WEBM → WAV ----------
  const convertToWav = async (blob: Blob) => {
    const audioContext = new AudioContext();
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const wavBuffer = encodeWAV(audioBuffer);
    return new Blob([wavBuffer], { type: "audio/wav" });
  };

  const encodeWAV = (audioBuffer: AudioBuffer) => {
    const numChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const samples = audioBuffer.getChannelData(0);
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);
    const writeString = (offset: number, str: string) => {
      for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
    };
    writeString(0, "RIFF");
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, "data");
    view.setUint32(40, samples.length * 2, true);
    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return buffer;
  };

  // ---------- VERIFY ----------
  const verifySpeaker = async () => {
    if (!blob) { alert("Record voice first"); return; }
    const formData = new FormData();
    formData.append("external_user_id", userId);
    formData.append("file", blob, "login.wav");
    const res = await fetch(`${API_BASE}/auth/`, {
      method: "POST",
      headers: { "x-api-key": API_KEY },
      body: formData,
    });
    const data = await res.json();
    alert(
      `Auth: ${data.auth}\nReason: ${data.reason}\nLive Prob: ${data.live_prob}\nSimilarity: ${data.similarity}`
    );
    if (data.auth) {
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("userId", userId);
      navigate("/dashboard");
    }
  };

  const formatTime = (s: number) => `0:${s.toString().padStart(2, "0")}`;
  const isReady = blob && userId;

  return (
    <>
      <style>{styles}</style>
      <div className="login-wrapper">
        <div className="login-card">

          <div className="card-header">
            <div className="logo-row">
              <div className="logo-icon">🎙</div>
              <span className="logo-text">VoiceID</span>
              <span className="logo-badge">Beta</span>
            </div>
            <h1 className="card-title">Voice Authentication</h1>
            <p className="card-subtitle">
              Speak to verify your identity. Your voice is your password.
            </p>
          </div>

          <div className="card-body">
            <div className="field-group">
              <label className="field-label">User ID</label>
              <input
                className="field-input"
                placeholder="e.g. user_abc123"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>

            <div className="divider">
              <div className="divider-line" />
              <span className="divider-label">Voice Sample</span>
              <div className="divider-line" />
            </div>

            <div className={`recording-block${recording ? " is-recording" : ""}${blob && !recording ? " has-audio" : ""}`}>
              <div className="rec-header">
                <div className="rec-title-row">
                  <div className="rec-icon">🔐</div>
                  <span className="rec-title">Voice Passphrase</span>
                  <span className="rec-badge">· max 30s</span>
                </div>
                {recording && (
                  <div className="rec-timer">
                    <span className="rec-timer-dot" />
                    {formatTime(seconds)}
                  </div>
                )}
                {blob && !recording && (
                  <div className="status-indicator">
                    <span className="status-dot" />
                    Ready
                  </div>
                )}
              </div>

              <div className="canvas-wrap">
                <canvas ref={canvasRef} width={388} height={56} />
              </div>

              {blob && !recording ? (
                <>
                  <audio controls src={URL.createObjectURL(blob)} />
                  <div className="rec-controls">
                    <button className="btn btn-ghost" onClick={resetRecording}>
                      ↩ Re-record
                    </button>
                  </div>
                </>
              ) : (
                <div className="rec-controls">
                  <button className="btn btn-primary" onClick={startRecording} disabled={recording}>
                    {recording ? "● Recording…" : "▶ Start"}
                  </button>
                  <button className="btn btn-danger" onClick={stopRecording} disabled={!recording}>
                    ■ Stop
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="card-footer">
            <button className="btn-verify" onClick={verifySpeaker} disabled={!isReady}>
              <span>🔓</span> Verify & Sign In
            </button>
            <p className="login-hint">
              Don't have an account? <a href="/signup">Enroll your voice</a>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}