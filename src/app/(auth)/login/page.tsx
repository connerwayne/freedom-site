import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { LoginSsoButtons } from "@/components/auth/login-sso-buttons";
import { DevBypassButton } from "@/components/auth/dev-bypass-button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { getDefaultPathForRole, resolvePostLoginPath } from "@/lib/access";
import { authOptions } from "@/lib/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ next?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const params = await searchParams;
  const nextPath = params?.next || "/dashboard";
  const adminCallbackUrl = getDefaultPathForRole("admin");
  const managerCallbackUrl = getDefaultPathForRole("manager");
  const clientCallbackUrl = getDefaultPathForRole("client");
  const providerStatus = {
    google: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    azureAd: Boolean(process.env.AZURE_AD_CLIENT_ID && process.env.AZURE_AD_CLIENT_SECRET),
    github: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
  };

  if (session?.user) {
    redirect(resolvePostLoginPath(session.user.role, nextPath));
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="auth-card-top">
          <span className="eyebrow">Owner portal</span>
          <ThemeToggle />
        </div>
        <h1>Welcome back.</h1>
        <p>
          Sign in to access your Freedom Landscaping dashboard — manage jobs,
          track projects, and stay on top of your business.
        </p>

        <LoginSsoButtons callbackUrl={nextPath} providerStatus={providerStatus} />

        {process.env.NODE_ENV !== "production" && (
          <DevBypassButton
            adminCallbackUrl={adminCallbackUrl}
            managerCallbackUrl={managerCallbackUrl}
            clientCallbackUrl={clientCallbackUrl}
          />
        )}

        <p className="form-hint">
          In development, use the bypass buttons to enter the admin workspace, the
          manager portal, or the client billing portal instantly.
        </p>
      </section>
    </main>
  );
}
