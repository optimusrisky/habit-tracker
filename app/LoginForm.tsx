"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paths } from "./consts/paths";
import { type LoginFormInput, loginFormSchema } from "./schemas/authSchema";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const onSubmit = (data: LoginFormInput) => {
    console.log(data);
  };

  return (
    <div className="p-8 flex flex-col gap-8 bg-card border border-border rounded-xl">
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold">ログイン</h1>
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
                className="w-80"
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
                className="w-80"
              />
              <div className="errorMessage">{errors.password?.message}</div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href={Paths.SIGN_UP}>新規登録</Link>
          </Button>
          <Button type="submit">ログイン</Button>
        </div>
      </form>
    </div>
  );
};
