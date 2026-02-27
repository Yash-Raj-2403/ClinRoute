## 🔧 FIX: "relation users already exists" Error

You tried to run the wrong SQL file. Here's how to fix it:

---

## ✅ Solution

### Step 1: Use the Correct File

**Run ONLY this file:** `supabase-setup.sql`

**DO NOT run:** `supabase-schema.sql` (it's for a different architecture)

---

### Step 2: If You Already Ran supabase-schema.sql by Mistake

You need to drop the conflicting tables first:

1. Go to Supabase Dashboard → SQL Editor
2. Run this cleanup script:

```sql
-- Drop tables created by supabase-schema.sql
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS consultations CASCADE;
DROP TABLE IF EXISTS patients CASCADE;
DROP TABLE IF EXISTS doctors CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop views
DROP VIEW IF EXISTS user_profiles CASCADE;
DROP VIEW IF EXISTS consultation_queue CASCADE;
DROP VIEW IF EXISTS upcoming_appointments CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS generate_consultation_id() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
```

3. Now run `supabase-setup.sql` completely

---

### Step 3: Verify Setup

After running `supabase-setup.sql`, check:

1. Go to Table Editor in Supabase
2. You should see ONE table: `profiles`
3. No `users`, `patients`, or `doctors` tables

---

## 🚀 Quick Setup Guide

### 1. Database Setup (First Time)

```bash
# In Supabase SQL Editor, run:
sql/supabase-setup.sql
```

### 2. Verify Environment Variables

Check your `.env` file has:
```bash
# Root .env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

Check your `client/.env` has:
```bash
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Start the Application

```bash
# Terminal 1 - Start backend
cd /home/yashraj/Documents/Project/ClinRoute
npm start

# Terminal 2 - Start frontend
cd /home/yashraj/Documents/Project/ClinRoute/client
npm start
```

### 4. Test Login/Signup

1. Go to http://localhost:3000
2. Click "Get Started" or "Login"
3. Try creating a new account
4. Fill in the profile form
5. Save details - should work without errors!

---

## ✅ Expected Behavior

After correct setup:
- ✅ Signup works
- ✅ Login works  
- ✅ Profile can be saved (no "invalid input syntax" error)
- ✅ Can access dashboard after completing profile
- ✅ All required fields marked with *

---

## 📁 File Structure Summary

```
sql/
├── README.md                    ← Read this for full details
├── SETUP_GUIDE.md              ← You are here
├── supabase-setup.sql          ← ✅ RUN THIS ONE
└── supabase-schema.sql         ← ❌ DON'T RUN (reference only)
```

---

## Still Having Issues?

Check the main [README.md](README.md) in this folder for:
- Detailed troubleshooting
- SQL queries for testing
- Database structure explanation
