-- Fix profile for yashraj24007@klh.edu.in
-- Run this in Supabase Dashboard > SQL Editor

-- First, check if profile exists
SELECT id, email, role, profile_complete, name FROM profiles 
WHERE email = 'yashraj24007@klh.edu.in';

-- If profile exists with empty role, update it:
UPDATE profiles 
SET 
  role = 'patient',
  profile_complete = true
WHERE email = 'yashraj24007@klh.edu.in';

-- Verify the update:
SELECT id, email, role, profile_complete, name FROM profiles 
WHERE email = 'yashraj24007@klh.edu.in';
