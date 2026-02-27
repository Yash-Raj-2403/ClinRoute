-- ================================================================
-- ClinRoute — Helper Functions for Real Data
-- Run this in Supabase SQL Editor AFTER 01-appointments-consultations-tables.sql
-- ================================================================

-- 1. FUNCTION: Get doctor's dashboard stats
create or replace function get_doctor_stats(doc_id uuid)
returns jsonb
language plpgsql
security definer
as $$
declare
  result jsonb;
begin
  select jsonb_build_object(
    'todayAppointments', (
      select count(*) 
      from appointments 
      where doctor_id = doc_id 
      and date(date_time) = current_date
      and status in ('confirmed', 'pending')
    ),
    'pendingCases', (
      select count(*) 
      from consultations 
      where doctor_id = doc_id 
      and status in ('submitted', 'in_queue', 'assigned')
    ),
    'completedToday', (
      select count(*) 
      from appointments 
      where doctor_id = doc_id 
      and date(completed_at) = current_date
      and status = 'completed'
    ),
    'totalPatientsThisWeek', (
      select count(distinct patient_id)
      from appointments
      where doctor_id = doc_id
      and date_time >= current_date - interval '7 days'
    )
  ) into result;
  
  return result;
end;
$$;

-- 2. FUNCTION: Generate unique consultation code
create or replace function generate_consultation_code()
returns text
language plpgsql
as $$
declare
  new_code text;
  code_exists boolean;
begin
  loop
    -- Format: CLN-YYYY-NNNNN (e.g., CLN-2026-00123)
    new_code := 'CLN-' || to_char(now(), 'YYYY') || '-' || 
                lpad(floor(random() * 99999)::text, 5, '0');
    
    -- Check if code already exists
    select exists(
      select 1 from consultations where consultation_code = new_code
    ) into code_exists;
    
    -- Exit loop if code is unique
    exit when not code_exists;
  end loop;
  
  return new_code;
end;
$$;

-- 3. FUNCTION: Auto-assign consultation code on insert
create or replace function set_consultation_code()
returns trigger
language plpgsql
as $$
begin
  if new.consultation_code is null or new.consultation_code = '' then
    new.consultation_code := generate_consultation_code();
  end if;
  return new;
end;
$$;

drop trigger if exists set_consultation_code_trigger on consultations;

create trigger set_consultation_code_trigger
  before insert on consultations
  for each row
  execute function set_consultation_code();

-- 4. FUNCTION: Get doctor's upcoming appointments
create or replace function get_doctor_upcoming_appointments(
  doc_id uuid,
  days_ahead integer default 7
)
returns table (
  id uuid,
  patient_name text,
  patient_age numeric,
  patient_phone text,
  date_time timestamptz,
  duration_minutes integer,
  reason text,
  type text,
  status text,
  consultation_mode text
)
language plpgsql
security definer
as $$
begin
  return query
  select 
    a.id,
    p.name,
    p.age,
    p.phone,
    a.date_time,
    a.duration_minutes,
    a.reason,
    a.type,
    a.status,
    a.consultation_mode
  from appointments a
  join profiles p on a.patient_id = p.id
  where a.doctor_id = doc_id
  and a.date_time >= now()
  and a.date_time <= now() + (days_ahead || ' days')::interval
  and a.status in ('pending', 'confirmed')
  order by a.date_time asc;
end;
$$;

-- 5. FUNCTION: Get doctor's patient queue
create or replace function get_doctor_patient_queue(doc_id uuid)
returns table (
  id uuid,
  consultation_code text,
  patient_name text,
  patient_age numeric,
  patient_gender text,
  symptoms jsonb,
  triage_priority text,
  triage_score numeric,
  triage_recommendation text,
  status text,
  wait_time_minutes numeric,
  submitted_at timestamptz
)
language plpgsql
security definer
as $$
begin
  return query
  select 
    c.id,
    c.consultation_code,
    p.name,
    p.age,
    p.gender,
    c.symptoms,
    c.triage_priority,
    c.triage_score,
    c.triage_recommendation,
    c.status,
    extract(epoch from (now() - c.submitted_at))/60 as wait_time_minutes,
    c.submitted_at
  from consultations c
  join profiles p on c.patient_id = p.id
  where c.doctor_id = doc_id
  and c.status in ('submitted', 'in_queue', 'assigned', 'in_progress')
  order by 
    case c.triage_priority
      when 'critical' then 1
      when 'urgent' then 2
      when 'moderate' then 3
      when 'routine' then 4
      else 5
    end,
    c.submitted_at asc;
end;
$$;

-- 6. FUNCTION: Get all available doctors for patient booking
create or replace function get_available_doctors(
  specialty_filter text default null
)
returns table (
  id uuid,
  name text,
  specialty text,
  hospital_name text,
  hospital_address text,
  bio text,
  experience numeric,
  consultation_fee numeric,
  phone text
)
language plpgsql
security definer
as $$
begin
  return query
  select 
    p.id,
    p.name,
    p.specialty,
    p.hospital_name,
    p.hospital_address,
    p.bio,
    p.experience,
    p.consultation_fee,
    p.phone
  from profiles p
  where p.role = 'doctor'
  and p.profile_complete = true
  and (specialty_filter is null or p.specialty = specialty_filter)
  order by p.name;
end;
$$;

-- 7. Grant execute permissions
grant execute on function get_doctor_stats(uuid) to authenticated;
grant execute on function generate_consultation_code() to authenticated;
grant execute on function get_doctor_upcoming_appointments(uuid, integer) to authenticated;
grant execute on function get_doctor_patient_queue(uuid) to authenticated;
grant execute on function get_available_doctors(text) to authenticated;
