import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ next?: string }>;
}) {
  const session = await getSession();
  const params = await searchParams;
  const nextPath = params?.next || "/dashboard";

  if (session) {
    redirect(nextPath);
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <span className="eyebrow">Demo auth</span>
        <h1>Sign in to reach the protected routes.</h1>
        <p>
          This scaffold uses a simple cookie-based demo session so you can wire the
          route boundaries first and swap in your real auth provider later.
        </p>

        <form action="/api/auth/login" className="auth-form" method="post">
          <input name="next" type="hidden" value={nextPath} />
          <div className="field">
            <label htmlFor="email">Email</label>
            <input defaultValue="demo@freedom.site" id="email" name="email" type="email" />
          </div>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input defaultValue="Demo User" id="name" name="name" type="text" />
          </div>
          <button className="primary-button" type="submit">
            Create session
          </button>
        </form>

        <p className="form-hint">After sign-in, try `/dashboard/projects/alpha` and `/account/settings`.</p>
      </section>
    </main>
  );
}
