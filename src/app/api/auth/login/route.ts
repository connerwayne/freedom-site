import { NextResponse } from "next/server";

import { demoUser, encodeSession, SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || demoUser.email);
  const name = String(formData.get("name") || demoUser.name);
  const nextPath = String(formData.get("next") || "/dashboard");

  const user = {
    email,
    name,
  };

  const redirectUrl = new URL(nextPath.startsWith("/") ? nextPath : "/dashboard", request.url);
  const response = NextResponse.redirect(redirectUrl);

  response.cookies.set({
    name: SESSION_COOKIE,
    value: encodeSession(user),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
