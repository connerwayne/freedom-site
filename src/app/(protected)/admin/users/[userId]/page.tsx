import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getAdminUserById,
  userRoleColors,
  userStatusColors,
  type AdminUserRole,
  type AdminUserStatus,
} from "@/lib/admin-users";

type AdminUserDetailPageProps = {
  params: Promise<{
    userId: string;
  }>;
};

const roleOptions: AdminUserRole[] = ["Admin", "Manager", "Client"];
const statusOptions: AdminUserStatus[] = ["Active", "Invited", "Suspended"];

export default async function AdminUserDetailPage({ params }: AdminUserDetailPageProps) {
  const { userId } = await params;
  const user = getAdminUserById(userId);

  if (!user) {
    notFound();
  }

  const isInvitePending = user.status === "Invited";

  return (
    <section className="page-stack">
      <div className="subsection-header panel">
        <div>
          <span className="eyebrow">Admin user management</span>
          <h1>{user.name}</h1>
          <p>Manage role access, account status, invite state, and user-level admin controls.</p>
        </div>
        <div className="admin-user-header-actions">
          <Link className="primary-link" href={`/employee/${user.id}`}>
            Open Field App
          </Link>
          <Link className="ghost-link" href="/admin">
            Back to Admin
          </Link>
        </div>
      </div>

      <div className="admin-user-grid">
        <article className="panel admin-user-profile">
          <strong>User profile</strong>

          <dl className="admin-user-meta">
            <div>
              <dt>User ID</dt>
              <dd className="data-id">{user.id}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{user.phone}</dd>
            </div>
            <div>
              <dt>Joined</dt>
              <dd>{user.joined}</dd>
            </div>
            <div>
              <dt>Last active</dt>
              <dd>{user.lastActive}</dd>
            </div>
          </dl>

          <div className="admin-user-badges">
            <span className={`badge ${userRoleColors[user.role]}`}>{user.role}</span>
            <span className={`badge ${userStatusColors[user.status]}`}>{user.status}</span>
          </div>

          <p className="admin-user-notes">{user.notes}</p>
        </article>

        <article className="panel">
          <strong>Access and account controls</strong>

          <div className="admin-form-grid">
            <label className="admin-field" htmlFor="role">
              <span>Role</span>
              <select id="role" defaultValue={user.role}>
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>

            <label className="admin-field" htmlFor="status">
              <span>Status</span>
              <select id="status" defaultValue={user.status}>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="admin-action-row">
            <button className="table-action-btn" type="button">
              Save changes
            </button>
            <button className="table-inline-btn" type="button">
              Reset password
            </button>
            {isInvitePending && (
              <button className="table-inline-btn" type="button">
                Resend invite
              </button>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}