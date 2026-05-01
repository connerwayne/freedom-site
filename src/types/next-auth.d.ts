import { DefaultSession, DefaultUser } from "next-auth";

import type { UserRole } from "@/lib/access";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      role: UserRole;
    };
  }

  interface User extends DefaultUser {
    role?: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
  }
}