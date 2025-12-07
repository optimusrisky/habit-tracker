import { z } from "zod";
import { ERRORS } from "../consts/errorMessages";

/** ログインフォーム */
export const loginFormSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === "" ? ERRORS.REQUIRED : ERRORS.INVALID_ERROR),
  }),
  password: z
    .string({
      error: ERRORS.INVALID_ERROR,
    })
    .min(1, ERRORS.REQUIRED),
});
export type LoginFormInput = z.infer<typeof loginFormSchema>;
