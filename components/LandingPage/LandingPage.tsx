/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lp {
          background: #080810;
          color: #e8e8f0;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
          min-height: 100vh;
        }

        /* ── AMBIENT ── */
        .lp-ambient {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .lp-ambient-1 {
          position: absolute;
          top: -20%;
          left: -10%;
          width: 60vw; height: 60vw;
          background: radial-gradient(circle, rgba(99,91,255,0.1) 0%, transparent 65%);
        }
        .lp-ambient-2 {
          position: absolute;
          top: 30%;
          right: -15%;
          width: 50vw; height: 50vw;
          background: radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 65%);
        }
        .lp-ambient-3 {
          position: absolute;
          bottom: -10%;
          left: 20%;
          width: 40vw; height: 40vw;
          background: radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 65%);
        }

        /* ── NAV ── */
        .lp-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 64px;
          background: rgba(8,8,16,0.75);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .lp-logo {
          font-family: 'Instrument Serif', serif;
          font-size: 20px;
          letter-spacing: -0.5px;
          background: linear-gradient(135deg, #fff 40%, rgba(255,255,255,0.4));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
        }

        .lp-logo-dot {
          display: inline-block;
          width: 5px; height: 5px;
          background: #635bff;
          border-radius: 50%;
          margin-left: 2px;
          margin-bottom: 7px;
          vertical-align: bottom;
        }

        .lp-nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .lp-nav-link {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          padding: 7px 14px;
          border-radius: 8px;
          transition: color 0.2s;
        }
        .lp-nav-link:hover { color: rgba(255,255,255,0.8); }

        .lp-nav-cta {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #635bff, #8b5cf6);
          padding: 8px 18px;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          border: none;
          cursor: pointer;
        }
        .lp-nav-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(99,91,255,0.4);
        }

        /* ── HERO ── */
        .lp-hero {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 100px 24px 80px;
          max-width: 860px;
          margin: 0 auto;
        }

        .lp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(99,91,255,0.1);
          border: 1px solid rgba(99,91,255,0.2);
          color: #a5b4fc;
          font-size: 12px;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 28px;
          letter-spacing: 0.3px;
          opacity: 0;
          animation: lpFadeUp 0.6s ease 0.1s forwards;
        }

        .lp-eyebrow-dot {
          width: 6px; height: 6px;
          background: #635bff;
          border-radius: 50%;
          animation: lpPulse 2s ease infinite;
        }

        @keyframes lpPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .lp-h1 {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(44px, 7vw, 82px);
          line-height: 1.0;
          letter-spacing: -3px;
          color: #fff;
          margin-bottom: 24px;
          opacity: 0;
          animation: lpFadeUp 0.6s ease 0.2s forwards;
        }

        .lp-h1 em {
          font-style: italic;
          background: linear-gradient(135deg, #635bff, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .lp-h1 .lp-h1-muted {
          color: rgba(255,255,255,0.3);
        }

        .lp-hero-desc {
          font-size: clamp(16px, 2vw, 19px);
          color: rgba(255,255,255,0.4);
          max-width: 520px;
          margin: 0 auto 40px;
          line-height: 1.65;
          font-weight: 300;
          opacity: 0;
          animation: lpFadeUp 0.6s ease 0.3s forwards;
        }

        .lp-hero-desc strong {
          color: rgba(255,255,255,0.75);
          font-weight: 500;
        }

        .lp-hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          opacity: 0;
          animation: lpFadeUp 0.6s ease 0.4s forwards;
        }

        .lp-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #635bff, #8b5cf6);
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          padding: 15px 28px;
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.25s;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(99,91,255,0.3);
        }

        .lp-cta-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .lp-cta-primary:hover::before { opacity: 1; }
        .lp-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(99,91,255,0.45);
        }

        .lp-cta-arrow {
          transition: transform 0.2s;
        }
        .lp-cta-primary:hover .lp-cta-arrow { transform: translateX(3px); }

        .lp-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.4);
          font-size: 14px;
          text-decoration: none;
          padding: 14px 20px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .lp-cta-secondary:hover {
          color: rgba(255,255,255,0.7);
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.03);
        }

        /* Social proof */
        .lp-social {
          margin-top: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          opacity: 0;
          animation: lpFadeUp 0.6s ease 0.5s forwards;
        }

        .lp-avatars {
          display: flex;
        }

        .lp-avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 2px solid #080810;
          margin-left: -8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
        }

        .lp-avatar:first-child { margin-left: 0; }

        .lp-social-text {
          font-size: 13px;
          color: rgba(255,255,255,0.25);
        }

        .lp-social-text strong {
          color: rgba(255,255,255,0.5);
          font-weight: 500;
        }

        /* stars */
        .lp-stars {
          color: #f59e0b;
          font-size: 13px;
          letter-spacing: 1px;
        }

        /* ── PREVIEW CARD ── */
        .lp-preview-wrap {
          position: relative;
          z-index: 1;
          max-width: 560px;
          margin: 0 auto;
          padding: 0 24px 80px;
          opacity: 0;
          animation: lpFadeUp 0.7s ease 0.55s forwards;
        }

        .lp-preview {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 28px;
          position: relative;
          overflow: hidden;
        }

        .lp-preview::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        }

        .lp-preview-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .lp-preview-title {
          font-family: 'Instrument Serif', serif;
          font-size: 20px;
          color: #fff;
          letter-spacing: -0.5px;
        }

        .lp-preview-date {
          font-size: 12px;
          color: rgba(255,255,255,0.25);
        }

        .lp-preview-progress {
          margin-bottom: 20px;
        }

        .lp-preview-prog-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .lp-preview-prog-label {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
        }

        .lp-preview-prog-val {
          font-size: 12px;
          color: rgba(255,255,255,0.6);
          font-weight: 500;
        }

        .lp-preview-track {
          height: 5px;
          background: rgba(255,255,255,0.06);
          border-radius: 100px;
          overflow: hidden;
        }

        .lp-preview-fill {
          height: 100%;
          width: 66%;
          background: linear-gradient(90deg, #635bff, #ec4899);
          border-radius: 100px;
        }

        .lp-preview-habits {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .lp-preview-habit {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
        }

        .lp-preview-bar {
          width: 3px; height: 18px;
          border-radius: 100px;
          flex-shrink: 0;
        }

        .lp-preview-habit-name {
          flex: 1;
          font-size: 13px;
          color: rgba(255,255,255,0.7);
        }

        .lp-preview-habit-name.done {
          text-decoration: line-through;
          color: rgba(255,255,255,0.2);
        }

        .lp-preview-check {
          width: 22px; height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          flex-shrink: 0;
        }

        .lp-preview-check.done {
          background: rgba(99,91,255,0.2);
          border: 1px solid rgba(99,91,255,0.3);
          color: #a5b4fc;
        }

        .lp-preview-check.undone {
          border: 1px solid rgba(255,255,255,0.1);
        }

        .lp-preview-streak {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(251,146,60,0.1);
          border: 1px solid rgba(251,146,60,0.15);
          padding: 3px 8px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          color: #fb923c;
        }

        /* card glow bottom */
        .lp-preview-glow {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 80px;
          background: radial-gradient(ellipse, rgba(99,91,255,0.2), transparent 70%);
          pointer-events: none;
        }

        /* ── FEATURES ── */
        .lp-section {
          position: relative;
          z-index: 1;
          max-width: 1000px;
          margin: 0 auto;
          padding: 80px 24px;
        }

        .lp-section-eyebrow {
          text-align: center;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: rgba(99,91,255,0.7);
          font-weight: 600;
          margin-bottom: 14px;
        }

        .lp-section-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(30px, 4vw, 46px);
          text-align: center;
          letter-spacing: -1.5px;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 12px;
        }

        .lp-section-title em {
          font-style: italic;
          color: rgba(255,255,255,0.35);
        }

        .lp-section-sub {
          text-align: center;
          font-size: 15px;
          color: rgba(255,255,255,0.3);
          max-width: 440px;
          margin: 0 auto 56px;
          line-height: 1.6;
          font-weight: 300;
        }

        .lp-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .lp-feat {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 28px 24px;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .lp-feat::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
        }

        .lp-feat:hover {
          border-color: rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          transform: translateY(-3px);
        }

        .lp-feat-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-bottom: 16px;
        }

        .lp-feat-title {
          font-family: 'Instrument Serif', serif;
          font-size: 20px;
          color: #fff;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .lp-feat-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.35);
          line-height: 1.65;
          font-weight: 300;
        }

        /* ── HOW IT WORKS ── */
        .lp-divider {
          max-width: 1000px;
          margin: 0 auto;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
        }

        .lp-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          position: relative;
          margin-top: 48px;
        }

        .lp-steps::before {
          content: '';
          position: absolute;
          top: 24px;
          left: calc(16.66% + 12px);
          right: calc(16.66% + 12px);
          height: 1px;
          background: linear-gradient(90deg,
            rgba(99,91,255,0.4),
            rgba(236,72,153,0.4),
            rgba(16,185,129,0.4)
          );
        }

        .lp-step {
          text-align: center;
          padding: 0 24px;
          position: relative;
        }

        .lp-step-num {
          width: 48px; height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Instrument Serif', serif;
          font-size: 18px;
          color: #fff;
          margin: 0 auto 20px;
          position: relative;
          z-index: 1;
        }

        .lp-step-title {
          font-family: 'Instrument Serif', serif;
          font-size: 20px;
          color: #fff;
          letter-spacing: -0.5px;
          margin-bottom: 10px;
        }

        .lp-step-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.3);
          line-height: 1.65;
          font-weight: 300;
        }

        /* ── BOTTOM CTA ── */
        .lp-bottom-cta {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 80px 24px 100px;
          max-width: 640px;
          margin: 0 auto;
        }

        .lp-bottom-cta-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(36px, 5vw, 58px);
          letter-spacing: -2px;
          color: #fff;
          line-height: 1.05;
          margin-bottom: 20px;
        }

        .lp-bottom-cta-title em {
          font-style: italic;
          background: linear-gradient(135deg, #635bff, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .lp-bottom-cta-sub {
          font-size: 16px;
          color: rgba(255,255,255,0.3);
          margin-bottom: 36px;
          font-weight: 300;
          line-height: 1.6;
        }

        /* ── FOOTER ── */
        .lp-footer {
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 24px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .lp-footer-logo {
          font-family: 'Instrument Serif', serif;
          font-size: 16px;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
        }

        .lp-footer-text {
          font-size: 12px;
          color: rgba(255,255,255,0.15);
        }

        @keyframes lpFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .lp-nav { padding: 0 20px; }
          .lp-nav-link { display: none; }
          .lp-h1 { letter-spacing: -2px; }
          .lp-features { grid-template-columns: 1fr; }
          .lp-steps { grid-template-columns: 1fr; gap: 32px; }
          .lp-steps::before { display: none; }
          .lp-footer { flex-direction: column; gap: 8px; text-align: center; padding: 20px; }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .lp-features { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="lp">
        <div className="lp-ambient">
          <div className="lp-ambient-1" />
          <div className="lp-ambient-2" />
          <div className="lp-ambient-3" />
        </div>

        {/* NAV */}
        <nav className="lp-nav">
          <Link href="/" className="lp-logo">
            HabitFlow<span className="lp-logo-dot" />
          </Link>
          <div className="lp-nav-right">
            <Link href="#features" className="lp-nav-link">Features</Link>
            <Link href="#how" className="lp-nav-link">How it works</Link>
            <Link href="/auth/login" className="lp-nav-link">Sign in</Link>
            <Link href="/auth/login" className="lp-nav-cta">Track your habits</Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="lp-hero">
          <div className="lp-eyebrow">
            <span className="lp-eyebrow-dot" />
            Build habits that actually stick
          </div>

          <h1 className="lp-h1">
            Stop starting over.<br />
            <em>Start streaking.</em>
          </h1>

          <p className="lp-hero-desc">
            Most habit apps are <strong>built to be complicated.</strong> HabitFlow isn't.
            Track what matters, build momentum, and never miss a day again.
          </p>

          <div className="lp-hero-actions">
            <Link href="/auth/login" className="lp-cta-primary">
              Track your habits
              <span className="lp-cta-arrow">→</span>
            </Link>
            <Link href="#how" className="lp-cta-secondary">
              See how it works
            </Link>
          </div>

          <div className="lp-social">
            <div className="lp-avatars">
              {[
                { bg: '#635bff', label: 'V' },
                { bg: '#ec4899', label: 'R' },
                { bg: '#10b981', label: 'P' },
                { bg: '#f59e0b', label: 'A' },
              ].map((a, i) => (
                <div
                  key={i}
                  className="lp-avatar"
                  style={{ background: a.bg }}
                >
                  {a.label}
                </div>
              ))}
            </div>
            <div className="lp-stars">★★★★★</div>
            <span className="lp-social-text">
              <strong>240+ people</strong> building better habits
            </span>
          </div>
        </section>

        {/* APP PREVIEW */}
        <div className="lp-preview-wrap">
          <div className="lp-preview">
            <div className="lp-preview-header">
              <div className="lp-preview-title">Thursday</div>
              <div className="lp-preview-date">March 5</div>
            </div>

            <div className="lp-preview-progress">
              <div className="lp-preview-prog-row">
                <span className="lp-preview-prog-label">Daily progress</span>
                <span className="lp-preview-prog-val">66%</span>
              </div>
              <div className="lp-preview-track">
                <div className="lp-preview-fill" />
              </div>
            </div>

            <div className="lp-preview-habits">
              {[
                { name: 'Morning run', color: '#635bff', done: true, streak: 7 },
                { name: 'Read 30 mins', color: '#ec4899', done: true, streak: 12 },
                { name: 'Meditate', color: '#10b981', done: false, streak: 0 },
              ].map((h, i) => (
                <div key={i} className="lp-preview-habit">
                  <div
                    className="lp-preview-bar"
                    style={{
                      background: h.done ? `${h.color}55` : h.color,
                      boxShadow: h.done ? 'none' : `0 0 6px ${h.color}66`,
                    }}
                  />
                  <span className={`lp-preview-habit-name ${h.done ? 'done' : ''}`}>
                    {h.name}
                  </span>
                  {h.streak > 0 && (
                    <div className="lp-preview-streak">🔥 {h.streak}</div>
                  )}
                  <div className={`lp-preview-check ${h.done ? 'done' : 'undone'}`}>
                    {h.done ? '✓' : ''}
                  </div>
                </div>
              ))}
            </div>
            <div className="lp-preview-glow" />
          </div>
        </div>

        {/* FEATURES */}
        <div className="lp-divider" />
        <section className="lp-section" id="features">
          <div className="lp-section-eyebrow">Features</div>
          <h2 className="lp-section-title">
            Everything you need.<br /><em>Nothing you don't.</em>
          </h2>
          <p className="lp-section-sub">
            No subscriptions. No bloat. Just a clean, fast way to build the habits that change your life.
          </p>

          <div className="lp-features">
            {[
              {
                icon: '🔥',
                iconBg: 'rgba(251,146,60,0.12)',
                title: 'Streak tracking',
                desc: 'Watch your streak grow every day. Miss a day and feel it. That tension is what makes habits stick.',
              },
              {
                icon: '⚡',
                iconBg: 'rgba(99,91,255,0.12)',
                title: 'One tap to log',
                desc: "No forms. No friction. Tap once to mark a habit done. That's the entire flow.",
              },
              {
                icon: '📊',
                iconBg: 'rgba(16,185,129,0.12)',
                title: 'Daily progress',
                desc: 'See exactly where you stand each day. A simple progress bar that motivates without overwhelming.',
              },
              {
                icon: '🎨',
                iconBg: 'rgba(236,72,153,0.12)',
                title: 'Color coded',
                desc: 'Assign a colour to each habit. Your dashboard becomes a visual snapshot of your day at a glance.',
              },
              {
                icon: '🔒',
                iconBg: 'rgba(245,158,11,0.12)',
                title: 'Private by default',
                desc: 'Your habits are yours. Row Level Security means nobody can see your data — not even us.',
              },
              {
                icon: '📱',
                iconBg: 'rgba(99,91,255,0.08)',
                title: 'Works everywhere',
                desc: 'Fully responsive on mobile, tablet, and desktop. Open it, log it, close it. Done.',
              },
            ].map((f, i) => (
              <div key={i} className="lp-feat">
                <div className="lp-feat-icon" style={{ background: f.iconBg }}>
                  {f.icon}
                </div>
                <div className="lp-feat-title">{f.title}</div>
                <p className="lp-feat-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <div className="lp-divider" />
        <section className="lp-section" id="how">
          <div className="lp-section-eyebrow">How it works</div>
          <h2 className="lp-section-title">
            Up and running<br /><em>in 60 seconds.</em>
          </h2>
          <p className="lp-section-sub">
            No setup wizards. No onboarding surveys. Three steps and you're tracking.
          </p>

          <div className="lp-steps">
            {[
              {
                num: '1',
                color: '#635bff',
                bg: 'rgba(99,91,255,0.12)',
                border: 'rgba(99,91,255,0.25)',
                title: 'Create your account',
                desc: 'Sign up with your email. No credit card. No trials. Free to start.',
              },
              {
                num: '2',
                color: '#ec4899',
                bg: 'rgba(236,72,153,0.12)',
                border: 'rgba(236,72,153,0.25)',
                title: 'Add your habits',
                desc: 'Name it, pick a colour, done. Add as many as you want — we recommend starting with three.',
              },
              {
                num: '3',
                color: '#10b981',
                bg: 'rgba(16,185,129,0.12)',
                border: 'rgba(16,185,129,0.25)',
                title: 'Show up daily',
                desc: 'Open the app each day. Tap to log. Watch your streak grow. That\'s literally it.',
              },
            ].map((s, i) => (
              <div key={i} className="lp-step">
                <div
                  className="lp-step-num"
                  style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
                >
                  {s.num}
                </div>
                <div className="lp-step-title">{s.title}</div>
                <p className="lp-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <div className="lp-divider" />
        <section className="lp-bottom-cta">
          <h2 className="lp-bottom-cta-title">
            Your best streak<br />starts <em>today.</em>
          </h2>
          <p className="lp-bottom-cta-sub">
            Every person with a 100-day streak started at day one.
            Stop waiting for the right time — this is it.
          </p>
          <Link href="/auth/login" className="lp-cta-primary" style={{ display: 'inline-flex' }}>
            Track your habits
            <span className="lp-cta-arrow">→</span>
          </Link>
        </section>

        {/* FOOTER */}
        <footer className="lp-footer">
          <Link href="/" className="lp-footer-logo">
            HabitFlow
          </Link>
          <span className="lp-footer-text">
            Built with Next.js + Supabase · {new Date().getFullYear()}
          </span>
        </footer>
      </div>
    </>
  )
}