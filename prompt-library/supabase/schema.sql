-- =========================================================================
-- prompt-library v2 schema
-- Paste into Supabase SQL Editor and run. Idempotent — safe to re-run.
-- =========================================================================

-- ---------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------
-- config — feature flags. Single-row table keyed by `key`.
-- Read-only for everyone; admin-only writes.
-- ---------------------------------------------------------------
create table if not exists public.config (
  key          text primary key,
  value        jsonb not null,
  updated_at   timestamptz not null default now()
);

insert into public.config (key, value) values
  ('allow_anon_likes',       'true'::jsonb),
  ('require_approval',       'true'::jsonb),
  ('max_submissions_per_day','3'::jsonb)
on conflict (key) do nothing;

-- ---------------------------------------------------------------
-- profiles — 1:1 with auth.users. Created by trigger on signup.
-- ---------------------------------------------------------------
create table if not exists public.profiles (
  id             uuid primary key references auth.users(id) on delete cascade,
  handle         text unique,
  avatar_url     text,
  bio            text default '',
  x_handle       text,
  github_handle  text,
  is_admin       boolean not null default false,
  created_at     timestamptz not null default now()
);

create index if not exists profiles_handle_idx on public.profiles(handle);

-- ---------------------------------------------------------------
-- Reserved handle blocklist. Checked in app + trigger.
-- ---------------------------------------------------------------
create table if not exists public.reserved_handles (
  handle text primary key
);

insert into public.reserved_handles (handle) values
  ('admin'), ('administrator'), ('mod'), ('moderator'),
  ('claude'), ('anthropic'), ('openai'), ('gpt'), ('chatgpt'),
  ('root'), ('system'), ('null'), ('undefined'),
  ('prompt-library'), ('promptlibrary'), ('library'),
  ('support'), ('help'), ('api'), ('www')
on conflict do nothing;

-- Auto-create profile row on new signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, avatar_url, github_handle)
  values (
    new.id,
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'user_name'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------
-- prompts — canonical rendered data. Seeded from prompts.js.
-- ---------------------------------------------------------------
create table if not exists public.prompts (
  id            bigint primary key,
  title         text not null,
  category      text not null,
  complexity    text not null check (complexity in ('beginner','intermediate','advanced')),
  purpose       text not null,
  tags          text[] not null default '{}',
  models        text[] not null default '{}',
  temperature   text,
  prompt        text not null,
  chaining      text default '',
  notes         text default '',
  submitted_by  uuid references public.profiles(id) on delete set null,
  created_at    timestamptz not null default now()
);

create index if not exists prompts_category_idx   on public.prompts(category);
create index if not exists prompts_complexity_idx on public.prompts(complexity);

-- ---------------------------------------------------------------
-- submissions — pending/approved/rejected prompts from users.
-- ---------------------------------------------------------------
create type submission_status as enum ('pending','approved','rejected');
create table if not exists public.submissions (
  id            uuid primary key default gen_random_uuid(),
  submitter_id  uuid not null references public.profiles(id) on delete cascade,
  payload       jsonb not null,
  status        submission_status not null default 'pending',
  review_note   text,
  reviewed_by   uuid references public.profiles(id) on delete set null,
  reviewed_at   timestamptz,
  created_at    timestamptz not null default now()
);

create index if not exists submissions_status_idx    on public.submissions(status);
create index if not exists submissions_submitter_idx on public.submissions(submitter_id);

-- ---------------------------------------------------------------
-- likes — user and anon (ip_hash) likes. Exactly one column set.
-- ---------------------------------------------------------------
create table if not exists public.likes (
  id         uuid primary key default gen_random_uuid(),
  prompt_id  bigint not null references public.prompts(id) on delete cascade,
  user_id    uuid references public.profiles(id) on delete cascade,
  ip_hash    text,
  created_at timestamptz not null default now(),
  check ((user_id is null) <> (ip_hash is null))
);

create unique index if not exists likes_user_unique
  on public.likes(user_id, prompt_id) where user_id is not null;
create unique index if not exists likes_anon_unique
  on public.likes(ip_hash, prompt_id) where ip_hash is not null;

-- =========================================================================
-- Row-Level Security
-- =========================================================================

alter table public.config            enable row level security;
alter table public.profiles          enable row level security;
alter table public.reserved_handles  enable row level security;
alter table public.prompts           enable row level security;
alter table public.submissions       enable row level security;
alter table public.likes             enable row level security;

-- Helper: is caller admin?
create or replace function public.is_admin()
returns boolean language sql stable as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- config: world-readable, admin-writable.
drop policy if exists config_read on public.config;
create policy config_read on public.config for select using (true);
drop policy if exists config_write on public.config;
create policy config_write on public.config for all using (public.is_admin()) with check (public.is_admin());

-- reserved_handles: world-readable, admin-writable.
drop policy if exists reserved_read on public.reserved_handles;
create policy reserved_read on public.reserved_handles for select using (true);
drop policy if exists reserved_write on public.reserved_handles;
create policy reserved_write on public.reserved_handles for all using (public.is_admin()) with check (public.is_admin());

-- profiles: everyone can read, only owner can update their own (except is_admin).
drop policy if exists profiles_read on public.profiles;
create policy profiles_read on public.profiles for select using (true);
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id)
  with check (auth.uid() = id and is_admin = (select is_admin from public.profiles where id = auth.uid()));

-- prompts: world-readable, admin-writable (submissions approval path writes here).
drop policy if exists prompts_read on public.prompts;
create policy prompts_read on public.prompts for select using (true);
drop policy if exists prompts_write on public.prompts;
create policy prompts_write on public.prompts for all using (public.is_admin()) with check (public.is_admin());

-- submissions:
--   read:  submitter sees own, admins see all
--   insert: any logged-in user (rate-limited via function below)
--   update/delete: admins only
drop policy if exists submissions_read on public.submissions;
create policy submissions_read on public.submissions for select
  using (auth.uid() = submitter_id or public.is_admin());

drop policy if exists submissions_insert on public.submissions;
create policy submissions_insert on public.submissions for insert
  with check (
    auth.uid() = submitter_id
    and (
      select count(*) from public.submissions
      where submitter_id = auth.uid()
        and created_at > now() - interval '1 day'
    ) < coalesce((select (value#>>'{}')::int from public.config where key = 'max_submissions_per_day'), 3)
  );

drop policy if exists submissions_admin_write on public.submissions;
create policy submissions_admin_write on public.submissions for update
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists submissions_admin_delete on public.submissions;
create policy submissions_admin_delete on public.submissions for delete
  using (public.is_admin());

-- likes:
--   read: world-readable (counts are public)
--   insert (user): logged-in user liking as themselves
--   insert (anon): only if config.allow_anon_likes = true; ip_hash provided by client
--   delete: owner only
drop policy if exists likes_read on public.likes;
create policy likes_read on public.likes for select using (true);

drop policy if exists likes_insert_user on public.likes;
create policy likes_insert_user on public.likes for insert
  with check (
    user_id = auth.uid() and ip_hash is null
  );

drop policy if exists likes_insert_anon on public.likes;
create policy likes_insert_anon on public.likes for insert
  with check (
    user_id is null
    and ip_hash is not null
    and coalesce((select (value#>>'{}')::boolean from public.config where key = 'allow_anon_likes'), false)
  );

drop policy if exists likes_delete_own on public.likes;
create policy likes_delete_own on public.likes for delete
  using (user_id = auth.uid());

-- =========================================================================
-- Handle validation
-- =========================================================================
create or replace function public.validate_handle(h text)
returns boolean language plpgsql stable as $$
begin
  if h is null then return true; end if;
  if length(h) < 3 or length(h) > 24 then return false; end if;
  if h !~ '^[a-z0-9_-]+$' then return false; end if;
  if exists (select 1 from public.reserved_handles where reserved_handles.handle = lower(h)) then
    return false;
  end if;
  return true;
end;
$$;

alter table public.profiles
  drop constraint if exists profiles_handle_valid,
  add  constraint profiles_handle_valid check (handle is null or public.validate_handle(handle));
