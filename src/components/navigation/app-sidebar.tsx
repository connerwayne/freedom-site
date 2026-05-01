"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { webApps, workspaceLinks } from "@/lib/web-apps";

type AppSidebarProps = {
  user: {
    name: string;
    email: string;
  };
};

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-stack">
        <div className="sidebar-intro">
          <Link className="brand" href="/dashboard">
            Freedom Site
          </Link>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>

        <div className="sidebar-group">
          <span className="sidebar-section-label">Web apps</span>
          <nav>
            <ul className="sidebar-app-menu">
              {webApps.map((app) => {
                const isActive = isActivePath(pathname, app.href);

                return (
                  <li key={app.href}>
                    <Link
                      className={`sidebar-app-link${isActive ? " is-active" : ""}`}
                      href={app.href}
                    >
                      <strong>{app.title}</strong>
                      <span className="sidebar-link-meta">{app.description}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="sidebar-group">
          <span className="sidebar-section-label">Workspace</span>
          <nav>
            <ul className="sidebar-nav">
              {workspaceLinks.map((link) => {
                const isActive = isActivePath(pathname, link.href);

                return (
                  <li key={link.href}>
                    <Link className={isActive ? "is-active" : undefined} href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      <div className="sidebar-footer">
        <p>Switch between protected web apps here while keeping account and project utilities nearby.</p>
        <SignOutButton />
      </div>
    </aside>
  );
}