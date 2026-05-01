import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { decodeSession, protectedPaths, SESSION_COOKIE } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isProtected = protectedPaths.some((prefix) => pathname.startsWith(prefix));

  if (!isProtected) {
    return NextResponse.next();
  }

  const session = decodeSession(request.cookies.get(SESSION_COOKIE)?.value);

  if (session) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  const nextTarget = `${pathname}${search}`;

  loginUrl.searchParams.set("next", nextTarget);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*"],
};
