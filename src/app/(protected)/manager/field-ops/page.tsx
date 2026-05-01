import Link from "next/link";

import { getEmployeeWorkspaceOverview } from "@/lib/operations-db";

const statusBadgeMap: Record<string, string> = {
  Scheduled: "badge-blue",
  "In Progress": "badge-yellow",
  Completed: "badge-green",
  Draft: "badge-blue",
  Sent: "badge-yellow",
  Paid: "badge-green",
  Overdue: "badge-yellow",
};

export default function ManagerFieldOpsPage() {
  const records = getEmployeeWorkspaceOverview();
  const completedCount = records.filter((record) => record.jobStatus === "Completed").length;
  const overdueCount = records.filter((record) => record.invoiceStatus === "Overdue").length;

  return (
    <section className="page-stack">
      <div className="app-header">
        <div>
          <span className="eyebrow">Manager field ops</span>
          <h1>Field execution and billing sync</h1>
          <p>
            Review live field updates from employee apps, verify job completion,
            and keep invoice status aligned with work completed.
          </p>
        </div>
      </div>

      <div className="manager-metrics manager-metrics-compact">
        <article className="manager-metric-card">
          <strong>Active employee workspaces</strong>
          <span className="metric-value">{records.length}</span>
          <span className="manager-metric-detail">Shared with Admin user management</span>
        </article>
        <article className="manager-metric-card">
          <strong>Completed jobs</strong>
          <span className="metric-value">{completedCount}</span>
          <span className="manager-metric-detail">Based on latest job records</span>
        </article>
        <article className="manager-metric-card">
          <strong>Overdue invoices</strong>
          <span className="metric-value">{overdueCount}</span>
          <span className="manager-metric-detail">Follow up from invoicing workflow</span>
        </article>
      </div>

      <article className="panel manager-panel">
        <div className="table-header">
          <strong>Field app updates</strong>
          <Link className="table-action-btn" href="/employee">
            Open Employee App
          </Link>
        </div>
        <div className="data-table">
          <div className="data-row data-row-head data-row-users">
            <span>User</span>
            <span>Role</span>
            <span>Job status</span>
            <span>Invoice status</span>
            <span>Last update</span>
            <span>Action</span>
          </div>
          {records.map((record) => (
            <div className="data-row data-row-users" key={record.userId}>
              <span className="user-name-cell">
                <strong>{record.userName}</strong>
                <span>{record.userId}</span>
              </span>
              <span>{record.role}</span>
              <span>
                <span className={`badge ${statusBadgeMap[record.jobStatus] ?? "badge-blue"}`}>
                  {record.jobStatus}
                </span>
              </span>
              <span>
                <span className={`badge ${statusBadgeMap[record.invoiceStatus] ?? "badge-blue"}`}>
                  {record.invoiceStatus}
                </span>
              </span>
              <span>{new Date(record.updatedAt).toLocaleDateString()}</span>
              <span>
                <Link className="table-inline-btn" href={`/employee/${record.userId}`}>
                  Open
                </Link>
              </span>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}