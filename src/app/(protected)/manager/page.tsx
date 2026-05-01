const commandMetrics = [
  { label: "Pipeline value", value: "$12.5k", detail: "+18% month over month" },
  { label: "Outstanding invoices", value: "$1.8k", detail: "2 accounts need follow-up" },
  { label: "Route efficiency", value: "86%", detail: "Goal is 90% by June" },
  { label: "Recurring clients", value: "37", detail: "9 upsell opportunities open" },
];

const crmPipeline = [
  {
    lead: "South Ridge HOA",
    service: "Seasonal grounds contract",
    stage: "Proposal sent",
    nextStep: "Board follow-up Thursday",
    value: "$7,200",
  },
  {
    lead: "Carter Residence",
    service: "Retaining wall and drainage",
    stage: "Site visit booked",
    nextStep: "Scope photos after visit",
    value: "$3,900",
  },
  {
    lead: "Maple Dental",
    service: "Monthly maintenance",
    stage: "Follow-up",
    nextStep: "Send contract revision",
    value: "$1,450/mo",
  },
];

const automationQueue = [
  {
    title: "Estimate follow-up",
    detail: "Send a text reminder 24 hours after a quote if there is no reply.",
    impact: "Recovers stalled leads",
  },
  {
    title: "Invoice chase",
    detail: "Auto-send payment reminders at 3, 7, and 14 days past due.",
    impact: "Improves cash collection",
  },
  {
    title: "Route planning",
    detail: "Cluster weekly mowing jobs by neighborhood to reduce windshield time.",
    impact: "Cuts fuel and idle time",
  },
  {
    title: "Review request",
    detail: "Request Google reviews automatically after completed cleanup and install jobs.",
    impact: "Feeds local lead generation",
  },
];

const financeBoard = [
  {
    title: "Invoices due this week",
    amount: "$820",
    note: "Trigger SMS reminder on Wednesday morning.",
  },
  {
    title: "Draft estimates waiting",
    amount: "4",
    note: "Turn them around same-day to protect close rate.",
  },
  {
    title: "Maintenance renewals",
    amount: "6",
    note: "Bundle mulch and hedge service into annual packages.",
  },
];

const scheduleBoard = [
  {
    day: "Monday",
    focus: "Recurring maintenance routes",
    note: "Oak Hill, Pine Creek, and Riverbend grouped into one run.",
  },
  {
    day: "Wednesday",
    focus: "Install and construction jobs",
    note: "Reserve longer blocks for walls, borders, drainage, and material pickup.",
  },
  {
    day: "Friday",
    focus: "Catch-up, callbacks, and estimates",
    note: "Hold margin for rain delays, upsells, and fast-turn proposals.",
  },
];

const operationsBoard = [
  {
    title: "CRM management",
    body: "Track every lead by source, service type, close probability, and next follow-up so no estimate goes cold.",
  },
  {
    title: "Invoicing system",
    body: "Issue invoices immediately on completion, auto-remind overdue accounts, and monitor payment velocity weekly.",
  },
  {
    title: "Project management",
    body: "Use job checklists, material planning, and photo handoff steps so installs can scale without quality slipping.",
  },
  {
    title: "Capacity planning",
    body: "Forecast labor, subcontractor needs, and equipment usage before the calendar gets overloaded.",
  },
];

const growthLevers = [
  {
    label: "Recurring revenue expansion",
    detail: "Convert one-time cleanup clients into mowing or bed maintenance plans.",
  },
  {
    label: "Commercial account playbook",
    detail: "Target clinics, offices, and HOAs with bundled monthly service packages.",
  },
  {
    label: "Systemized delivery",
    detail: "Standardize estimate templates, job photos, and closeout texts so the business can scale cleanly.",
  },
];

export default function ManagerPage() {
  return (
    <section className="page-stack">
      <section className="manager-hero">
        <div className="manager-hero-copy">
          <span className="eyebrow">Business operations</span>
          <h1>Operations Manager</h1>
          <p>
            Use this workspace as the company command center: organize leads,
            control invoicing, manage schedules, standardize project delivery,
            and automate repetitive admin work so the business can grow.
          </p>
          <div className="manager-chip-row">
            <span className="manager-chip">CRM</span>
            <span className="manager-chip">Invoicing</span>
            <span className="manager-chip">Scheduling</span>
            <span className="manager-chip">Projects</span>
            <span className="manager-chip">Automation</span>
          </div>
        </div>

        <aside className="manager-hero-card">
          <span className="manager-card-label">This week</span>
          <strong>Priority stack</strong>
          <ul className="checkpoint-list manager-priority-list">
            <li>Close the HOA proposal and push two overdue invoices to paid.</li>
            <li>Lock next week&apos;s mowing routes before weather shifts the calendar.</li>
            <li>Turn repeat cleanup customers into maintenance contracts.</li>
          </ul>
        </aside>
      </section>

      <div className="manager-metrics">
        {commandMetrics.map((metric) => (
          <article className="manager-metric-card" key={metric.label}>
            <strong>{metric.label}</strong>
            <span className="metric-value">{metric.value}</span>
            <span className="manager-metric-detail">{metric.detail}</span>
          </article>
        ))}
      </div>

      <div className="manager-grid manager-grid-top">
        <article className="panel manager-panel">
          <div className="table-header">
            <strong>CRM pipeline</strong>
            <button className="table-action-btn">+ New lead</button>
          </div>
          <div className="data-table data-table-wide">
            <div className="data-row data-row-head data-row-manager">
              <span>Lead</span>
              <span>Service</span>
              <span>Stage</span>
              <span>Next step</span>
              <span>Value</span>
            </div>
            {crmPipeline.map((item) => (
              <div className="data-row data-row-manager" key={item.lead}>
                <span>{item.lead}</span>
                <span>{item.service}</span>
                <span>
                  <span className="badge badge-blue">{item.stage}</span>
                </span>
                <span>{item.nextStep}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel manager-panel">
          <div className="table-header">
            <strong>Cash flow and renewals</strong>
            <button className="table-action-btn">Open invoicing</button>
          </div>
          <div className="manager-card-list manager-tight-list">
            {financeBoard.map((item) => (
              <div className="manager-card manager-stat-card" key={item.title}>
                <span className="manager-card-label">Finance</span>
                <strong>{item.title}</strong>
                <span className="manager-stat-value">{item.amount}</span>
                <p>{item.note}</p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="manager-grid">
        <article className="panel manager-panel manager-panel-dark">
          <div className="table-header">
            <strong>Automation queue</strong>
            <button className="table-action-btn">+ New workflow</button>
          </div>
          <div className="automation-list">
            {automationQueue.map((item) => (
              <div className="automation-row" key={item.title}>
                <span className="automation-dot" />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <span className="manager-inline-pill">{item.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel manager-panel">
          <div className="table-header">
            <strong>Growth engine</strong>
            <button className="table-action-btn">Review opportunities</button>
          </div>
          <div className="manager-card-list manager-tight-list">
            {growthLevers.map((item) => (
              <div className="manager-card" key={item.label}>
                <span className="manager-card-label">Expansion</span>
                <strong>{item.label}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="manager-grid manager-grid-bottom">
        <article className="panel manager-panel">
          <strong>Schedule management</strong>
          <div className="manager-card-list">
            {scheduleBoard.map((entry) => (
              <div className="manager-card" key={entry.day}>
                <span className="manager-card-label">{entry.day}</span>
                <strong>{entry.focus}</strong>
                <p>{entry.note}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel manager-panel">
          <strong>Operating systems</strong>
          <div className="manager-card-list">
            {operationsBoard.map((entry) => (
              <div className="manager-card" key={entry.title}>
                <strong>{entry.title}</strong>
                <p>{entry.body}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}