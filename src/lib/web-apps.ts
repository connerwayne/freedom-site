import type { UserRole } from "@/lib/access";

export const webApps = [
  {
    href: "/dashboard",
    title: "Operations",
    description: "Overview, rollout checkpoints, and protected app status.",
    roles: ["admin", "manager"],
  },
  {
    href: "/admin",
    title: "Admin",
    description: "Manage jobs, clients, and invoices for your landscaping business.",
    roles: ["admin"],
  },
  {
    href: "/manager",
    title: "Manager Portal",
    description: "CRM, invoicing, schedule management, automation, and growth planning.",
    roles: ["admin", "manager"],
  },
  {
    href: "/accounting",
    title: "Accounting",
    description: "Outstanding balances, debt collection workflow, and tax readiness dashboard.",
    roles: ["admin", "manager"],
  },
  {
    href: "/employee",
    title: "Employee Field App",
    description: "Before/after photos, client access notes, job updates, and invoice tracking.",
    roles: ["admin", "manager"],
  },
  {
    href: "/portal",
    title: "Client Portal",
    description: "Client bill pay, job history, and service requests.",
    roles: ["client"],
  },
  {
    href: "/studio",
    title: "Studio",
    description: "Content workflow, launch prep, and editing surface.",
    roles: ["admin", "manager"],
  },
  {
    href: "/insights",
    title: "Insights",
    description: "Performance signals, growth metrics, and reporting.",
    roles: ["admin", "manager"],
  },
] as const satisfies ReadonlyArray<{
  href: string;
  title: string;
  description: string;
  roles: UserRole[];
}>;

export const workspaceLinks = [
  {
    href: "/dashboard/projects",
    label: "Projects",
    roles: ["admin", "manager"],
  },
  {
    href: "/account/settings",
    label: "Account settings",
    roles: ["admin", "manager", "client"],
  },
] as const satisfies ReadonlyArray<{
  href: string;
  label: string;
  roles: UserRole[];
}>;