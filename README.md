# Freedom Site

Freedom Site is a multi-role landscaping operations platform built with Next.js 16, App Router, and NextAuth.

It includes:

- Public marketing pages for the business website
- Auth and role-aware protected areas
- Admin, Manager, Client, Employee Field App, and Accounting workflows
- Database-backed operations records (jobs, invoice states, access notes, photos)

## Product areas by role

### Admin area

Primary route: /admin

Purpose:

- Run owner-level operations
- Manage jobs and invoices at a high level
- Manage users and role/status access

Key pages:

- /admin: jobs, invoices, user management table
- /admin/users/[userId]: user profile, role/status controls, account actions, direct link to field app

### Manager area (Operations Suite)

Primary route: /manager

Purpose:

- Manage day-to-day business execution
- Coordinate CRM, finance, scheduling, field operations, and growth

Manager tabs:

- Overview: /manager
- CRM: /manager/crm
- Finance: /manager/finance
- Accounting: /accounting (alias to /manager/accounting)
- Scheduling: /manager/scheduling
- Field Ops: /manager/field-ops
- Growth: /manager/growth

Accounting page scope:

- Outstanding balances
- Debt collection workflow stages
- Tax reserve and compliance checklist
- Database-driven metrics and receivables

### Client (User) area

Primary route: /portal

Purpose:

- Let clients view invoices and balances
- View service schedule and account data
- Access billing and support details

### Employee Field App

Primary routes:

- /employee
- /employee/[userId]

Purpose:

- Capture field execution details per employee/user workspace
- Store client access directions, gate codes, and property notes
- Track job status and invoice status updates
- Add and view before/after/site photos uploaded by all employees

## How authentication and access work

Auth stack:

- NextAuth with Google, Microsoft (Azure AD), and GitHub
- Dev bypass roles: Admin, Manager, Client (development only)

Role-aware behavior:

- Users are assigned role in auth callbacks and session
- Middleware enforces route access by role
- Sidebar web apps and workspace links are filtered by role
- Login redirects to role-appropriate default destination

## Database and operations records

The app uses SQLite through better-sqlite3.

Local database file:

- data/operations.sqlite

Core operations tables include:

- employee_workspaces
	- user_id
	- access_directions
	- property_notes
	- gate_code
	- updated_at
- employee_jobs
	- user_id
	- client_name
	- service_type
	- job_status
	- invoice_status
	- invoice_amount_cents
	- invoice_due_date
	- collection_stage
	- before_photo_url
	- after_photo_url
	- field_notes
	- updated_at
- employee_photos
	- user_id
	- photo_type
	- photo_url
	- caption
	- created_at

Notes:

- The DB initializes lazily on first use.
- Tables are created automatically if missing.
- Seed data is inserted when the workspace table is empty.
- Accounting metrics are computed from latest invoice records per user.

## Theme behavior

- Auto mode follows system preference on first load
- Users can switch between Auto, Light, and Dark
- Theme preference is persisted in local storage
- Theme toggles are available in marketing, auth, and protected surfaces

## Run locally

1. Configure environment values in .env.local.
2. Install dependencies.
3. Start development server.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Environment variables

Set these in .env.local:

- NEXTAUTH_URL (local: http://localhost:3000)
- NEXTAUTH_SECRET
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- AZURE_AD_CLIENT_ID
- AZURE_AD_CLIENT_SECRET
- AZURE_AD_TENANT_ID (optional; defaults to common)
- GITHUB_CLIENT_ID
- GITHUB_CLIENT_SECRET

## Route map

Public and auth:

- /
- /about
- /login
- /auth/error

Protected apps:

- /dashboard
- /dashboard/projects
- /dashboard/projects/[projectId]
- /studio
- /insights
- /admin
- /admin/users/[userId]
- /manager
- /manager/crm
- /manager/finance
- /manager/accounting
- /manager/scheduling
- /manager/field-ops
- /manager/growth
- /accounting (redirects to /manager/accounting)
- /employee
- /employee/[userId]
- /portal
- /account/settings
