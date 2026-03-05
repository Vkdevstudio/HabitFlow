'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function AuthPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [message, setMessage]   = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async () => {
    if (!email || !password) return
    setLoading(true)
    setMessage('')
    setIsSuccess(false)

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
      })
      if (error) { setMessage(error.message) }
      else { setIsSuccess(true); setMessage('Check your email for a confirmation link.') }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setMessage(error.message) }
      else { router.push('/dashboard') }
    }
    setLoading(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .auth-root {
          min-height: 100vh;
          background: #080810;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* ambient glows */
        .auth-root::before {
          content: '';
          position: fixed;
          top: -30%;
          left: -20%;
          width: 70vw;
          height: 70vw;
          background: radial-gradient(circle, rgba(99,91,255,0.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .auth-root::after {
          content: '';
          position: fixed;
          bottom: -20%;
          right: -10%;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 65%);
          pointer-events: none;
        }

        .auth-card {
          width: 100%;
          max-width: 400px;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(16px);
          animation: authFadeUp 0.5s ease 0.1s forwards;
        }

        @keyframes authFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* logo top */
        .auth-logo {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-logo-text {
          font-family: 'Instrument Serif', serif;
          font-size: 22px;
          letter-spacing: -0.5px;
          background: linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.4));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .auth-logo-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          background: #635bff;
          border-radius: 50%;
          margin-left: 2px;
          margin-bottom: 7px;
          vertical-align: bottom;
        }

        /* card body */
        .auth-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 36px 32px;
          position: relative;
          overflow: hidden;
        }

        /* top shimmer line */
        .auth-box::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
        }

        .auth-heading {
          font-family: 'Instrument Serif', serif;
          font-size: 28px;
          letter-spacing: -1px;
          color: #fff;
          margin-bottom: 4px;
          line-height: 1.1;
        }

        .auth-heading em {
          font-style: italic;
          color: rgba(255,255,255,0.5);
        }

        .auth-subtext {
          font-size: 13px;
          color: rgba(255,255,255,0.25);
          margin-bottom: 28px;
          font-weight: 300;
        }

        /* inputs */
        .auth-field {
          margin-bottom: 12px;
          position: relative;
        }

        .auth-label {
          display: block;
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .auth-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 13px 16px;
          color: #e8e8f0;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
        }

        .auth-input::placeholder {
          color: rgba(255,255,255,0.15);
        }

        .auth-input:focus {
          border-color: rgba(99,91,255,0.5);
          background: rgba(99,91,255,0.04);
          box-shadow: 0 0 0 3px rgba(99,91,255,0.08);
        }

        /* message */
        .auth-message {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 12px 14px;
          border-radius: 10px;
          font-size: 13px;
          margin-top: 16px;
          line-height: 1.5;
        }

        .auth-message.error {
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.15);
          color: #fca5a5;
        }

        .auth-message.success {
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.15);
          color: #6ee7b7;
        }

        /* primary button */
        .auth-btn-primary {
          width: 100%;
          margin-top: 20px;
          padding: 14px;
          border-radius: 12px;
          background: linear-gradient(135deg, #635bff, #8b5cf6);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
          letter-spacing: 0.1px;
        }

        .auth-btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .auth-btn-primary:hover::before { opacity: 1; }

        .auth-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(99,91,255,0.35);
        }

        .auth-btn-primary:active {
          transform: translateY(0);
          box-shadow: none;
        }

        .auth-btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* loading dots */
        .auth-dots {
          display: flex;
          gap: 4px;
          justify-content: center;
          align-items: center;
          height: 18px;
        }

        .auth-dot {
          width: 5px;
          height: 5px;
          background: rgba(255,255,255,0.8);
          border-radius: 50%;
          animation: authDot 1.2s ease infinite;
        }

        .auth-dot:nth-child(2) { animation-delay: 0.2s; }
        .auth-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes authDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }

        /* toggle link */
        .auth-toggle {
          width: 100%;
          margin-top: 14px;
          padding: 10px;
          background: none;
          border: none;
          font-size: 13px;
          color: rgba(255,255,255,0.25);
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: color 0.2s;
          text-align: center;
        }

        .auth-toggle:hover { color: rgba(255,255,255,0.6); }

        .auth-toggle span {
          color: #635bff;
          font-weight: 500;
        }

        /* divider */
        .auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0 0;
        }

        .auth-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        .auth-divider-text {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          white-space: nowrap;
        }

        /* footer */
        .auth-footer {
          text-align: center;
          margin-top: 24px;
          font-size: 12px;
          color: rgba(255,255,255,0.15);
        }
      `}</style>

      <div className="auth-root">
        <div className="auth-card">

          {/* Logo */}
          <div className="auth-logo">
            <span className="auth-logo-text">
              HabitFlow<span className="auth-logo-dot" />
            </span>
          </div>

          {/* Card */}
          <div className="auth-box">
            <h1 className="auth-heading">
              {isSignUp ? <>Create your<br /><em>account</em></> : <>Welcome<br /><em>back</em></>}
            </h1>
            <p className="auth-subtext">
              {isSignUp ? 'Start building better habits today.' : 'Sign in to continue your streak.'}
            </p>

            {/* Email */}
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="auth-input"
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                className="auth-input"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
              />
            </div>

            {/* Message */}
            {message && (
              <div className={`auth-message ${isSuccess ? 'success' : 'error'}`}>
                <span>{isSuccess ? '✓' : '!'}</span>
                <span>{message}</span>
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading || !email || !password}
              className="auth-btn-primary"
            >
              {loading ? (
                <div className="auth-dots">
                  <div className="auth-dot" />
                  <div className="auth-dot" />
                  <div className="auth-dot" />
                </div>
              ) : (
                isSignUp ? 'Create account' : 'Sign in'
              )}
            </button>

            {/* Divider */}
            <div className="auth-divider">
              <div className="auth-divider-line" />
              <span className="auth-divider-text">
                {isSignUp ? 'already have an account?' : 'new here?'}
              </span>
              <div className="auth-divider-line" />
            </div>

            {/* Toggle */}
            <button
              className="auth-toggle"
              onClick={() => { setIsSignUp(!isSignUp); setMessage('') }}
            >
              {isSignUp
                ? <><span>Sign in</span> instead</>
                : <>Create a <span>free account</span></>
              }
            </button>
          </div>

          {/* Footer */}
          <p className="auth-footer">
            Your data is private and secure.
          </p>
        </div>
      </div>
    </>
  )
}