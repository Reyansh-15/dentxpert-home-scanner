-- DentXpert Knowledge OS schema for InsForge/PostgreSQL.
-- Store only research metadata and notes; never store medical images or medical records.
create table if not exists dx_modules (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  body text not null default '',
  kind text not null default 'research',
  status text not null default 'open_question',
  source_url text,
  source_type text,
  tags text[] not null default '{}',
  metadata jsonb not null default '{}',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists dx_modules_search_idx on dx_modules using gin (to_tsvector('simple', title || ' ' || summary || ' ' || body));
create index if not exists dx_modules_tags_idx on dx_modules using gin (tags);
create table if not exists dx_links (
  id uuid primary key default gen_random_uuid(),
  from_module uuid not null references dx_modules(id) on delete cascade,
  to_module uuid not null references dx_modules(id) on delete cascade,
  relation text not null default 'related',
  weight numeric not null default 1,
  unique(from_module,to_module,relation)
);
create table if not exists dx_user_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id uuid references dx_modules(id) on delete cascade,
  title text not null default 'Untitled note',
  body text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table dx_modules enable row level security;
alter table dx_links enable row level security;
alter table dx_user_notes enable row level security;
create policy "public can read research modules" on dx_modules for select using (true);
create policy "public can read research links" on dx_links for select using (true);
create policy "users manage own notes" on dx_user_notes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

