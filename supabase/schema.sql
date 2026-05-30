-- Good Fruit Platform starter schema for Supabase/Postgres.
-- Run in the Supabase SQL editor after creating the project.

create extension if not exists pgcrypto;
create extension if not exists postgis;

do $$ begin
  create type public.good_fruit_role as enum ('visitor', 'guest', 'member', 'business', 'admin');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.verification_status as enum ('not_required', 'pending', 'verified', 'rejected');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.directory_type as enum ('church', 'ministry', 'community_group', 'business', 'service_provider', 'training_provider');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.visibility as enum ('private', 'trusted', 'public');
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  legal_name text,
  email text,
  role public.good_fruit_role not null default 'visitor',
  home_area text,
  feed_radius text default '25 miles',
  interests text[] not null default '{}',
  email_confirmed boolean not null default false,
  id_verification_status public.verification_status not null default 'not_required',
  stripe_customer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  type public.directory_type not null,
  name text not null,
  description text,
  website text,
  phone text,
  email text,
  address text,
  city text,
  region text,
  postal_code text,
  location geography(point, 4326),
  verified boolean not null default false,
  stripe_subscription_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.prayer_requests (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete set null,
  title text not null,
  body text not null,
  visibility public.visibility not null default 'trusted',
  city text,
  location geography(point, 4326),
  answered_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.needs (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete set null,
  title text not null,
  body text not null,
  category text,
  urgency text,
  city text,
  location geography(point, 4326),
  status text not null default 'open',
  visibility public.visibility not null default 'trusted',
  created_at timestamptz not null default now()
);

create table if not exists public.marketplace_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete set null,
  title text not null,
  body text not null,
  post_type text not null check (post_type in ('offer', 'service', 'barter', 'free', 'request')),
  price_cents integer,
  city text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete set null,
  title text not null,
  body text,
  event_type text,
  starts_at timestamptz,
  ends_at timestamptz,
  address text,
  city text,
  location geography(point, 4326),
  signup_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.learning_paths (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete set null,
  title text not null,
  body text,
  category text,
  format text,
  provider text,
  cost_cents integer,
  url text,
  starts_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.trust_events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  event_type text not null,
  points integer not null default 0,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.advocate_sessions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  title text,
  created_at timestamptz not null default now()
);

create table if not exists public.advocate_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.advocate_sessions(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  role text not null check (role in ('user', 'assistant', 'system')),
  body text not null,
  model text,
  response_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references public.profiles(id) on delete set null,
  target_table text not null,
  target_id uuid not null,
  reason text not null,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_table text,
  target_id uuid,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, email_confirmed)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    new.email_confirmed_at is not null
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.prayer_requests enable row level security;
alter table public.needs enable row level security;
alter table public.marketplace_posts enable row level security;
alter table public.events enable row level security;
alter table public.learning_paths enable row level security;
alter table public.trust_events enable row level security;
alter table public.advocate_sessions enable row level security;
alter table public.advocate_messages enable row level security;
alter table public.reports enable row level security;
alter table public.audit_logs enable row level security;

create policy "Profiles can read their own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Profiles can create their own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Profiles can update their own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Public can read verified organizations"
  on public.organizations for select using (verified = true);

create policy "Owners can manage their organizations"
  on public.organizations for all using (auth.uid() = owner_id);

create policy "Public can read public prayer requests"
  on public.prayer_requests for select using (visibility = 'public');

create policy "Authors can manage prayer requests"
  on public.prayer_requests for all using (auth.uid() = author_id);

create policy "Public can read public needs"
  on public.needs for select using (visibility = 'public');

create policy "Authors can manage needs"
  on public.needs for all using (auth.uid() = author_id);

create policy "Public can read active marketplace posts"
  on public.marketplace_posts for select using (status = 'active');

create policy "Authors can manage marketplace posts"
  on public.marketplace_posts for all using (auth.uid() = author_id);

create policy "Public can read events"
  on public.events for select using (true);

create policy "Public can read learning paths"
  on public.learning_paths for select using (true);

create policy "Profiles can read their trust events"
  on public.trust_events for select using (auth.uid() = profile_id);

create policy "Profiles can manage their advocate sessions"
  on public.advocate_sessions for all using (auth.uid() = profile_id);

create policy "Profiles can read their advocate messages"
  on public.advocate_messages for select using (auth.uid() = profile_id);

create policy "Profiles can create reports"
  on public.reports for insert with check (auth.uid() = reporter_id);

create index if not exists organizations_location_idx on public.organizations using gist (location);
create index if not exists prayer_requests_location_idx on public.prayer_requests using gist (location);
create index if not exists needs_location_idx on public.needs using gist (location);
create index if not exists events_location_idx on public.events using gist (location);
create index if not exists organizations_search_idx on public.organizations using gin (to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(city, '')));
create index if not exists needs_search_idx on public.needs using gin (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(body, '') || ' ' || coalesce(category, '')));
create index if not exists marketplace_search_idx on public.marketplace_posts using gin (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(body, '') || ' ' || coalesce(post_type, '')));
