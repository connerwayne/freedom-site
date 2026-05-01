const insightMetrics = [
  { label: "Weekly active teams", value: "128" },
  { label: "Activation rate", value: "73%" },
  { label: "Median session time", value: "18m" },
];

export default function InsightsPage() {
  return (
    <section className="page-stack">
      <div className="app-header">
        <div>
          <span className="eyebrow">Sibling protected app</span>
          <h1>Insights</h1>
          <p>
            Use separate routes when reporting, editorial, or operations tools need
            different mental models but should stay under one authenticated product.
          </p>
        </div>
      </div>

      <section className="metrics-grid">
        {insightMetrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <strong>{metric.label}</strong>
            <span className="metric-value">{metric.value}</span>
          </article>
        ))}
      </section>

      <article className="panel">
        <strong>Why this menu lives in the protected root layout</strong>
        <p>
          App switching belongs at the highest shared authenticated boundary, while
          deeper route layouts like the dashboard should keep only local section navigation.
        </p>
      </article>
    </section>
  );
}