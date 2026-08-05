-- If waitlist_signups already exists, run this in Supabase SQL editor
-- to lock down browser access (anon / authenticated).

alter table public.waitlist_signups enable row level security;

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
