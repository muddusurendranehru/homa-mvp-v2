# Supabase Gallery CMS Setup

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

## 2. Set Environment Variables

Add to `web/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 3. Run SQL Migration

1. Go to Supabase Dashboard → SQL Editor
2. Run the SQL from `web/supabase-migration.sql`
3. This creates the `gallery_images` table with RLS policies

## 4. Create Storage Bucket (Optional)

If you want to use Supabase Storage for images:

1. Go to Storage → Create Bucket
2. Name: `gallery`
3. Make it public
4. Add policy for authenticated uploads

## 5. Test Admin Panel

1. Visit `/admin/gallery`
2. You'll be redirected to login if not authenticated
3. Upload images, reorder, edit, delete

## Notes

- Images are stored in `/public/images/` by default
- If using Supabase Storage, update upload logic in `app/admin/gallery/page.tsx`
- The gallery page falls back to static images if Supabase fails

