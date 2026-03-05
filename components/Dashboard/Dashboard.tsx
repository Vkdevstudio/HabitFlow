"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import AddHabitForm from "../AddHabitForm/AddHabitForm";
import HabitCard from "../HabitCard/HabitCard";

type Habit = { id: string; name: string; color: string };

export default function HabitsDashboard({
  habits,
  completedToday,
  today,
  userId,
}: {
  habits: Habit[];
  completedToday: Set<string>;
  today: string;
  userId: string;
}) {
  const [streaks, setStreaks] = useState<Record<string, number>>({});
  const supabase = createClient();
  const router = useRouter();

 useEffect(() => {
  if (!habits.length) return;

  const fetchStreaks = async () => {
    try {
      const results = await Promise.all(
        habits.map(h =>
          supabase
            .rpc("get_habit_streak", { p_habit_id: h.id })
            .then(({ data }) => [h.id, data ?? 0] as const)
        )
      );
      setStreaks(Object.fromEntries(results));
    } catch (err) {
      console.error("Failed to fetch streaks", err);
    }
  };

  fetchStreaks();
}, [habits]);

  const completedCount = habits.filter((h) => completedToday.has(h.id)).length;
  const progressPct = habits.length
    ? Math.round((completedCount / habits.length) * 100)
    : 0;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const dayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const dateStr = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const totalStreakDays = Object.values(streaks).reduce((a, b) => a + b, 0);
  const bestStreak = Math.max(0, ...Object.values(streaks));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .hf-root {
          min-height: 100vh;
          background: #080810;
          color: #e8e8f0;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* Ambient background */
        .hf-root::before {
          content: '';
          position: fixed;
          top: -40%;
          left: -20%;
          width: 70vw;
          height: 70vw;
          background: radial-gradient(circle, rgba(99,91,255,0.07) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        .hf-root::after {
          content: '';
          position: fixed;
          bottom: -30%;
          right: -10%;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        .hf-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          height: 60px;
          background: rgba(8,8,16,0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .hf-logo {
          font-family: 'Instrument Serif', serif;
          font-size: 20px;
          letter-spacing: -0.5px;
          background: linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.5));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hf-logo-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #635bff;
          border-radius: 50%;
          margin-left: 3px;
          margin-bottom: 8px;
          vertical-align: bottom;
        }

        .hf-signout {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          background: none;
          border: 1px solid rgba(255,255,255,0.08);
          padding: 6px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .hf-signout:hover {
          color: rgba(255,255,255,0.7);
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.04);
        }

        .hf-body {
          max-width: 680px;
          margin: 0 auto;
          padding: 48px 24px 80px;
          position: relative;
          z-index: 1;
        }

        /* Date header */
        .hf-date-row {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(12px);
          animation: fadeUp 0.5s ease 0.1s forwards;
        }

        .hf-day {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(32px, 5vw, 44px);
          letter-spacing: -1.5px;
          line-height: 1;
          color: #fff;
        }

        .hf-datestr {
          font-size: 14px;
          color: rgba(255,255,255,0.25);
          font-weight: 300;
        }

        /* Stats row */
        .hf-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 32px;
          opacity: 0;
          transform: translateY(12px);
          animation: fadeUp 0.5s ease 0.2s forwards;
        }

        .hf-stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 18px 20px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s;
        }

        .hf-stat-card:hover {
          border-color: rgba(255,255,255,0.12);
        }

        .hf-stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        }

        .hf-stat-label {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .hf-stat-value {
          font-family: 'Instrument Serif', serif;
          font-size: 30px;
          line-height: 1;
          color: #fff;
          letter-spacing: -1px;
        }

        .hf-stat-sub {
          font-size: 12px;
          color: rgba(255,255,255,0.2);
          margin-top: 4px;
        }

        /* Progress section */
        .hf-progress-section {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
          opacity: 0;
          transform: translateY(12px);
          animation: fadeUp 0.5s ease 0.3s forwards;
        }

        .hf-progress-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 14px;
        }

        .hf-progress-title {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          font-weight: 400;
        }

        .hf-progress-pct {
          font-family: 'Instrument Serif', serif;
          font-size: 24px;
          color: #fff;
          letter-spacing: -1px;
        }

        .hf-progress-track {
          height: 6px;
          background: rgba(255,255,255,0.06);
          border-radius: 100px;
          overflow: hidden;
        }

        .hf-progress-fill {
          height: 100%;
          border-radius: 100px;
          background: linear-gradient(90deg, #635bff, #ec4899);
          transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .hf-progress-fill::after {
          content: '';
          position: absolute;
          right: 0; top: -2px;
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #ec4899;
          box-shadow: 0 0 10px rgba(236,72,153,0.8);
        }

        .hf-progress-dots {
          display: flex;
          gap: 6px;
          margin-top: 14px;
        }

        .hf-dot {
          flex: 1;
          height: 3px;
          border-radius: 100px;
          transition: all 0.3s;
        }

        /* Add form wrapper */
        .hf-form-wrap {
          opacity: 0;
          transform: translateY(12px);
          animation: fadeUp 0.5s ease 0.4s forwards;
          margin-bottom: 20px;
        }

        /* Section label */
        .hf-section-label {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 12px;
          font-weight: 500;
          opacity: 0;
          animation: fadeUp 0.5s ease 0.45s forwards;
        }

        /* Habit list */
        .hf-habit-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .hf-habit-row {
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0;
          transform: translateY(8px);
          animation: fadeUp 0.4s ease forwards;
        }

        .hf-habit-row:nth-child(1) { animation-delay: 0.5s; }
        .hf-habit-row:nth-child(2) { animation-delay: 0.55s; }
        .hf-habit-row:nth-child(3) { animation-delay: 0.6s; }
        .hf-habit-row:nth-child(4) { animation-delay: 0.65s; }
        .hf-habit-row:nth-child(5) { animation-delay: 0.7s; }
        .hf-habit-row:nth-child(n+6) { animation-delay: 0.75s; }

        .hf-streak-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(251,146,60,0.1);
          border: 1px solid rgba(251,146,60,0.15);
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          color: #fb923c;
          min-width: fit-content;
          white-space: nowrap;
        }

        /* Empty state */
        .hf-empty {
          text-align: center;
          padding: 48px 24px;
          border: 1px dashed rgba(255,255,255,0.07);
          border-radius: 20px;
          opacity: 0;
          animation: fadeUp 0.5s ease 0.5s forwards;
        }

        .hf-empty-icon {
          font-size: 36px;
          margin-bottom: 12px;
          opacity: 0.5;
        }

        .hf-empty-text {
          font-size: 14px;
          color: rgba(255,255,255,0.2);
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .hf-nav { padding: 0 20px; }
          .hf-body { padding: 32px 16px 60px; }
          .hf-stats { grid-template-columns: repeat(3,1fr); gap: 8px; }
          .hf-stat-card { padding: 14px 12px; }
          .hf-stat-value { font-size: 24px; }
        }
      `}</style>

      <div className="hf-root">
        {/* Nav */}
        <nav className="hf-nav">
          <div className="hf-logo">
            HabitFlow<span className="hf-logo-dot" />
          </div>
          <button className="hf-signout" onClick={handleSignOut}>
            Sign out
          </button>
        </nav>

        <div className="hf-body">

          {/* Date heading */}
          <div className="hf-date-row">
            <h1 className="hf-day">{dayName}</h1>
            <span className="hf-datestr">{dateStr}</span>
          </div>

          {/* Stats */}
          <div className="hf-stats">
            <div className="hf-stat-card">
              <div className="hf-stat-label">Today</div>
              <div className="hf-stat-value">
                {completedCount}
                <span style={{ fontSize: 16, color: "rgba(255,255,255,0.2)" }}>
                  /{habits.length}
                </span>
              </div>
              <div className="hf-stat-sub">completed</div>
            </div>

            <div className="hf-stat-card">
              <div className="hf-stat-label">Best Streak</div>
              <div className="hf-stat-value">{bestStreak}</div>
              <div className="hf-stat-sub">days 🔥</div>
            </div>

            <div className="hf-stat-card">
              <div className="hf-stat-label">Total Days</div>
              <div className="hf-stat-value">{totalStreakDays}</div>
              <div className="hf-stat-sub">logged</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="hf-progress-section">
            <div className="hf-progress-top">
              <span className="hf-progress-title">Daily progress</span>
              <span className="hf-progress-pct">{progressPct}%</span>
            </div>
            <div className="hf-progress-track">
              <div
                className="hf-progress-fill"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            {/* Segment dots */}
            {habits.length > 0 && (
              <div className="hf-progress-dots">
                {habits.map((h) => (
                  <div
                    key={h.id}
                    className="hf-dot"
                    style={{
                      background: completedToday.has(h.id)
                        ? h.color
                        : "rgba(255,255,255,0.08)",
                      boxShadow: completedToday.has(h.id)
                        ? `0 0 8px ${h.color}66`
                        : "none",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Add habit form */}
          <div className="hf-form-wrap">
            <AddHabitForm userId={userId} />
          </div>

          {/* Habits */}
          {habits.length > 0 && (
            <div className="hf-section-label">Your habits</div>
          )}

          <div className="hf-habit-list">
            {habits.length === 0 ? (
              <div className="hf-empty">
                <div className="hf-empty-icon">✦</div>
                <p className="hf-empty-text">
                  No habits yet. Add your first one above.
                </p>
              </div>
            ) : (
              habits.map((habit) => (
                <div key={habit.id} className="hf-habit-row">
                  <div style={{ flex: 1 }}>
                    <HabitCard
                      habit={habit}
                      isDone={completedToday.has(habit.id)}
                      today={today}
                      userId={userId}
                    />
                  </div>
                  {streaks[habit.id] > 0 && (
                    <div className="hf-streak-badge">
                      🔥 {streaks[habit.id]}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
}