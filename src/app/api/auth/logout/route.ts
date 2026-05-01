import { NextResponse } from "next/server";

import { SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });

  const referer = request.headers.get("referer");

  if (referer) {
    response.headers.set("x-referer", referer);
  }

  return response;
}
