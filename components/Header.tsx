"use client";

import { useRouter } from "next/navigation";
import { Paths } from "@/consts/paths";
import { Button } from "./ui/button";

export const Header = () => {
  const router = useRouter();

  const logOut = () => {
    router.push(Paths.HOME);
  };

  return (
    <div className="w-full bg-primary flex items-center py-2 px-4 justify-between">
      <h1 className="text-2xl font-bold">Habit Tracker</h1>
      <Button variant="ghost" onClick={logOut}>
        ログアウト
      </Button>
    </div>
  );
};
