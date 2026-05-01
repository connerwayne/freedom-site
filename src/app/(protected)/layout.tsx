import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/navigation/app-sidebar";
import { getSession } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="app-shell">
      <AppSidebar session={session} />
      <div className="app-stage">{children}</div>
    </div>
  );
}
