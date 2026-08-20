-- Gallery Images Table for Neon PostgreSQL
-- Run this in your Neon SQL Editor or via init script

CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  alt TEXT NOT NULL,
  caption TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  is_cover BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_gallery_images_order ON gallery_images("order");
CREATE INDEX IF NOT EXISTS idx_gallery_images_cover ON gallery_images(is_cover) WHERE is_cover = true;

-- Add some comments
COMMENT ON TABLE gallery_images IS 'Gallery images for HOMA Clinic website';
COMMENT ON COLUMN gallery_images."order" IS 'Display order (lower numbers appear first)';
COMMENT ON COLUMN gallery_images.is_cover IS 'Whether this image is the cover/featured image';

