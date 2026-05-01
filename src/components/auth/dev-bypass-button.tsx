"use client";

import { signIn } from "next-auth/react";

export function DevBypassButton({ callbackUrl }: { callbackUrl: string }) {
  return (
    <button
      className="dev-bypass-btn"
      onClick={() => signIn("dev-bypass", { callbackUrl })}
    >
      ⚙ Bypass Sign In (dev only)
    </button>
  );
}
