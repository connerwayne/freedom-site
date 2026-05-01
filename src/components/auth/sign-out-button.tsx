"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function SignOutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    startTransition(() => {
      router.push("/login");
      router.refresh();
    });
  };

  return (
    <button className="ghost-button" onClick={handleSignOut} type="button">
      {isPending ? "Signing out..." : "Sign out"}
    </button>
  );
}
