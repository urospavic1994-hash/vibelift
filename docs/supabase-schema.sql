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

-- ─────────────────────────────────────────────────────────────────────────────
-- Server-side disposable-email block.
-- The app already refuses throwaway inboxes at sign-up, but that check lives in
-- the browser and anyone can bypass it by calling the API directly. This trigger
-- is the real gate: it runs inside the database on every new auth user, so there
-- is no path around it.
-- Run once in Supabase → SQL Editor.
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.block_disposable_email()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  d text;
begin
  d := lower(split_part(coalesce(new.email, ''), '@', 2));
  if d = '' then
    return new;                       -- phone/oauth signups carry no email
  end if;

  if d = any (array[
    'mailinator.com','guerrillamail.com','yopmail.com','10minutemail.com',
    'tempmail.com','temp-mail.org','throwawaymail.com','trashmail.com',
    'sharklasers.com','getnada.com','maildrop.cc','mohmal.com','dispostable.com',
    'fakeinbox.com','spamgourmet.com','mailsac.com','moakt.com','minuteinbox.com',
    'emailondeck.com','tempmailo.com','mailnesia.com','inboxkitten.com',
    'mail7.io','burnermail.io','anonaddy.me'
  ])
  or d ~ '(^|\.)(10minutemail|20minutemail|33mail|anonaddy|burnermail|dispostable|dropmail|emailondeck|fakeinbox|fakemail|getairmail|getnada|guerrillamail|harakirimail|inboxbear|jetable|mailcatch|maildrop|mailinator|mailnesia|mailsac|mailtemp|minuteinbox|mintemail|mohmal|moakt|nada|sharklasers|spam4|spamgourmet|temp-mail|tempail|tempinbox|tempmail|tempmailo|throwawaymail|trashmail|yopmail|zetmail)\.'
  then
    raise exception 'Temporary email addresses are not accepted'
      using errcode = 'check_violation';
  end if;

  return new;
end;
$$;

drop trigger if exists block_disposable_email_trg on auth.users;
create trigger block_disposable_email_trg
  before insert on auth.users
  for each row execute function public.block_disposable_email();

-- ═══════════════════════════════════════════════════════════════
-- Rest-alarm push subscriptions (2026-07-29)
-- Written only by the Vercel function api/rest-push.js using the
-- service role key. RLS is on with NO policies on purpose: the anon
-- key used by the app gets no access to this table at all.
-- ═══════════════════════════════════════════════════════════════
create table if not exists public.push_subscriptions (
  device_id text primary key,
  subscription jsonb not null,
  alarm_id text,
  updated_at timestamptz not null default now()
);

alter table public.push_subscriptions enable row level security;
