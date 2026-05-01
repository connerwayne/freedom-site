import Link from "next/link";

import { adminUsers, userRoleColors, userStatusColors } from "@/lib/admin-users";

const jobQueue = [
  { id: "J-1041", client: "Martha Henson", service: "Lawn Maintenance", date: "May 3", status: "Scheduled" },
  { id: "J-1042", client: "Ray Kowalski", service: "Spring Cleanup", date: "May 5", status: "Scheduled" },
  { id: "J-1043", client: "Tom & Lisa Park", service: "Mulch Install", date: "May 6", status: "Pending" },
  { id: "J-1044", client: "Grace Abernathy", service: "Hedge Trimming", date: "Apr 28", status: "Completed" },
];

const invoices = [
  { id: "INV-221", client: "Grace Abernathy", amount: "$185", due: "May 7", status: "Unpaid" },
  { id: "INV-220", client: "Ray Kowalski", amount: "$320", due: "May 10", status: "Unpaid" },
  { id: "INV-219", client: "Martha Henson", amount: "$140", due: "Apr 30", status: "Paid" },
];

const statusColors: Record<string, string> = {
  Scheduled: "badge-blue",
  Pending: "badge-yellow",
  Completed: "badge-green",
  Paid: "badge-green",
  Unpaid: "badge-yellow",
};

export default function AdminPage() {
  return (
    <section className="page-stack">
      <div className="app-header">
        <div>
          <span className="eyebrow">Owner access</span>
          <h1>Admin</h1>
          <p>Manage jobs, clients, and invoices for Freedom Landscaping.</p>
        </div>
      </div>

      <div className="admin-metrics">
        <article className="metric-card">
          <strong>Jobs this week</strong>
          <span className="metric-value">4</span>
        </article>
        <article className="metric-card">
          <strong>Open invoices</strong>
          <span className="metric-value">2</span>
        </article>
        <article className="metric-card">
          <strong>Unpaid total</strong>
          <span className="metric-value">$505</span>
        </article>
      </div>

      {/* Job queue */}
      <article className="panel">
        <div className="table-header">
          <strong>Upcoming jobs</strong>
          <button className="table-action-btn">+ New job</button>
        </div>
        <div className="data-table">
          <div className="data-row data-row-head">
            <span>Job ID</span>
            <span>Client</span>
            <span>Service</span>
            <span>Date</span>
            <span>Status</span>
          </div>
          {jobQueue.map((job) => (
            <div className="data-row" key={job.id}>
              <span className="data-id">{job.id}</span>
              <span>{job.client}</span>
              <span>{job.service}</span>
              <span>{job.date}</span>
              <span><span className={`badge ${statusColors[job.status]}`}>{job.status}</span></span>
            </div>
          ))}
        </div>
      </article>

      {/* Invoices */}
      <article className="panel">
        <div className="table-header">
          <strong>Invoices</strong>
          <button className="table-action-btn">+ New invoice</button>
        </div>
        <div className="data-table">
          <div className="data-row data-row-head">
            <span>Invoice</span>
            <span>Client</span>
            <span>Amount</span>
            <span>Due</span>
            <span>Status</span>
          </div>
          {invoices.map((inv) => (
            <div className="data-row" key={inv.id}>
              <span className="data-id">{inv.id}</span>
              <span>{inv.client}</span>
              <span>{inv.amount}</span>
              <span>{inv.due}</span>
              <span><span className={`badge ${statusColors[inv.status]}`}>{inv.status}</span></span>
            </div>
          ))}
        </div>
      </article>

      {/* User management */}
      <article className="panel">
        <div className="table-header">
          <strong>User management</strong>
          <button className="table-action-btn">+ Invite user</button>
        </div>
        <div className="data-table">
          <div className="data-row data-row-head data-row-users">
            <span>User</span>
            <span>Email</span>
            <span>Role</span>
            <span>Status</span>
            <span>Last active</span>
            <span>Action</span>
          </div>
          {adminUsers.map((user) => (
            <div className="data-row data-row-users" key={user.id}>
              <span className="user-name-cell">
                <strong>{user.name}</strong>
                <span>{user.id}</span>
              </span>
              <span>{user.email}</span>
              <span>
                <span className={`badge ${userRoleColors[user.role]}`}>{user.role}</span>
              </span>
              <span>
                <span className={`badge ${userStatusColors[user.status]}`}>{user.status}</span>
              </span>
              <span>{user.lastActive}</span>
              <span>
                <Link className="table-inline-btn" href={`/admin/users/${user.id}`}>
                  Manage
                </Link>
              </span>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
