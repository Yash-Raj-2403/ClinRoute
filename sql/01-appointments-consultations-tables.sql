-- ================================================================
-- ClinRoute — Real Appointments & Consultations Tables
-- Run this in Supabase SQL Editor AFTER supabase-setup.sql
-- ================================================================

-- 1. APPOINTMENTS TABLE
-- Stores real appointment bookings from patients to doctors

create table if not exists public.appointments (
  id                uuid primary key default gen_random_uuid(),
  
  -- Link to patient (profiles.id where role='patient')
  patient_id        uuid not null references public.profiles(id) on delete cascade,
  
  -- Link to doctor (profiles.id where role='doctor') 
  doctor_id         uuid not null references public.profiles(id) on delete cascade,
  
  -- Appointment details
  date_time         timestamptz not null,
  end_time          timestamptz,
  duration_minutes  integer default 30,
  
  -- Appointment metadata
  reason            text not null,
  type              text check (type in ('new_patient', 'follow_up', 'urgent', 'routine')) default 'routine',
  consultation_mode text check (consultation_mode in ('in_person', 'video', 'phone')) default 'in_person',
  
  status            text check (status in ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')) default 'pending',
  
  -- Additional info
  notes             text,
  patient_notes     text,
  doctor_notes      text,
  
  -- Timestamps
  booked_at         timestamptz default now(),
  confirmed_at      timestamptz,
  completed_at      timestamptz,
  cancelled_at      timestamptz,
  cancellation_reason text,
  
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

-- 2. CONSULTATIONS TABLE  
-- Stores patient submissions and triage results

create table if not exists public.consultations (
  id                uuid primary key default gen_random_uuid(),
  consultation_code text unique not null,
  
  -- Link to patient
  patient_id        uuid not null references public.profiles(id) on delete cascade,
  
  -- Assigned doctor (can be null initially)
  doctor_id         uuid references public.profiles(id) on delete set null,
  
  -- Patient symptoms and vitals
  symptoms          jsonb not null default '{}'::jsonb,
  vitals            jsonb default '{}'::jsonb,
  medical_history   jsonb default '{}'::jsonb,
  
  -- AI Triage results
  triage_priority   text check (triage_priority in ('critical', 'urgent', 'moderate', 'routine')) default 'routine',
  triage_score      numeric,
  triage_recommendation text,
  risk_factors      jsonb default '[]'::jsonb,
  suggested_specialty text,
  ai_confidence     numeric,
  
  -- Status and queue
  status            text check (status in ('submitted', 'in_queue', 'assigned', 'in_progress', 'completed', 'cancelled')) default 'submitted',
  queue_position    integer,
  
  -- Consultation details
  diagnosis         text,
  treatment_plan    text,
  prescriptions     jsonb default '[]'::jsonb,
  lab_orders        jsonb default '[]'::jsonb,
  follow_up_needed  boolean default false,
  follow_up_date    date,
  
  -- Doctor notes
  doctor_notes      text,
  
  -- Timestamps
  submitted_at      timestamptz default now(),
  assigned_at       timestamptz,
  started_at        timestamptz,
  completed_at      timestamptz,
  
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

-- 3. INDEXES for performance

create index if not exists idx_appointments_patient on public.appointments(patient_id);
create index if not exists idx_appointments_doctor on public.appointments(doctor_id);
create index if not exists idx_appointments_date on public.appointments(date_time);
create index if not exists idx_appointments_status on public.appointments(status);
create index if not exists idx_appointments_doctor_date on public.appointments(doctor_id, date_time);

create index if not exists idx_consultations_patient on public.consultations(patient_id);
create index if not exists idx_consultations_doctor on public.consultations(doctor_id);
create index if not exists idx_consultations_status on public.consultations(status);
create index if not exists idx_consultations_priority on public.consultations(triage_priority);
create index if not exists idx_consultations_code on public.consultations(consultation_code);

-- 4. ROW LEVEL SECURITY

alter table public.appointments enable row level security;
alter table public.consultations enable row level security;

-- Appointments policies
drop policy if exists "Users can view their own appointments" on public.appointments;
drop policy if exists "Patients can create appointments" on public.appointments;
drop policy if exists "Users can update their own appointments" on public.appointments;
drop policy if exists "Users can delete their own appointments" on public.appointments;

create policy "Users can view their own appointments"
  on public.appointments for select
  using (auth.uid() = patient_id or auth.uid() = doctor_id);

create policy "Patients can create appointments"
  on public.appointments for insert
  with check (auth.uid() = patient_id);

create policy "Users can update their own appointments"
  on public.appointments for update
  using (auth.uid() = patient_id or auth.uid() = doctor_id);

create policy "Users can delete their own appointments"
  on public.appointments for delete
  using (auth.uid() = patient_id);

-- Consultations policies  
drop policy if exists "Users can view their own consultations" on public.consultations;
drop policy if exists "Patients can create consultations" on public.consultations;
drop policy if exists "Users can update consultations" on public.consultations;

create policy "Users can view their own consultations"
  on public.consultations for select
  using (auth.uid() = patient_id or auth.uid() = doctor_id);

create policy "Patients can create consultations"
  on public.consultations for insert
  with check (auth.uid() = patient_id);

create policy "Users can update consultations"
  on public.consultations for update
  using (auth.uid() = patient_id or auth.uid() = doctor_id);

-- 5. AUTO-UPDATE updated_at TRIGGER

drop trigger if exists appointments_updated_at on public.appointments;
drop trigger if exists consultations_updated_at on public.consultations;

create trigger appointments_updated_at
  before update on public.appointments
  for each row execute procedure public.handle_updated_at();

create trigger consultations_updated_at
  before update on public.consultations
  for each row execute procedure public.handle_updated_at();

-- 6. HELPER VIEWS

-- View for doctors to see their pending consultations
create or replace view doctor_pending_queue as
select 
  c.id,
  c.consultation_code,
  c.patient_id,
  p.name as patient_name,
  p.age as patient_age,
  p.gender as patient_gender,
  c.symptoms,
  c.triage_priority,
  c.triage_score,
  c.triage_recommendation,
  c.status,
  c.queue_position,
  c.submitted_at,
  extract(epoch from (now() - c.submitted_at))/60 as wait_time_minutes
from public.consultations c
join public.profiles p on c.patient_id = p.id
where c.status in ('submitted', 'in_queue', 'assigned')
order by c.triage_score desc nulls last, c.submitted_at asc;

-- View for doctors to see today's appointments
create or replace view doctor_today_appointments as
select 
  a.id,
  a.patient_id,
  p.name as patient_name,
  p.age as patient_age,
  p.phone as patient_phone,
  a.date_time,
  a.end_time,
  a.duration_minutes,
  a.reason,
  a.type,
  a.consultation_mode,
  a.status,
  a.notes
from public.appointments a
join public.profiles p on a.patient_id = p.id
where date(a.date_time) = current_date
order by a.date_time asc;

-- Grant access (adjust as needed based on your RLS setup)
grant select on doctor_pending_queue to authenticated;
grant select on doctor_today_appointments to authenticated;
