"use client";

import { signIn } from "next-auth/react";

type LoginSsoButtonsProps = {
  callbackUrl: string;
  providerStatus: {
    google: boolean;
    azureAd: boolean;
    github: boolean;
  };
};

const providers = [
  {
    id: "google",
    theme: "google",
    key: "google",
    label: "Continue with Google",
    hint: "Use Google Workspace or personal Google accounts.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M21.58 12.24c0-.78-.07-1.53-.2-2.24H12v4.24h5.36a4.57 4.57 0 0 1-1.98 3v2.5h3.2c1.88-1.73 3-4.29 3-7.5Z"
          fill="#4285F4"
        />
        <path
          d="M12 22c2.7 0 4.96-.9 6.62-2.26l-3.2-2.5c-.9.6-2.04.96-3.42.96-2.62 0-4.84-1.77-5.63-4.15H3.07v2.62A9.99 9.99 0 0 0 12 22Z"
          fill="#34A853"
        />
        <path
          d="M6.37 14.05a6.02 6.02 0 0 1 0-4.1V7.33H3.07a10 10 0 0 0 0 9.34l3.3-2.62Z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.8c1.48 0 2.8.51 3.84 1.5l2.88-2.88C16.95 2.77 14.7 2 12 2a9.99 9.99 0 0 0-8.93 5.33l3.3 2.62C7.16 7.57 9.38 5.8 12 5.8Z"
          fill="#EA4335"
        />
      </svg>
    ),
  },
  {
    id: "azure-ad",
    theme: "microsoft",
    key: "azureAd",
    label: "Continue with Microsoft",
    hint: "Sign in with Microsoft Entra ID or Azure AD tenant accounts.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <rect fill="#F25022" height="10" width="10" x="2" y="2" />
        <rect fill="#7FBA00" height="10" width="10" x="12" y="2" />
        <rect fill="#00A4EF" height="10" width="10" x="2" y="12" />
        <rect fill="#FFB900" height="10" width="10" x="12" y="12" />
      </svg>
    ),
  },
  {
    id: "github",
    theme: "github",
    key: "github",
    label: "Continue with GitHub",
    hint: "Use your GitHub identity for developer-focused access.",
    icon: (
      <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.21-3.37-1.21-.45-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.74 0 0 .84-.27 2.75 1.05A9.23 9.23 0 0 1 12 6.95c.85 0 1.7.12 2.5.36 1.9-1.32 2.74-1.05 2.74-1.05.55 1.42.2 2.48.1 2.74.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.58 5.06.36.32.69.94.69 1.9 0 1.38-.01 2.48-.01 2.82 0 .26.18.58.69.48A10.25 10.25 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z" />
      </svg>
    ),
  },
] as const;

export function LoginSsoButtons({ callbackUrl, providerStatus }: LoginSsoButtonsProps) {
  const buildCallbackUrlWithProviderHint = (providerId: string) => {
    try {
      const url = new URL(callbackUrl, window.location.origin);
      url.searchParams.set("provider", providerId);

      if (url.origin === window.location.origin) {
        return `${url.pathname}${url.search}${url.hash}`;
      }

      return callbackUrl;
    } catch {
      return callbackUrl;
    }
  };

  const startSignIn = async (providerId: string) => {
    try {
      await fetch("/api/auth/provider-hint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ provider: providerId }),
      });
    } catch {
      // Ignore hint persistence issues and continue with provider sign-in.
    }

    const callbackUrlWithHint = buildCallbackUrlWithProviderHint(providerId);

    void signIn(providerId, {
      callbackUrl: callbackUrlWithHint,
    });
  };

  return (
    <div className="sso-button-grid">
      {providers.map((provider) => {
        const isConfigured = providerStatus[provider.key];

        return (
          <button
            className={`sso-button is-${provider.theme}${isConfigured ? "" : " is-disabled"}`}
            disabled={!isConfigured}
            key={provider.id}
            onClick={() => startSignIn(provider.id)}
            type="button"
          >
            <span className="sso-icon" role="img">
              {provider.icon}
            </span>
            <span className="sso-copy">
              <strong>{provider.label}</strong>
              <span>{isConfigured ? provider.hint : "Provider keys missing in .env.local"}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}