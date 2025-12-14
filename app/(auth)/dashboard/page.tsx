import { HabitAddButtonWithDialog } from "@/components/HabitAddButtonWithDialog";
import type { Habit } from "@/types/type";
import { Dashboard } from "./Dashboard";

export default function Page() {
  // TODO: 習慣リスト取得処理
  const dummyHabits: Habit[] = [
    {
      id: 1,
      title: "掃除",
      createdAt: "2025/12/10",
    },
    {
      id: 2,
      title: "筋トレ",
      createdAt: "2025/12/11",
    },
    {
      id: 3,
      title: "勉強",
      createdAt: "2025/12/14",
    },
  ];

  return (
    <div>
      <Dashboard habits={dummyHabits} />
      <HabitAddButtonWithDialog />
    </div>
  );
}
