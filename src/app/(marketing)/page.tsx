import Link from "next/link";

const routeCards = [
  {
    title: "Public marketing surface",
    description: "Keep landing pages, pricing, docs, and other unauthenticated content in a dedicated route group.",
    path: "src/app/(marketing)",
  },
  {
    title: "Auth entry point",
    description: "Use a standalone auth group so login and onboarding flows can opt out of the app shell.",
    path: "src/app/(auth)/login",
  },
  {
    title: "Protected app area",
    description: "Group authenticated pages under a protected layout and back it with middleware.",
    path: "src/app/(protected)",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <article className="hero-card">
          <span className="eyebrow">Next.js App Router scaffold</span>
          <h1>Nested routes and protected flows without starter noise.</h1>
          <p>
            This project gives you route groups, nested layouts, demo auth cookies,
            and middleware protection so you can start shaping real product surfaces
            instead of undoing boilerplate.
          </p>
          <div className="hero-actions">
            <Link className="primary-link" href="/dashboard">
              Open protected dashboard
            </Link>
            <Link className="ghost-link" href="/about">
              Inspect the route strategy
            </Link>
          </div>
          <ul className="stack-list">
            <li>App Router route groups for public, auth, and protected sections.</li>
            <li>Nested dashboard layouts for projects and account settings.</li>
            <li>Middleware plus server-side session checks for defense in depth.</li>
          </ul>
        </article>

        <aside className="info-card">
          <strong>Suggested structure</strong>
          <p>
            Start broad with route groups, then add shared layouts only where the
            UI shell or authorization boundary actually changes.
          </p>
          <div className="code-block">
            <code>{`src/app
  (marketing)/
  (auth)/login/
  (protected)/dashboard/
  (protected)/account/settings/`}</code>
          </div>
        </aside>
      </section>

      <section className="section-block">
        <h2 className="section-title">Built to branch cleanly as the app grows</h2>
        <div className="route-grid">
          {routeCards.map((card) => (
            <article className="route-card" key={card.path}>
              <strong>{card.title}</strong>
              <p>{card.description}</p>
              <code>{card.path}</code>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
