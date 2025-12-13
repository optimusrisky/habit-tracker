"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Paths } from "@/consts/paths";
import type { Habit } from "@/types/type";

interface Props {
  habits: Habit[];
}

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
  const dateFilteredHabits = useMemo(() => {
    if (date) {
      return habits.filter(
        (habit) => date?.getTime() >= new Date(habit.createdAt).getTime()
      );
    } else return [];
  }, [date, habits]);

  /** 達成した習慣 */
  const completedHabits = dateFilteredHabits.filter(
    (habit) => habit.isCompleted
  );
  /** 当日の習慣の達成率 */
  const progressOfHabits =
    (completedHabits.length / dateFilteredHabits.length) * 100;

  /** チェック時処理 **/
  const handleCheck = () => {
    console.log(dateFilteredHabits);
    // TODO: 更新API実装
  };

  return (
    <div className="flex gap-6">
      <div className="bg-secondary flex flex-col gap-6 flex-1 border-2 rounded-xl p-6">
        <h2 className="text-3xl font-bold">習慣リスト</h2>
        {dateFilteredHabits.length ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="font-bold">
                達成度: {Math.round(progressOfHabits)}%
              </p>
              <Progress value={progressOfHabits} className="h-4" />
            </div>
            <ul className="flex flex-col gap-4">
              {dateFilteredHabits.map((habit) => (
                <Label
                  key={habit.id}
                  htmlFor={habit.id.toString()}
                  className="p-4 flex items-center gap-4 border-2 has-[[aria-checked=true]]:border-primary/50 has-[[aria-checked=true]]:bg-primary-foreground/10 rounded-xl cursor-pointer"
                >
                  <Checkbox
                    id={habit.id.toString()}
                    checked={habit.isCompleted}
                    onChange={handleCheck}
                    className="w-6 h-6"
                  />
                  <div className="text-lg font-bold">{habit.title}</div>
                </Label>
              ))}
            </ul>
          </div>
        ) : (
          <div>登録された習慣はありません</div>
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
