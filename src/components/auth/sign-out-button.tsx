"use client";

import { signOut } from "next-auth/react";
import { useTransition } from "react";

export function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = async () => {
    startTransition(() => {
      void signOut({
        callbackUrl: "/login",
      });
    });
  };

  return (
    <button className="ghost-button" onClick={handleSignOut} type="button">
      {isPending ? "Signing out..." : "Sign out"}
    </button>
  );
}
