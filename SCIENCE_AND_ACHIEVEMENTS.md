# Science of Our App & What We Achieved

**Dr. Muddu Surendra Nehru M.D. • Professor of Medicine • Senior Physician • World's First Physician to Develop AI-Based Web App for Nutrition, Health Metrics, Drug Trials**

**Engineering architecture (stack, Clerk, DB, scaling):** see `SCIENCE_OF_THE_MVP.md` — edit that file as the MVP evolves.

---

## 1. Tech stack & architecture

| Layer | Technology | Role |
|-------|------------|------|
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS | SEO-friendly pages, calculators, auth UI, dashboard |
| **Backend** | Node.js, Express | REST API, JWT auth, business logic |
| **Database** | Neon PostgreSQL | Users, assessments, persistent data |
| **Deploy** | Render | Frontend + backend; env-based config |
| **Auth** | **Clerk** (Next.js) + Express JWT routes where used | Sign-in/sign-up UI, protected routes; API can use Bearer token from storage |

**Data flow:** Browser → Next.js (web) → Express API (server) → Neon Postgres. No DB access from frontend; all data via backend APIs.

**High-level tree:**

```
DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION/
├── web/                    # Next.js frontend
│   ├── app/                # App Router: pages, auth, dashboard, conditions, tools
│   ├── components/         # Shared UI (hero, conversion, gallery, etc.)
│   ├── lib/                # api.ts, auth-context
│   └── public/             # Static assets, images, PWA
├── server/                 # Express backend
│   ├── server.js           # Entry, routes, middleware
│   ├── config/database.js  # Neon connection (`pg` pool)
│   ├── routes/             # auth, assessments, nutribot, gallery
│   └── .env                # DATABASE_URL, JWT_SECRET, PORT
└── SCIENCE_AND_ACHIEVEMENTS.md (this file)
```

---

## 2. Science of the app

- **Metabolic-first care:** HOMA-IR, TyG index, waist-to-height ratio (WHtR), waist-to-hip ratio (WHR) as core metrics for insulin resistance and cardiovascular risk.
- **Free, no-signup calculators:** Public tools for metabolic risk (e.g. “Free Metabolic Heart Diabetes Risk Check – No Cost, No Signup”) to lower friction and spread evidence-based metrics.
- **Structured assessments:** User sign-up → assessment flow → stored in DB; supports follow-up, reports, and remission tracking (e.g. 85% remission rate messaging).
- **Evidence-based messaging:** 30+ years experience, Professor of Medicine, outcomes since 2000; trusted by patients from ISB, IIIT, families near IKEA Gachibowli; appreciated by Megastar Chiranjeevi.
- **AI health app pioneer:** Positioned as world’s first physician-developed AI-based web app for nutrition, health metrics, and drug trials—aligning with the “World's First AI Health App Pioneer” tagline.

---

## 3. What we achieved

### Verified in the browser (March 2026)

- **Clerk authentication is live:** Google sign-in (and Clerk-hosted sign-in UI) loads correctly—“Sign in” / “to continue to Clerk,” email or phone field, Next, Create account, privacy and terms links. That confirms Next.js is serving the app, Clerk keys and components are wired, and the auth redirect path is working for protected experiences.
- **HOMA Healthcare marketing hero is live:** Navy and gold brand header with HOMA logo; **Professor of Medicine • 32 Years**; **Founder & CEO, HOMA Healthcare Center**; achievement lines (**Healthcare AI Pioneer**, **Published Researcher**, **2 Indexed Papers 2026**, **Creator of India’s first Door to Door Diabetes Delivery system**); CTAs **CHECK YOUR RISK FREE**, **VIEW RESEARCH**; **GET IN TOUCH** and hamburger menu; YouTube, Facebook, and Instagram links—aligned with the clinic’s positioning and conversion goals.

### Engineering & documentation

- **Living engineering spec:** `SCIENCE_OF_THE_MVP.md` describes the split stack (Next.js + Express + Postgres), optional GitHub/Render, Clerk vs backend JWT, raw `pg`, and local run notes—editable as the MVP grows.
- **Cursor guardrails:** `.cursor/rules/protected-files.mdc` records files and areas to avoid changing without approval (middleware, env, DB pool cap, etc.) and safe edit zones (e.g. portfolio, blog, tools, `public/`).
- **Static portfolio page:** `portfolio.html` copied to `web/public/portfolio.html` so it is available at `/portfolio.html` alongside the Next app.
- **Local dev proven:** `npm install` + `npm run dev` in `server/` and `web/` succeeds; `GET /api/health` returns OK; Next.js 15 dev server on port **3003** serves the homepage (**200**). On Windows PowerShell, refreshing `PATH` (or restarting the terminal after Node install) fixes `npm` not recognized; do not paste the `PS …>` prompt text as a command.

### Earlier / ongoing baseline

- **Full-stack MVP:** Frontend (Next.js) and backend (Express) with Neon Postgres; assessments and auth-related APIs; **web auth primarily via Clerk**; backend still supports JWT-style auth routes where used.
- **SEO & discovery:** Dynamic metadata, conditions pages, sitemap, robots, internal links (conditions, blog, pricing); ready for GSC and GBP when you choose to submit.
- **Mobile-first UI:** Tailwind-based layout; header (Dr. Muddu, 09963721999, JOIN/DONATE/FRANCHISE); CTAs to free assessment and Google Form; “Need help?” (Packages, Videos, WhatsApp).
- **Repairs applied:** Missing Dr. Muddu + Chiranjeevi image 404 fixed (image served from production URL where configured). 404 from `report-hmr-latency.js` in dev is HMR-related and harmless.
- **Run references:** Commands and paths in `web/RUN-DEV.md` and `web/CLERK-AUTH-AND-RUN.md` where applicable.

---

## 4. How to “grok” the codebase

1. **Start from the stack:** Next.js (static/SSR) + Express (API) + Neon (single DB). DB name is project-specific (e.g. `drmuddusmvp1`), not “heart”.
2. **Auth flow:** On the **web app**, Clerk handles sign-in/sign-up and middleware protection; backend `/api/auth/*` remains available for classic email/password + JWT where integrated. See `SCIENCE_OF_THE_MVP.md` for the full picture.
3. **Images:** Dr. Muddu + Chiranjeevi uses Render URL (`og-chiranjeevi.jpg`). Other assets under `web/public/images` and `web/public/media`.
4. **Errors:** 404 on image → fixed. 404 on `report-hmr-latency.js` → dev-only, ignore. Sign-up errors → check backend running and `NEXT_PUBLIC_API_URL` in `web/.env.local`.

---

**Contact:** 09963721999 • JOIN/COLLABORATE/FRANCHISE/DONATE • www.homahealthcarecenter.in • YouTube: homasurendranehru • Instagram/FB: homahealthcarecenter
