const metrics = [
  { label: "Protected groups", value: "2" },
  { label: "Nested layouts", value: "3" },
  { label: "Demo auth flow", value: "Cookie" },
];

export default function DashboardPage() {
  return (
    <div className="page-stack">
      <section className="app-header">
        <div>
          <span className="eyebrow">Protected area</span>
          <h1>Dashboard overview</h1>
          <p>
            This page sits behind middleware and the protected layout. Keep your app
            summary, KPIs, and primary navigation here.
          </p>
        </div>
      </section>

      <section className="metrics-grid">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <strong>{metric.label}</strong>
            <span className="metric-value">{metric.value}</span>
          </article>
        ))}
      </section>

      <section className="panel">
        <strong>Suggested next move</strong>
        <ul className="checkpoint-list">
          <li>Replace the demo cookie session with your real auth provider.</li>
          <li>Add loading and error states for expensive protected routes.</li>
          <li>Keep dashboard-only navigation in this nested layout, not the root app shell.</li>
        </ul>
      </section>
    </div>
  );
}
