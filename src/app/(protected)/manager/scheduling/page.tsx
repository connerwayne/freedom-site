const routePlan = [
  {
    zone: "Oak Hill / Pine Creek",
    jobs: "8 recurring stops",
    focus: "Mowing and edging",
    note: "Keep these on the same day to reduce drive time.",
  },
  {
    zone: "Riverbend",
    jobs: "3 cleanup jobs",
    focus: "Debris haul-off",
    note: "Stack trailer work back-to-back.",
  },
  {
    zone: "Commercial corridor",
    jobs: "2 account visits",
    focus: "Maintenance checks",
    note: "Early morning before traffic builds.",
  },
];

const schedulingRules = [
  {
    title: "Weather buffer",
    body: "Protect one block each week for rain recovery so the schedule stays reliable.",
  },
  {
    title: "Material day planning",
    body: "Batch install jobs around pickup windows and supplier hours to avoid lost afternoons.",
  },
  {
    title: "Estimate routing",
    body: "Schedule site visits near existing jobs to turn windshield time into selling time.",
  },
];

export default function ManagerSchedulingPage() {
  return (
    <section className="page-stack">
      <div className="app-header">
        <div>
          <span className="eyebrow">Scheduling</span>
          <h1>Routes and capacity planning</h1>
          <p>Build dense routes, protect buffer time, and keep installs from disrupting recurring revenue work.</p>
        </div>
      </div>

      <div className="manager-metrics manager-metrics-compact">
        <article className="manager-metric-card">
          <strong>Booked days</strong>
          <span className="metric-value">11</span>
          <span className="manager-metric-detail">Over the next 14 days</span>
        </article>
        <article className="manager-metric-card">
          <strong>Install blocks</strong>
          <span className="metric-value">3</span>
          <span className="manager-metric-detail">Material-heavy jobs reserved</span>
        </article>
        <article className="manager-metric-card">
          <strong>Route density</strong>
          <span className="metric-value">86%</span>
          <span className="manager-metric-detail">Push low-density days above 90%</span>
        </article>
      </div>

      <div className="manager-grid manager-grid-top">
        <article className="panel manager-panel">
          <strong>Weekly route plan</strong>
          <div className="manager-card-list">
            {routePlan.map((item) => (
              <div className="manager-card" key={item.zone}>
                <span className="manager-card-label">{item.zone}</span>
                <strong>{item.jobs}</strong>
                <p>{item.focus}</p>
                <p>{item.note}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel manager-panel manager-panel-dark">
          <strong>Scheduling rules</strong>
          <div className="manager-card-list">
            {schedulingRules.map((item) => (
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