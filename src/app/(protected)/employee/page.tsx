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

export default function EmployeeAppIndexPage() {
  const workspaces = getEmployeeWorkspaceOverview();

  return (
    <section className="page-stack">
      <div className="app-header">
        <div>
          <span className="eyebrow">Employee field app</span>
          <h1>Field operations records</h1>
          <p>
            Open each team member&apos;s workspace to manage before/after photos,
            client access details, field notes, job status, and invoice status.
          </p>
        </div>
      </div>

      <article className="panel">
        <div className="table-header">
          <strong>Employee workspaces</strong>
        </div>
        <div className="data-table">
          <div className="data-row data-row-head data-row-users">
            <span>User</span>
            <span>Role</span>
            <span>Job status</span>
            <span>Invoice status</span>
            <span>Updated</span>
            <span>Action</span>
          </div>
          {workspaces.map((workspace) => (
            <div className="data-row data-row-users" key={workspace.userId}>
              <span className="user-name-cell">
                <strong>{workspace.userName}</strong>
                <span>{workspace.userId}</span>
              </span>
              <span>{workspace.role}</span>
              <span>
                <span className={`badge ${statusBadgeMap[workspace.jobStatus] ?? "badge-blue"}`}>
                  {workspace.jobStatus}
                </span>
              </span>
              <span>
                <span className={`badge ${statusBadgeMap[workspace.invoiceStatus] ?? "badge-blue"}`}>
                  {workspace.invoiceStatus}
                </span>
              </span>
              <span>{new Date(workspace.updatedAt).toLocaleDateString()}</span>
              <span>
                <Link className="table-inline-btn" href={`/employee/${workspace.userId}`}>
                  Open app
                </Link>
              </span>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}