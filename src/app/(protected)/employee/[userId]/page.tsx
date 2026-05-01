import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getAdminUserById } from "@/lib/admin-users";
import {
  createEmployeePhoto,
  createEmployeeJob,
  getEmployeeWorkspaceByUserId,
  getSharedEmployeePhotos,
  type EmployeePhotoType,
  type InvoiceStatus,
  type JobStatus,
  updateEmployeeJob,
  updateEmployeeWorkspace,
} from "@/lib/operations-db";

type EmployeeUserAppPageProps = {
  params: Promise<{
    userId: string;
  }>;
};

const jobStatusOptions: JobStatus[] = ["Scheduled", "In Progress", "Completed"];
const invoiceStatusOptions: InvoiceStatus[] = ["Draft", "Sent", "Paid", "Overdue"];
const photoTypeOptions: EmployeePhotoType[] = ["Before", "After", "Site"];

export default async function EmployeeUserAppPage({ params }: EmployeeUserAppPageProps) {
  const { userId } = await params;
  const user = getAdminUserById(userId);
  const workspaceData = getEmployeeWorkspaceByUserId(userId);
  const sharedPhotos = getSharedEmployeePhotos(30);

  if (!user || !workspaceData) {
    notFound();
  }

  async function saveWorkspaceAction(formData: FormData) {
    "use server";

    updateEmployeeWorkspace(userId, {
      accessDirections: String(formData.get("accessDirections") ?? ""),
      propertyNotes: String(formData.get("propertyNotes") ?? ""),
      gateCode: String(formData.get("gateCode") ?? ""),
    });

    revalidatePath(`/employee/${userId}`);
    revalidatePath("/employee");
    revalidatePath("/manager");
    revalidatePath("/manager/field-ops");
  }

  async function createJobAction(formData: FormData) {
    "use server";

    createEmployeeJob(userId, {
      clientName: String(formData.get("clientName") ?? "").trim() || user.name,
      serviceType: String(formData.get("serviceType") ?? "").trim() || "Service Call",
      jobStatus: (String(formData.get("jobStatus") ?? "Scheduled") as JobStatus) ?? "Scheduled",
      invoiceStatus:
        (String(formData.get("invoiceStatus") ?? "Draft") as InvoiceStatus) ?? "Draft",
      beforePhotoUrl: String(formData.get("beforePhotoUrl") ?? ""),
      afterPhotoUrl: String(formData.get("afterPhotoUrl") ?? ""),
      fieldNotes: String(formData.get("fieldNotes") ?? ""),
    });

    revalidatePath(`/employee/${userId}`);
    revalidatePath("/employee");
    revalidatePath("/manager");
    revalidatePath("/manager/field-ops");
  }

  async function updateJobAction(formData: FormData) {
    "use server";

    const jobId = Number(formData.get("jobId"));

    if (!Number.isFinite(jobId)) {
      return;
    }

    updateEmployeeJob(jobId, {
      jobStatus:
        (String(formData.get("jobStatus") ?? "Scheduled") as JobStatus) ?? "Scheduled",
      invoiceStatus:
        (String(formData.get("invoiceStatus") ?? "Draft") as InvoiceStatus) ?? "Draft",
      beforePhotoUrl: String(formData.get("beforePhotoUrl") ?? ""),
      afterPhotoUrl: String(formData.get("afterPhotoUrl") ?? ""),
      fieldNotes: String(formData.get("fieldNotes") ?? ""),
    });

    revalidatePath(`/employee/${userId}`);
    revalidatePath("/employee");
    revalidatePath("/manager");
    revalidatePath("/manager/field-ops");
  }

  async function addPhotoAction(formData: FormData) {
    "use server";

    const photoUrl = String(formData.get("photoUrl") ?? "").trim();

    if (!photoUrl) {
      return;
    }

    createEmployeePhoto(userId, {
      photoType:
        (String(formData.get("photoType") ?? "Site") as EmployeePhotoType) ?? "Site",
      photoUrl,
      caption: String(formData.get("caption") ?? "").trim(),
    });

    revalidatePath(`/employee/${userId}`);
    revalidatePath("/employee");
    revalidatePath("/manager");
    revalidatePath("/manager/field-ops");
  }

  return (
    <section className="page-stack employee-page">
      <div className="subsection-header panel">
        <div>
          <span className="eyebrow">Employee field app</span>
          <h1>{user.name}</h1>
          <p>
            Keep field execution details centralized: before/after photos, property
            access instructions, service notes, and job + invoice status.
          </p>
        </div>
        <div className="admin-user-header-actions">
          <Link className="ghost-link" href="/employee">
            Back to Field Apps
          </Link>
          <Link className="ghost-link" href={`/admin/users/${user.id}`}>
            Back to User
          </Link>
        </div>
      </div>

      <div className="employee-app-grid">
        <article className="panel">
          <strong>Client access profile</strong>
          <form action={saveWorkspaceAction} className="admin-form-grid employee-form-grid">
            <label className="admin-field" htmlFor="accessDirections">
              <span>Access directions</span>
              <textarea
                id="accessDirections"
                name="accessDirections"
                defaultValue={workspaceData.workspace.accessDirections}
                rows={4}
              />
            </label>
            <label className="admin-field" htmlFor="gateCode">
              <span>Gate code / entry details</span>
              <input
                id="gateCode"
                name="gateCode"
                defaultValue={workspaceData.workspace.gateCode}
                type="text"
              />
            </label>
            <label className="admin-field admin-field-full" htmlFor="propertyNotes">
              <span>Property notes</span>
              <textarea
                id="propertyNotes"
                name="propertyNotes"
                defaultValue={workspaceData.workspace.propertyNotes}
                rows={5}
              />
            </label>
            <div className="admin-action-row">
              <button className="table-action-btn" type="submit">
                Save access profile
              </button>
            </div>
          </form>
        </article>

        <article className="panel">
          <strong>Add field record</strong>
          <form action={createJobAction} className="admin-form-grid employee-form-grid">
            <label className="admin-field" htmlFor="clientName">
              <span>Client name</span>
              <input id="clientName" name="clientName" type="text" defaultValue={user.name} />
            </label>
            <label className="admin-field" htmlFor="serviceType">
              <span>Service type</span>
              <input id="serviceType" name="serviceType" type="text" placeholder="Lawn cleanup" />
            </label>
            <label className="admin-field" htmlFor="jobStatus">
              <span>Job status</span>
              <select id="jobStatus" name="jobStatus" defaultValue="Scheduled">
                {jobStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-field" htmlFor="invoiceStatus">
              <span>Invoice status</span>
              <select id="invoiceStatus" name="invoiceStatus" defaultValue="Draft">
                {invoiceStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-field" htmlFor="beforePhotoUrl">
              <span>Before photo URL</span>
              <input id="beforePhotoUrl" name="beforePhotoUrl" type="url" placeholder="https://..." />
            </label>
            <label className="admin-field" htmlFor="afterPhotoUrl">
              <span>After photo URL</span>
              <input id="afterPhotoUrl" name="afterPhotoUrl" type="url" placeholder="https://..." />
            </label>
            <label className="admin-field admin-field-full" htmlFor="fieldNotes">
              <span>Field notes</span>
              <textarea id="fieldNotes" name="fieldNotes" rows={4} />
            </label>
            <div className="admin-action-row">
              <button className="table-action-btn" type="submit">
                Add record
              </button>
            </div>
          </form>
        </article>
      </div>

      <article className="panel">
        <div className="table-header">
          <strong>Job and invoice records</strong>
        </div>
        <div className="employee-record-list">
          {workspaceData.jobs.map((job) => (
            <form action={updateJobAction} className="employee-record-card" key={job.id}>
              <input type="hidden" name="jobId" value={job.id} />
              <div className="employee-record-header">
                <strong>{job.clientName}</strong>
                <span className="data-id">Record #{job.id}</span>
              </div>

              <div className="admin-form-grid employee-form-grid">
                <label className="admin-field">
                  <span>Job status</span>
                  <select name="jobStatus" defaultValue={job.jobStatus}>
                    {jobStatusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="admin-field">
                  <span>Invoice status</span>
                  <select name="invoiceStatus" defaultValue={job.invoiceStatus}>
                    {invoiceStatusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="admin-field">
                  <span>Before photo URL</span>
                  <input name="beforePhotoUrl" type="url" defaultValue={job.beforePhotoUrl} />
                </label>
                <label className="admin-field">
                  <span>After photo URL</span>
                  <input name="afterPhotoUrl" type="url" defaultValue={job.afterPhotoUrl} />
                </label>
                <label className="admin-field admin-field-full">
                  <span>Field notes</span>
                  <textarea name="fieldNotes" rows={4} defaultValue={job.fieldNotes} />
                </label>
              </div>

              <div className="admin-action-row">
                <button className="table-action-btn" type="submit">
                  Save record
                </button>
                {job.beforePhotoUrl && (
                  <a className="table-inline-btn" href={job.beforePhotoUrl} target="_blank" rel="noreferrer">
                    View before
                  </a>
                )}
                {job.afterPhotoUrl && (
                  <a className="table-inline-btn" href={job.afterPhotoUrl} target="_blank" rel="noreferrer">
                    View after
                  </a>
                )}
              </div>
            </form>
          ))}
        </div>
      </article>

      <article className="panel">
        <div className="table-header">
          <strong>Photo hub</strong>
        </div>

        <div className="employee-photo-card-grid">
          <form action={addPhotoAction} className="admin-form-grid employee-form-grid">
            <label className="admin-field" htmlFor="photoType">
              <span>Photo type</span>
              <select id="photoType" name="photoType" defaultValue="Site">
                {photoTypeOptions.map((photoType) => (
                  <option key={photoType} value={photoType}>
                    {photoType}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-field admin-field-full" htmlFor="photoUrl">
              <span>Photo URL</span>
              <input id="photoUrl" name="photoUrl" type="url" placeholder="https://..." required />
            </label>
            <label className="admin-field admin-field-full" htmlFor="caption">
              <span>Caption / notes</span>
              <textarea id="caption" name="caption" rows={3} placeholder="Front bed cleanup complete." />
            </label>
            <div className="admin-action-row">
              <button className="table-action-btn" type="submit">
                Add photo
              </button>
            </div>
          </form>

          <div className="employee-photo-gallery">
            {sharedPhotos.length === 0 && (
              <p className="form-hint">No photos uploaded yet.</p>
            )}
            {sharedPhotos.map((photo) => (
              <article className="employee-photo-item" key={photo.id}>
                <a
                  className="employee-photo-thumb"
                  href={photo.photoUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ backgroundImage: `url(${photo.photoUrl})` }}
                  aria-label={`Open photo by ${photo.uploadedByName}`}
                />
                <div className="employee-photo-meta">
                  <span className="badge badge-blue">{photo.photoType}</span>
                  <strong>{photo.uploadedByName}</strong>
                  <p>{photo.caption || "No caption provided."}</p>
                  <span className="data-id">{new Date(photo.createdAt).toLocaleString()}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}