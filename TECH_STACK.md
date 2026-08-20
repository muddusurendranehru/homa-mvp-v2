# 🛠️ Tech Stack Documentation

## ✅ Actual Tech Stack (Verified from Codebase)

### Frontend
- **Framework:** Next.js 14.2.0 (App Router)
- **UI Library:** React 18.2.0
- **Styling:** Tailwind CSS 3.4.0
- **Database Client:** 
  - `@neondatabase/serverless` (for serverless API routes)
  - `drizzle-orm` + `drizzle-kit` (for gallery API routes)
- **HTTP Client:** Axios 1.13.2
- **TypeScript:** 5.0.0

### Backend
- **Framework:** Express.js 4.18.2
- **Database Client:** `pg` (PostgreSQL pool) - **Raw SQL queries**
- **ORM:** ❌ **NO Drizzle ORM** (uses raw SQL with `pg`)
- **Authentication:** JWT (jsonwebtoken 9.0.2)
- **Password Hashing:** bcrypt 5.1.1
- **CORS:** cors 2.8.5

### Database
- **Provider:** Neon PostgreSQL
- **Connection:** 
  - Backend: `pg` Pool (connection pooling)
  - Frontend API Routes: `@neondatabase/serverless` (serverless-friendly)

### Deployment
- **Platform:** Render (Free Tier)
- **Frontend URL:** `https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com`
- **Backend URL:** `https://dr-muddus-mvp-miracle-value-proposition.onrender.com`
- **CDN:** Global CDN (provided by Render)

---

## 📊 Architecture Breakdown

### Frontend Database Access

**Two Different Approaches:**

1. **Serverless API Routes** (`/api/submit-lead`)
   ```typescript
   // Uses @neondatabase/serverless
   import { neon } from '@neondatabase/serverless';
   const sql = neon(process.env.NEON_DATABASE_URL);
   ```

2. **Gallery API Routes** (`/api/gallery/*`)
   ```typescript
   // Uses Drizzle ORM
   import { drizzle } from 'drizzle-orm/node-postgres';
   import { db } from '@/lib/db';
   ```

### Backend Database Access

**Single Approach:**
```javascript
// Uses raw SQL with pg Pool
const pool = require('../config/database');
const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
```

---

## 🔍 Key Differences from User Description

| User Description | Actual Implementation | Status |
|------------------|----------------------|--------|
| Next.js 15.1.6 | Next.js 14.2.0 | ⚠️ Version mismatch |
| Backend: Drizzle ORM | Backend: Raw SQL (`pg`) | ⚠️ No Drizzle in backend |
| - | Frontend: Drizzle ORM (gallery only) | ✅ Correct |

---

## 📁 File Structure by Technology

### Frontend (Next.js)
```
web/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── submit-lead/   # Uses @neondatabase/serverless
│   │   └── gallery/       # Uses Drizzle ORM
│   ├── auth/              # Auth pages
│   └── page.tsx           # Homepage
├── components/             # React components
├── lib/
│   ├── api.ts             # Axios client
│   ├── db.ts              # Drizzle ORM setup
│   └── schema.ts          # Drizzle schema
└── drizzle.config.ts      # Drizzle Kit config
```

### Backend (Express)
```
server/
├── server.js              # Express app
├── config/
│   └── database.js        # pg Pool setup
├── routes/
│   ├── auth.js            # Raw SQL queries
│   ├── assessments.js     # Raw SQL queries
│   └── gallery.js         # Raw SQL queries
└── middleware/
    └── auth.js            # JWT verification
```

---

## 🔧 Database Connection Methods

### Method 1: Backend (Express) - pg Pool
```javascript
// server/config/database.js
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
```

### Method 2: Frontend API Routes - @neondatabase/serverless
```typescript
// web/app/api/submit-lead/route.ts
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.NEON_DATABASE_URL);
```

### Method 3: Frontend API Routes - Drizzle ORM
```typescript
// web/lib/db.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });
```

---

## 📦 Package Dependencies

### Frontend (`web/package.json`)
```json
{
  "next": "14.2.0",
  "react": "^18.2.0",
  "@neondatabase/serverless": "^1.0.2",
  "drizzle-orm": "^0.45.1",
  "drizzle-kit": "^0.31.8",
  "axios": "^1.13.2",
  "tailwindcss": "^3.4.0"
}
```

### Backend (`server/package.json`)
```json
{
  "express": "^4.18.2",
  "pg": "^8.11.3",
  "bcrypt": "^5.1.1",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5"
}
```

---

## 🎯 Why This Architecture?

### Frontend Uses Multiple Database Clients:
1. **@neondatabase/serverless** - Optimized for serverless functions (form submissions)
2. **Drizzle ORM** - Type-safe queries for gallery management
3. **Both work with Neon PostgreSQL** - Same database, different access patterns

### Backend Uses Raw SQL:
- **Simple and direct** - No ORM overhead
- **Full control** - Can optimize queries manually
- **Lightweight** - Fewer dependencies

---

## ✅ Summary

**Accurate Tech Stack:**
- ✅ Frontend: Next.js 14.2.0 + React 18.2.0 + Tailwind CSS
- ✅ Backend: Express.js + Raw SQL (`pg`) + JWT Auth
- ✅ Database: Neon PostgreSQL
- ✅ Deployment: Render (Free Tier) + Global CDN
- ⚠️ Frontend also uses Drizzle ORM (for gallery routes only)
- ⚠️ Frontend uses `@neondatabase/serverless` (for form submissions)

**Note:** Backend does NOT use Drizzle ORM - it uses raw SQL with `pg` Pool.

