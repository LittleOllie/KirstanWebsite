-- Run once in Supabase SQL editor (Dashboard → SQL → New query)

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text not null,
  answers jsonb not null default '{}'::jsonb,
  source text not null default 'waitlist',
  notified_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists waitlist_signups_created_at_idx
  on public.waitlist_signups (created_at desc);

-- Row Level Security: only service role (server) can read/write.
alter table public.waitlist_signups enable row level security;

-- Explicit deny for browser keys (anon / authenticated). service_role bypasses RLS.
drop policy if exists "deny_all_anon" on public.waitlist_signups;
drop policy if exists "deny_all_authenticated" on public.waitlist_signups;

create policy "deny_all_anon"
  on public.waitlist_signups
  for all
  to anon
  using (false)
  with check (false);

create policy "deny_all_authenticated"
  on public.waitlist_signups
  for all
  to authenticated
  using (false)
  with check (false);

revoke all on table public.waitlist_signups from anon, authenticated;
grant all on table public.waitlist_signups to service_role;
