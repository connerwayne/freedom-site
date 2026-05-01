const crmLeads = [
  {
    name: "South Ridge HOA",
    source: "Referral",
    stage: "Proposal sent",
    nextAction: "Board call Thursday",
    value: "$7,200",
  },
  {
    name: "Maple Dental",
    source: "Website form",
    stage: "Follow-up",
    nextAction: "Send revised scope",
    value: "$1,450/mo",
  },
  {
    name: "Harris Residence",
    source: "Google Business",
    stage: "Estimate drafted",
    nextAction: "Text estimate tonight",
    value: "$680",
  },
];

const crmPlaybooks = [
  {
    title: "Lead response under 15 minutes",
    body: "Fast responses win local service work. Auto-send acknowledgement texts and booking links immediately.",
  },
  {
    title: "Quote follow-up cadence",
    body: "Use day 1, day 3, and day 7 reminders so estimates do not die in the inbox.",
  },
  {
    title: "Client lifetime tracking",
    body: "Promote one-time cleanup clients into annual mowing, mulch, and hedge maintenance plans.",
  },
];

export default function ManagerCrmPage() {
  return (
    <section className="page-stack">
      <div className="app-header">
        <div>
          <span className="eyebrow">CRM</span>
          <h1>Lead and client management</h1>
          <p>Track every opportunity, follow-up, and renewal path so no revenue slips through the cracks.</p>
        </div>
      </div>

      <div className="manager-metrics manager-metrics-compact">
        <article className="manager-metric-card">
          <strong>Open leads</strong>
          <span className="metric-value">14</span>
          <span className="manager-metric-detail">5 need contact today</span>
        </article>
        <article className="manager-metric-card">
          <strong>Close rate</strong>
          <span className="metric-value">41%</span>
          <span className="manager-metric-detail">Target 50% on warm referrals</span>
        </article>
        <article className="manager-metric-card">
          <strong>Renewals due</strong>
          <span className="metric-value">6</span>
          <span className="manager-metric-detail">Bundle seasonal add-ons</span>
        </article>
      </div>

      <div className="manager-grid manager-grid-top">
        <article className="panel manager-panel">
          <div className="table-header">
            <strong>Active pipeline</strong>
            <button className="table-action-btn">+ Add lead</button>
          </div>
          <div className="data-table data-table-wide">
            <div className="data-row data-row-head data-row-manager">
              <span>Lead</span>
              <span>Source</span>
              <span>Stage</span>
              <span>Next action</span>
              <span>Value</span>
            </div>
            {crmLeads.map((lead) => (
              <div className="data-row data-row-manager" key={lead.name}>
                <span>{lead.name}</span>
                <span>{lead.source}</span>
                <span><span className="badge badge-blue">{lead.stage}</span></span>
                <span>{lead.nextAction}</span>
                <span>{lead.value}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel manager-panel">
          <strong>CRM playbooks</strong>
          <div className="manager-card-list">
            {crmPlaybooks.map((item) => (
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