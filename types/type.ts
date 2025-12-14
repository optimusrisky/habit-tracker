/** 習慣 */
export interface Habit {
  id: number;
  title: string;
  createdAt: string;
  archivedAt?: string;
}

/** 習慣ログ */
export interface HabitLog {
  id: number;
  habitId: number;
  date: string;
  createdAt: string;
}
