import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { LoginSsoButtons } from "@/components/auth/login-sso-buttons";
import { DevBypassButton } from "@/components/auth/dev-bypass-button";
import { authOptions } from "@/lib/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ next?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const params = await searchParams;
  const nextPath = params?.next || "/dashboard";
  const providerStatus = {
    google: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    azureAd: Boolean(process.env.AZURE_AD_CLIENT_ID && process.env.AZURE_AD_CLIENT_SECRET),
    github: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
  };

  if (session?.user) {
    redirect(nextPath);
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <span className="eyebrow">Secure SSO</span>
        <h1>Sign in with your identity provider.</h1>
        <p>
          Google, Microsoft, and GitHub are wired through NextAuth OAuth. Configure
          provider credentials in your environment, then sign in to access the
          protected web apps.
        </p>

        <LoginSsoButtons callbackUrl={nextPath} providerStatus={providerStatus} />

        {process.env.NODE_ENV !== "production" && (
          <DevBypassButton callbackUrl={nextPath} />
        )}

        <p className="form-hint">After sign-in, try `/dashboard/projects/alpha` and `/account/settings`.</p>
      </section>
    </main>
  );
}
