"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

type Habit = { id: string; name: string; color: string };

export default function HabitCard({
  habit,
  isDone,
  today,
  userId,
}: {
  habit: Habit;
  isDone: boolean;
  today: string;
  userId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [optimistic, setOptimistic] = useState(isDone);
  const router = useRouter();
  const supabase = createClient();

  const toggleDone = async () => {
    if (loading) return;
    setLoading(true);
    setOptimistic(!optimistic);

    if (!optimistic) {
      await supabase.from("habit_logs").upsert(
        { habit_id: habit.id, user_id: userId, completed_date: today },
        { onConflict: "habit_id,completed_date", ignoreDuplicates: true }
      );
    } else {
      await supabase
        .from("habit_logs")
        .delete()
        .eq("habit_id", habit.id)
        .eq("completed_date", today);
    }

    router.refresh();
    setLoading(false);
  };

  return (
    <>
      <style>{`
        .hc-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
          width: 100%;
          box-sizing: border-box;
        }

        .hc-card:hover {
          border-color: rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.035);
        }

        .hc-card:active { transform: scale(0.99); }

        .hc-card.done {
          background: rgba(255,255,255,0.015);
          border-color: rgba(255,255,255,0.04);
        }

        .hc-color-bar {
          width: 3px;
          min-width: 3px;
          height: 22px;
          border-radius: 100px;
          flex-shrink: 0;
        }

        .hc-name {
          flex: 1;
          font-size: 14px;
          font-weight: 500;
          color: #e8e8f0;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
          /* key fix: prevent overflow pushing check off screen */
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          min-width: 0;
        }

        .hc-card.done .hc-name {
          text-decoration: line-through;
          color: rgba(255,255,255,0.25);
        }

        /* THE FIX: explicit min-width/height so it never collapses or bloats */
        .hc-check {
          width: 26px;
          height: 26px;
          min-width: 26px;
          min-height: 26px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          background: transparent;
          box-sizing: border-box;
        }

        .hc-card.done .hc-check {
          border-color: transparent;
        }

        .hc-checkmark {
          font-size: 12px;
          color: #fff;
          opacity: 0;
          transform: scale(0) rotate(-10deg);
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          line-height: 1;
          display: block;
        }

        .hc-card.done .hc-checkmark {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }

        .hc-loading {
          width: 16px;
          height: 16px;
          min-width: 16px;
          border: 1.5px solid rgba(255,255,255,0.1);
          border-top-color: rgba(255,255,255,0.5);
          border-radius: 50%;
          animation: hc-spin 0.6s linear infinite;
          flex-shrink: 0;
          box-sizing: border-box;
        }

        @keyframes hc-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div
        className={`hc-card  ${optimistic ? "done" : ""}`}
        onClick={toggleDone}
      >
        <div
          className="hc-color-bar"
          style={{
            background: optimistic ? `${habit.color}44` : habit.color,
            boxShadow: optimistic ? "none" : `0 0 8px ${habit.color}55`,
          }}
        />

        <span className="hc-name">{habit.name}</span>

        {loading ? (
          <div className="hc-loading" />
        ) : (
          <div
            className="hc-check"
            style={
              optimistic
                ? { background: `${habit.color}22`, borderColor: `${habit.color}66` }
                : {}
            }
          >
            <span className="hc-checkmark" style={{ color: habit.color }}>
              ✓
            </span>
          </div>
        )}
      </div>
    </>
  );
}