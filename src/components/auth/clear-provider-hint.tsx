"use client";

import { useEffect } from "react";

/**
 * Fires once on mount (after successful sign-in) to delete the
 * oauth_provider_hint cookie so stale hints don't bleed into future
 * error pages after long sessions.
 */
export function ClearProviderHint() {
  useEffect(() => {
    fetch("/api/auth/provider-hint", { method: "DELETE" }).catch(() => {
      // Non-critical: ignore network errors
    });
  }, []);

  return null;
}
