-- Fix profile for yashraj31007@gmail.com
-- Run this in Supabase Dashboard > SQL Editor

-- Update the profile with role and profile_complete
UPDATE profiles 
SET 
  role = 'patient',
  profile_complete = true
WHERE id = '83f101c7-9232-4847-ba7b-8c8c1136a91f';

-- If no rows affected, INSERT:
INSERT INTO profiles (id, email, role, profile_complete, family_members)
VALUES (
  '83f101c7-9232-4847-ba7b-8c8c1136a91f',
  'yashraj31007@gmail.com',
  'patient',
  true,
  '[]'
)
ON CONFLICT (id) DO UPDATE SET 
  role = 'patient', 
  profile_complete = true;

-- Verify:
SELECT id, email, role, profile_complete FROM profiles 
WHERE id = '83f101c7-9232-4847-ba7b-8c8c1136a91f';
