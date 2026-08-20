# Gallery CMS Setup - Neon PostgreSQL

## Overview

The Gallery CMS uses your existing Neon PostgreSQL database and backend API. No Supabase needed!

## Database Setup

### Step 1: Run SQL Migration

1. Go to [Neon Console](https://console.neon.tech/app/projects/proud-sunset-82737074/branches/br-blue-wildflower-ahnf9ofw/tables?database=drmuddusmvp1)
2. Click on **SQL Editor**
3. Copy and paste the SQL from `server/schema-gallery.sql`
4. Click **Run**

Or run via command line:
```bash
cd server
psql "postgresql://neondb_owner:npg_zUbO5HZ9kDur@ep-icy-dream-ah5xlk96-pooler.c-3.us-east-1.aws.neon.tech/drmuddusmvp1?sslmode=require" -f schema-gallery.sql
```

### Step 2: Verify Table Created

Check in Neon Console that `gallery_images` table exists with columns:
- `id` (UUID)
- `filename` (TEXT)
- `alt` (TEXT)
- `caption` (TEXT)
- `order` (INTEGER)
- `is_cover` (BOOLEAN)
- `created_at` (TIMESTAMP)

## Backend Setup

### Step 1: Start Backend Server

```bash
cd server
npm install  # if not already done
npm run dev
```

The gallery routes are automatically registered:
- `GET /api/gallery` - Get all images (public)
- `POST /api/gallery` - Create image (protected)
- `PUT /api/gallery/:id` - Update image (protected)
- `DELETE /api/gallery/:id` - Delete image (protected)
- `POST /api/gallery/reorder` - Reorder images (protected)
- `POST /api/gallery/:id/set-cover` - Set cover image (protected)

## Frontend Setup

### Step 1: Ensure Backend URL is Set

Check `web/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 2: Start Frontend

```bash
cd web
npm run dev
```

## Using the Admin Panel

1. **Login**: Visit `/auth` and login with your credentials
2. **Access Admin**: Visit `/admin/gallery`
3. **Upload Image**:
   - Click "Choose File" and select an image
   - Database entry is created automatically
   - **Manually copy the file** to `web/public/images/` folder
   - Refresh the page to see the image

4. **Edit Image**:
   - Click "Edit" on any image
   - Update alt text, caption, or set as cover
   - Click "Save"

5. **Reorder Images**:
   - Use ↑ and ↓ buttons to move images up/down
   - Order is saved automatically

6. **Set Cover Image**:
   - Click "Set Cover" on any image
   - Only one image can be cover at a time

7. **Delete Image**:
   - Click "Delete" on any image
   - **Also manually delete** the file from `web/public/images/` folder

## Public Gallery

Visit `/gallery` to see the public gallery:
- Images are fetched from Neon PostgreSQL
- Falls back to static images if database fails
- Includes WhatsApp CTA buttons for lead generation
- SEO-optimized with JSON-LD schema

## Connection String

Your Neon PostgreSQL connection string:
```
postgresql://neondb_owner:npg_zUbO5HZ9kDur@ep-icy-dream-ah5xlk96-pooler.c-3.us-east-1.aws.neon.tech/drmuddusmvp1?sslmode=require&channel_binding=require
```

This is already configured in your `server/.env` file.

## Notes

- **File Upload**: Currently requires manual file copy to `/public/images/`. Future enhancement: Add file upload endpoint.
- **Authentication**: Uses existing JWT auth system (same as assessments)
- **No Breaking Changes**: Gallery page works with or without database connection (fallback to static images)

