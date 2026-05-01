import fs from "node:fs";
import path from "node:path";

import Database from "better-sqlite3";

import { adminUsers, getAdminUserById } from "@/lib/admin-users";

export type JobStatus = "Scheduled" | "In Progress" | "Completed";
export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue";

export type EmployeeWorkspace = {
  userId: string;
  accessDirections: string;
  propertyNotes: string;
  gateCode: string;
  updatedAt: string;
};

export type EmployeeJobRecord = {
  id: number;
  userId: string;
  clientName: string;
  serviceType: string;
  jobStatus: JobStatus;
  invoiceStatus: InvoiceStatus;
  invoiceAmountCents: number;
  invoiceDueDate: string;
  collectionStage: string;
  beforePhotoUrl: string;
  afterPhotoUrl: string;
  fieldNotes: string;
  updatedAt: string;
};

export type EmployeePhotoType = "Before" | "After" | "Site";

export type EmployeePhotoRecord = {
  id: number;
  userId: string;
  uploadedByName: string;
  photoType: EmployeePhotoType;
  photoUrl: string;
  caption: string;
  createdAt: string;
};

type RawWorkspaceRow = {
  user_id: string;
  access_directions: string;
  property_notes: string;
  gate_code: string;
  updated_at: string;
};

type RawJobRow = {
  id: number;
  user_id: string;
  client_name: string;
  service_type: string;
  job_status: JobStatus;
  invoice_status: InvoiceStatus;
  invoice_amount_cents: number;
  invoice_due_date: string;
  collection_stage: string;
  before_photo_url: string;
  after_photo_url: string;
  field_notes: string;
  updated_at: string;
};

type RawPhotoRow = {
  id: number;
  user_id: string;
  photo_type: EmployeePhotoType;
  photo_url: string;
  caption: string;
  created_at: string;
};

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "operations.sqlite");

let db: Database.Database | null = null;

function nowIso() {
  return new Date().toISOString();
}

function centsToCurrency(cents: number) {
  return `$${(cents / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function addDaysIso(days: number) {
  const value = new Date();
  value.setDate(value.getDate() + days);
  return value.toISOString();
}

function ensureEmployeeJobsColumns(database: Database.Database) {
  const columns = database
    .prepare("PRAGMA table_info(employee_jobs)")
    .all() as Array<{ name: string }>;
  const columnSet = new Set(columns.map((column) => column.name));

  if (!columnSet.has("invoice_amount_cents")) {
    database.exec("ALTER TABLE employee_jobs ADD COLUMN invoice_amount_cents INTEGER NOT NULL DEFAULT 0");
  }

  if (!columnSet.has("invoice_due_date")) {
    database.exec("ALTER TABLE employee_jobs ADD COLUMN invoice_due_date TEXT NOT NULL DEFAULT ''");
  }

  if (!columnSet.has("collection_stage")) {
    database.exec("ALTER TABLE employee_jobs ADD COLUMN collection_stage TEXT NOT NULL DEFAULT ''");
  }
}

function getDb() {
  if (db) {
    return db;
  }

  fs.mkdirSync(dataDir, { recursive: true });

  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS employee_workspaces (
      user_id TEXT PRIMARY KEY,
      access_directions TEXT NOT NULL DEFAULT '',
      property_notes TEXT NOT NULL DEFAULT '',
      gate_code TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS employee_jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      client_name TEXT NOT NULL,
      service_type TEXT NOT NULL,
      job_status TEXT NOT NULL,
      invoice_status TEXT NOT NULL,
      invoice_amount_cents INTEGER NOT NULL DEFAULT 0,
      invoice_due_date TEXT NOT NULL DEFAULT '',
      collection_stage TEXT NOT NULL DEFAULT '',
      before_photo_url TEXT NOT NULL DEFAULT '',
      after_photo_url TEXT NOT NULL DEFAULT '',
      field_notes TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS employee_photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      photo_type TEXT NOT NULL,
      photo_url TEXT NOT NULL,
      caption TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL
    );
  `);

  ensureEmployeeJobsColumns(db);

  seedDbIfEmpty(db);

  return db;
}

function seedDbIfEmpty(database: Database.Database) {
  const workspaceCount = database
    .prepare("SELECT COUNT(*) AS count FROM employee_workspaces")
    .get() as { count: number };

  if (workspaceCount.count > 0) {
    return;
  }

  const insertWorkspace = database.prepare(
    `INSERT INTO employee_workspaces (user_id, access_directions, property_notes, gate_code, updated_at)
     VALUES (?, ?, ?, ?, ?)`,
  );

  const insertJob = database.prepare(
     `INSERT INTO employee_jobs (user_id, client_name, service_type, job_status, invoice_status, invoice_amount_cents, invoice_due_date, collection_stage, before_photo_url, after_photo_url, field_notes, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );

  const transaction = database.transaction(() => {
    for (const user of adminUsers) {
      const joinedAt = nowIso();

      insertWorkspace.run(
        user.id,
        "Park by the driveway gate and use side-path entry.",
        "Watch for sprinkler heads near front beds.",
        "Gate code: 2042",
        joinedAt,
      );

      insertJob.run(
        user.id,
        user.name,
        "Lawn Maintenance",
        "Scheduled",
        "Draft",
        18500,
        addDaysIso(7),
        "Reminder scheduled",
        "",
        "",
        "Initial setup job created from admin user profile.",
        joinedAt,
      );
    }
  });

  transaction();
}

function mapWorkspace(row: RawWorkspaceRow): EmployeeWorkspace {
  return {
    userId: row.user_id,
    accessDirections: row.access_directions,
    propertyNotes: row.property_notes,
    gateCode: row.gate_code,
    updatedAt: row.updated_at,
  };
}

function mapJob(row: RawJobRow): EmployeeJobRecord {
  return {
    id: row.id,
    userId: row.user_id,
    clientName: row.client_name,
    serviceType: row.service_type,
    jobStatus: row.job_status,
    invoiceStatus: row.invoice_status,
    invoiceAmountCents: row.invoice_amount_cents,
    invoiceDueDate: row.invoice_due_date,
    collectionStage: row.collection_stage,
    beforePhotoUrl: row.before_photo_url,
    afterPhotoUrl: row.after_photo_url,
    fieldNotes: row.field_notes,
    updatedAt: row.updated_at,
  };
}

function mapPhoto(row: RawPhotoRow): EmployeePhotoRecord {
  const user = getAdminUserById(row.user_id);

  return {
    id: row.id,
    userId: row.user_id,
    uploadedByName: user?.name ?? row.user_id,
    photoType: row.photo_type,
    photoUrl: row.photo_url,
    caption: row.caption,
    createdAt: row.created_at,
  };
}

export function getEmployeeWorkspaceByUserId(userId: string) {
  const database = getDb();

  const workspaceRow = database
    .prepare(
      `SELECT user_id, access_directions, property_notes, gate_code, updated_at
       FROM employee_workspaces
       WHERE user_id = ?`,
    )
    .get(userId) as RawWorkspaceRow | undefined;

  const jobRows = database
    .prepare(
      `SELECT id, user_id, client_name, service_type, job_status, invoice_status, invoice_amount_cents, invoice_due_date, collection_stage, before_photo_url, after_photo_url, field_notes, updated_at
       FROM employee_jobs
       WHERE user_id = ?
       ORDER BY id DESC`,
    )
    .all(userId) as RawJobRow[];

  if (!workspaceRow) {
    return null;
  }

  return {
    workspace: mapWorkspace(workspaceRow),
    jobs: jobRows.map(mapJob),
  };
}

export function getEmployeeWorkspaceOverview() {
  const database = getDb();

  const rows = database
    .prepare(
      `SELECT w.user_id, w.updated_at, j.job_status, j.invoice_status
       FROM employee_workspaces w
       LEFT JOIN employee_jobs j ON j.id = (
         SELECT id FROM employee_jobs ej
         WHERE ej.user_id = w.user_id
         ORDER BY id DESC
         LIMIT 1
       )
       ORDER BY w.user_id ASC`,
    )
    .all() as Array<{
    user_id: string;
    updated_at: string;
    job_status: JobStatus | null;
    invoice_status: InvoiceStatus | null;
  }>;

  return rows.map((row) => {
    const user = getAdminUserById(row.user_id);

    return {
      userId: row.user_id,
      userName: user?.name ?? row.user_id,
      role: user?.role ?? "Client",
      updatedAt: row.updated_at,
      jobStatus: row.job_status ?? "Scheduled",
      invoiceStatus: row.invoice_status ?? "Draft",
    };
  });
}

export function updateEmployeeWorkspace(
  userId: string,
  payload: {
    accessDirections: string;
    propertyNotes: string;
    gateCode: string;
  },
) {
  const database = getDb();

  database
    .prepare(
      `UPDATE employee_workspaces
       SET access_directions = ?, property_notes = ?, gate_code = ?, updated_at = ?
       WHERE user_id = ?`,
    )
    .run(
      payload.accessDirections,
      payload.propertyNotes,
      payload.gateCode,
      nowIso(),
      userId,
    );
}

export function createEmployeeJob(
  userId: string,
  payload: {
    clientName: string;
    serviceType: string;
    jobStatus: JobStatus;
    invoiceStatus: InvoiceStatus;
    invoiceAmountCents?: number;
    invoiceDueDate?: string;
    collectionStage?: string;
    beforePhotoUrl: string;
    afterPhotoUrl: string;
    fieldNotes: string;
  },
) {
  const database = getDb();

  database
    .prepare(
      `INSERT INTO employee_jobs (user_id, client_name, service_type, job_status, invoice_status, invoice_amount_cents, invoice_due_date, collection_stage, before_photo_url, after_photo_url, field_notes, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      userId,
      payload.clientName,
      payload.serviceType,
      payload.jobStatus,
      payload.invoiceStatus,
      payload.invoiceAmountCents ?? 0,
      payload.invoiceDueDate ?? addDaysIso(7),
      payload.collectionStage ?? "Reminder scheduled",
      payload.beforePhotoUrl,
      payload.afterPhotoUrl,
      payload.fieldNotes,
      nowIso(),
    );
}

export function updateEmployeeJob(
  jobId: number,
  payload: {
    jobStatus: JobStatus;
    invoiceStatus: InvoiceStatus;
    invoiceAmountCents?: number;
    invoiceDueDate?: string;
    collectionStage?: string;
    beforePhotoUrl: string;
    afterPhotoUrl: string;
    fieldNotes: string;
  },
) {
  const database = getDb();

  database
    .prepare(
      `UPDATE employee_jobs
       SET job_status = ?, invoice_status = ?, invoice_amount_cents = COALESCE(?, invoice_amount_cents), invoice_due_date = COALESCE(?, invoice_due_date), collection_stage = COALESCE(?, collection_stage), before_photo_url = ?, after_photo_url = ?, field_notes = ?, updated_at = ?
       WHERE id = ?`,
    )
    .run(
      payload.jobStatus,
      payload.invoiceStatus,
      payload.invoiceAmountCents,
      payload.invoiceDueDate,
      payload.collectionStage,
      payload.beforePhotoUrl,
      payload.afterPhotoUrl,
      payload.fieldNotes,
      nowIso(),
      jobId,
    );
}

export function getAccountingDashboardData() {
  const database = getDb();

  const latestInvoiceRows = database
    .prepare(
      `SELECT j.id, j.user_id, j.client_name, j.invoice_amount_cents, j.invoice_due_date, j.invoice_status, j.collection_stage
       FROM employee_jobs j
       WHERE j.id IN (
         SELECT MAX(id)
         FROM employee_jobs
         GROUP BY user_id
       )
       ORDER BY j.id DESC`,
    )
    .all() as Array<{
    id: number;
    user_id: string;
    client_name: string;
    invoice_amount_cents: number;
    invoice_due_date: string;
    invoice_status: InvoiceStatus;
    collection_stage: string;
  }>;

  const receivables = latestInvoiceRows.map((row) => {
    const dueDate = row.invoice_due_date ? new Date(row.invoice_due_date) : null;
    const daysLate =
      dueDate && Number.isFinite(dueDate.getTime())
        ? Math.max(
            0,
            Math.floor((Date.now() - dueDate.getTime()) / (1000 * 60 * 60 * 24)),
          )
        : 0;

    return {
      userId: row.user_id,
      client: row.client_name,
      amountCents: row.invoice_amount_cents,
      amount: centsToCurrency(row.invoice_amount_cents),
      due: dueDate ? dueDate.toLocaleDateString() : "N/A",
      daysLate,
      status: row.invoice_status,
      stage: row.collection_stage || "Review",
    };
  });

  const outstandingStatuses: InvoiceStatus[] = ["Draft", "Sent", "Overdue"];
  const outstandingTotalCents = receivables
    .filter((row) => outstandingStatuses.includes(row.status))
    .reduce((sum, row) => sum + row.amountCents, 0);
  const overdue15TotalCents = receivables
    .filter((row) => row.status === "Overdue" && row.daysLate >= 15)
    .reduce((sum, row) => sum + row.amountCents, 0);

  const paidInvoiceRows = database
    .prepare(
      `SELECT invoice_amount_cents
       FROM employee_jobs
       WHERE invoice_status = 'Paid'`,
    )
    .all() as Array<{ invoice_amount_cents: number }>;

  const paidTotalCents = paidInvoiceRows.reduce(
    (sum, row) => sum + row.invoice_amount_cents,
    0,
  );
  const taxReserveCents = Math.round(paidTotalCents * 0.26);

  return {
    receivables,
    summary: {
      outstandingTotalCents,
      outstandingTotal: centsToCurrency(outstandingTotalCents),
      overdue15TotalCents,
      overdue15Total: centsToCurrency(overdue15TotalCents),
      taxReserveCents,
      taxReserve: centsToCurrency(taxReserveCents),
    },
  };
}

export function getSharedEmployeePhotos(limit = 20) {
  const database = getDb();

  const rows = database
    .prepare(
      `SELECT id, user_id, photo_type, photo_url, caption, created_at
       FROM employee_photos
       ORDER BY id DESC
       LIMIT ?`,
    )
    .all(limit) as RawPhotoRow[];

  return rows.map(mapPhoto);
}

export function createEmployeePhoto(
  userId: string,
  payload: {
    photoType: EmployeePhotoType;
    photoUrl: string;
    caption: string;
  },
) {
  const database = getDb();

  database
    .prepare(
      `INSERT INTO employee_photos (user_id, photo_type, photo_url, caption, created_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .run(userId, payload.photoType, payload.photoUrl, payload.caption, nowIso());
}