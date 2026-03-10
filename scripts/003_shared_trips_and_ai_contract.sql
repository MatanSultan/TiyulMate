-- Durable public sharing and richer itinerary persistence.

create table if not exists public.shared_trips (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null unique references public.trips(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  token text not null unique,
  title text not null,
  region text not null,
  duration_type text not null,
  language_code text not null default 'en',
  snapshot jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create unique index if not exists shared_trips_trip_id_unique
  on public.shared_trips (trip_id);

create unique index if not exists shared_trips_token_unique
  on public.shared_trips (token);

create index if not exists shared_trips_owner_idx
  on public.shared_trips (user_id, updated_at desc);

alter table public.shared_trips enable row level security;

drop policy if exists "shared_trips_owner_select" on public.shared_trips;
create policy "shared_trips_owner_select"
  on public.shared_trips
  for select
  using (auth.uid() = user_id);

drop policy if exists "shared_trips_owner_insert" on public.shared_trips;
create policy "shared_trips_owner_insert"
  on public.shared_trips
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "shared_trips_owner_update" on public.shared_trips;
create policy "shared_trips_owner_update"
  on public.shared_trips
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "shared_trips_owner_delete" on public.shared_trips;
create policy "shared_trips_owner_delete"
  on public.shared_trips
  for delete
  using (auth.uid() = user_id);

drop policy if exists "shared_trips_public_read" on public.shared_trips;
create policy "shared_trips_public_read"
  on public.shared_trips
  for select
  to anon, authenticated
  using (is_active = true);

-- Allow anonymous users to read active shared trips
drop policy if exists "shared_trips_anon_read" on public.shared_trips;
create policy "shared_trips_anon_read"
  on public.shared_trips
  for select
  to anon
  using (is_active = true);

drop trigger if exists shared_trips_set_updated_at on public.shared_trips;
create trigger shared_trips_set_updated_at
  before update on public.shared_trips
  for each row
  execute function public.set_updated_at();

insert into public.shared_trips (
  trip_id,
  user_id,
  token,
  title,
  region,
  duration_type,
  language_code,
  snapshot,
  is_active,
  created_at,
  updated_at
)
select
  t.id,
  t.user_id,
  sl.token,
  t.title,
  t.region,
  t.duration_type,
  coalesce(t.language_code, 'en'),
  jsonb_build_object(
    'id', t.id,
    'title', t.title,
    'region', t.region,
    'duration_type', t.duration_type,
    'difficulty', t.difficulty,
    'language_code', coalesce(t.language_code, 'en'),
    'preferences', coalesce(t.preferences, '{}'::jsonb),
    'itinerary', coalesce(t.itinerary, '{}'::jsonb),
    'created_at', t.created_at,
    'updated_at', t.updated_at,
    'shared_at', coalesce(sl.created_at, now())
  ),
  true,
  coalesce(sl.created_at, now()),
  now()
from public.share_links sl
join public.trips t on t.id = sl.trip_id
on conflict (trip_id) do update
set
  token = excluded.token,
  title = excluded.title,
  region = excluded.region,
  duration_type = excluded.duration_type,
  language_code = excluded.language_code,
  snapshot = excluded.snapshot,
  is_active = true,
  updated_at = now();

drop function if exists public.get_shared_trip(text);
