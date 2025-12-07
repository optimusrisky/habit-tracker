import type { Habit } from "@/types/type";
import { Dashboard } from "./Dashboard";

export default function Page() {
  // 習慣リスト取得処理
  const dummyHabits: Habit[] = [
    {
      id: 1,
      title: "掃除",
      isCompleted: true,
    },
    {
      id: 2,
      title: "筋トレ",
      isCompleted: true,
    },
    {
      id: 3,
      title: "勉強",
      isCompleted: false,
    },
  ];

  return (
    <div>
      <Dashboard habits={dummyHabits} />
    </div>
  );
}
