"use client";

import { useState } from "react";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { Calendar } from "@/components/ui/calendar";
import type { Habit } from "@/types/type";

interface Props {
  habits: Habit[];
}

/** ダッシュボード表示コンポーネント */
export const Dashboard = ({ habits }: Props) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex gap-6">
      <div className="bg-secondary flex flex-col gap-6 flex-1 border-2 rounded-xl p-6">
        <h2 className="text-3xl font-bold">習慣リスト</h2>
        <div>
          <ul className="flex flex-col gap-4">
            {habits.map((habit, index) => (
              <li
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                className="p-4 flex items-center justify-between border-2 rounded-xl"
              >
                <div className="text-lg font-bold">{habit.title}</div>
                {habit.isCompleted ? (
                  <FaCircleCheck className="text-primary text-xl" />
                ) : (
                  <FaCircleXmark className="text-destructive text-xl" />
                )}
              </li>
            ))}
          </ul>
        </div>
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
