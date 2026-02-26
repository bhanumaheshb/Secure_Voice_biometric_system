import { Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:     #08090d;
    --bg2:    #0e1018;
    --bg3:    #13161f;
    --line:   rgba(255,255,255,0.06);
    --line2:  rgba(255,255,255,0.10);
    --text:   #dde0ea;
    --muted:  #4f5568;
    --gold:   #c9a96e;
    --gold2:  #e8c98a;
    --gold-dim: rgba(201,169,110,0.10);
    --r: 12px;
  }

  html, body { background: var(--bg); overflow-x: hidden; }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; } to { opacity:1; }
  }
  @keyframes orbit {
    from { transform: rotate(0deg) translateX(84px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(84px) rotate(-360deg); }
  }
  @keyframes orbit2 {
    from { transform: rotate(180deg) translateX(112px) rotate(-180deg); }
    to   { transform: rotate(540deg) translateX(112px) rotate(-540deg); }
  }
  @keyframes waveAnim {
    0%,100% { transform: scaleY(0.25); }
    50%     { transform: scaleY(1); }
  }
  @keyframes pulseDot {
    0%,100% { box-shadow: 0 0 0 0 rgba(201,169,110,0.5); }
    50%     { box-shadow: 0 0 0 5px rgba(201,169,110,0); }
  }

  .page {
    background: var(--bg);
    font-family: 'IBM Plex Sans', sans-serif;
    color: var(--text);
  }

  /* grid bg */
  .page::before {
    content: '';
    position: fixed; inset: 0;
    background-image:
      linear-gradient(var(--line) 1px, transparent 1px),
      linear-gradient(90deg, var(--line) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 0;
  }

  /* ── NAV ── */
  nav {
    position: sticky; top: 0; z-index: 50;
    height: 54px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px;
    background: rgba(8,9,13,0.85);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--line);
    animation: fadeIn 0.5s ease both;
  }

  .brand { display:flex; align-items:baseline; gap:9px; }
  .wordmark {
    font-family: 'Playfair Display', serif;
    font-size: 17px; font-weight: 700;
    letter-spacing: 0.04em; color: var(--text);
  }
  .wordmark em { font-style:normal; color: var(--gold); }

  .nbadge {
    font-size: 10px; font-weight: 500;
    color: var(--gold);
    border: 1px solid rgba(201,169,110,0.28);
    padding: 1px 7px; border-radius: 20px;
    letter-spacing: 0.06em; text-transform: uppercase;
  }

  .nav-links { display:flex; gap:28px; }
  .nl {
    font-size:13px; font-weight:400;
    color: var(--muted); text-decoration:none;
    letter-spacing:0.03em; transition: color 0.15s;
  }
  .nl:hover { color: var(--text); }

  /* ── HERO ── */
  .hero {
    position: relative; z-index: 1;
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: center; gap: 0;
    min-height: calc(100vh - 54px);
    max-width: 1200px; margin: 0 auto;
    padding: 0 48px;
  }

  .hero-left {
    padding: 52px 60px 52px 0;
    display: flex; flex-direction: column; gap: 28px;
    animation: fadeUp 0.6s 0.1s ease both;
  }

  .eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--gold);
  }
  .edot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--gold);
    animation: pulseDot 2.5s ease-in-out infinite;
  }

  .hero-h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(46px, 5.5vw, 72px);
    font-weight: 900; line-height: 1.08;
    letter-spacing: -0.02em; color: var(--text);
  }
  .hero-h1 em { font-style: italic; color: var(--gold); }

  .hero-p {
    font-size: 16px; font-weight: 300;
    line-height: 1.8; color: var(--muted);
    max-width: 420px;
  }

  .btns { display:flex; align-items:center; gap:12px; }

  .btn-p {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 30px;
    background: linear-gradient(135deg, var(--gold), #a07840);
    color: #1a1200;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 15px; font-weight: 600;
    letter-spacing: 0.02em; border: none;
    border-radius: var(--r); cursor: pointer;
    text-decoration: none;
    transition: filter 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .btn-p:hover {
    filter: brightness(1.1); transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(201,169,110,0.25);
  }

  .btn-g {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 30px;
    background: none; color: var(--text);
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 15px; font-weight: 500;
    letter-spacing: 0.02em;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--r); cursor: pointer;
    text-decoration: none;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
  }
  .btn-g:hover {
    border-color: rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.04);
    transform: translateY(-2px);
  }

  .stats { display:flex; align-items:center; gap:28px; padding-top:4px; }
  .stat  { display:flex; flex-direction:column; gap:2px; }
  .snum  {
    font-family: 'Playfair Display', serif;
    font-size: 26px; font-weight: 700; color: var(--text);
  }
  .slbl  { font-size: 12px; color: var(--muted); letter-spacing:0.04em; }
  .ssep  { width:1px; height:32px; background: rgba(255,255,255,0.08); }

  /* ── VISUAL ── */
  .hero-right {
    display: flex; align-items: center; justify-content: center;
    padding: 40px 0 40px 40px;
    animation: fadeIn 0.7s 0.3s ease both;
  }

  .visual {
    position: relative; width: 360px; height: 360px;
    display: flex; align-items: center; justify-content: center;
  }

  .ring {
    position: absolute; border-radius: 50%;
    border: 1px solid rgba(201,169,110,0.12);
  }
  .r1 { width:360px; height:360px; }
  .r2 { width:268px; height:268px; border-color: rgba(201,169,110,0.18); }
  .r3 { width:178px; height:178px; border-color: rgba(201,169,110,0.26); }

  .od1 {
    position: absolute; width:9px; height:9px;
    background: var(--gold); border-radius: 50%;
    box-shadow: 0 0 12px rgba(201,169,110,0.9);
    top:50%; left:50%; margin:-4.5px 0 0 -4.5px;
    animation: orbit 5s linear infinite;
  }
  .od2 {
    position: absolute; width:6px; height:6px;
    background: var(--gold2); border-radius: 50%;
    box-shadow: 0 0 8px rgba(232,201,138,0.7);
    top:50%; left:50%; margin:-3px 0 0 -3px;
    animation: orbit2 9s linear infinite;
  }

  .mic {
    width: 108px; height: 108px; border-radius: 50%;
    background: linear-gradient(135deg, #1e1800, #2d2500);
    border: 1px solid rgba(201,169,110,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 42px; position: relative; z-index: 2;
    box-shadow: 0 0 44px rgba(201,169,110,0.12), inset 0 1px 0 rgba(201,169,110,0.15);
  }

  .waves {
    position: absolute; bottom: 18px; left:50%;
    transform: translateX(-50%);
    display: flex; align-items: flex-end; gap:4px; height:32px;
  }
  .wb {
    width:4px; border-radius:2px;
    background: var(--gold); opacity:0.4;
    animation: waveAnim 1.2s ease-in-out infinite;
    transform-origin: bottom;
  }

  .chip {
    position: absolute;
    background: rgba(12,14,20,0.92);
    border: 1px solid rgba(201,169,110,0.2);
    border-radius: 30px; padding: 8px 16px;
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; font-weight: 500; color: var(--text);
    white-space: nowrap; backdrop-filter: blur(8px); z-index: 3;
  }
  .cdot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
  .cdot.g { background:#4ecca3; box-shadow: 0 0 6px #4ecca3; }
  .cdot.b { background:#5b8dee; box-shadow: 0 0 6px #5b8dee; }
  .cdot.o { background:var(--gold); box-shadow: 0 0 6px var(--gold); }
  .c1 { top:16px; left:-36px; }
  .c2 { top:16px; right:-36px; }
  .c3 { bottom:54px; left:-24px; }

  /* ── FEATURES STRIP ── */
  .strip {
    position: relative; z-index: 1;
    border-top: 1px solid var(--line);
    display: grid; grid-template-columns: repeat(4,1fr);
    max-width: 1200px; margin: 0 auto; width:100%;
    padding: 0 48px;
  }
  .fi {
    padding: 20px 26px 20px 0;
    display: flex; align-items: center; gap: 13px;
    border-right: 1px solid var(--line);
  }
  .fi:first-child { padding-left:0; }
  .fi:last-child  { border-right:none; padding-right:0; }
  .fi-ico { font-size:20px; flex-shrink:0; }
  .fi-t { font-size:13px; font-weight:600; color:var(--text); margin-bottom:3px; }
  .fi-s { font-size:12px; color:var(--muted); font-weight:300; }

  /* ══════════════════════════════════════
     USE-CASES SECTION
  ══════════════════════════════════════ */
  .usecases {
    position: relative; z-index: 1;
    max-width: 1200px; margin: 0 auto;
    padding: 88px 48px 96px;
  }

  .uc-header {
    text-align: center;
    margin-bottom: 64px;
  }

  .uc-tag {
    display: inline-block;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--gold);
    border: 1px solid rgba(201,169,110,0.25);
    padding: 5px 16px; border-radius: 20px;
    margin-bottom: 18px;
  }

  .uc-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(34px, 4vw, 52px);
    font-weight: 800; line-height: 1.1;
    color: var(--text); margin-bottom: 16px;
  }
  .uc-title em { font-style:italic; color:var(--gold); }

  .uc-sub {
    font-size: 15px; font-weight: 300;
    color: var(--muted); line-height: 1.75;
    max-width: 520px; margin: 0 auto;
  }

  /* 3-col grid */
  .uc-grid {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 18px;
    margin-bottom: 24px;
  }

  /* bottom row — 2 wide cards */
  .uc-grid2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }

  .uc-card {
    background: var(--bg2);
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 32px 28px;
    display: flex; flex-direction: column; gap: 18px;
    transition: border-color 0.2s, transform 0.25s, box-shadow 0.25s;
    position: relative; overflow: hidden;
  }

  .uc-card::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 100% 0%, rgba(201,169,110,0.04), transparent 60%);
    pointer-events: none;
  }

  .uc-card:hover {
    border-color: rgba(201,169,110,0.22);
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.4);
  }

  .uc-card.wide { flex-direction: row; align-items: flex-start; gap: 22px; }

  .uc-ico-wrap {
    width: 56px; height: 56px; flex-shrink: 0;
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    font-size: 26px;
  }
  .uc-ico-wrap.gold   { background: rgba(201,169,110,0.12); }
  .uc-ico-wrap.blue   { background: rgba(91,141,238,0.12);  }
  .uc-ico-wrap.green  { background: rgba(78,204,163,0.12);  }
  .uc-ico-wrap.red    { background: rgba(224,92,110,0.12);  }
  .uc-ico-wrap.purple { background: rgba(159,122,234,0.12); }

  .uc-body { flex:1; }

  .uc-name {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 17px; font-weight: 600;
    color: var(--text); margin-bottom: 8px;
  }

  .uc-desc {
    font-size: 14px; font-weight: 300;
    color: var(--muted); line-height: 1.7;
  }

  .uc-tags {
    display: flex; flex-wrap: wrap; gap: 6px;
    margin-top: 4px;
  }

  .uc-pill {
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.05em;
    padding: 4px 11px; border-radius: 20px;
    text-transform: uppercase;
  }
  .uc-pill.gold   { background: var(--gold-dim);              color: var(--gold);  border: 1px solid rgba(201,169,110,0.2); }
  .uc-pill.blue   { background: rgba(91,141,238,0.1);         color: #5b8dee;      border: 1px solid rgba(91,141,238,0.2);  }
  .uc-pill.green  { background: rgba(78,204,163,0.1);         color: #4ecca3;      border: 1px solid rgba(78,204,163,0.2);  }
  .uc-pill.red    { background: rgba(224,92,110,0.1);         color: #e05c6e;      border: 1px solid rgba(224,92,110,0.2);  }
  .uc-pill.purple { background: rgba(159,122,234,0.1);        color: #9f7aea;      border: 1px solid rgba(159,122,234,0.2); }

  /* ── DIVIDER ── */
  .section-div {
    position: relative; z-index:1;
    border-top: 1px solid var(--line);
    width: 100%;
  }

  /* ── FOOTER ── */
  footer {
    position: relative; z-index: 10;
    border-top: 1px solid var(--line);
    padding: 14px 48px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(8,9,13,0.6);
  }
  .foot-l { font-size:13px; color:var(--muted); font-weight:300; }
  .built  { font-size:13px; color:var(--muted); display:flex; align-items:center; gap:5px; }
  .built strong { font-weight:600; color:var(--gold); }

  @media (max-width: 900px) {
    .hero  { grid-template-columns:1fr; padding:32px 24px; min-height:auto; }
    .hero-right { display:none; }
    .hero-left { padding:32px 0; }
    nav, footer { padding: 0 24px; }
    footer { padding: 14px 24px; }
    .strip { grid-template-columns:1fr 1fr; padding:0 24px; }
    .usecases { padding: 48px 24px 60px; }
    .uc-grid  { grid-template-columns:1fr 1fr; }
    .uc-grid2 { grid-template-columns:1fr; }
    .uc-card.wide { flex-direction:column; }
  }
  @media (max-width: 560px) {
    .uc-grid { grid-template-columns:1fr; }
  }
`;

const WAVES = [30,55,75,90,60,45,80,55,35,65,85,50,40,70,45];

const UC_TOP = [
  {
    ico: "🏦", color: "gold",
    name: "Banking & Finance",
    desc: "Authenticate customers over phone or app without PINs. Confirm high-value transfers with a single spoken phrase.",
    pills: [{ t:"Core Banking", c:"gold"}, { t:"Fraud Prevention", c:"gold"}],
  },
  {
    ico: "🚪", color: "blue",
    name: "Smart Access Control",
    desc: "Replace keycards and PINs with voice. Grant granular room-level access based on enrolled voice profiles.",
    pills: [{ t:"Office", c:"blue"}, { t:"Residential", c:"blue"}],
  },
  {
    ico: "🔒", color: "green",
    name: "Vault & Safe Locks",
    desc: "Protect physical assets with multi-factor voice authentication. Dual-voice approval for maximum security.",
    pills: [{ t:"Hardware", c:"green"}, { t:"Multi-factor", c:"green"}],
  },
];

const UC_BOT = [
  {
    ico: "🎖️", color: "red",
    name: "Military & Defense",
    desc: "Secure facility entry, command authentication, and field unit identification. Liveness detection prevents replay attacks in hostile environments. Zero-hardware-dependency design works in remote deployments.",
    pills: [{ t:"High-Security", c:"red"}, { t:"Anti-Spoofing", c:"red"}, { t:"Offline Mode", c:"red"}],
  },
  {
    ico: "🏥", color: "purple",
    name: "Healthcare & Gov Systems",
    desc: "HIPAA-compliant patient identity verification. Government facility access and document signing with biometric audit trails. Integrates with existing identity infrastructure.",
    pills: [{ t:"HIPAA", c:"purple"}, { t:"Gov ID", c:"purple"}, { t:"Audit Trail", c:"purple"}],
  },
];

export default function Home() {
  return (
    <>
      <style>{styles}</style>
      <div className="page">

        {/* NAV */}
        <nav>
          <div className="brand">
            <span className="wordmark">Voice<em>ID</em></span>
            <span className="nbadge">Beta</span>
          </div>
          <div className="nav-links">
            <a href="#usecases" className="nl">Use Cases</a>
            <a href="#" className="nl">Security</a>
            <a href="#" className="nl">Docs</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-left">
            <span className="eyebrow"><span className="edot"/>AI-Powered Voice Biometrics</span>
            <h1 className="hero-h1">Your voice is<br/>your <em>password.</em></h1>
            <p className="hero-p">
              Frictionless, spoof-resistant authentication powered by deep voice embeddings.
              No passwords. No tokens. Just speak.
            </p>
            <div className="btns">
              <Link to="/signup" className="btn-p">🎙 Create Account</Link>
              <Link to="/login"  className="btn-g">Sign In →</Link>
            </div>
            <div className="stats">
              <div className="stat"><span className="snum">99.2%</span><span className="slbl">Accuracy</span></div>
              <div className="ssep"/>
              <div className="stat"><span className="snum">&lt; 2s</span><span className="slbl">Auth time</span></div>
              <div className="ssep"/>
              <div className="stat"><span className="snum">256-bit</span><span className="slbl">Encryption</span></div>
            </div>
          </div>

          <div className="hero-right">
            <div className="visual">
              <div className="ring r1"/><div className="ring r2"/><div className="ring r3"/>
              <div className="od1"/><div className="od2"/>
              <div className="mic">🎙</div>
              <div className="waves">
                {WAVES.map((h,i) => (
                  <div key={i} className="wb" style={{ height:`${h}%`, animationDelay:`${i*0.08}s` }}/>
                ))}
              </div>
              <div className="chip c1"><span className="cdot g"/>Live Detection</div>
              <div className="chip c2"><span className="cdot b"/>Encrypted</div>
              <div className="chip c3"><span className="cdot o"/>Anti-Spoofing</div>
            </div>
          </div>
        </section>

        {/* FEATURES STRIP */}
        <div className="strip">
          {[
            { ico:"🔐", t:"Zero Passwords",   s:"Voice replaces all credentials"  },
            { ico:"🛡️", t:"Anti-Spoofing",    s:"Detects replays & deepfakes"     },
            { ico:"⚡", t:"2-Second Auth",     s:"Instant voice verification"      },
            { ico:"🔒", t:"End-to-End Secure", s:"AES-256 encrypted voice models"  },
          ].map(f => (
            <div className="fi" key={f.t}>
              <span className="fi-ico">{f.ico}</span>
              <div><p className="fi-t">{f.t}</p><p className="fi-s">{f.s}</p></div>
            </div>
          ))}
        </div>

        {/* USE CASES */}
        <section className="usecases" id="usecases">
          <div className="uc-header">
            <span className="uc-tag">Integration Ready</span>
            <h2 className="uc-title">Built for <em>critical systems</em></h2>
            <p className="uc-sub">
              From bank vaults to military checkpoints — VoiceID plugs into any infrastructure
              that demands uncompromising identity verification.
            </p>
          </div>

          {/* Top 3 cards */}
          <div className="uc-grid">
            {UC_TOP.map(c => (
              <div className="uc-card" key={c.name}>
                <div className={`uc-ico-wrap ${c.color}`}>{c.ico}</div>
                <div>
                  <p className="uc-name">{c.name}</p>
                  <p className="uc-desc">{c.desc}</p>
                </div>
                <div className="uc-tags">
                  {c.pills.map(p => (
                    <span key={p.t} className={`uc-pill ${p.c}`}>{p.t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom 2 wide cards */}
          <div className="uc-grid2">
            {UC_BOT.map(c => (
              <div className="uc-card wide" key={c.name}>
                <div className={`uc-ico-wrap ${c.color}`}>{c.ico}</div>
                <div className="uc-body">
                  <p className="uc-name">{c.name}</p>
                  <p className="uc-desc">{c.desc}</p>
                  <div className="uc-tags">
                    {c.pills.map(p => (
                      <span key={p.t} className={`uc-pill ${p.c}`}>{p.t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <span className="foot-l">© 2026 VoiceID · All rights reserved</span>
          <span className="built">Built by <strong>Bhanu Mahesh
            & Saba</strong></span>
        </footer>

      </div>
    </>
  );
}