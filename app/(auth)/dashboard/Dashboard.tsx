"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Paths } from "@/consts/paths";
import type { Habit, HabitLog } from "@/types/type";

interface Props {
  habits: Habit[];
}

const dummyLogs: HabitLog[] = [
  {
    id: 1,
    habitId: 1,
    date: "2025-12-14",
    createdAt: "2025-12-14",
  },
];

/** ダッシュボード表示コンポーネント */
export const Dashboard = ({ habits }: Props) => {
  const searchParams = useSearchParams();
  const initialDate = searchParams.get("date");
  const [date, setDate] = useState<Date | undefined>(
    initialDate ? new Date(initialDate) : new Date()
  );
  const router = useRouter();

  useEffect(() => {
    if (date) {
      router.replace(`${Paths.DASHBOARD}?date=${date?.toLocaleDateString()}`);
    } else router.replace(`${Paths.DASHBOARD}`);
  }, [date, router]);

  /** 選択した日付以前に作成された習慣 */
  const habitsOfSelectedDate = useMemo(() => {
    // APIで取得
    if (date) {
      return habits;
    } else return [];
  }, [date, habits]);

  const logsOfSelectedDate = useMemo(() => {
    // APIで取得
    if (date) {
      return dummyLogs;
    } else return [];
  }, [date]);

  /** 達成した習慣 */
  const completedHabits = habitsOfSelectedDate.filter((habit) => {
    const habitIdsOfSelectedDate = logsOfSelectedDate.map((log) => log.habitId);
    return habitIdsOfSelectedDate.includes(habit.id);
  });

  /** 当日の習慣の達成率 */
  const progressOfSelectedDate =
    (completedHabits.length / habitsOfSelectedDate.length) * 100;

  /** 習慣が完了されたかどうかを取得 */
  const getIsCompleted = (habitId: number) => {
    return completedHabits.some(
      (completedHabit) => completedHabit.id === habitId
    );
  };

  /** チェック時処理 **/
  const handleCheck = () => {
    console.log(habitsOfSelectedDate);
    // TODO: 更新API実装
  };

  return (
    <div className="flex gap-6">
      <div className="bg-secondary flex flex-col gap-6 flex-1 border-2 rounded-xl p-6">
        <h2 className="text-3xl font-bold">習慣リスト</h2>
        {habitsOfSelectedDate.length ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="font-bold">
                達成度: {Math.round(progressOfSelectedDate)}%
              </p>
              <Progress value={progressOfSelectedDate} className="h-4" />
            </div>
            <ul className="flex flex-col gap-4">
              {habitsOfSelectedDate.map((habit) => (
                <Label
                  key={habit.id}
                  htmlFor={habit.id.toString()}
                  className="p-4 flex items-center gap-4 border-2 has-[[aria-checked=true]]:border-primary/50 has-[[aria-checked=true]]:bg-primary-foreground/10 rounded-xl cursor-pointer"
                >
                  <Checkbox
                    id={habit.id.toString()}
                    onChange={handleCheck}
                    checked={getIsCompleted(habit.id)}
                    className="w-6 h-6 cursor-pointer"
                  />
                  <div className="text-lg font-bold">{habit.title}</div>
                </Label>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            {date ? "登録された習慣はありません" : "日付を選択してください"}
          </div>
        )}
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="bg-secondary border-2 w-1/2 rounded-lg"
      />
    </div>
  );
};
