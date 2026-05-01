import Link from "next/link";
import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/auth/sign-out-button";
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
      <aside className="sidebar">
        <div>
          <div className="sidebar-intro">
            <Link className="brand" href="/dashboard">
              Freedom Site
            </Link>
            <p>{session.name}</p>
            <p>{session.email}</p>
          </div>

          <nav>
            <ul className="sidebar-nav">
              <li>
                <Link href="/dashboard">Overview</Link>
              </li>
              <li>
                <Link href="/dashboard/projects">Projects</Link>
              </li>
              <li>
                <Link href="/account/settings">Account settings</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="sidebar-footer">
          <p>Middleware protects `/dashboard` and `/account` before the page renders.</p>
          <SignOutButton />
        </div>
      </aside>
      <div className="app-stage">{children}</div>
    </div>
  );
}
