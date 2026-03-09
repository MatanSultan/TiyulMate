-- TiyulMate product enhancements
-- Adds richer trip persistence, updated timestamps, and safe public sharing.

alter table public.trips
  add column if not exists language_code text default 'en',
  add column if not exists updated_at timestamp with time zone default now();

update public.trips
set language_code = coalesce(language_code, 'en'),
    updated_at = coalesce(updated_at, created_at, now());

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trips_set_updated_at on public.trips;

create trigger trips_set_updated_at
  before update on public.trips
  for each row
  execute function public.set_updated_at();

create index if not exists trips_user_id_created_at_idx
  on public.trips (user_id, created_at desc);

create unique index if not exists share_links_trip_id_unique
  on public.share_links (trip_id);

create index if not exists share_links_token_idx
  on public.share_links (token);

create or replace function public.get_shared_trip(share_token text)
returns setof public.trips
language sql
security definer
set search_path = public
as $$
  select t.*
  from public.share_links sl
  join public.trips t on t.id = sl.trip_id
  where sl.token = share_token
  limit 1;
$$;

revoke all on function public.get_shared_trip(text) from public;
grant execute on function public.get_shared_trip(text) to anon, authenticated;
