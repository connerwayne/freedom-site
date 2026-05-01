export default function AboutPage() {
  return (
    <main>
      <section className="section-block">
        <span className="eyebrow">Route map</span>
        <h1 className="section-title">How this scaffold is organized</h1>
        <div className="feature-grid">
          <article className="info-card">
            <strong>Public routes</strong>
            <p>
              The marketing group owns pages that should keep a lightweight shell,
              public navigation, and no auth checks.
            </p>
            <span className="code-inline">/(marketing)</span>
          </article>
          <article className="info-card">
            <strong>Protected routes</strong>
            <p>
              The protected group contains the app shell, shared sidebar, and the
              guardrails that require a valid session.
            </p>
            <span className="code-inline">/(protected)</span>
          </article>
          <article className="info-card">
            <strong>Nested layouts</strong>
            <p>
              Dashboard routes get their own sub-navigation without forcing the same
              layout onto account settings or future product areas.
            </p>
            <span className="code-inline">dashboard/layout.tsx</span>
          </article>
          <article className="info-card">
            <strong>Middleware handoff</strong>
            <p>
              Middleware handles redirects early and preserves the intended target in
              a next query string for a smoother login flow.
            </p>
            <span className="code-inline">middleware.ts</span>
          </article>
        </div>
      </section>
    </main>
  );
}
