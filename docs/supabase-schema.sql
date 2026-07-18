-- VibeLift Phase 2C schema — run once in Supabase SQL Editor.
-- Three tables mirror the app's localStorage shapes (see docs/ROADMAP.md 2B/2C).
-- RLS: every user sees only their own rows. Non-negotiable.

create table public.workouts (
  user_id    uuid not null references auth.users(id) on delete cascade,
  date       text not null,                -- ISO yyyy-mm-dd; one row per user per day
  data       jsonb not null,               -- array of that day's workout objects
  updated_at timestamptz not null default now(),
  primary key (user_id, date)
);

create table public.custom_exercises (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null,               -- full custom-exercise array
  updated_at timestamptz not null default now()
);

create table public.profiles (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null,               -- name, weightUnit, setupDone, createdAt
  updated_at timestamptz not null default now()
);

alter table public.workouts         enable row level security;
alter table public.custom_exercises enable row level security;
alter table public.profiles         enable row level security;

create policy "own rows" on public.workouts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rows" on public.custom_exercises
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rows" on public.profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Phase 2D: self-serve account deletion (GDPR).
-- security definer lets the signed-in user delete their own auth row;
-- the on-delete-cascade references above wipe all their table rows with it.
create or replace function public.delete_account()
returns void
language sql
security definer
set search_path = ''
as $$
  delete from auth.users where id = auth.uid();
$$;
revoke execute on function public.delete_account() from anon, public;
grant execute on function public.delete_account() to authenticated;
