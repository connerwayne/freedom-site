import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { AppSidebar } from "@/components/navigation/app-sidebar";
import { ClearProviderHint } from "@/components/auth/clear-provider-hint";
import { authOptions } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="app-shell">
      <ClearProviderHint />
      <AppSidebar
        user={{
          name: session.user.name || "Authenticated User",
          email: session.user.email || "no-email@configured",
        }}
      />
      <div className="app-stage">{children}</div>
    </div>
  );
}
