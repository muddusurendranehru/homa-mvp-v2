-- Extend HOMA `places.kind` for Lifestyle Gear Hub local store finder.
-- Run on Neon when inserts with kind = 'lifestyle' or 'electronics' fail the CHECK constraint.
-- Inspect existing constraint name first: \d places  (or query pg_constraint).

ALTER TABLE places DROP CONSTRAINT IF EXISTS places_kind_check;

ALTER TABLE places ADD CONSTRAINT places_kind_check CHECK (
  kind IN ('lab', 'pharmacy', 'organic', 'lifestyle', 'electronics')
);

-- Example seed rows (adjust columns to match your schema; id may be UUID DEFAULT gen_random_uuid()):
-- INSERT INTO places (name, address, phone, lat, lng, kind) VALUES
--   ('Croma Gachibowli', 'Gachibowli, Hyderabad', '18001234567', 17.4401, 78.3489, 'electronics'),
--   ('Reliance Digital Madhapur', 'Madhapur, Hyderabad', '18007654321', 17.4485, 78.3908, 'lifestyle');
