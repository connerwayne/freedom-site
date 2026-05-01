export type AdminUserRole = "Admin" | "Manager" | "Client";
export type AdminUserStatus = "Active" | "Invited" | "Suspended";

export type AdminUserRecord = {
  id: string;
  name: string;
  email: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  lastActive: string;
  phone: string;
  joined: string;
  notes: string;
};

export const adminUsers: AdminUserRecord[] = [
  {
    id: "USR-1001",
    name: "Wayne Carter",
    email: "admin@freedomlandscaping.com",
    role: "Admin",
    status: "Active",
    lastActive: "Today",
    phone: "(555) 120-4400",
    joined: "Jan 2, 2025",
    notes: "Owner account. Full access across admin and manager workspaces.",
  },
  {
    id: "USR-1002",
    name: "Alex Rivera",
    email: "manager@freedomlandscaping.com",
    role: "Manager",
    status: "Active",
    lastActive: "1h ago",
    phone: "(555) 300-1110",
    joined: "Mar 14, 2025",
    notes: "Operations lead. Handles scheduling, CRM pipeline, and invoicing follow-up.",
  },
  {
    id: "USR-1003",
    name: "Martha Henson",
    email: "martha.henson@email.com",
    role: "Client",
    status: "Invited",
    lastActive: "Pending",
    phone: "(555) 818-1003",
    joined: "Apr 23, 2026",
    notes: "Client portal invite sent. Waiting for first login.",
  },
  {
    id: "USR-1004",
    name: "Ray Kowalski",
    email: "ray.k@email.com",
    role: "Client",
    status: "Active",
    lastActive: "Yesterday",
    phone: "(555) 551-9004",
    joined: "Feb 4, 2026",
    notes: "Client with recurring monthly service and autopay enabled.",
  },
];

export const userRoleColors: Record<AdminUserRole, string> = {
  Admin: "badge-blue",
  Manager: "badge-green",
  Client: "badge-yellow",
};

export const userStatusColors: Record<AdminUserStatus, string> = {
  Active: "badge-green",
  Invited: "badge-blue",
  Suspended: "badge-yellow",
};

export function getAdminUserById(userId: string) {
  return adminUsers.find((user) => user.id.toLowerCase() === userId.toLowerCase());
}