import { useState, useRef } from "react";
import type { RefObject } from "react";

// ---------- RECORDING BLOCK (defined outside to avoid re-creation on render) ----------
interface RecordingBlockProps {
  num: number;
  recording: boolean;
  blob: Blob | null;
  seconds: number;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  onStart: (num: number) => void;
  onStop: () => void;
  onReset: (num: number) => void;
}

function RecordingBlock({
  num, recording, blob, seconds, canvasRef, onStart, onStop, onReset,
}: RecordingBlockProps) {
  const formatTime = (s: number) => `0:${s.toString().padStart(2, "0")}`;

  return (
    <div className={`recording-block${recording ? " is-recording" : ""}${blob && !recording ? " has-audio" : ""}`}>
      <div className="rec-header">
        <div className="rec-title-row">
          <div className="rec-number">{num}</div>
          <span className="rec-title">Voice Sample {num}</span>
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
            Captured
          </div>
        )}
      </div>

      <div className="canvas-wrap">
        <canvas ref={canvasRef} width={488} height={56} />
      </div>

      {blob && !recording ? (
        <>
          <audio controls src={URL.createObjectURL(blob)} />
          <div className="rec-controls">
            <button className="btn btn-ghost" onClick={() => onReset(num)}>
              ↩ Re-record
            </button>
          </div>
        </>
      ) : (
        <div className="rec-controls">
          <button
            className="btn btn-primary"
            onClick={() => onStart(num)}
            disabled={recording}
          >
            {recording ? "● Recording…" : "▶ Start"}
          </button>
          <button
            className="btn btn-danger"
            onClick={onStop}
            disabled={!recording}
          >
            ■ Stop
          </button>
        </div>
      )}
    </div>
  );
}

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

  .signup-wrapper {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
  }

  .signup-card {
    width: 100%;
    max-width: 560px;
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

  .fields-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
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
    transition: border-color 0.2s;
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

  .rec-number {
    width: 22px;
    height: 22px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 800;
    color: white;
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

  .audio-player {
    width: 100%;
    height: 32px;
    border-radius: 6px;
    accent-color: var(--accent);
  }

  audio {
    width: 100%;
    filter: invert(1) hue-rotate(180deg) brightness(0.7);
    border-radius: 6px;
    height: 32px;
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

  .card-footer {
    padding: 0 36px 32px;
  }

  .btn-enroll {
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

  .btn-enroll:not(:disabled):hover {
    filter: brightness(1.08);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(99,179,237,0.25);
  }

  .btn-enroll:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .enroll-hint {
    text-align: center;
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 14px;
    line-height: 1.5;
  }

  .progress-row {
    display: flex;
    gap: 6px;
    margin-bottom: 8px;
  }

  .progress-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--border);
    transition: background 0.3s;
  }

  .progress-dot.done {
    background: var(--green);
  }

  .progress-dot.active {
    background: var(--accent);
    animation: blink 1s ease-in-out infinite;
  }
`;

export default function Signup() {
  const [userId, setUserId] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [recording1, setRecording1] = useState(false);
  const [recording2, setRecording2] = useState(false);

  const [blob1, setBlob1] = useState<Blob | null>(null);
  const [blob2, setBlob2] = useState<Blob | null>(null);

  const [seconds1, setSeconds1] = useState(0);
  const [seconds2, setSeconds2] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timeoutRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  const canvasRef1 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef2 = useRef<HTMLCanvasElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  const setupVisualizer = (stream: MediaStream, num: number) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyserRef.current = analyser;

    const canvas = num === 1 ? canvasRef1.current : canvasRef2.current;
    const ctx = canvas?.getContext("2d");
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!ctx || !canvas) return;
      analyser.getByteTimeDomainData(dataArray);
      ctx.fillStyle = "#0d0e12";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = num === 1 ? "#63b3ed" : "#9f7aea";
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

  const startRecording = async (num: number) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setupVisualizer(stream, num);
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      chunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const webmBlob = new Blob(chunksRef.current, { type: "audio/webm" });
      const wavBlob = await convertToWav(webmBlob);
      if (num === 1) { setBlob1(wavBlob); setRecording1(false); setSeconds1(0); }
      else { setBlob2(wavBlob); setRecording2(false); setSeconds2(0); }
      stream.getTracks().forEach((track) => track.stop());
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };

    mediaRecorder.start();
    if (num === 1) {
      setRecording1(true);
      timerRef.current = window.setInterval(() => setSeconds1((p) => p + 1), 1000);
    } else {
      setRecording2(true);
      timerRef.current = window.setInterval(() => setSeconds2((p) => p + 1), 1000);
    }
    timeoutRef.current = window.setTimeout(() => mediaRecorder.stop(), 30000);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const resetRecording = (num: number) => {
    if (num === 1) setBlob1(null);
    else setBlob2(null);
  };

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

  const handleSubmit = async () => {
    if (!blob1 || !blob2) { alert("Record both samples"); return; }
    const formData = new FormData();
    formData.append("external_user_id", userId);
    formData.append("display_name", displayName);
    formData.append("file1", blob1, "voice1.wav");
    formData.append("file2", blob2, "voice2.wav");
    const res = await fetch("http://127.0.0.1:8000/signup/enroll", {
      method: "POST",
      headers: { "x-api-key": "dev-secret-key" },
      body: formData,
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  };

  const isReady = blob1 && blob2 && userId && displayName;

  return (
    <>
      <style>{styles}</style>
      <div className="signup-wrapper">
        <div className="signup-card">

          <div className="card-header">
            <div className="logo-row">
              <div className="logo-icon">🎙</div>
              <span className="logo-text">VoiceID</span>
              <span className="logo-badge">Beta</span>
            </div>
            <h1 className="card-title">Voice Enrollment</h1>
            <p className="card-subtitle">
              Record two voice samples to create your biometric voice profile.
            </p>
          </div>

          <div className="card-body">
            <div className="fields-row">
              <div className="field-group">
                <label className="field-label">User ID</label>
                <input
                  className="field-input"
                  placeholder="e.g. user_abc123"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div className="field-group">
                <label className="field-label">Display Name</label>
                <input
                  className="field-input"
                  placeholder="e.g. Jane Doe"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
            </div>

            <div className="divider">
              <div className="divider-line" />
              <span className="divider-label">Voice Samples</span>
              <div className="divider-line" />
            </div>

            <RecordingBlock
              num={1}
              recording={recording1}
              blob={blob1}
              seconds={seconds1}
              canvasRef={canvasRef1}
              onStart={startRecording}
              onStop={stopRecording}
              onReset={resetRecording}
            />
            <RecordingBlock
              num={2}
              recording={recording2}
              blob={blob2}
              seconds={seconds2}
              canvasRef={canvasRef2}
              onStart={startRecording}
              onStop={stopRecording}
              onReset={resetRecording}
            />
          </div>

          <div className="card-footer">
            <button
              className="btn-enroll"
              onClick={handleSubmit}
              disabled={!isReady}
            >
              <span>✦</span> Complete Enrollment
            </button>
            <p className="enroll-hint">
              Both samples required · Speak naturally for best accuracy
            </p>
          </div>

        </div>
      </div>
    </>
  );
}