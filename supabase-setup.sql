-- ================================================================
-- ClinRoute — Supabase Setup
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard)
-- ================================================================

-- 1. PROFILES TABLE
-- Stores all patient and doctor profile data.
-- Linked 1:1 with Supabase Auth (auth.users).

create table if not exists public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  email           text,
  role            text check (role in ('patient','doctor')),

  -- Common fields
  name            text,
  phone           text,
  avatar          text,
  profile_complete boolean default false,

  -- Patient fields
  age             numeric,
  weight          numeric,
  height          numeric,
  blood_group     text,
  gender          text,
  dob             date,
  address         text,
  emergency_contact text,
  family_members  jsonb default '[]'::jsonb,

  -- Doctor fields
  specialty       text,
  doctor_id       text,
  license_number  text,
  hospital_name   text,
  hospital_address text,
  bio             text,
  experience      numeric,
  consultation_fee numeric,

  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- 2. ROW LEVEL SECURITY
-- Each user can only read/write their own profile row.

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can delete their own profile"
  on public.profiles for delete
  using (auth.uid() = id);

-- 3. AUTO-UPDATE updated_at TRIGGER

create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- 4. (OPTIONAL) AUTO-CREATE PROFILE ROW ON SIGNUP
-- Uncomment if you want a blank profile row created automatically
-- whenever a new user signs up via Supabase Auth.

-- create or replace function public.handle_new_user()
-- returns trigger language plpgsql security definer set search_path = public as $$
-- begin
--   insert into public.profiles(id, email)
--   values (new.id, new.email);
--   return new;
-- end;
-- $$;
--
-- create trigger on_auth_user_created
--   after insert on auth.users
--   for each row execute procedure public.handle_new_user();
