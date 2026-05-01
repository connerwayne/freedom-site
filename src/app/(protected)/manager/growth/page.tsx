const growthProjects = [
  {
    title: "Recurring plan conversion",
    body: "Offer cleanup clients a 12-month maintenance path before the job closes out.",
  },
  {
    title: "Commercial outreach",
    body: "Build a lightweight proposal package for clinics, offices, and small HOAs.",
  },
  {
    title: "Referral engine",
    body: "Text happy customers after completion and ask for a review or neighbor referral.",
  },
];

const automationRoadmap = [
  {
    title: "Automated estimate pipeline",
    body: "Capture leads from the website, text back instantly, and queue a site visit without manual follow-up.",
  },
  {
    title: "Client lifecycle campaigns",
    body: "Run seasonal reminders for mulch, cleanup, pruning, and winter prep based on service history.",
  },
  {
    title: "Expansion readiness",
    body: "Standardize checklists and onboarding so the business can add a crew without chaos.",
  },
];

export default function ManagerGrowthPage() {
  return (
    <section className="page-stack">
      <div className="app-header">
        <div>
          <span className="eyebrow">Growth</span>
          <h1>Expansion and automation</h1>
          <p>Use systems, offers, and automation to grow revenue without growing admin overhead at the same rate.</p>
        </div>
      </div>

      <div className="manager-grid manager-grid-bottom">
        <article className="panel manager-panel">
          <strong>Growth initiatives</strong>
          <div className="manager-card-list">
            {growthProjects.map((item) => (
              <div className="manager-card" key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel manager-panel manager-panel-dark">
          <strong>Automation roadmap</strong>
          <div className="manager-card-list">
            {automationRoadmap.map((item) => (
              <div className="manager-card" key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}