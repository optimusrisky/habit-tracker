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

/** 新規登録フォーム */
export const signUpFormSchema = loginFormSchema
  .extend({
    passwordForConfirm: z
      .string({
        error: ERRORS.INVALID_ERROR,
      })
      .min(1, ERRORS.REQUIRED),
  })
  .refine((data) => data.password === data.passwordForConfirm, {
    error: ERRORS.NOT_MATCH_PASSWORD,
    path: ["passwordForConfirm"],
  });
export type SignUpFormInput = z.infer<typeof signUpFormSchema>;
