"use client";

import { signIn } from "next-auth/react";

type DevBypassButtonsProps = {
  adminCallbackUrl: string;
  managerCallbackUrl: string;
  clientCallbackUrl: string;
};

function handleDevSignIn(role: "admin" | "manager" | "client", callbackUrl: string) {
  void signIn("dev-bypass", {
    callbackUrl,
    role,
  });
}

export function DevBypassButton({
  adminCallbackUrl,
  managerCallbackUrl,
  clientCallbackUrl,
}: DevBypassButtonsProps) {
  return (
    <div className="dev-bypass-group">
      <button
        className="dev-bypass-btn dev-bypass-admin"
        onClick={() => handleDevSignIn("admin", adminCallbackUrl)}
      >
        ⚙ Bypass as Admin
      </button>
      <button
        className="dev-bypass-btn dev-bypass-manager"
        onClick={() => handleDevSignIn("manager", managerCallbackUrl)}
      >
        📋 Bypass as Manager
      </button>
      <button
        className="dev-bypass-btn dev-bypass-client"
        onClick={() => handleDevSignIn("client", clientCallbackUrl)}
      >
        👤 Bypass as Client
      </button>
    </div>
  );
}
