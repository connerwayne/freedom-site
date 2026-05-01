import type { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { normalizeRole, type UserRole } from "@/lib/access";

export const authOptions: NextAuthOptions = {
  secret:
    process.env.NEXTAUTH_SECRET ??
    (process.env.NODE_ENV !== "production"
      ? "dev-secret-not-for-production-use"
      : undefined),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID ?? "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET ?? "",
      tenantId: process.env.AZURE_AD_TENANT_ID ?? "common",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    ...(process.env.NODE_ENV !== "production"
      ? [
          CredentialsProvider({
            id: "dev-bypass",
            name: "Dev Bypass",
            credentials: {
              role: {
                label: "Role",
                type: "text",
              },
            },
            async authorize(credentials) {
              const role =
                credentials?.role === "admin"
                  ? "admin"
                  : credentials?.role === "manager"
                    ? "manager"
                    : "client";

              if (role === "admin") {
                return {
                  id: "dev-admin",
                  name: "Wayne Admin",
                  email: "admin@localhost",
                  role,
                  image: null,
                };
              }

              if (role === "manager") {
                return {
                  id: "dev-manager",
                  name: "Operations Manager",
                  email: "manager@localhost",
                  role,
                  image: null,
                };
              }

              return {
                id: "dev-client",
                name: "Client Demo",
                email: "client@localhost",
                role,
                image: null,
              };
            },
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userRole = (user as { role?: UserRole }).role;

        token.role = normalizeRole(userRole);
      }

      if (!token.role) {
        token.role = "manager";
      }

      return token;
    },
    async session({ session, token }) {
      session.user.role = normalizeRole(token.role);

      return session;
    },
  },
};
