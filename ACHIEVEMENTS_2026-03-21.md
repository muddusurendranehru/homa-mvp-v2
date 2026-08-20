# Achievements — 2026-03-21

## New public pages (`web/app/`)

| Route | File | Summary |
|-------|------|---------|
| `/ddd` | `ddd/page.tsx` | D·D·D campaign: organ-damage headline, HOMA explained, door-to-door steps, WhatsApp 09963721999, app/site links, teal theme; minimal chrome on `/ddd` |
| `/products` | `products/page.tsx` | Five app cards with Try free → live tool URLs |
| `/packages` | `packages/page.tsx` | Five packages with WhatsApp enroll |
| `/portfolio` | `portfolio/page.tsx` | Dr. Muddu profile, stats, publications, apps, YouTube, contact |

## Navigation

- Footer Quick Links and MobileNav: D·D·D, Apps, Packages (`/packages`), Portfolio, Pricing (`/pricing`).
- WelcomeBot “Packages” → `/packages`.

## Fixes (stability)

- `layout.tsx`: corrected `ClerkProvider` / `AuthProvider` JSX nesting.
- `lib/auth-context.tsx`: single `login`, Clerk + legacy token/user, hooks and state complete.

## Repo tooling

- Root `package.json`: `npm run dev` forwards to `web` (and `dev:server` to `server`).

## Git

- Merged `origin/main` and pushed combined updates so GitHub includes new routes and fixes.
