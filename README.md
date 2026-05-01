# Freedom Site

Next.js 16 App Router starter with route groups, nested layouts, and a simple protected-route scaffold.

## Included

- Marketing pages in `src/app/(marketing)`
- Auth page in `src/app/(auth)`
- Protected dashboard and account areas in `src/app/(protected)`
- Nested projects routes at `src/app/(protected)/dashboard/projects`
- Cookie-based demo session helpers in `src/lib/auth.ts`
- Login and logout route handlers in `src/app/api/auth`

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Demo flow

1. Visit `/login`
2. Submit the form to create a demo session cookie
3. Open `/dashboard` or `/account/settings`
4. Use the sign out button to clear the session

## Route map

```text
/
/about
/login
/dashboard
/dashboard/projects
/dashboard/projects/[projectId]
/account/settings
```
