import Link from "next/link";

const projects = [
  {
    id: "alpha",
    name: "Alpha launch",
    summary: "Nested project pages are ideal when each item needs its own detail route and shared sub-navigation.",
  },
  {
    id: "atlas",
    name: "Atlas redesign",
    summary: "Project detail pages can stream data independently while inheriting the dashboard shell.",
  },
  {
    id: "ember",
    name: "Ember migration",
    summary: "Route groups keep these URLs clean while the filesystem stays organized around ownership boundaries.",
  },
];

export default function ProjectsPage() {
  return (
    <section className="page-stack">
      <div className="subsection-header panel">
        <div>
          <span className="eyebrow">Nested route list</span>
          <h1>Projects</h1>
        </div>
        <p>Each project card below links into a deeper protected route.</p>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.id}>
            <strong>{project.name}</strong>
            <p>{project.summary}</p>
            <Link className="project-link" href={`/dashboard/projects/${project.id}`}>
              Open {project.id}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
