"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type SignUpFormInput, signUpFormSchema } from "../schemas/authSchema";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInput>({
    defaultValues: {
      email: "",
      password: "",
      passwordForConfirm: "",
    },
    resolver: zodResolver(signUpFormSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const onSubmit = (data: SignUpFormInput) => {
    console.log(data);
  };

  return (
    <div className="p-8 flex flex-col gap-8 bg-card border border-border rounded-xl">
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold">新規登録</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 items-center"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <div className="w-40 font-bold">メールアドレス</div>
            <div className="flex flex-col gap-1">
              <Input
                type="email"
                placeholder="メールアドレスを入力してください"
                {...register("email")}
                className="w-100"
              />
              <div className="errorMessage">{errors.email?.message}</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-40 font-bold">パスワード</div>
            <div className="flex flex-col gap-1">
              <Input
                type="password"
                placeholder="パスワードを入力してください"
                {...register("password")}
                className="w-100"
              />
              <div className="errorMessage">{errors.password?.message}</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-40 font-bold">パスワード (確認用)</div>
            <div className="flex flex-col gap-1">
              <Input
                type="password"
                placeholder="パスワード (確認用) を入力してください"
                {...register("passwordForConfirm")}
                className="w-100"
              />
              <div className="errorMessage">
                {errors.passwordForConfirm?.message}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/">ログイン画面へ戻る</Link>
          </Button>
          <Button type="submit">アカウント登録</Button>
        </div>
      </form>
    </div>
  );
};
