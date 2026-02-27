# ClinRoute Database SQL Scripts

## ⚠️ IMPORTANT - Which File To Use?

### ✅ FOR THIS APPLICATION: Use `supabase-setup.sql` ONLY

**Your app currently uses a single `profiles` table architecture.**

---

## Setup Instructions

### 📄 `supabase-setup.sql` (REQUIRED - RUN THIS ONE)

Run **ONLY** this file in your Supabase SQL Editor when setting up your database.

**What it creates:**
- `profiles` table with all patient and doctor fields
- Row Level Security (RLS) policies
- Auto-update triggers for timestamps

**Fields included:**
- **Common:** id, email, role, name, phone, avatar, profile_complete
- **Patient:** age, weight, height, blood_group, gender, dob, address, emergency_contact, family_members
- **Doctor:** specialty, doctor_id, license_number, hospital_name, hospital_address, bio, experience, consultation_fee

**To run:**
1. Go to your Supabase Dashboard
2. Click on "SQL Editor"
3. Copy and paste the entire contents of `supabase-setup.sql`
4. Click "Run"

---

### ❌ `supabase-schema.sql` (DO NOT USE FOR THIS APP)

**This file is for reference only** - it contains a more complex multi-table architecture.

**DO NOT run this file** - it will cause errors because:
- It tries to create different tables (users, patients, doctors, consultations, appointments)
- Your app uses the simpler `profiles` table from `supabase-setup.sql`
- Running both will create conflicts

This file is kept for future reference if you decide to migrate to a more complex architecture.

---

## Database Structure

### Core Table: `profiles`
- **Purpose:** Single table storing both patient and doctor profiles
- **Auth:** Linked to Supabase Auth (auth.users) via id
- **Security:** Row Level Security (RLS) ensures users can only access their own data

### Key Points

**Numeric Fields** (automatically convert empty strings to NULL):
- `age` - Patient age in years (1-120)
- `weight` - Patient weight in kg (1-500)
- `height` - Patient height in cm (50-300)
- `experience` - Doctor years of experience (0-60)
- `consultation_fee` - Doctor consultation fee

**Role Field:**
- `'patient'` - Patient user
- `'doctor'` - Doctor/physician user

---

## Quick SQL Reference

```sql
-- View all profiles
SELECT * FROM profiles;

-- View patients only
SELECT * FROM profiles WHERE role = 'patient';

-- View doctors only  
SELECT * FROM profiles WHERE role = 'doctor';

-- View your own profile (when logged in)
SELECT * FROM profiles WHERE id = auth.uid();
```

---

## Troubleshooting

### ❌ Error: "relation 'users' already exists"
**Cause:** Trying to run `supabase-schema.sql`  
**Solution:** Only run `supabase-setup.sql` for this app

### ❌ Error: "invalid input syntax for type numeric"
**Cause:** Empty strings sent to numeric fields  
**Solution:** Already fixed in AuthContext.js - empty strings convert to NULL

### ❌ Error: "relation 'profiles' does not exist"
**Cause:** Database not set up yet  
**Solution:** Run `supabase-setup.sql` in Supabase SQL Editor

### ❌ Error: Cannot login/signup
**Checklist:**
1. ✅ Ran `supabase-setup.sql` in Supabase SQL Editor
2. ✅ Supabase URL and anon key in `.env` files
3. ✅ Authentication providers enabled in Supabase Dashboard
4. ✅ RLS policies created (included in supabase-setup.sql)

---

## Testing Your Setup

After running `supabase-setup.sql`, verify it worked:

1. Go to Supabase Dashboard → Table Editor
2. You should see a `profiles` table
3. Try signing up in your app
4. Check if a new row appears in the profiles table

---

## Notes

⚠️ **Always backup your database before running SQL scripts**  
⚠️ **Only run `supabase-setup.sql` once per project**  
✅ **RLS policies ensure data privacy - each user can only access their own data**
