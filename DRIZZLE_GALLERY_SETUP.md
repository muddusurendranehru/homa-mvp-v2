# Gallery CMS Setup - Drizzle ORM + Neon PostgreSQL

## Overview

Gallery CMS uses Drizzle ORM with Neon PostgreSQL. All CRUD operations are handled via Next.js API routes.

## Database Setup

### Step 1: Run Migration

**Option A: Run SQL directly in Neon Console**

1. Go to [Neon Console](https://console.neon.tech/app/projects/proud-sunset-82737074/branches/br-blue-wildflower-ahnf9ofw/tables?database=drmuddusmvp1)
2. Click **SQL Editor**
3. Run this SQL:

```sql
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  alt TEXT NOT NULL,
  caption TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  is_cover BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gallery_images_order ON gallery_images("order");
CREATE INDEX IF NOT EXISTS idx_gallery_images_cover ON gallery_images(is_cover) WHERE is_cover = true;
```

**Option B: Use Drizzle Migration (if configured)**

```bash
cd web
npx drizzle-kit push
```

## Environment Setup

Add to `web/.env.local`:

```env
DATABASE_URL=postgresql://neondb_owner:npg_zUbO5HZ9kDur@ep-icy-dream-ah5xlk96-pooler.c-3.us-east-1.aws.neon.tech/drmuddusmvp1?sslmode=require
```

## Admin Access

**Hardcoded Password:** `homa_admin_2024`

The admin panel at `/admin/gallery` uses this password for authentication (sent via Authorization header).

## Usage

### 1. Start Development Server

```bash
cd web
npm run dev
```

### 2. Access Admin Panel

Visit: `http://localhost:3002/admin/gallery`

### 3. Upload Image

1. Click "Choose File" and select an image (e.g., `CHIRU1.jpg`)
2. Database entry is created automatically
3. **Manually copy the file** to `web/public/images/` folder
4. Refresh the page to see the image

### 4. Test Public Gallery

Visit: `http://localhost:3002/gallery`

Images are fetched from Neon PostgreSQL and displayed in a responsive grid.

## API Endpoints

- `GET /api/gallery` - Get all images (public)
- `POST /api/gallery` - Create image (protected)
- `PUT /api/gallery/[id]` - Update image (protected)
- `DELETE /api/gallery/[id]` - Delete image (protected)
- `POST /api/gallery/reorder` - Reorder images (protected)
- `POST /api/gallery/[id]/set-cover` - Set cover image (protected)

## File Structure

```
web/
├── lib/
│   ├── db.ts              # Drizzle database connection
│   ├── schema.ts          # Drizzle schema definition
│   └── gallery-api.ts     # Frontend API client
├── app/
│   ├── api/gallery/       # Next.js API routes
│   ├── admin/gallery/     # Admin CMS page
│   └── gallery/           # Public gallery page
└── drizzle.config.ts      # Drizzle configuration
```

## Notes

- **File Upload**: Currently requires manual file copy to `/public/images/`
- **Authentication**: Uses hardcoded password `homa_admin_2024` (change in API routes)
- **Fallback**: Gallery page falls back to static images if database fails
- **No Breaking Changes**: Existing features remain intact

