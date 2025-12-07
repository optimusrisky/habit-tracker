import { Button } from "./ui/button";

export const Header = () => {
  return (
    <div className="w-full bg-primary flex items-center py-2 px-4 justify-between">
      <h1 className="text-2xl font-bold">Habit Tracker</h1>
      <Button variant="ghost">ログアウト</Button>
    </div>
  );
};
