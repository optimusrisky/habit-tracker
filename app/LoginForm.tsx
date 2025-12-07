"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginInput {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();
  const onSubmit = (data: LoginInput) => {
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
            <Input
              type="email"
              placeholder="メールアドレスを入力してください"
              {...register("email")}
              className="w-100"
            />
          </div>
          <div className="flex items-center">
            <div className="w-40 font-bold">パスワード</div>
            <Input
              type="password"
              placeholder="パスワードを入力してください"
              {...register("password")}
              className="w-100"
            />
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <Button>新規登録</Button>
          <Button type="submit">ログイン</Button>
        </div>
      </form>
    </div>
  );
};
