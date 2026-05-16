create extension if not exists pgcrypto;

create type public.user_role as enum ('admin', 'editor', 'sales', 'client');
create type public.lead_stage as enum ('new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost');
create type public.inquiry_status as enum ('new', 'reviewed', 'replied', 'archived', 'spam');
create type public.plan_interval as enum ('one_time', 'monthly', 'annual');
create type public.order_status as enum ('draft', 'created', 'paid', 'failed', 'cancelled');
create type public.payment_status as enum ('created', 'authorized', 'captured', 'failed', 'refunded', 'cancelled');
create type public.content_status as enum ('draft', 'published', 'archived');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text unique not null,
  email text,
  first_name text,
  last_name text,
  full_name text generated always as (trim(coalesce(first_name, '') || ' ' || coalesce(last_name, ''))) stored,
  avatar_url text,
  phone text,
  company_name text,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role public.user_role not null,
  created_at timestamptz not null default timezone('utc', now()),
  unique (profile_id, role)
);

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  first_name text not null,
  last_name text,
  email text not null,
  phone text,
  company_name text,
  requested_service text,
  budget_range text,
  message text not null,
  source text not null default 'website',
  status public.inquiry_status not null default 'new',
  stage public.lead_stage not null default 'new',
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.lead_activities (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null references public.contact_inquiries(id) on delete cascade,
  actor_profile_id uuid references public.profiles(id) on delete set null,
  activity_type text not null,
  content text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.service_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.service_categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  short_description text,
  long_description text,
  icon text,
  gradient text,
  is_featured boolean not null default false,
  status public.content_status not null default 'published',
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.pricing_plans (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  slug text not null unique,
  description text,
  price_amount integer not null,
  currency text not null default 'USD',
  interval public.plan_interval not null default 'one_time',
  compare_at_amount integer,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  clerk_plan_id text,
  razorpay_plan_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.pricing_plan_features (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.pricing_plans(id) on delete cascade,
  feature_text text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.portfolio_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.portfolio_categories(id) on delete set null,
  title text not null,
  slug text not null unique,
  summary text,
  description text,
  cover_image_url text,
  accent_color text,
  project_url text,
  case_study_url text,
  status public.content_status not null default 'published',
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  role text,
  company_name text,
  content text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  avatar_url text,
  initials text,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  status public.content_status not null default 'published',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.site_stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value_numeric numeric not null,
  suffix text,
  description text,
  decimals integer not null default 0,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_profile_id uuid references public.profiles(id) on delete set null,
  category_id uuid references public.blog_categories(id) on delete set null,
  title text not null,
  slug text not null unique,
  excerpt text,
  content_markdown text,
  cover_image_url text,
  seo_title text,
  seo_description text,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.blog_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.blog_post_tags (
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  tag_id uuid not null references public.blog_tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  setting_key text not null unique,
  setting_value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.customer_accounts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique not null references public.profiles(id) on delete cascade,
  billing_email text,
  external_customer_ref text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.payment_orders (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  customer_account_id uuid references public.customer_accounts(id) on delete set null,
  pricing_plan_id uuid references public.pricing_plans(id) on delete set null,
  receipt text unique not null,
  razorpay_order_id text unique,
  amount integer not null check (amount >= 100),
  currency text not null default 'USD',
  billing_interval public.plan_interval not null default 'one_time',
  status public.order_status not null default 'draft',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  payment_order_id uuid references public.payment_orders(id) on delete set null,
  profile_id uuid references public.profiles(id) on delete set null,
  pricing_plan_id uuid references public.pricing_plans(id) on delete set null,
  provider text not null default 'razorpay',
  provider_payment_id text unique,
  provider_order_id text,
  amount integer not null check (amount >= 100),
  currency text not null default 'USD',
  status public.payment_status not null default 'created',
  signature_verified boolean not null default false,
  paid_at timestamptz,
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.payment_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null default 'razorpay',
  event_name text not null,
  event_id text,
  payload jsonb not null,
  processed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  pricing_plan_id uuid references public.pricing_plans(id) on delete set null,
  provider text not null default 'manual',
  provider_subscription_id text unique,
  status text not null,
  starts_at timestamptz,
  ends_at timestamptz,
  renews_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.plan_entitlements (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  pricing_plan_id uuid not null references public.pricing_plans(id) on delete cascade,
  payment_id uuid references public.payments(id) on delete set null,
  status text not null default 'active',
  granted_at timestamptz not null default timezone('utc', now()),
  expires_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.client_projects (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  inquiry_id uuid references public.contact_inquiries(id) on delete set null,
  project_name text not null,
  slug text not null unique,
  status text not null default 'active',
  summary text,
  start_date date,
  end_date date,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.project_messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.client_projects(id) on delete cascade,
  author_profile_id uuid references public.profiles(id) on delete set null,
  body text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.client_projects(id) on delete cascade,
  uploaded_by_profile_id uuid references public.profiles(id) on delete set null,
  bucket_name text not null,
  storage_path text not null,
  file_name text not null,
  mime_type text,
  file_size bigint,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.project_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.client_projects(id) on delete cascade,
  assigned_to_profile_id uuid references public.profiles(id) on delete set null,
  title text not null,
  description text,
  status text not null default 'todo',
  due_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_profiles_clerk_user_id on public.profiles(clerk_user_id);
create index if not exists idx_contact_inquiries_email on public.contact_inquiries(email);
create index if not exists idx_contact_inquiries_stage on public.contact_inquiries(stage);
create index if not exists idx_blog_posts_status_published_at on public.blog_posts(status, published_at desc);
create index if not exists idx_payment_orders_profile_id on public.payment_orders(profile_id);
create index if not exists idx_payment_orders_razorpay_order_id on public.payment_orders(razorpay_order_id);
create index if not exists idx_payments_profile_id on public.payments(profile_id);
create index if not exists idx_payments_provider_order_id on public.payments(provider_order_id);
create index if not exists idx_plan_entitlements_profile_id on public.plan_entitlements(profile_id);
create index if not exists idx_client_projects_profile_id on public.client_projects(profile_id);

create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger trg_contact_inquiries_updated_at
before update on public.contact_inquiries
for each row execute function public.set_updated_at();

create trigger trg_service_categories_updated_at
before update on public.service_categories
for each row execute function public.set_updated_at();

create trigger trg_services_updated_at
before update on public.services
for each row execute function public.set_updated_at();

create trigger trg_pricing_plans_updated_at
before update on public.pricing_plans
for each row execute function public.set_updated_at();

create trigger trg_portfolio_projects_updated_at
before update on public.portfolio_projects
for each row execute function public.set_updated_at();

create trigger trg_testimonials_updated_at
before update on public.testimonials
for each row execute function public.set_updated_at();

create trigger trg_site_stats_updated_at
before update on public.site_stats
for each row execute function public.set_updated_at();

create trigger trg_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

create trigger trg_site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

create trigger trg_customer_accounts_updated_at
before update on public.customer_accounts
for each row execute function public.set_updated_at();

create trigger trg_payment_orders_updated_at
before update on public.payment_orders
for each row execute function public.set_updated_at();

create trigger trg_payments_updated_at
before update on public.payments
for each row execute function public.set_updated_at();

create trigger trg_subscriptions_updated_at
before update on public.subscriptions
for each row execute function public.set_updated_at();

create trigger trg_plan_entitlements_updated_at
before update on public.plan_entitlements
for each row execute function public.set_updated_at();

create trigger trg_client_projects_updated_at
before update on public.client_projects
for each row execute function public.set_updated_at();

create trigger trg_project_tasks_updated_at
before update on public.project_tasks
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.lead_activities enable row level security;
alter table public.services enable row level security;
alter table public.pricing_plans enable row level security;
alter table public.pricing_plan_features enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.testimonials enable row level security;
alter table public.site_stats enable row level security;
alter table public.blog_posts enable row level security;
alter table public.site_settings enable row level security;
alter table public.customer_accounts enable row level security;
alter table public.payment_orders enable row level security;
alter table public.payments enable row level security;
alter table public.payment_events enable row level security;
alter table public.subscriptions enable row level security;
alter table public.plan_entitlements enable row level security;
alter table public.client_projects enable row level security;
alter table public.project_messages enable row level security;
alter table public.project_files enable row level security;
alter table public.project_tasks enable row level security;

create policy "public can read published services"
on public.services
for select
using (status = 'published');

create policy "public can read active pricing plans"
on public.pricing_plans
for select
using (is_active = true);

create policy "public can read pricing plan features"
on public.pricing_plan_features
for select
using (true);

create policy "public can read published portfolio"
on public.portfolio_projects
for select
using (status = 'published');

create policy "public can read published testimonials"
on public.testimonials
for select
using (status = 'published');

create policy "public can read active stats"
on public.site_stats
for select
using (is_active = true);

create policy "public can read published blog posts"
on public.blog_posts
for select
using (status = 'published');

create policy "public can read public settings"
on public.site_settings
for select
using (true);

comment on table public.profiles is 'Application profile synced from Clerk users.';
comment on table public.contact_inquiries is 'Website contact form and inbound lead submissions.';
comment on table public.payment_orders is 'App-side order records tied to Razorpay order creation.';
comment on table public.payments is 'Payment records after verification or reconciliation.';
comment on table public.plan_entitlements is 'Access grants unlocked after successful payment.';
