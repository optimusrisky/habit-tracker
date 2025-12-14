import z from "zod";
import { ERRORS } from "@/consts/errorMessages";

/** タスク追加スキーマ */
export const AddHabitSchema = z.object({
  title: z.string({ error: ERRORS.INVALID_ERROR }).min(1, ERRORS.REQUIRED),
});
/** タスク追加タイプ */
export type AddHabitInput = z.infer<typeof AddHabitSchema>;
