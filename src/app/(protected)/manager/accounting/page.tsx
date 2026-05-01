import { getAccountingDashboardData } from "@/lib/operations-db";

const collectionsPlaybook = [
  {
    title: "0-7 days overdue",
    body: "Automated reminder email + text with payment link and due date recap.",
  },
  {
    title: "8-14 days overdue",
    body: "Direct phone outreach and offer split payment plan for good-standing clients.",
  },
  {
    title: "15+ days overdue",
    body: "Formal collection notice, service pause flag, and manager review for escalation.",
  },
];

const taxBoard = [
  {
    category: "Quarterly estimate",
    value: "$2,400",
    note: "Set aside 26% of projected owner draw and net profit.",
  },
  {
    category: "Sales tax payable",
    value: "$620",
    note: "Reconcile taxable materials and service items before filing.",
  },
  {
    category: "Payroll tax reserve",
    value: "$910",
    note: "Track manager payroll burden and due dates by pay cycle.",
  },
];

const deductionsChecklist = [
  "Fuel and vehicle mileage logs reviewed weekly.",
  "Equipment purchases categorized and depreciation tagged.",
  "Subcontractor payments matched against W-9 records.",
  "Home office and software subscriptions reconciled monthly.",
];

export default function ManagerAccountingPage() {
  const { receivables, summary } = getAccountingDashboardData();

  return (
    <section className="page-stack">
      <div className="app-header">
        <div>
          <span className="eyebrow">Accounting operations</span>
          <h1>Invoicing, collections, and taxes</h1>
          <p>
            Run accounts receivable, debt collection workflow, and tax planning from
            one operational page built for predictable cash flow.
          </p>
        </div>
      </div>

      <div className="manager-metrics manager-metrics-compact">
        <article className="manager-metric-card">
          <strong>Total outstanding</strong>
          <span className="metric-value">{summary.outstandingTotal}</span>
          <span className="manager-metric-detail">{receivables.length} open receivables</span>
        </article>
        <article className="manager-metric-card">
          <strong>Overdue 15+ days</strong>
          <span className="metric-value">{summary.overdue15Total}</span>
          <span className="manager-metric-detail">Escalation queue active</span>
        </article>
        <article className="manager-metric-card">
          <strong>Tax reserve</strong>
          <span className="metric-value">{summary.taxReserve}</span>
          <span className="manager-metric-detail">Quarterly + payroll buffers</span>
        </article>
      </div>

      <article className="panel manager-panel">
        <div className="table-header">
          <strong>Outstanding balances and collections</strong>
          <button className="table-action-btn">Export A/R report</button>
        </div>
        <div className="data-table">
          <div className="data-row data-row-head data-row-users">
            <span>Client</span>
            <span>Amount</span>
            <span>Due</span>
            <span>Days late</span>
            <span>Status</span>
            <span>Collection stage</span>
          </div>
          {receivables.map((item) => (
            <div className="data-row data-row-users" key={`${item.userId}-${item.client}-${item.due}`}>
              <span>{item.client}</span>
              <span>{item.amount}</span>
              <span>{item.due}</span>
              <span>{item.daysLate}</span>
              <span>
                <span className={`badge ${item.status === "Sent" ? "badge-blue" : "badge-yellow"}`}>
                  {item.status}
                </span>
              </span>
              <span>{item.stage}</span>
            </div>
          ))}
        </div>
      </article>

      <div className="manager-grid manager-grid-top">
        <article className="panel manager-panel manager-panel-dark">
          <strong>Debt collection playbook</strong>
          <div className="manager-card-list">
            {collectionsPlaybook.map((item) => (
              <div className="manager-card" key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel manager-panel">
          <strong>Tax and compliance board</strong>
          <div className="manager-card-list manager-tight-list">
            {taxBoard.map((item) => (
              <div className="manager-card manager-stat-card" key={item.category}>
                <span className="manager-card-label">Tax item</span>
                <strong>{item.category}</strong>
                <span className="manager-stat-value">{item.value}</span>
                <p>{item.note}</p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="panel manager-panel">
        <strong>Monthly tax readiness checklist</strong>
        <ul className="checkpoint-list">
          {deductionsChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}
