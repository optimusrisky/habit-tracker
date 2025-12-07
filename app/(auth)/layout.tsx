import { Header } from "@/components/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <Header />
      <div className="py-10 px-20 h-full">{children}</div>
    </div>
  );
}
