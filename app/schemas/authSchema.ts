import { z } from "zod";
import { ERROR } from "../consts/errorMessages";

/** ログインフォーム */
export const loginFormSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === "" ? ERROR.REQUIRED : ERROR.INVALID_ERROR),
  }),
  password: z
    .string({
      error: ERROR.INVALID_ERROR,
    })
    .min(1, ERROR.REQUIRED),
});
export type LoginFormInput = z.infer<typeof loginFormSchema>;
