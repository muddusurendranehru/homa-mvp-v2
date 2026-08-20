-- Add nutri_tokens column to users table
-- Each user gets 10 free tokens, tracks usage

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS nutri_tokens_remaining INT DEFAULT 10;

-- Optional: Track total tokens purchased
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS nutri_tokens_purchased INT DEFAULT 0;

-- Verify
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name LIKE 'nutri%';

