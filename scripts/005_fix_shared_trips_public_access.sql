-- Fix shared trips public access for anonymous users

-- Fix the public read policy to allow anonymous users
drop policy if exists "shared_trips_public_read" on public.shared_trips;
create policy "shared_trips_public_read"
  on public.shared_trips
  for select
  to anon, authenticated
  using (is_active = true);

-- Remove the redundant anon policy since we fixed the main one
drop policy if exists "shared_trips_anon_read" on public.shared_trips;