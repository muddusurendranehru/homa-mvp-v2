-- Nearby places: PostGIS geography + GiST index.
--
-- RUN THIS ONCE in the Neon SQL Editor BEFORE merging the pull request.
-- Use the same Neon database as web DATABASE_URL (the database that already
-- has the places table). The Next.js app does not run this file.
--
-- Neon: enable the postgis extension for this project if CREATE EXTENSION
-- is rejected, then run this script again.

CREATE EXTENSION IF NOT EXISTS postgis;

ALTER TABLE places
  ADD COLUMN IF NOT EXISTS location geography(Point, 4326);

UPDATE places
SET location = ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
WHERE lat IS NOT NULL
  AND lng IS NOT NULL
  AND location IS NULL;

CREATE INDEX IF NOT EXISTS idx_places_location
  ON places
  USING GIST (location);

-- Keep location in sync on every insert and on lat/lng updates.
-- There is no places seed route in web/; this trigger covers later writes.

CREATE OR REPLACE FUNCTION places_set_location()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.lat IS NOT NULL AND NEW.lng IS NOT NULL THEN
    NEW.location := ST_SetSRID(ST_MakePoint(NEW.lng, NEW.lat), 4326)::geography;
  ELSE
    NEW.location := NULL;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_places_set_location ON places;

CREATE TRIGGER trg_places_set_location
BEFORE INSERT OR UPDATE OF lat, lng
ON places
FOR EACH ROW
EXECUTE FUNCTION places_set_location();
