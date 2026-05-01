# Freedom Site

Next.js 16 App Router starter with route groups, nested layouts, and secure SSO-based protected routes.

## Included

- Marketing pages in `src/app/(marketing)`
- Auth page in `src/app/(auth)`
- Protected dashboard and account areas in `src/app/(protected)`
- Nested projects routes at `src/app/(protected)/dashboard/projects`
- NextAuth SSO providers for Google, Microsoft (Azure AD), and GitHub
- Branded provider login buttons on `/login`
- Custom OAuth callback failure page at `/auth/error`
- Auth route handler in `src/app/api/auth/[...nextauth]/route.ts`

## Run locally

1. Copy `.env.example` to `.env.local` and fill all provider credentials.
2. Install dependencies and run the app.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## SSO flow

1. Visit `/login`
2. Choose Google, Microsoft, or GitHub
3. Complete OAuth consent/login
4. Open `/dashboard`, `/studio`, `/insights`, or `/account/settings`
5. Use the sign out button to end the session

## Environment variables

Set these in `.env.local`:

- `NEXTAUTH_URL` (for local dev: `http://localhost:3000`)
- `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32` or any strong random secret)
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `AZURE_AD_CLIENT_ID`
- `AZURE_AD_CLIENT_SECRET`
- `AZURE_AD_TENANT_ID` (optional, defaults to `common`)
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

## Route map

```text
/
/about
/login
/auth/error
/dashboard
/dashboard/projects
/dashboard/projects/[projectId]
/studio
/insights
/account/settings
```
