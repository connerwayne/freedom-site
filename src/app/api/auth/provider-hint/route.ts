import { NextResponse } from "next/server";

type ProviderHintRequest = {
  provider?: string;
};

const allowedProviders = new Set(["google", "azure-ad", "github"]);

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as ProviderHintRequest;
  const provider = body.provider;

  const response = NextResponse.json({ ok: true });

  if (provider && allowedProviders.has(provider)) {
    response.cookies.set({
      name: "oauth_provider_hint",
      value: provider,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 15,
    });
  }

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: "oauth_provider_hint",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
  return response;
}
