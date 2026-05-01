const studioPanels = [
  {
    title: "Content pipeline",
    copy: "Draft launch notes, campaign copy, and reusable blocks without leaving the protected shell.",
  },
  {
    title: "Release board",
    copy: "Keep approvals and publishing checkpoints in a sibling app instead of forcing them into dashboard analytics.",
  },
];

export default function StudioPage() {
  return (
    <section className="page-stack">
      <div className="app-header">
        <div>
          <span className="eyebrow">Web app switcher</span>
          <h1>Studio</h1>
          <p>
            This sibling protected app demonstrates how the sidebar can switch between
            distinct surfaces that share authentication but not necessarily the same
            nested content structure.
          </p>
        </div>
      </div>

      <div className="detail-grid">
        {studioPanels.map((panel) => (
          <article className="detail-card" key={panel.title}>
            <strong>{panel.title}</strong>
            <p>{panel.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}