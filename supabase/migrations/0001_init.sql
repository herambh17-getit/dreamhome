-- ============================================================
-- Dream Home Properties — initial schema
--
-- Run against a Supabase project:
--   supabase db push
-- or paste into the SQL editor.
--
-- Security model:
--   * Public (anon) can READ published properties/projects/blog/etc.
--   * Public can INSERT enquiries, and nothing else. It cannot read them
--     back — lead data is not world-readable.
--   * Authenticated admins can do everything, gated on an `admins` table
--     rather than on a role claim, so access can be revoked without
--     touching auth config.
-- ============================================================

create extension if not exists "uuid-ossp";

-- ---------- enums ----------
create type property_type as enum (
  'Apartment', 'Villa', 'Penthouse', 'Plot',
  'Office', 'Shop', 'Showroom', 'Warehouse'
);

create type property_status as enum (
  'Ready to Move', 'Under Construction', 'New Launch', 'Resale', 'Sold'
);

create type listing_intent as enum ('buy', 'rent', 'commercial');

create type enquiry_status as enum ('new', 'contacted', 'qualified', 'closed');

-- ---------- admins ----------
-- Membership here is what grants write access. Insert a row keyed to the
-- Supabase auth user id to make someone an admin.
create table admins (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text,
  created_at timestamptz not null default now()
);

create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from admins where id = auth.uid());
$$;

-- ---------- locations ----------
create table locations (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  tagline text,
  description text,
  image text,
  highlights text[] not null default '{}',
  connectivity text[] not null default '{}',
  avg_price_per_sqft integer,
  created_at timestamptz not null default now()
);

-- ---------- developers ----------
create table developers (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  established integer,
  description text,
  logo text,
  created_at timestamptz not null default now()
);

-- ---------- properties ----------
-- Column names follow the client's "Property Data Schema" document.
create table properties (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  property_type property_type not null,
  configuration text not null,
  location text not null,
  location_slug text references locations(slug) on delete set null,
  price bigint not null default 0,          -- absolute INR
  rent bigint,                              -- monthly INR, rentals only
  carpet_area integer not null,             -- sq. ft.
  developer text,
  developer_slug text references developers(slug) on delete set null,
  status property_status not null,
  rera text,                                -- MahaRERA reg. no. Never invent one.
  description text,
  amenities text[] not null default '{}',
  gallery text[] not null default '{}',
  floor_plans jsonb not null default '[]',
  intent listing_intent not null default 'buy',
  featured boolean not null default false,
  published boolean not null default false,
  possession text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index properties_published_idx on properties(published) where published;
create index properties_intent_idx on properties(intent);
create index properties_location_idx on properties(location_slug);
create index properties_price_idx on properties(price);
create index properties_featured_idx on properties(featured) where featured;

-- Full-text search across the fields people actually type into a search box.
alter table properties add column search_vector tsvector
  generated always as (
    to_tsvector('english',
      coalesce(title, '') || ' ' ||
      coalesce(location, '') || ' ' ||
      coalesce(configuration, '') || ' ' ||
      coalesce(developer, '') || ' ' ||
      coalesce(description, '')
    )
  ) stored;

create index properties_search_idx on properties using gin(search_vector);

-- ---------- projects ----------
create table projects (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  developer text,
  developer_slug text references developers(slug) on delete set null,
  location text not null,
  location_slug text references locations(slug) on delete set null,
  configurations text[] not null default '{}',
  price_from bigint,
  status property_status not null,
  rera text,
  possession text,
  description text,
  highlights text[] not null default '{}',
  amenities text[] not null default '{}',
  gallery text[] not null default '{}',
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create index projects_published_idx on projects(published) where published;

-- ---------- blog ----------
create table blog_posts (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text,
  category text,
  author text,
  image text,
  tags text[] not null default '{}',
  reading_minutes integer,
  featured boolean not null default false,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index blog_published_idx on blog_posts(published, published_at desc);

-- ---------- testimonials ----------
-- `consented` exists because publishing a client's words without permission
-- is not acceptable. Read policy requires it to be true — the database
-- enforces the rule rather than trusting the UI to remember.
create table testimonials (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  location text,
  rating smallint not null check (rating between 1 and 5),
  quote text not null,
  context text,
  source text not null default 'Direct',
  consented boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- faqs ----------
create table faqs (
  id uuid primary key default uuid_generate_v4(),
  question text not null,
  answer text not null,
  category text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- enquiries (CRM) ----------
create table enquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  email text,
  message text,
  source text not null,                     -- which form produced the lead
  intent listing_intent,
  property_id uuid references properties(id) on delete set null,
  budget text,
  status enquiry_status not null default 'new',
  notes text,
  -- Captured for attribution. No IP or fingerprinting: this is a lead form,
  -- not an analytics surface, and we collect only what the business needs.
  utm_source text,
  utm_medium text,
  utm_campaign text,
  page_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index enquiries_status_idx on enquiries(status, created_at desc);

-- ---------- updated_at trigger ----------
create or replace function touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger properties_touch before update on properties
  for each row execute function touch_updated_at();
create trigger blog_touch before update on blog_posts
  for each row execute function touch_updated_at();
create trigger enquiries_touch before update on enquiries
  for each row execute function touch_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================

alter table admins       enable row level security;
alter table locations    enable row level security;
alter table developers   enable row level security;
alter table properties   enable row level security;
alter table projects     enable row level security;
alter table blog_posts   enable row level security;
alter table testimonials enable row level security;
alter table faqs         enable row level security;
alter table enquiries    enable row level security;

-- admins: a user may see their own row; only admins manage the table.
create policy "admins read self" on admins
  for select using (id = auth.uid());
create policy "admins manage" on admins
  for all using (is_admin()) with check (is_admin());

-- Reference data: world-readable, admin-writable.
create policy "locations public read" on locations
  for select using (true);
create policy "locations admin write" on locations
  for all using (is_admin()) with check (is_admin());

create policy "developers public read" on developers
  for select using (true);
create policy "developers admin write" on developers
  for all using (is_admin()) with check (is_admin());

-- Content: only published rows are public. Admins see drafts too.
create policy "properties public read" on properties
  for select using (published or is_admin());
create policy "properties admin write" on properties
  for all using (is_admin()) with check (is_admin());

create policy "projects public read" on projects
  for select using (published or is_admin());
create policy "projects admin write" on projects
  for all using (is_admin()) with check (is_admin());

create policy "blog public read" on blog_posts
  for select using (published or is_admin());
create policy "blog admin write" on blog_posts
  for all using (is_admin()) with check (is_admin());

-- Testimonials: published AND consented. Both, always.
create policy "testimonials public read" on testimonials
  for select using ((published and consented) or is_admin());
create policy "testimonials admin write" on testimonials
  for all using (is_admin()) with check (is_admin());

create policy "faqs public read" on faqs
  for select using (published or is_admin());
create policy "faqs admin write" on faqs
  for all using (is_admin()) with check (is_admin());

-- Enquiries: anyone may submit; nobody but an admin may read.
-- Note there is deliberately NO public select policy. RLS denies by
-- default, so leads are unreadable to anon even with the anon key.
create policy "enquiries public insert" on enquiries
  for insert with check (true);
create policy "enquiries admin read" on enquiries
  for select using (is_admin());
create policy "enquiries admin write" on enquiries
  for update using (is_admin()) with check (is_admin());
create policy "enquiries admin delete" on enquiries
  for delete using (is_admin());
