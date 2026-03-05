"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

const COLORS = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#ef4444"];

export default function AddHabitForm({ userId }: { userId: string }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [loading, setLoading] = useState(false);

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
      router.refresh(); // refetch habits
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 border  border-gray-800 rounded-xl p-5 mb-6">
      <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">New Habit</p>
     <div className="flex flex-col md:flex-row gap-3">
  {/* Input */}
  <input
    value={name}
    onChange={(e) => setName(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
    placeholder="e.g. Exercise, Read 30 mins..."
    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-indigo-500"
  />

  {/* Color picker */}
  <div className="flex gap-2 items-center overflow-x-auto py-1">
    {COLORS.map((c) => (
      <button
        key={c}
        onClick={() => setColor(c)}
        className={`w-6 h-6 rounded-full transition-transform flex-shrink-0 ${
          color === c ? "scale-125 ring-2 ring-white ring-offset-1 ring-offset-gray-900" : ""
        }`}
        style={{ background: c }}
      />
    ))}
  </div>

  {/* Add button */}
  <button
    onClick={handleAdd}
    disabled={loading || !name.trim()}
    className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium disabled:opacity-40 transition-colors"
  >
    Add
  </button>
</div>
    </div>
  );
}