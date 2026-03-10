-- Fix shared trips public access for anonymous users

-- Allow anonymous users to read active shared trips
drop policy if exists "shared_trips_anon_read" on public.shared_trips;
create policy "shared_trips_anon_read"
  on public.shared_trips
  for select
  to anon
  using (is_active = true);