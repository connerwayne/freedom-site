import { cookies } from "next/headers";

export const SESSION_COOKIE = "freedom_session";

export type SessionUser = {
  email: string;
  name: string;
};

export const demoUser: SessionUser = {
  email: "demo@freedom.site",
  name: "Demo User",
};

export const protectedPaths = ["/dashboard", "/account"] as const;

export function encodeSession(user: SessionUser) {
  return Buffer.from(JSON.stringify(user)).toString("base64url");
}

export function decodeSession(value?: string | null): SessionUser | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8"));

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      typeof parsed.email === "string" &&
      typeof parsed.name === "string"
    ) {
      return {
        email: parsed.email,
        name: parsed.name,
      };
    }
  } catch {
    return null;
  }

  return null;
}

export async function getSession() {
  const cookieStore = await cookies();
  return decodeSession(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function isAuthenticated() {
  return (await getSession()) !== null;
}
