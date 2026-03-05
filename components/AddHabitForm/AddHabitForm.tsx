"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

const COLORS = [
  { hex: "#6366f1", label: "Indigo" },
  { hex: "#ec4899", label: "Pink" },
  { hex: "#f59e0b", label: "Amber" },
  { hex: "#10b981", label: "Emerald" },
  { hex: "#3b82f6", label: "Blue" },
  { hex: "#ef4444", label: "Red" },
];

export default function AddHabitForm({ userId }: { userId: string }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[0].hex);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleAdd = async () => {
    if (!name.trim()) return;
    setLoading(true);
    const { error } = await supabase
      .from("habits")
      .insert({ user_id: userId, name: name.trim(), color });
    if (!error) {
      setName("");
      setColor(COLORS[0].hex);
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        .ahf-wrap {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 20px;
          transition: border-color 0.2s;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .ahf-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
        }

        .ahf-wrap.focused {
          border-color: rgba(99,91,255,0.3);
          background: rgba(99,91,255,0.03);
        }

        .ahf-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.2);
          font-weight: 500;
          margin-bottom: 14px;
          display: block;
        }

        /* input row */
        .ahf-input-row {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 14px;
        }

        .ahf-input {
          flex: 1;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 12px 16px;
          color: #e8e8f0;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: all 0.2s;
          min-width: 0;
        }

        .ahf-input::placeholder {
          color: rgba(255,255,255,0.15);
        }

        .ahf-input:focus {
          border-color: rgba(99,91,255,0.4);
          background: rgba(99,91,255,0.04);
          box-shadow: 0 0 0 3px rgba(99,91,255,0.08);
        }

        .ahf-btn {
          background: linear-gradient(135deg, #635bff, #8b5cf6);
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 12px 20px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ahf-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .ahf-btn:hover::before { opacity: 1; }

        .ahf-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(99,91,255,0.35);
        }

        .ahf-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* loading spinner inside button */
        .ahf-spinner {
          width: 13px; height: 13px;
          border: 1.5px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: ahfSpin 0.6s linear infinite;
        }

        @keyframes ahfSpin { to { transform: rotate(360deg); } }

        /* color row */
        .ahf-color-row {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .ahf-color-label {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          margin-right: 4px;
          white-space: nowrap;
        }

        .ahf-color-btn {
          width: 22px; height: 22px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
          position: relative;
          background: none;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ahf-color-btn:hover {
          transform: scale(1.15);
        }

        .ahf-color-btn.active {
          transform: scale(1.2);
        }

        .ahf-color-inner {
          width: 14px; height: 14px;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .ahf-color-btn.active .ahf-color-inner {
          width: 10px; height: 10px;
        }

        /* selected color preview */
        .ahf-preview {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: rgba(255,255,255,0.25);
        }

        .ahf-preview-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          transition: background 0.2s;
        }

        .ahf-char-count {
          font-size: 11px;
          color: rgba(255,255,255,0.15);
          text-align: right;
          margin-top: 6px;
          transition: color 0.2s;
        }

        .ahf-char-count.warn { color: rgba(239,68,68,0.6); }
      `}</style>

      <div className={`ahf-wrap ${focused ? "focused" : ""}`}>
        <span className="ahf-label">New Habit</span>

        {/* Input + Add button */}
        <div className="ahf-input-row">
          <input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 50))}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="e.g. Morning run, Read 30 mins..."
            className="ahf-input"
            maxLength={50}
          />
          <button
            onClick={handleAdd}
            disabled={loading || !name.trim()}
            className="ahf-btn"
          >
            {loading ? (
              <div className="ahf-spinner" />
            ) : (
              <>
                <span>+</span>
                <span>Add</span>
              </>
            )}
          </button>
        </div>

        {/* Color picker + preview */}
        <div className="ahf-color-row">
          <span className="ahf-color-label">Color</span>
          {COLORS.map((c) => (
            <button
              key={c.hex}
              className={`ahf-color-btn ${color === c.hex ? "active" : ""}`}
              onClick={() => setColor(c.hex)}
              title={c.label}
              style={{
                borderColor: color === c.hex
                  ? `${c.hex}88`
                  : "transparent",
                boxShadow: color === c.hex
                  ? `0 0 10px ${c.hex}44`
                  : "none",
              }}
            >
              <div
                className="ahf-color-inner"
                style={{ background: c.hex }}
              />
            </button>
          ))}

          {/* Selected preview */}
          <div className="ahf-preview">
            <div
              className="ahf-preview-dot"
              style={{ background: color, boxShadow: `0 0 6px ${color}88` }}
            />
            <span>{COLORS.find(c => c.hex === color)?.label}</span>
          </div>
        </div>

        {/* Char count — only shows when typing */}
        {name.length > 0 && (
          <div className={`ahf-char-count ${name.length > 40 ? "warn" : ""}`}>
            {name.length}/50
          </div>
        )}
      </div>
    </>
  );
}