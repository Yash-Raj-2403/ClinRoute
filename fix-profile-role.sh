#!/bin/bash

echo "🔧 Profile Role Fix Guide"
echo "=========================="
echo ""
echo "Your registration creates a profile, but the role might not be saving correctly."
echo ""
echo "To fix this in Supabase Dashboard:"
echo ""
echo "1. Go to: https://supabase.com/dashboard"
echo "2. Select your 'clinroute' project"
echo "3. Click 'Table Editor' → 'profiles'"
echo "4. Find your user's row (email: bharath2006warrior@gmail.com)"
echo "5. Check the 'role' column:"
echo "   - If it's empty or NULL → Edit and set to 'patient'"
echo "   - If it says 'patient' → That's correct!"
echo ""
echo "6. Check 'profile_complete' column:"
echo "   - If it's 'false' → Change to 'true'"
echo ""
echo "After fixing, try logging in again!"
echo ""
echo "═══════════════════════════════════════════════"
echo "Alternative: Run this SQL in Supabase SQL Editor"
echo "═══════════════════════════════════════════════"
echo ""
cat << 'EOF'
-- Update profile role to patient for your email
UPDATE profiles 
SET role = 'patient', 
    profile_complete = true
WHERE email = 'bharath2006warrior@gmail.com';

-- Verify the update
SELECT id, email, role, name, profile_complete 
FROM profiles 
WHERE email = 'bharath2006warrior@gmail.com';
EOF
echo ""
echo "Copy the SQL above and run it in Supabase → SQL Editor → New query"
echo ""
