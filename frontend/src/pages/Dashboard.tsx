import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #0d0f14;
    --bg2:       #13161d;
    --bg3:       #191d27;
    --line:      rgba(255,255,255,0.06);
    --line2:     rgba(255,255,255,0.10);
    --text:      #e6e8f0;
    --muted:     #5a6175;
    --dim:       #2e3347;
    --gold:      #c9a96e;
    --gold2:     #e8c98a;
    --gold-dim:  rgba(201,169,110,0.10);
    --gold-glow: rgba(201,169,110,0.18);
    --green:     #4ecca3;
    --green-dim: rgba(78,204,163,0.10);
    --red:       #e05c6e;
    --red-dim:   rgba(224,92,110,0.10);
    --blue:      #5b8dee;
    --blue-dim:  rgba(91,141,238,0.10);
    --r:         10px;
    --r2:        16px;
  }

  html, body { background: var(--bg); }

  .app {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'IBM Plex Sans', sans-serif;
    color: var(--text);
  }

  /* ─── TOPBAR ─── */
  .bar {
    height: 58px;
    background: var(--bg2);
    border-bottom: 1px solid var(--line);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 36px;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .bar-brand {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }

  .bar-wordmark {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--text);
  }

  .bar-wordmark span { color: var(--gold); }

  .bar-tag {
    font-size: 10px;
    font-weight: 500;
    color: var(--gold);
    border: 1px solid rgba(201,169,110,0.3);
    padding: 1px 7px;
    border-radius: 20px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .bar-right { display: flex; align-items: center; gap: 14px; }

  .bar-date {
    font-size: 12px;
    color: var(--muted);
    font-weight: 300;
    letter-spacing: 0.02em;
  }

  .bar-sep {
    width: 1px;
    height: 18px;
    background: var(--line2);
  }

  .avatar-btn {
    display: flex;
    align-items: center;
    gap: 9px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--gold) 0%, #8b5e2c 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #1a1200;
  }

  .avatar-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .signout {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.03em;
    padding: 7px 14px;
    border-radius: var(--r);
    border: 1px solid var(--line2);
    background: none;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.15s;
  }

  .signout:hover {
    border-color: rgba(224,92,110,0.35);
    color: var(--red);
    background: var(--red-dim);
  }

  /* ─── LAYOUT ─── */
  .main {
    max-width: 1180px;
    margin: 0 auto;
    padding: 36px 36px 60px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  /* ─── SECTION LABEL ─── */
  .sec-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 14px;
  }

  /* ─── CARDS ROW ─── */
  .cards-row {
    display: grid;
    grid-template-columns: 1.35fr 1fr 1fr;
    gap: 18px;
    align-items: stretch;
  }

  /* ─── PHYSICAL CARD ─── */
  .phys-card {
    border-radius: 18px;
    padding: 26px 28px;
    min-height: 188px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    cursor: default;
    transition: transform 0.25s, box-shadow 0.25s;
  }

  .phys-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 48px rgba(0,0,0,0.45);
  }

  .phys-card.credit {
    background: linear-gradient(135deg, #1a1500 0%, #2d2200 40%, #1c1800 100%);
    border: 1px solid rgba(201,169,110,0.22);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,169,110,0.15);
  }

  .phys-card.debit {
    background: linear-gradient(135deg, #0a1628 0%, #112244 50%, #0d1a35 100%);
    border: 1px solid rgba(91,141,238,0.2);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(91,141,238,0.1);
  }

  /* Shimmer overlay */
  .phys-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.04) 0%, transparent 60%);
    pointer-events: none;
  }

  /* Decorative circle */
  .phys-card::after {
    content: '';
    position: absolute;
    right: -40px;
    bottom: -40px;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: rgba(255,255,255,0.02);
    pointer-events: none;
  }

  .card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .card-type-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.55;
  }

  .credit .card-type-label { color: var(--gold2); }
  .debit  .card-type-label { color: #8ab0f0; }

  .card-chip {
    width: 34px;
    height: 26px;
    border-radius: 5px;
    border: 1px solid rgba(255,255,255,0.15);
    background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    padding: 4px;
    opacity: 0.7;
  }

  .chip-cell {
    background: rgba(255,255,255,0.2);
    border-radius: 1px;
  }

  .card-mid {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .card-balance-label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.45;
  }

  .credit .card-balance-label { color: var(--gold2); }
  .debit  .card-balance-label { color: #8ab0f0; }

  .card-balance {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.01em;
  }

  .credit .card-balance { color: var(--gold2); }
  .debit  .card-balance { color: #c8dbff; }

  .card-bottom {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .card-number {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.18em;
    opacity: 0.45;
  }

  .credit .card-number { color: var(--gold2); }
  .debit  .card-number { color: #8ab0f0; }

  .card-logo {
    font-family: 'Playfair Display', serif;
    font-size: 13px;
    font-weight: 600;
    opacity: 0.6;
  }

  .credit .card-logo { color: var(--gold2); }
  .debit  .card-logo { color: #8ab0f0; }

  /* ─── BALANCE MINI-CARDS ─── */
  .bal-card {
    background: var(--bg2);
    border: 1px solid var(--line);
    border-radius: var(--r2);
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
    transition: border-color 0.2s;
  }

  .bal-card:hover { border-color: var(--line2); }

  .bal-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .bal-icon.g { background: var(--green-dim); }
  .bal-icon.b { background: var(--blue-dim); }

  .bal-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 4px;
  }

  .bal-amount {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 600;
    color: var(--text);
    letter-spacing: -0.01em;
  }

  .bal-change {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 500;
    padding: 3px 8px;
    border-radius: 20px;
  }

  .bal-change.up   { background: var(--green-dim); color: var(--green); }
  .bal-change.down { background: var(--red-dim);   color: var(--red);   }

  /* ─── MIDDLE ROW ─── */
  .mid-row {
    display: grid;
    grid-template-columns: 1fr 1fr 340px;
    gap: 18px;
  }

  /* ─── SPEND CHART ─── */
  .spend-card {
    background: var(--bg2);
    border: 1px solid var(--line);
    border-radius: var(--r2);
    padding: 24px;
  }

  .spend-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .spend-title {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 600;
    color: var(--text);
  }

  .spend-total {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    color: var(--gold);
  }

  .bar-chart {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    height: 90px;
  }

  .bar-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    height: 100%;
    justify-content: flex-end;
  }

  .bar-fill {
    width: 100%;
    border-radius: 4px 4px 0 0;
    transition: height 0.4s ease;
    min-height: 4px;
  }

  .bar-fill.current { background: var(--gold); }
  .bar-fill.past    { background: var(--dim); }

  .bar-month {
    font-size: 10px;
    color: var(--muted);
    font-weight: 500;
    letter-spacing: 0.04em;
  }

  /* ─── QUICK ACTIONS ─── */
  .actions-card {
    background: var(--bg2);
    border: 1px solid var(--line);
    border-radius: var(--r2);
    padding: 24px;
  }

  .actions-title {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 18px;
  }

  .actions-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .act-btn {
    background: var(--bg3);
    border: 1px solid var(--line);
    border-radius: var(--r);
    padding: 14px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    cursor: pointer;
    transition: all 0.15s;
    text-align: center;
  }

  .act-btn:hover {
    border-color: rgba(201,169,110,0.3);
    background: var(--gold-dim);
    transform: translateY(-1px);
  }

  .act-icon {
    font-size: 20px;
  }

  .act-label {
    font-size: 11px;
    font-weight: 500;
    color: var(--muted);
    letter-spacing: 0.04em;
    line-height: 1.3;
  }

  /* ─── RECENT TXN ─── */
  .txn-card {
    background: var(--bg2);
    border: 1px solid var(--line);
    border-radius: var(--r2);
    overflow: hidden;
  }

  .txn-header {
    padding: 18px 22px 14px;
    border-bottom: 1px solid var(--line);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .txn-title {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 600;
    color: var(--text);
  }

  .txn-see {
    font-size: 11px;
    font-weight: 500;
    color: var(--gold);
    cursor: pointer;
    opacity: 0.8;
    letter-spacing: 0.04em;
    background: none;
    border: none;
  }

  .txn-see:hover { opacity: 1; }

  .txn-row {
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 13px 22px;
    border-bottom: 1px solid var(--line);
    transition: background 0.12s;
  }

  .txn-row:last-child { border-bottom: none; }
  .txn-row:hover { background: var(--bg3); }

  .txn-ico {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
    background: var(--bg3);
    border: 1px solid var(--line);
  }

  .txn-info { flex: 1; min-width: 0; }

  .txn-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .txn-date {
    font-size: 11px;
    color: var(--muted);
    margin-top: 2px;
  }

  .txn-amt {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    text-align: right;
    flex-shrink: 0;
  }

  .txn-amt.out { color: var(--red); }
  .txn-amt.in  { color: var(--green); }

  .txn-cat {
    font-size: 10px;
    color: var(--muted);
    text-align: right;
    margin-top: 2px;
    letter-spacing: 0.04em;
  }

  /* ─── BOTTOM ROW ─── */
  .bot-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }

  /* ─── LIMITS CARD ─── */
  .limits-card {
    background: var(--bg2);
    border: 1px solid var(--line);
    border-radius: var(--r2);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .limits-title {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 600;
    color: var(--text);
  }

  .limit-row { display: flex; flex-direction: column; gap: 7px; }

  .limit-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .limit-name {
    font-size: 12px;
    font-weight: 500;
    color: var(--muted);
    letter-spacing: 0.03em;
  }

  .limit-vals {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: var(--muted);
  }

  .limit-vals strong {
    color: var(--text);
    font-weight: 500;
  }

  .progress {
    height: 5px;
    background: var(--dim);
    border-radius: 99px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 99px;
    transition: width 0.6s ease;
  }

  .progress-fill.gold   { background: var(--gold); }
  .progress-fill.blue   { background: var(--blue); }
  .progress-fill.green  { background: var(--green); }
  .progress-fill.red    { background: var(--red); }

  /* ─── GOALS CARD ─── */
  .goals-card {
    background: var(--bg2);
    border: 1px solid var(--line);
    border-radius: var(--r2);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .goals-title {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 600;
    color: var(--text);
  }

  .goal-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 14px;
    background: var(--bg3);
    border: 1px solid var(--line);
    border-radius: var(--r);
    transition: border-color 0.15s;
  }

  .goal-row:hover { border-color: var(--line2); }

  .goal-icon {
    font-size: 20px;
    flex-shrink: 0;
    width: 36px;
    text-align: center;
  }

  .goal-info { flex: 1; }

  .goal-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 5px;
  }

  .goal-bar {
    height: 4px;
    background: var(--dim);
    border-radius: 99px;
    overflow: hidden;
  }

  .goal-fill {
    height: 100%;
    border-radius: 99px;
    background: linear-gradient(90deg, var(--gold), var(--gold2));
  }

  .goal-pct {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    color: var(--gold);
    flex-shrink: 0;
  }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 900px) {
    .cards-row { grid-template-columns: 1fr 1fr; }
    .mid-row   { grid-template-columns: 1fr 1fr; }
    .bot-row   { grid-template-columns: 1fr; }
    .main { padding: 24px 20px 48px; }
    .bar  { padding: 0 20px; }
  }

  @media (max-width: 600px) {
    .cards-row { grid-template-columns: 1fr; }
    .mid-row   { grid-template-columns: 1fr; }
  }
`;

const TRANSACTIONS = [
  { id:1, ico:"🛒", name:"Whole Foods Market",  date:"Today, 09:41",    amt:"-$124.30", type:"out", cat:"Groceries"   },
  { id:2, ico:"💳", name:"Salary Deposit",       date:"Today, 00:00",    amt:"+$4,200.00",type:"in", cat:"Income"     },
  { id:3, ico:"✈️", name:"Delta Airlines",        date:"Yesterday",       amt:"-$389.00", type:"out", cat:"Travel"     },
  { id:4, ico:"📺", name:"Netflix",               date:"Feb 23",          amt:"-$15.99",  type:"out", cat:"Subscriptions"},
  { id:5, ico:"⚡", name:"Electric Bill",         date:"Feb 22",          amt:"-$92.40",  type:"out", cat:"Utilities"  },
  { id:6, ico:"🍜", name:"Nobu Restaurant",       date:"Feb 21",          amt:"-$210.00", type:"out", cat:"Dining"     },
];

const MONTHS = ["Aug","Sep","Oct","Nov","Dec","Jan"];
const SPEND  = [3200, 2800, 4100, 3600, 3900, 2340];
const MAX    = Math.max(...SPEND);

export default function Dashboard() {
  const navigate  = useNavigate();
  const userId    = localStorage.getItem("userId") ?? "User";
  const initials  = userId.slice(0, 2).toUpperCase();
  const today     = new Date().toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric", year:"numeric" });

  useEffect(() => {
    if (!localStorage.getItem("userId")) navigate("/login");
  }, []);

  const logout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const [activeCard, setActiveCard] = useState<"credit"|"debit">("credit");

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {/* ── TOPBAR ── */}
        <header className="bar">
          <div className="bar-brand">
            <span className="bar-wordmark">Vault<span>X</span></span>
            <span className="bar-tag">Private</span>
          </div>
          <div className="bar-right">
            <span className="bar-date">{today}</span>
            <div className="bar-sep" />
            <div className="avatar-btn">
              <div className="avatar">{initials}</div>
              <span className="avatar-name">{userId}</span>
            </div>
            <button className="signout" onClick={logout}>Sign out</button>
          </div>
        </header>

        <main className="main">

          {/* ── CARDS ROW ── */}
          <div>
            <p className="sec-label">Your Cards</p>
            <div className="cards-row">

              {/* Credit Card */}
              <div className="phys-card credit" onClick={() => setActiveCard("credit")}>
                <div className="card-top">
                  <span className="card-type-label">Credit Card</span>
                  <div className="card-chip">
                    <div className="chip-cell" /><div className="chip-cell" />
                    <div className="chip-cell" /><div className="chip-cell" />
                  </div>
                </div>
                <div className="card-mid">
                  <span className="card-balance-label">Available Credit</span>
                  <span className="card-balance">$12,450.00</span>
                </div>
                <div className="card-bottom">
                  <span className="card-number">•••• •••• •••• 4821</span>
                  <span className="card-logo">VaultX</span>
                </div>
              </div>

              {/* Savings */}
              <div className="bal-card">
                <div className="bal-icon g">💰</div>
                <div>
                  <p className="bal-label">Savings</p>
                  <p className="bal-amount">$38,291</p>
                </div>
                <div>
                  <span className="bal-change up">↑ 3.2% this month</span>
                </div>
              </div>

              {/* Checking */}
              <div className="bal-card">
                <div className="bal-icon b">🏦</div>
                <div>
                  <p className="bal-label">Checking</p>
                  <p className="bal-amount">$6,840</p>
                </div>
                <div>
                  <span className="bal-change down">↓ $1,204 spent</span>
                </div>
              </div>

            </div>
          </div>

          {/* ── MIDDLE ROW ── */}
          <div className="mid-row">

            {/* Spend Chart */}
            <div className="spend-card">
              <div className="spend-header">
                <span className="spend-title">Monthly Spending</span>
                <span className="spend-total">$2,340 this month</span>
              </div>
              <div className="bar-chart">
                {MONTHS.map((m, i) => (
                  <div className="bar-col" key={m}>
                    <div
                      className={`bar-fill ${i === MONTHS.length - 1 ? "current" : "past"}`}
                      style={{ height: `${(SPEND[i] / MAX) * 100}%` }}
                    />
                    <span className="bar-month">{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="actions-card">
              <p className="actions-title">Quick Actions</p>
              <div className="actions-grid">
                {[
                  { ico:"↗️", label:"Send Money"   },
                  { ico:"↙️", label:"Request"       },
                  { ico:"💳", label:"Pay Bill"      },
                  { ico:"📊", label:"Analytics"     },
                  { ico:"🔒", label:"Freeze Card"   },
                  { ico:"📄", label:"Statement"     },
                ].map((a) => (
                  <button className="act-btn" key={a.label}>
                    <span className="act-icon">{a.ico}</span>
                    <span className="act-label">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="txn-card">
              <div className="txn-header">
                <span className="txn-title">Recent</span>
                <button className="txn-see">See all →</button>
              </div>
              {TRANSACTIONS.map((t) => (
                <div className="txn-row" key={t.id}>
                  <div className="txn-ico">{t.ico}</div>
                  <div className="txn-info">
                    <p className="txn-name">{t.name}</p>
                    <p className="txn-date">{t.date}</p>
                  </div>
                  <div>
                    <p className={`txn-amt ${t.type}`}>{t.amt}</p>
                    <p className="txn-cat">{t.cat}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ── BOTTOM ROW ── */}
          <div className="bot-row">

            {/* Credit Limits */}
            <div className="limits-card">
              <p className="limits-title">Credit Usage</p>
              {[
                { name:"Credit Limit",   used:7550,  total:20000, color:"gold"  },
                { name:"Daily Spend",    used:340,   total:2000,  color:"blue"  },
                { name:"ATM Withdrawal", used:200,   total:1000,  color:"green" },
                { name:"Foreign Trans.", used:1200,  total:3000,  color:"red"   },
              ].map((l) => (
                <div className="limit-row" key={l.name}>
                  <div className="limit-top">
                    <span className="limit-name">{l.name}</span>
                    <span className="limit-vals">
                      <strong>${l.used.toLocaleString()}</strong> / ${l.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="progress">
                    <div
                      className={`progress-fill ${l.color}`}
                      style={{ width: `${(l.used / l.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Savings Goals */}
            <div className="goals-card">
              <p className="goals-title">Savings Goals</p>
              {[
                { ico:"🏠", name:"House Down Payment", pct:68 },
                { ico:"✈️", name:"Europe Trip 2026",   pct:42 },
                { ico:"🚗", name:"New Car",             pct:23 },
              ].map((g) => (
                <div className="goal-row" key={g.name}>
                  <span className="goal-icon">{g.ico}</span>
                  <div className="goal-info">
                    <p className="goal-name">{g.name}</p>
                    <div className="goal-bar">
                      <div className="goal-fill" style={{ width: `${g.pct}%` }} />
                    </div>
                  </div>
                  <span className="goal-pct">{g.pct}%</span>
                </div>
              ))}
            </div>

          </div>

        </main>
      </div>
    </>
  );
}