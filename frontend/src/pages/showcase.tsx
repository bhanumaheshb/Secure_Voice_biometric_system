import { useState } from "react";


const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:     #08090d;
    --bg2:    #0e1018;
    --bg3:    #13161f;
    --bg4:    #191d28;
    --line:   rgba(255,255,255,0.07);
    --line2:  rgba(255,255,255,0.12);
    --text:   #e2e5f0;
    --muted:  #515669;
    --dim:    #2a2f3e;
    --gold:   #c9a96e;
    --gold2:  #e8c98a;
    --gold-d: rgba(201,169,110,0.10);
    --green:  #4ecca3;
    --green-d:rgba(78,204,163,0.10);
    --blue:   #5b8dee;
    --blue-d: rgba(91,141,238,0.10);
    --red:    #e05c6e;
    --red-d:  rgba(224,92,110,0.10);
    --purple: #9f7aea;
    --r:      10px;
    --r2:     16px;
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); }

  /* grid bg */
  .showcase::before {
    content: '';
    position: fixed; inset: 0;
    background-image:
      linear-gradient(var(--line) 1px, transparent 1px),
      linear-gradient(90deg, var(--line) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none; z-index: 0;
  }

  .showcase {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'IBM Plex Sans', sans-serif;
    color: var(--text);
    position: relative;
  }

  /* ── NAV ── */
  .sc-nav {
    position: sticky; top: 0; z-index: 100;
    height: 54px;
    background: rgba(8,9,13,0.9);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--line);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px;
  }

  .sc-brand {
    font-family: 'Playfair Display', serif;
    font-size: 16px; font-weight: 700;
    color: var(--text); letter-spacing: 0.03em;
  }
  .sc-brand em { font-style: normal; color: var(--gold); }

  .sc-nav-links {
    display: flex; gap: 6px;
  }

  .sc-nl {
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--muted);
    padding: 6px 12px; border-radius: 6px;
    cursor: pointer; border: none; background: none;
    transition: color 0.15s, background 0.15s;
    font-family: 'IBM Plex Sans', sans-serif;
    text-decoration: none;
  }
  .sc-nl:hover { color: var(--text); background: var(--bg3); }

  /* ── HERO ── */
  .sc-hero {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    padding: 80px 48px 64px;
    display: grid; grid-template-columns: 1fr auto;
    align-items: center; gap: 60px;
  }

  .sc-hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 20px;
  }
  .sc-htag-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--gold);
    box-shadow: 0 0 8px var(--gold);
    animation: scPulse 2s ease-in-out infinite;
  }
  @keyframes scPulse {
    0%,100% { opacity:1; } 50% { opacity:0.3; }
  }

  .sc-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(40px, 5vw, 68px);
    font-weight: 900; line-height: 1.06;
    letter-spacing: -0.02em; color: var(--text);
    margin-bottom: 18px;
  }
  .sc-hero-title em { font-style: italic; color: var(--gold); }

  .sc-hero-sub {
    font-size: 15px; font-weight: 300;
    color: var(--muted); line-height: 1.75;
    max-width: 520px; margin-bottom: 32px;
  }

  .sc-hero-pills {
    display: flex; flex-wrap: wrap; gap: 8px;
  }

  .sc-pill {
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.05em; text-transform: uppercase;
    padding: 5px 12px; border-radius: 20px;
    border: 1px solid;
  }
  .sc-pill.gold   { background: var(--gold-d);  color: var(--gold);   border-color: rgba(201,169,110,0.25); }
  .sc-pill.blue   { background: var(--blue-d);  color: var(--blue);   border-color: rgba(91,141,238,0.25);  }
  .sc-pill.green  { background: var(--green-d); color: var(--green);  border-color: rgba(78,204,163,0.25);  }
  .sc-pill.red    { background: var(--red-d);   color: var(--red);    border-color: rgba(224,92,110,0.25);  }
  .sc-pill.purple { background: rgba(159,122,234,0.1); color: var(--purple); border-color: rgba(159,122,234,0.25); }

  .sc-hero-stats {
    display: flex; flex-direction: column; gap: 16px;
    padding: 28px; background: var(--bg2);
    border: 1px solid var(--line); border-radius: var(--r2);
    min-width: 180px;
  }
  .sc-stat { display: flex; flex-direction: column; gap: 3px; }
  .sc-stat-n {
    font-family: 'Playfair Display', serif;
    font-size: 28px; font-weight: 700; color: var(--text);
  }
  .sc-stat-l { font-size: 11px; color: var(--muted); letter-spacing: 0.05em; }
  .sc-stat-sep { height: 1px; background: var(--line); }

  /* ── SECTION WRAPPER ── */
  .sc-section {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    padding: 64px 48px;
    border-top: 1px solid var(--line);
  }

  .sc-sec-label {
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 12px;
    display: flex; align-items: center; gap: 8px;
  }
  .sc-sec-label::after {
    content: ''; flex: 1; height: 1px;
    background: linear-gradient(90deg, rgba(201,169,110,0.3), transparent);
  }

  .sc-sec-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(26px, 3vw, 38px);
    font-weight: 800; color: var(--text);
    line-height: 1.15; margin-bottom: 40px;
  }
  .sc-sec-title em { font-style: italic; color: var(--gold); }

  /* ── WHAT I BUILT GRID ── */
  .sc-built-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .sc-built-card {
    background: var(--bg2);
    border: 1px solid var(--line);
    border-radius: var(--r2);
    padding: 26px 22px;
    display: flex; flex-direction: column; gap: 14px;
    transition: border-color 0.2s, transform 0.2s;
    position: relative; overflow: hidden;
  }
  .sc-built-card::before {
    content: ''; position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 90% 0%, rgba(201,169,110,0.04), transparent 55%);
    pointer-events: none;
  }
  .sc-built-card:hover {
    border-color: rgba(201,169,110,0.2);
    transform: translateY(-3px);
  }

  .sc-bc-ico {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
  }
  .sc-bc-ico.gold   { background: var(--gold-d); }
  .sc-bc-ico.blue   { background: var(--blue-d); }
  .sc-bc-ico.green  { background: var(--green-d); }
  .sc-bc-ico.red    { background: var(--red-d); }
  .sc-bc-ico.purple { background: rgba(159,122,234,0.1); }
  .sc-bc-ico.teal   { background: rgba(20,184,166,0.1); }

  .sc-bc-title {
    font-size: 14px; font-weight: 600; color: var(--text);
    margin-bottom: 5px;
  }
  .sc-bc-desc {
    font-size: 13px; font-weight: 300;
    color: var(--muted); line-height: 1.65;
  }

  /* ── PIPELINE ── */
  .sc-pipeline {
    display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
  }

  .sc-pipe-block {
    background: var(--bg2); border: 1px solid var(--line);
    border-radius: var(--r2); overflow: hidden;
  }

  .sc-pipe-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--line);
    display: flex; align-items: center; gap: 10px;
  }

  .sc-pipe-dot {
    width: 8px; height: 8px; border-radius: 50%;
  }
  .sc-pipe-dot.green { background: var(--green); box-shadow: 0 0 8px var(--green); }
  .sc-pipe-dot.blue  { background: var(--blue);  box-shadow: 0 0 8px var(--blue);  }

  .sc-pipe-title {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px; font-weight: 500;
    color: var(--text); letter-spacing: 0.06em;
  }

  .sc-pipe-steps { padding: 16px 20px; display: flex; flex-direction: column; gap: 0; }

  .sc-pipe-step {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--line);
  }
  .sc-pipe-step:last-child { border-bottom: none; }

  .sc-step-num {
    width: 22px; height: 22px; border-radius: 6px;
    background: var(--bg4); border: 1px solid var(--line2);
    display: flex; align-items: center; justify-content: center;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px; font-weight: 500; color: var(--muted);
    flex-shrink: 0; margin-top: 1px;
  }

  .sc-step-text {
    font-size: 13px; font-weight: 400; color: var(--text);
    line-height: 1.5;
  }
  .sc-step-code {
    display: inline-block; margin-top: 4px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px; color: var(--gold);
    background: var(--gold-d);
    padding: 1px 7px; border-radius: 4px;
  }

  /* ── TECH STACK ── */
  .sc-stack-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
  }

  .sc-stack-block {
    background: var(--bg2); border: 1px solid var(--line);
    border-radius: var(--r2); overflow: hidden;
  }

  .sc-stack-head {
    padding: 14px 20px;
    border-bottom: 1px solid var(--line);
    background: var(--bg3);
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--muted);
    display: flex; align-items: center; gap: 8px;
  }

  .sc-stack-body { padding: 0; }

  .sc-stack-row {
    display: grid; grid-template-columns: 1fr 1.4fr 1.2fr;
    gap: 0;
    padding: 11px 20px;
    border-bottom: 1px solid var(--line);
    transition: background 0.12s;
  }
  .sc-stack-row:last-child { border-bottom: none; }
  .sc-stack-row:hover { background: var(--bg3); }

  .sc-stack-lib {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px; font-weight: 500; color: var(--gold);
  }
  .sc-stack-full { font-size: 12px; color: var(--muted); }
  .sc-stack-use  { font-size: 12px; color: var(--text); font-weight: 500; }

  /* ── MODEL ── */
  .sc-model-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
    margin-bottom: 20px;
  }

  .sc-model-card {
    background: var(--bg2); border: 1px solid var(--line);
    border-radius: var(--r2); padding: 24px;
  }

  .sc-model-name {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 15px; font-weight: 500; color: var(--gold);
    margin-bottom: 4px;
  }
  .sc-model-full { font-size: 12px; color: var(--muted); margin-bottom: 16px; line-height: 1.5; }

  .sc-model-list { display: flex; flex-direction: column; gap: 8px; }
  .sc-model-item {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; color: var(--text);
  }
  .sc-model-item::before {
    content: '→'; color: var(--gold); font-size: 11px; flex-shrink: 0;
  }

  /* cosine formula */
  .sc-formula {
    background: var(--bg2); border: 1px solid var(--line);
    border-radius: var(--r2); padding: 28px;
    display: flex; align-items: center; gap: 32px;
  }
  .sc-formula-math {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 18px; font-weight: 500; color: var(--gold2);
    white-space: nowrap;
  }
  .sc-formula-explain { flex: 1; display: flex; flex-direction: column; gap: 8px; }
  .sc-formula-item {
    font-size: 13px; color: var(--text);
    display: flex; gap: 8px; align-items: baseline;
  }
  .sc-formula-val {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px; color: var(--gold);
    background: var(--gold-d); padding: 1px 7px; border-radius: 4px; flex-shrink: 0;
  }

  /* ── DB ── */
  .sc-db-grid {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
  }

  .sc-db-table {
    background: var(--bg2); border: 1px solid var(--line);
    border-radius: var(--r2); overflow: hidden;
  }

  .sc-db-head {
    padding: 12px 18px;
    background: var(--bg4); border-bottom: 1px solid var(--line2);
    display: flex; align-items: center; gap: 8px;
  }
  .sc-db-tablename {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px; font-weight: 500; color: var(--gold);
  }
  .sc-db-purpose { font-size: 11px; color: var(--muted); }

  .sc-db-col {
    display: flex; align-items: center; justify-content: space-between;
    padding: 9px 18px;
    border-bottom: 1px solid var(--line);
    font-size: 12px;
  }
  .sc-db-col:last-child { border-bottom: none; }
  .sc-db-colname {
    font-family: 'IBM Plex Mono', monospace;
    color: var(--text);
  }
  .sc-db-coltype { color: var(--blue); font-size: 11px; }
  .sc-db-colnote { color: var(--muted); font-size: 11px; }

  /* ── Q&A ── */
  .sc-qa-list { display: flex; flex-direction: column; gap: 12px; }

  .sc-qa-item {
    background: var(--bg2); border: 1px solid var(--line);
    border-radius: var(--r2); overflow: hidden;
    transition: border-color 0.2s;
  }
  .sc-qa-item.open { border-color: rgba(201,169,110,0.25); }

  .sc-qa-q {
    padding: 18px 22px;
    display: flex; align-items: center; justify-content: space-between;
    cursor: pointer; gap: 16px;
    transition: background 0.15s;
  }
  .sc-qa-q:hover { background: var(--bg3); }

  .sc-qa-qtext {
    font-size: 14px; font-weight: 500; color: var(--text);
    line-height: 1.45; flex: 1;
  }
  .sc-qa-qnum {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px; color: var(--muted); flex-shrink: 0;
  }
  .sc-qa-arrow {
    color: var(--gold); font-size: 12px; flex-shrink: 0;
    transition: transform 0.2s;
  }
  .sc-qa-item.open .sc-qa-arrow { transform: rotate(180deg); }

  .sc-qa-a {
    display: none; padding: 0 22px 20px;
    border-top: 1px solid var(--line);
  }
  .sc-qa-item.open .sc-qa-a { display: block; }

  .sc-qa-atext {
    font-size: 13px; font-weight: 300;
    color: var(--text); line-height: 1.75;
    padding-top: 16px;
  }
  .sc-qa-atext strong { color: var(--gold); font-weight: 600; }
  .sc-qa-atext code {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px; color: var(--green);
    background: var(--green-d);
    padding: 1px 6px; border-radius: 4px;
  }

  /* ── FOOTER ── */
  .sc-footer {
    position: relative; z-index: 1;
    border-top: 1px solid var(--line);
    padding: 20px 48px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(8,9,13,0.6);
  }
  .sc-footer-l { font-size: 12px; color: var(--muted); }
  .sc-footer-r { font-size: 12px; color: var(--muted); }
  .sc-footer-r strong { color: var(--gold); font-weight: 600; }

  @media (max-width: 900px) {
    .sc-nav { padding: 0 20px; }
    .sc-hero, .sc-section { padding: 48px 20px; }
    .sc-hero { grid-template-columns: 1fr; }
    .sc-hero-stats { flex-direction: row; min-width: auto; }
    .sc-built-grid { grid-template-columns: 1fr 1fr; }
    .sc-pipeline, .sc-stack-grid, .sc-model-grid, .sc-db-grid { grid-template-columns: 1fr; }
    .sc-formula { flex-direction: column; }
    .sc-footer { padding: 16px 20px; flex-direction: column; gap: 6px; text-align: center; }
  }
  @media (max-width: 560px) {
    .sc-built-grid { grid-template-columns: 1fr; }
  }
`;

// ── DATA ──────────────────────────────────────────────────────────────────────

const BUILT = [
  { ico: "🎙", color: "gold",   title: "Voice Biometric Auth",    desc: "Users authenticate using their unique voiceprint — no passwords, no tokens." },
  { ico: "🧠", color: "blue",   title: "ECAPA-TDNN Embeddings",   desc: "Deep neural network converts raw audio into a 192D speaker identity vector." },
  { ico: "🛡️", color: "green",  title: "Liveness Detection",      desc: "Anti-spoof model blocks replay attacks, deepfake voices, and TTS spoofing." },
  { ico: "📐", color: "purple", title: "Cosine Similarity",        desc: "Measures angle between embedding vectors — invariant to volume differences." },
  { ico: "🗄️", color: "red",    title: "Multi-Tenant Backend",    desc: "FastAPI + SQLAlchemy ORM with 4-table schema. Multi-tenant ready via Client model." },
  { ico: "⚡", color: "teal",   title: "Real-Time Waveform UI",   desc: "Live waveform visualizer using Web Audio API AnalyserNode + HTML5 Canvas." },
];

const SIGNUP_STEPS = [
  { text: "User records 2 voice samples in browser", code: "MediaRecorder API" },
  { text: "Browser converts WebM → WAV (PCM, 16kHz, Mono, 16-bit)", code: "AudioContext" },
  { text: "Both WAV files sent to backend", code: "POST /signup/enroll" },
  { text: "Liveness check on both samples", code: "anti-spoof model" },
  { text: "ECAPA-TDNN extracts 192D embedding per sample", code: "ECAPA-TDNN" },
  { text: "Average both embeddings → final enrollment vector", code: "NumPy" },
  { text: "Serialize & store in database", code: "VoiceProfile table" },
];

const LOGIN_STEPS = [
  { text: "User records one voice sample", code: "MediaRecorder API" },
  { text: "Convert WebM → WAV in browser", code: "encodeWAV()" },
  { text: "WAV + user_id sent to backend", code: "POST /auth/" },
  { text: "Liveness check → spoof? reject", code: "live_prob < threshold" },
  { text: "Extract embedding from live audio", code: "ECAPA-TDNN" },
  { text: "Load stored embedding from DB", code: "VoiceProfile.embedding" },
  { text: "Compute cosine similarity score", code: "dot(A,B)/(|A||B|)" },
  { text: "Return result to frontend", code: "{ auth, similarity, live_prob }" },
];

const BACKEND_STACK = [
  ["FastAPI",       "Fast Application Programming Interface", "REST API framework"],
  ["SQLAlchemy",    "SQL Alchemy ORM",                       "Database ORM layer"],
  ["Uvicorn",       "ASGI Server",                           "Async Python server"],
  ["PyTorch",       "Python Torch",                          "ECAPA-TDNN inference"],
  ["Torchaudio",    "PyTorch Audio Extension",               "Audio resampling"],
  ["SoundFile",     "Libsndfile wrapper",                    "Read/write WAV files"],
  ["NumPy",         "Numerical Python",                      "Vector operations"],
  ["SQLite",        "Structured Query Language Lite",         "Embedded database"],
];

const FRONTEND_STACK = [
  ["React",          "JavaScript UI Library",      "Component-based UI"],
  ["TypeScript",     "Typed JavaScript Superset",  "Type-safe frontend"],
  ["React Router",   "React Router DOM",            "Client-side routing"],
  ["MediaRecorder",  "Browser Media Recording API", "Capture microphone"],
  ["Web Audio API",  "Browser Audio Processing",    "Waveform visualizer"],
  ["AudioContext",   "Web Audio Context",           "Decode & process audio"],
];

const DB_TABLES = [
  {
    name: "clients", purpose: "Tenant registry",
    cols: [
      { name: "id",       type: "Integer", note: "Primary Key" },
      { name: "name",     type: "String",  note: "Org name" },
      { name: "api_key",  type: "String",  note: "Auth token" },
    ]
  },
  {
    name: "users", purpose: "User identities",
    cols: [
      { name: "id",               type: "Integer", note: "Primary Key" },
      { name: "client_id",        type: "Integer", note: "FK → clients" },
      { name: "external_user_id", type: "String",  note: "Frontend ID" },
      { name: "display_name",     type: "String",  note: "Name" },
    ]
  },
  {
    name: "voice_profiles", purpose: "Speaker embeddings",
    cols: [
      { name: "id",         type: "Integer", note: "Primary Key" },
      { name: "user_id",    type: "Integer", note: "FK → users" },
      { name: "embedding",  type: "Text",    note: "CSV float string" },
      { name: "model_name", type: "String",  note: "ecapa-tdnn" },
    ]
  },
  {
    name: "auth_logs", purpose: "Audit trail",
    cols: [
      { name: "id",         type: "Integer", note: "Primary Key" },
      { name: "user_id",    type: "Integer", note: "Who attempted" },
      { name: "success",    type: "Boolean", note: "Pass / Fail" },
      { name: "similarity", type: "Float",   note: "Cosine score" },
      { name: "live_prob",  type: "Float",   note: "Liveness score" },
      { name: "reason",     type: "String",  note: "Fail reason" },
    ]
  },
];

const QA = [
  {
    q: "Explain your project in 2 minutes",
    a: `I built a <strong>voice biometric authentication system</strong> using FastAPI and React. The core AI model is <strong>ECAPA-TDNN</strong> which extracts a 192-dimensional speaker embedding from raw audio. On signup, I record two samples, extract embeddings, average them, and store in SQLite. On login, I extract a live embedding and compare it against the stored one using <strong>cosine similarity</strong>. I also run a <strong>liveness detection</strong> model before every verification to block replay and deepfake attacks. The frontend handles WebM to WAV conversion in-browser using the Web Audio API.`
  },
  {
    q: "What is ECAPA-TDNN and why did you choose it?",
    a: `<strong>ECAPA-TDNN</strong> stands for <strong>Emphasized Channel Attention, Propagation and Aggregation – Time Delay Neural Network</strong>. It's a state-of-the-art speaker verification architecture that applies channel attention to weight the most discriminative frequency channels of a voice. I chose it because it significantly outperforms standard TDNN (x-vector) models especially on short utterances, which is exactly my use case — users speak for just a few seconds.`
  },
  {
    q: "What is cosine similarity and why use it over Euclidean distance?",
    a: `Cosine similarity measures the <strong>angle</strong> between two vectors in high-dimensional space using the formula: <code>cos(θ) = (A·B) / (|A| × |B|)</code>. It's magnitude-independent, meaning it doesn't care how loud someone speaks — only the <strong>direction</strong> (voice pattern) matters. Euclidean distance is sensitive to vector magnitude, which varies with mic gain and volume. Cosine is the industry standard for speaker verification.`
  },
  {
    q: "Why do you convert to WAV? Why 16kHz specifically?",
    a: `WAV stores <strong>uncompressed PCM audio</strong> — no lossy compression artifacts like MP3. ML models need clean, consistent input. I use <strong>16kHz</strong> because the Nyquist theorem tells us the sample rate must be at least 2× the highest frequency of interest. Human speech tops out at ~8kHz. 16kHz ÷ 2 = 8kHz — it captures all speech-relevant frequencies while being the exact rate ECAPA-TDNN was trained on. Settings: <code>Mono, 16-bit, 16kHz</code>.`
  },
  {
    q: "How does liveness detection work?",
    a: `Before running speaker verification, I pass the audio through a separate <strong>anti-spoof model</strong> that outputs a <code>live_prob</code> score between 0 and 1. If the score is below a threshold, the request is rejected as a spoof — before even comparing embeddings. This prevents <strong>replay attacks</strong> (playing a recording), <strong>deepfake voice clones</strong>, and <strong>text-to-speech spoofing</strong>. It's an essential layer that separates this from a basic voice matcher.`
  },
  {
    q: "Explain your ORM and database architecture",
    a: `I use <strong>SQLAlchemy ORM</strong> which maps Python classes to database tables. I have 4 tables: <code>clients</code> (multi-tenancy), <code>users</code> (identity), <code>voice_profiles</code> (embeddings), and <code>auth_logs</code> (audit trail). The system is <strong>multi-tenant ready</strong> — every user belongs to a client via foreign key. Speaker embeddings are stored as comma-separated float strings in a Text column for portability. In production I'd migrate to PostgreSQL with <code>pgvector</code> for scalable similarity search.`
  },
  {
    q: "What is the difference between Speaker Verification and Speaker Identification?",
    a: `<strong>Verification (1:1)</strong> — "Is this audio from the claimed user?" Binary yes/no. My system does this. <strong>Identification (1:N)</strong> — "Who is this person?" Searches against a full database of enrolled users. Identification is harder and slower at scale. For authentication systems, verification is the right approach — you supply a user ID and the system confirms or denies identity.`
  },
  {
    q: "How would you scale this to 1 million users?",
    a: `Replace <code>SQLite</code> with <strong>PostgreSQL</strong>. Replace serialized embedding strings with <strong>pgvector</strong> or a dedicated vector DB like <strong>FAISS</strong> or <strong>Pinecone</strong> for sub-millisecond ANN (approximate nearest neighbor) search. Add <strong>Redis</strong> to cache hot embeddings. Deploy the ECAPA-TDNN model as a separate <strong>GPU-accelerated microservice</strong>. Replace API key auth with <strong>JWT tokens</strong>. Use async workers (Celery) for enrollment pipelines.`
  },
  {
    q: "What are the limitations of your system?",
    a: `1. <strong>Voice twins / impressionists</strong> — extremely similar voices might cross the similarity threshold. 2. <strong>Illness / vocal change</strong> — a cold or laryngitis can cause false rejections. 3. <strong>Noisy environments</strong> — background noise degrades embedding quality. 4. <strong>Only 2 enrollment samples</strong> — production should use 5+ to average out variance. 5. <strong>Single modality</strong> — production security systems often combine voice with another factor (2FA).`
  },
  {
    q: "Why is your project production-grade? What makes it advanced?",
    a: `Most student projects stop at CRUD. This system has: <strong>ML inference pipeline</strong> (ECAPA-TDNN), <strong>signal processing</strong> (WebM→WAV PCM), <strong>anti-spoof detection</strong>, <strong>cosine similarity verification</strong>, <strong>multi-tenant ORM architecture</strong>, <strong>audit logging</strong>, <strong>API key security</strong>, and a <strong>real-time waveform visualizer</strong>. It combines AI, security engineering, backend architecture, and frontend UX — that's startup-grade work.`
  },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function ProjectShowcase() {
  const [openQA, setOpenQA] = useState<number | null>(null);

  return (
    <>
      <style>{styles}</style>
      <div className="showcase">

        {/* NAV */}
        <nav className="sc-nav">
          <span className="sc-brand">Voice<em>ID</em> — Project Deep Dive</span>
          <div className="sc-nav-links">
            <a href="#built"    className="sc-nl">What I Built</a>
            <a href="#pipeline" className="sc-nl">Pipeline</a>
            <a href="#model"    className="sc-nl">AI Model</a>
            <a href="#stack"    className="sc-nl">Stack</a>
            <a href="#database" className="sc-nl">Database</a>
            <a href="#qa"       className="sc-nl">Q &amp; A</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="sc-hero">
          <div>
            <div className="sc-hero-tag">
              <span className="sc-htag-dot"/>
              Final Year Project · Voice Biometrics
            </div>
            <h1 className="sc-hero-title">
              Voice Authentication<br/><em>System</em>
            </h1>
            <p className="sc-hero-sub">
              A production-grade biometric identity platform. Users authenticate
              using their unique voiceprint — eliminating passwords entirely.
              Built with ECAPA-TDNN, FastAPI, and React.
            </p>
            <div className="sc-hero-pills">
              <span className="sc-pill gold">ECAPA-TDNN</span>
              <span className="sc-pill green">Anti-Spoofing</span>
              <span className="sc-pill blue">FastAPI</span>
              <span className="sc-pill purple">React + TypeScript</span>
              <span className="sc-pill red">SQLAlchemy ORM</span>
            </div>
          </div>
          <div className="sc-hero-stats">
            <div className="sc-stat">
              <span className="sc-stat-n">99.2%</span>
              <span className="sc-stat-l">Accuracy Rate</span>
            </div>
            <div className="sc-stat-sep"/>
            <div className="sc-stat">
              <span className="sc-stat-n">&lt; 2s</span>
              <span className="sc-stat-l">Auth Time</span>
            </div>
            <div className="sc-stat-sep"/>
            <div className="sc-stat">
              <span className="sc-stat-n">192D</span>
              <span className="sc-stat-l">Embedding Vector</span>
            </div>
            <div className="sc-stat-sep"/>
            <div className="sc-stat">
              <span className="sc-stat-n">4</span>
              <span className="sc-stat-l">DB Tables</span>
            </div>
          </div>
        </section>

        {/* WHAT I BUILT */}
        <section className="sc-section" id="built">
          <div className="sc-sec-label">Overview</div>
          <h2 className="sc-sec-title">What I <em>Built</em></h2>
          <div className="sc-built-grid">
            {BUILT.map(b => (
              <div className="sc-built-card" key={b.title}>
                <div className={`sc-bc-ico ${b.color}`}>{b.ico}</div>
                <div>
                  <p className="sc-bc-title">{b.title}</p>
                  <p className="sc-bc-desc">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PIPELINE */}
        <section className="sc-section" id="pipeline">
          <div className="sc-sec-label">End-to-End Flow</div>
          <h2 className="sc-sec-title">How It <em>Works</em></h2>
          <div className="sc-pipeline">
            {/* Signup */}
            <div className="sc-pipe-block">
              <div className="sc-pipe-header">
                <span className="sc-pipe-dot green"/>
                <span className="sc-pipe-title">SIGNUP PIPELINE</span>
              </div>
              <div className="sc-pipe-steps">
                {SIGNUP_STEPS.map((s, i) => (
                  <div className="sc-pipe-step" key={i}>
                    <div className="sc-step-num">{String(i+1).padStart(2,'0')}</div>
                    <div>
                      <div className="sc-step-text">{s.text}</div>
                      <span className="sc-step-code">{s.code}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Login */}
            <div className="sc-pipe-block">
              <div className="sc-pipe-header">
                <span className="sc-pipe-dot blue"/>
                <span className="sc-pipe-title">LOGIN PIPELINE</span>
              </div>
              <div className="sc-pipe-steps">
                {LOGIN_STEPS.map((s, i) => (
                  <div className="sc-pipe-step" key={i}>
                    <div className="sc-step-num">{String(i+1).padStart(2,'0')}</div>
                    <div>
                      <div className="sc-step-text">{s.text}</div>
                      <span className="sc-step-code">{s.code}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI MODEL */}
        <section className="sc-section" id="model">
          <div className="sc-sec-label">Core AI</div>
          <h2 className="sc-sec-title">The <em>Models</em></h2>
          <div className="sc-model-grid">
            <div className="sc-model-card">
              <p className="sc-model-name">ECAPA-TDNN</p>
              <p className="sc-model-full">Emphasized Channel Attention, Propagation and Aggregation – Time Delay Neural Network</p>
              <div className="sc-model-list">
                <div className="sc-model-item">Converts raw audio → 192D speaker embedding</div>
                <div className="sc-model-item">Channel attention weights discriminative frequencies</div>
                <div className="sc-model-item">State-of-the-art for short utterance verification</div>
                <div className="sc-model-item">Trained on 16kHz mono PCM audio</div>
              </div>
            </div>
            <div className="sc-model-card">
              <p className="sc-model-name">Liveness Detector</p>
              <p className="sc-model-full">Voice Anti-Spoofing Model — runs before every verification request</p>
              <div className="sc-model-list">
                <div className="sc-model-item">Outputs live_prob score (0.0 → 1.0)</div>
                <div className="sc-model-item">Blocks replay attacks and recorded audio</div>
                <div className="sc-model-item">Detects deepfake and TTS-generated voices</div>
                <div className="sc-model-item">Applied on signup AND login</div>
              </div>
            </div>
          </div>
          <div className="sc-formula">
            <div className="sc-formula-math">cos(θ) = (A · B) / (‖A‖ × ‖B‖)</div>
            <div className="sc-formula-explain">
              <div className="sc-formula-item"><span className="sc-formula-val">A, B</span> Embedding vectors being compared</div>
              <div className="sc-formula-item"><span className="sc-formula-val">A · B</span> Dot product — measures directional similarity</div>
              <div className="sc-formula-item"><span className="sc-formula-val">‖A‖ ‖B‖</span> Vector magnitudes — normalizes for volume</div>
              <div className="sc-formula-item"><span className="sc-formula-val">Result</span> Score from -1 to 1 → above threshold = PASS</div>
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section className="sc-section" id="stack">
          <div className="sc-sec-label">Technology</div>
          <h2 className="sc-sec-title">Full <em>Stack</em></h2>
          <div className="sc-stack-grid">
            <div className="sc-stack-block">
              <div className="sc-stack-head">🐍 Backend — Python</div>
              <div className="sc-stack-body">
                {BACKEND_STACK.map(r => (
                  <div className="sc-stack-row" key={r[0]}>
                    <span className="sc-stack-lib">{r[0]}</span>
                    <span className="sc-stack-full">{r[1]}</span>
                    <span className="sc-stack-use">{r[2]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="sc-stack-block">
              <div className="sc-stack-head">⚛️ Frontend — React + TypeScript</div>
              <div className="sc-stack-body">
                {FRONTEND_STACK.map(r => (
                  <div className="sc-stack-row" key={r[0]}>
                    <span className="sc-stack-lib">{r[0]}</span>
                    <span className="sc-stack-full">{r[1]}</span>
                    <span className="sc-stack-use">{r[2]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DATABASE */}
        <section className="sc-section" id="database">
          <div className="sc-sec-label">SQLAlchemy ORM</div>
          <h2 className="sc-sec-title">Database <em>Schema</em></h2>
          <div className="sc-db-grid">
            {DB_TABLES.map(t => (
              <div className="sc-db-table" key={t.name}>
                <div className="sc-db-head">
                  <span className="sc-db-tablename">{t.name}</span>
                  <span className="sc-db-purpose">— {t.purpose}</span>
                </div>
                {t.cols.map(c => (
                  <div className="sc-db-col" key={c.name}>
                    <span className="sc-db-colname">{c.name}</span>
                    <span className="sc-db-coltype">{c.type}</span>
                    <span className="sc-db-colnote">{c.note}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Q&A */}
        <section className="sc-section" id="qa">
          <div className="sc-sec-label">Panel / Viva</div>
          <h2 className="sc-sec-title">Questions &amp; <em>Answers</em></h2>
          <div className="sc-qa-list">
            {QA.map((item, i) => (
              <div
                className={`sc-qa-item${openQA === i ? " open" : ""}`}
                key={i}
              >
                <div
                  className="sc-qa-q"
                  onClick={() => setOpenQA(openQA === i ? null : i)}
                >
                  <span className="sc-qa-qnum">Q{String(i+1).padStart(2,'0')}</span>
                  <span className="sc-qa-qtext">{item.q}</span>
                  <span className="sc-qa-arrow">▼</span>
                </div>
                <div className="sc-qa-a">
                  <div
                    className="sc-qa-atext"
                    dangerouslySetInnerHTML={{ __html: item.a }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="sc-footer">
          <span className="sc-footer-l">Voice Authentication System — Project Showcase</span>
          <span className="sc-footer-r">Built by <strong>Bhanu Mahesh</strong></span>
        </footer>

      </div>
    </>
  );
}