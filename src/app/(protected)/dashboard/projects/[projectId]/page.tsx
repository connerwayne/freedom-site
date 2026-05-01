type ProjectDetailPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { projectId } = await params;

  return (
    <section className="page-stack">
      <div className="detail-card">
        <span className="eyebrow">Dynamic segment</span>
        <h1>{projectId}</h1>
        <p>
          This route lives at `/dashboard/projects/[projectId]` and inherits both the
          protected layout and the dashboard-specific nested layout.
        </p>
      </div>

      <div className="detail-grid">
        <article className="detail-card">
          <strong>Why this pattern works</strong>
          <p>
            Shared dashboard chrome stays in one place while project-specific data can
            load and cache per route segment.
          </p>
        </article>
        <article className="detail-card">
          <strong>Natural extension points</strong>
          <p>
            Add `loading.tsx`, `error.tsx`, or a parallel route for project activity
            without disturbing sibling account pages.
          </p>
        </article>
      </div>
    </section>
  );
}
