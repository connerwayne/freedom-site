export type UserRole = "admin" | "manager" | "client";

type ProtectedRouteRule = {
  prefix: string;
  roles: UserRole[];
};

export const protectedRouteRules: ProtectedRouteRule[] = [
  {
    prefix: "/dashboard",
    roles: ["admin", "manager"],
  },
  {
    prefix: "/studio",
    roles: ["admin", "manager"],
  },
  {
    prefix: "/insights",
    roles: ["admin", "manager"],
  },
  {
    prefix: "/admin",
    roles: ["admin"],
  },
  {
    prefix: "/manager",
    roles: ["admin", "manager"],
  },
  {
    prefix: "/accounting",
    roles: ["admin", "manager"],
  },
  {
    prefix: "/employee",
    roles: ["admin", "manager"],
  },
  {
    prefix: "/portal",
    roles: ["client"],
  },
  {
    prefix: "/account",
    roles: ["admin", "manager", "client"],
  },
];

export const defaultPathByRole: Record<UserRole, string> = {
  admin: "/admin",
  manager: "/manager",
  client: "/portal",
};

export function normalizeRole(role?: string | null): UserRole {
  if (role === "admin" || role === "manager" || role === "client") {
    return role;
  }

  return "manager";
}

export function getDefaultPathForRole(role?: string | null) {
  return defaultPathByRole[normalizeRole(role)];
}

export function canAccessPath(pathname: string, role?: string | null) {
  const normalizedRole = normalizeRole(role);
  const matchedRule = protectedRouteRules.find(
    (rule) => pathname === rule.prefix || pathname.startsWith(`${rule.prefix}/`),
  );

  if (!matchedRule) {
    return true;
  }

  return matchedRule.roles.includes(normalizedRole);
}

export function resolvePostLoginPath(role?: string | null, requestedPath?: string | null) {
  if (requestedPath && canAccessPath(requestedPath, role)) {
    return requestedPath;
  }

  return getDefaultPathForRole(role);
}