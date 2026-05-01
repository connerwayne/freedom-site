import Link from "next/link";
import { cookies } from "next/headers";

type AuthErrorPageProps = {
  searchParams?: Promise<{
    error?: string;
    provider?: string;
    providerId?: string;
  }>;
};

const oauthErrorMap: Record<string, { title: string; detail: string }> = {
  OAuthSignin: {
    title: "Sign-in request could not start",
    detail: "The provider login flow failed to initialize. Check provider configuration and allowed callback URLs.",
  },
  OAuthCallback: {
    title: "OAuth callback failed",
    detail: "The provider redirected back with an invalid or expired callback state.",
  },
  OAuthCreateAccount: {
    title: "Unable to create account",
    detail: "A provider account was returned but your app could not finish account setup.",
  },
  AccessDenied: {
    title: "Access denied by provider",
    detail: "The provider denied permission or your tenant policy blocked sign-in.",
  },
  Configuration: {
    title: "Authentication provider misconfigured",
    detail: "At least one required OAuth setting is missing or invalid in your environment variables.",
  },
  default: {
    title: "Authentication failed",
    detail: "Something went wrong while handling your sign-in response. Please retry or contact support.",
  },
};

type TroubleshootTip = {
  provider: "microsoft" | "github" | "google" | "any";
  headline: string;
  actions: string[];
};

const troubleshootingByError: Record<string, TroubleshootTip[]> = {
  OAuthCallback: [
    {
      provider: "microsoft",
      headline: "Microsoft tenant mismatch",
      actions: [
        "Verify AZURE_AD_TENANT_ID. Use your tenant GUID for single-tenant apps or common for multi-tenant.",
        "Ensure the app registration supports the same account type you are using to sign in.",
        "Confirm the redirect URI includes http://localhost:3000/api/auth/callback/azure-ad in local development.",
      ],
    },
    {
      provider: "github",
      headline: "GitHub callback URL mismatch",
      actions: [
        "Set Authorization callback URL in your GitHub OAuth app to http://localhost:3000/api/auth/callback/github.",
        "Make sure NEXTAUTH_URL exactly matches your current app origin.",
        "Confirm GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET belong to the same OAuth app.",
      ],
    },
    {
      provider: "google",
      headline: "Google OAuth redirect mismatch",
      actions: [
        "Add http://localhost:3000/api/auth/callback/google to Authorized redirect URIs in Google Cloud.",
        "Check that OAuth consent screen publishing status allows your current test account.",
        "Ensure the Google client credentials in .env.local are from the same project and OAuth client.",
      ],
    },
  ],
  OAuthSignin: [
    {
      provider: "any",
      headline: "Provider sign-in flow could not start",
      actions: [
        "Confirm NEXTAUTH_SECRET and NEXTAUTH_URL are set and your dev server was restarted.",
        "Check that the selected provider has both client ID and client secret configured.",
        "Inspect server logs for provider-specific initialization errors from next-auth.",
      ],
    },
  ],
  AccessDenied: [
    {
      provider: "microsoft",
      headline: "Microsoft policy or consent denial",
      actions: [
        "Check enterprise app consent requirements and tenant conditional access policies.",
        "Confirm required permissions in app registration and admin consent status.",
      ],
    },
    {
      provider: "github",
      headline: "GitHub authorization denied",
      actions: [
        "Retry and ensure the requested scopes are accepted on the GitHub consent screen.",
        "If using organization restrictions, verify the OAuth app is approved for that org.",
      ],
    },
  ],
  Configuration: [
    {
      provider: "any",
      headline: "Environment or provider configuration issue",
      actions: [
        "Verify all required .env.local keys from .env.example are present and non-empty.",
        "Restart the dev server after environment updates so NextAuth picks up new values.",
        "Double-check that provider IDs/secrets are valid and not from a different app registration.",
      ],
    },
  ],
};

function normalizeProvider(provider?: string) {
  if (!provider) {
    return undefined;
  }

  if (provider === "azure-ad") {
    return "microsoft";
  }

  if (provider === "github" || provider === "google") {
    return provider;
  }

  return undefined;
}

export default async function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const providerHintFromCookie = cookieStore.get("oauth_provider_hint")?.value;
  const errorCode = params?.error || "default";
  const provider = normalizeProvider(params?.provider || params?.providerId || providerHintFromCookie);
  const errorView = oauthErrorMap[errorCode] || oauthErrorMap.default;
  const tipsForCode = troubleshootingByError[errorCode] || [];
  const filteredTips = provider
    ? tipsForCode.filter((tip) => tip.provider === "any" || tip.provider === provider)
    : tipsForCode;

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <span className="eyebrow">OAuth callback error</span>
        <h1>{errorView.title}</h1>
        <p>{errorView.detail}</p>

        <div className="hero-actions">
          <Link className="primary-link" href="/login">
            Return to sign in
          </Link>
          <Link className="ghost-link" href="/">
            Back to home
          </Link>
        </div>

        {filteredTips.length > 0 && (
          <div className="troubleshoot-grid">
            {filteredTips.map((tip) => (
              <article className="detail-card" key={tip.headline}>
                <strong>{tip.headline}</strong>
                <ul className="checkpoint-list">
                  {tip.actions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}

        <p className="form-hint">
          Error code: {errorCode}
          {provider ? ` | Provider: ${provider}` : ""}
        </p>
      </section>
    </main>
  );
}
