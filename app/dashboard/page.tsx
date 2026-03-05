import { redirect } from "next/navigation";
import { format } from "date-fns";
import { createServer } from "@/lib/supabaseServer";
import HabitsDashboard from "@/components/Dashboard/Dashboard";

export default async function DashboardPage() {
  // ✅ Await the async createServer
  const supabase = await createServer();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const today = format(new Date(), "yyyy-MM-dd");

  // Fetch all habits for the user
  const { data: habitsData, error: habitsError } = await supabase
    .from("habits")
    .select("*")
    .order("created_at", { ascending: true });

  if (habitsError) console.error("Error fetching habits:", habitsError);

  // Fetch today's completed habit IDs
  const { data: todayLogs = [], error: logsError } = await supabase
    .from("habit_logs")
    .select("habit_id")
    .eq("completed_date", today);

  if (logsError) console.error("Error fetching logs:", logsError);

  const completedToday = new Set(todayLogs!.map((l) => l.habit_id));

  return (
    <HabitsDashboard
      habits={habitsData!}
      completedToday={completedToday}
      today={today}
      userId={user.id}
    />
  );
}