"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const managerLinks = [
  { href: "/manager", label: "Overview" },
  { href: "/manager/crm", label: "CRM" },
  { href: "/manager/finance", label: "Finance" },
  { href: "/accounting", label: "Accounting" },
  { href: "/manager/scheduling", label: "Scheduling" },
  { href: "/manager/field-ops", label: "Field Ops" },
  { href: "/manager/growth", label: "Growth" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/accounting") {
    return pathname === "/accounting" || pathname === "/manager/accounting";
  }

  if (href === "/manager") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function ManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="page-stack">
      <header className="subsection-header panel">
        <div>
          <span className="eyebrow">Operations suite</span>
          <h2 className="section-title">Manage the business by function.</h2>
        </div>
        <nav>
          <ul className="mini-nav">
            {managerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className={isActivePath(pathname, link.href) ? "is-active" : undefined}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {children}
    </div>
  );
}