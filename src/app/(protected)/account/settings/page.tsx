export default function AccountSettingsPage() {
  return (
    <section className="page-stack">
      <div className="subsection-header panel">
        <div>
          <span className="eyebrow">Protected sibling route</span>
          <h1>Account settings</h1>
        </div>
        <p>
          This page shares the protected shell but not the dashboard nested layout,
          which is usually what you want for account and billing flows.
        </p>
      </div>

      <div className="settings-grid">
        <article className="detail-card">
          <strong>Security boundary</strong>
          <p>Account pages are still guarded by middleware because they live under `/account`.</p>
        </article>
        <article className="detail-card">
          <strong>Layout boundary</strong>
          <p>Settings avoids dashboard-specific navigation because it sits outside `dashboard/layout.tsx`.</p>
        </article>
      </div>
    </section>
  );
}
