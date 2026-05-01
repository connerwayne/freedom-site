"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import type { UserRole } from "@/lib/access";
import { webApps, workspaceLinks } from "@/lib/web-apps";

type AppSidebarProps = {
  user: {
    name: string;
    email: string;
    role: UserRole;
  };
};

const appIcons: Record<string, string> = {
  "/dashboard": "📊",
  "/admin": "🛠️",
  "/manager": "📋",
  "/portal": "👤",
  "/studio": "✏️",
  "/insights": "📈",
};

const workspaceIcons: Record<string, string> = {
  "/dashboard/projects": "📁",
  "/account/settings": "⚙️",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname();
  const visibleApps = webApps.filter((app) => app.roles.includes(user.role));
  const visibleWorkspaceLinks = workspaceLinks.filter((link) => link.roles.includes(user.role));

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand-strip">
        <div className="sidebar-brand-icon">🌿</div>
        <div className="sidebar-brand-name">
          Freedom
          <span>Landscaping</span>
        </div>
      </div>

      {/* User pill */}
      <div className="sidebar-user">
        <div className="sidebar-avatar">{getInitials(user.name)}</div>
        <div className="sidebar-user-info">
          <span className="sidebar-user-name">{user.name}</span>
          <span className="sidebar-user-email">{user.email}</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-stack">
        <div className="sidebar-group">
          <span className="sidebar-section-label">Applications</span>
          <ul className="sidebar-app-menu">
            {visibleApps.map((app) => {
              const isActive = isActivePath(pathname, app.href);
              return (
                <li key={app.href}>
                  <Link
                    className={`sidebar-app-link${isActive ? " is-active" : ""}`}
                    href={app.href}
                  >
                    <div className="sidebar-app-link-row">
                      <span className="sidebar-app-link-icon">{appIcons[app.href] ?? "🔗"}</span>
                      <strong>{app.title}</strong>
                    </div>
                    <span className="sidebar-link-meta">{app.description}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="sidebar-divider" />

        <div className="sidebar-group" style={{ paddingTop: "0.25rem" }}>
          <span className="sidebar-section-label">Workspace</span>
          <ul className="sidebar-nav">
            {visibleWorkspaceLinks.map((link) => {
              const isActive = isActivePath(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link className={isActive ? "is-active" : undefined} href={link.href}>
                    <span className="sidebar-nav-icon">{workspaceIcons[link.href] ?? "•"}</span>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <ThemeToggle />
        <SignOutButton />
      </div>
    </aside>
  );
}