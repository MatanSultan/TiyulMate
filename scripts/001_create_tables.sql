-- TiyulMate Database Schema
-- Tables: profiles, trips, share_links with RLS

-- Profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles for delete using (auth.uid() = id);

-- Trips table
create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  region text not null,
  duration_type text not null,
  difficulty text not null,
  preferences jsonb default '{}'::jsonb,
  itinerary jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);

alter table public.trips enable row level security;

create policy "trips_select_own" on public.trips for select using (auth.uid() = user_id);
create policy "trips_insert_own" on public.trips for insert with check (auth.uid() = user_id);
create policy "trips_update_own" on public.trips for update using (auth.uid() = user_id);
create policy "trips_delete_own" on public.trips for delete using (auth.uid() = user_id);

-- Share links table
create table if not exists public.share_links (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  token text unique not null,
  created_at timestamp with time zone default now()
);

alter table public.share_links enable row level security;

-- Users can only manage share links for trips they own
create policy "share_links_select_own" on public.share_links for select using (
  exists (select 1 from public.trips where trips.id = share_links.trip_id and trips.user_id = auth.uid())
);
create policy "share_links_insert_own" on public.share_links for insert with check (
  exists (select 1 from public.trips where trips.id = share_links.trip_id and trips.user_id = auth.uid())
);
create policy "share_links_delete_own" on public.share_links for delete using (
  exists (select 1 from public.trips where trips.id = share_links.trip_id and trips.user_id = auth.uid())
);

-- Trigger to auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', null)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
