const invoices = [
  { client: "Grace Abernathy", amount: "$185", due: "May 7", status: "Unpaid" },
  { client: "Ray Kowalski", amount: "$320", due: "May 10", status: "Unpaid" },
  { client: "South Ridge HOA", amount: "$1,250", due: "May 15", status: "Draft" },
];

const financeSystems = [
  {
    title: "Same-day invoicing",
    body: "Issue invoices when jobs close so collections start immediately while the work is still fresh in the client's mind.",
  },
  {
    title: "Autopay enrollment",
    body: "Move recurring mowing and maintenance clients to stored payment methods wherever possible.",
  },
  {
    title: "Margin tracking",
    body: "Track material-heavy jobs separately so installs stay profitable after labor and fuel are accounted for.",
  },
];

export default function ManagerFinancePage() {
  return (
    <section className="page-stack">
      <div className="app-header">
        <div>
          <span className="eyebrow">Finance</span>
          <h1>Cash flow and invoicing</h1>
          <p>Keep billing tight, collect faster, and use recurring revenue to stabilize the business through the season.</p>
        </div>
      </div>

      <div className="manager-metrics manager-metrics-compact">
        <article className="manager-metric-card">
          <strong>Collected this month</strong>
          <span className="metric-value">$9.4k</span>
          <span className="manager-metric-detail">92% collection rate</span>
        </article>
        <article className="manager-metric-card">
          <strong>Outstanding</strong>
          <span className="metric-value">$1.8k</span>
          <span className="manager-metric-detail">2 reminders scheduled</span>
        </article>
        <article className="manager-metric-card">
          <strong>Recurring billing</strong>
          <span className="metric-value">21</span>
          <span className="manager-metric-detail">Clients on monthly plans</span>
        </article>
      </div>

      <div className="manager-grid manager-grid-top">
        <article className="panel manager-panel">
          <div className="table-header">
            <strong>Invoice watchlist</strong>
            <button className="table-action-btn">+ New invoice</button>
          </div>
          <div className="data-table">
            <div className="data-row data-row-head">
              <span>Client</span>
              <span>Amount</span>
              <span>Due</span>
              <span>Status</span>
              <span>Action</span>
            </div>
            {invoices.map((invoice) => (
              <div className="data-row" key={`${invoice.client}-${invoice.due}`}>
                <span>{invoice.client}</span>
                <span>{invoice.amount}</span>
                <span>{invoice.due}</span>
                <span>
                  <span className={`badge ${invoice.status === "Unpaid" ? "badge-yellow" : "badge-blue"}`}>
                    {invoice.status}
                  </span>
                </span>
                <span>{invoice.status === "Unpaid" ? "Send reminder" : "Review"}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel manager-panel">
          <strong>Finance systems</strong>
          <div className="manager-card-list">
            {financeSystems.map((item) => (
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