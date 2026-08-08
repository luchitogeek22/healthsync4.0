-- HealthSync 4.0 / Phase 1: identities, roles and row-level security.
-- Apply through the Supabase CLI or dashboard migration workflow; never run this
-- migration with unreviewed production data.

create type public.user_role as enum ('PATIENT', 'DOCTOR', 'ADMIN');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'PATIENT',
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.doctor_patient_relationships (
  id uuid primary key default gen_random_uuid(),
  doctor_id uuid not null references public.profiles(id) on delete cascade,
  patient_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'ACTIVE' check (status in ('PENDING', 'ACTIVE', 'INACTIVE')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (doctor_id, patient_id),
  check (doctor_id <> patient_id)
);

create index doctor_patient_relationships_doctor_id_idx
  on public.doctor_patient_relationships (doctor_id);
create index doctor_patient_relationships_patient_id_idx
  on public.doctor_patient_relationships (patient_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, nullif(trim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select coalesce(public.current_user_role() = 'ADMIN', false)
$$;

create or replace function public.is_doctor_for(target_patient_id uuid)
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1
    from public.doctor_patient_relationships
    where doctor_id = auth.uid()
      and patient_id = target_patient_id
      and status = 'ACTIVE'
  )
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger set_relationships_updated_at
  before update on public.doctor_patient_relationships
  for each row execute procedure public.set_updated_at();

-- Role changes are privileged: a user cannot promote itself from the client.
create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.role <> old.role
     and auth.role() <> 'service_role'
     and not public.is_admin() then
    raise exception 'Only an administrator can change a user role';
  end if;
  return new;
end;
$$;

create trigger prevent_profile_role_escalation
  before update on public.profiles
  for each row execute procedure public.prevent_role_escalation();

alter table public.profiles enable row level security;
alter table public.doctor_patient_relationships enable row level security;

create policy "profiles: users read their own profile"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

create policy "profiles: admins read all profiles"
  on public.profiles for select
  to authenticated
  using (public.is_admin());

create policy "profiles: users update their own profile"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "profiles: admins update profiles"
  on public.profiles for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "relationships: participants read their own relationships"
  on public.doctor_patient_relationships for select
  to authenticated
  using (doctor_id = auth.uid() or patient_id = auth.uid());

create policy "relationships: admins manage relationships"
  on public.doctor_patient_relationships for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Doctor/patient relationships must be created by an admin or a trusted server
-- workflow. Future appointment policies must call is_doctor_for(patient_id).
