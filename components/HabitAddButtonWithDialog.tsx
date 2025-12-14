"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type AddHabitInput, AddHabitSchema } from "@/schemas/habitSchema";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

/** タスク追加ダイアログ */
export const HabitAddButtonWithDialog = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddHabitInput>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(AddHabitSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  /** タスク追加処理 */
  const onSubmit = (input: AddHabitInput) => {
    // タスク追加API実装
    console.log(input);
    toast.success(`習慣 "${input.title}" を追加しました`);
    setOpen(false);
    router.refresh();
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full size-15 fixed bottom-10 right-10">
          <Plus className="size-10" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>習慣追加</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <Label htmlFor="title" className="font-bold">
                タイトル
              </Label>
              <div className="flex flex-col gap-1">
                <Input id="title" {...register("title")} className="w-80" />
                <div className="errorMessage">{errors.title?.message}</div>
              </div>
            </div>
            <DialogFooter className="gap-4">
              <DialogClose asChild>
                <Button variant="outline" className="w-20">
                  閉じる
                </Button>
              </DialogClose>
              <Button type="submit" className="w-20">
                追加
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
