import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

import { canAccessPath, getDefaultPathForRole, normalizeRole } from "@/lib/access";

export default withAuth(
  function middleware(request) {
    const role = normalizeRole(request.nextauth.token?.role as string | undefined);

    if (!canAccessPath(request.nextUrl.pathname, role)) {
      return NextResponse.redirect(new URL(getDefaultPathForRole(role), request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => Boolean(token),
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*", "/studio/:path*", "/insights/:path*", "/account/:path*", "/admin/:path*", "/manager/:path*", "/accounting/:path*", "/employee/:path*", "/portal/:path*"],
};
