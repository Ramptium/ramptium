begin;

create extension if not exists pgcrypto;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  owner_user_id uuid not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null,
  role text not null check (role in ('owner', 'admin', 'developer', 'billing', 'viewer')),
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  slug text not null,
  status text not null default 'active' check (status in ('active', 'suspended', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, slug)
);

create table if not exists public.project_members (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null,
  role text not null check (role in ('owner', 'admin', 'developer', 'viewer')),
  created_at timestamptz not null default now(),
  unique (project_id, user_id)
);

create table if not exists public.rate_limit_profiles (
  id uuid primary key default gen_random_uuid(),
  project_id uuid null references public.projects(id) on delete cascade,
  name text not null,
  burst_rps integer not null,
  sustained_rpm integer not null,
  daily_limit bigint null,
  monthly_limit bigint null,
  method_weights jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.api_keys_v2 (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  key_prefix text not null,
  key_hash text not null,
  environment text not null check (environment in ('test', 'live')),
  status text not null default 'active' check (status in ('active', 'revoked', 'expired')),
  scopes jsonb not null default '[]'::jsonb,
  allowed_chains jsonb not null default '[]'::jsonb,
  ip_allowlist jsonb not null default '[]'::jsonb,
  rate_limit_profile_id uuid null references public.rate_limit_profiles(id) on delete set null,
  created_by uuid not null,
  last_used_at timestamptz null,
  expires_at timestamptz null,
  revoked_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rpc_endpoints (
  id uuid primary key default gen_random_uuid(),
  provider_name text not null,
  chain text not null,
  network text not null,
  endpoint_url text not null,
  auth_secret_ref text null,
  region text null,
  priority_weight integer not null default 100,
  cost_weight numeric(10,4) not null default 1.0000,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.endpoint_health (
  id uuid primary key default gen_random_uuid(),
  endpoint_id uuid not null unique references public.rpc_endpoints(id) on delete cascade,
  health_status text not null default 'healthy' check (health_status in ('healthy', 'degraded', 'unhealthy')),
  circuit_state text not null default 'closed' check (circuit_state in ('closed', 'open', 'half_open')),
  rolling_latency_ms numeric(10,2) null,
  success_rate_1m numeric(5,2) null,
  success_rate_5m numeric(5,2) null,
  error_rate_1m numeric(5,2) null,
  last_probe_at timestamptz null,
  last_failure_reason text null,
  updated_at timestamptz not null default now()
);

create table if not exists public.routing_policies (
  id uuid primary key default gen_random_uuid(),
  project_id uuid null references public.projects(id) on delete cascade,
  chain text not null,
  network text not null,
  policy jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, chain, network)
);

create table if not exists public.request_events (
  id uuid primary key default gen_random_uuid(),
  request_id text not null unique,
  project_id uuid not null references public.projects(id) on delete cascade,
  api_key_id uuid not null references public.api_keys_v2(id) on delete cascade,
  chain text not null,
  network text not null,
  rpc_method text not null,
  request_timestamp timestamptz not null default now(),
  response_status integer null,
  upstream_status integer null,
  upstream_provider text null,
  upstream_endpoint_id uuid null references public.rpc_endpoints(id) on delete set null,
  latency_ms integer null,
  retry_count integer not null default 0,
  bytes_in integer null,
  bytes_out integer null,
  auth_result text not null,
  rate_limit_result text not null,
  error_class text null,
  billable_units integer not null default 0,
  billable boolean not null default false,
  client_ip inet null,
  region text null,
  created_at timestamptz not null default now()
);

create table if not exists public.routing_attempts (
  id uuid primary key default gen_random_uuid(),
  request_event_id uuid not null references public.request_events(id) on delete cascade,
  attempt_number integer not null,
  endpoint_id uuid not null references public.rpc_endpoints(id) on delete cascade,
  provider_name text not null,
  latency_ms integer null,
  outcome text not null,
  error_class text null,
  created_at timestamptz not null default now(),
  unique (request_event_id, attempt_number)
);

create table if not exists public.usage_aggregates_daily (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  api_key_id uuid null references public.api_keys_v2(id) on delete set null,
  date date not null,
  chain text not null,
  request_count bigint not null default 0,
  success_count bigint not null default 0,
  error_count bigint not null default 0,
  billable_units bigint not null default 0,
  latency_p50 numeric(10,2) null,
  latency_p95 numeric(10,2) null,
  latency_p99 numeric(10,2) null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, api_key_id, date, chain)
);

create table if not exists public.usage_aggregates_monthly (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  month date not null,
  request_count bigint not null default 0,
  success_count bigint not null default 0,
  error_count bigint not null default 0,
  billable_units bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, month)
);

create table if not exists public.billing_accounts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null unique references public.organizations(id) on delete cascade,
  stripe_customer_id text null,
  billing_email text null,
  status text not null default 'active' check (status in ('active', 'past_due', 'suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.billing_usage_ledger (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  billing_period_start date not null,
  billing_period_end date not null,
  usage_type text not null,
  quantity bigint not null,
  source_reference text not null,
  reconciled boolean not null default false,
  stripe_reported boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscriptions_v2 (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  billing_account_id uuid not null references public.billing_accounts(id) on delete cascade,
  plan text not null check (plan in ('free', 'pro', 'enterprise')),
  status text not null,
  monthly_request_limit bigint not null default 0,
  overage_price jsonb not null default '{}'::jsonb,
  stripe_subscription_id text null,
  current_period_start timestamptz null,
  current_period_end timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_api_keys_v2_project_id on public.api_keys_v2(project_id);
create index if not exists idx_api_keys_v2_key_prefix on public.api_keys_v2(key_prefix);
create index if not exists idx_request_events_project_id on public.request_events(project_id);
create index if not exists idx_request_events_api_key_id on public.request_events(api_key_id);
create index if not exists idx_request_events_timestamp on public.request_events(request_timestamp desc);
create index if not exists idx_request_events_chain on public.request_events(chain);
create index if not exists idx_request_events_billable on public.request_events(billable);
create index if not exists idx_routing_attempts_request_event_id on public.routing_attempts(request_event_id);
create index if not exists idx_rpc_endpoints_chain_network on public.rpc_endpoints(chain, network);
create index if not exists idx_endpoint_health_status on public.endpoint_health(health_status, circuit_state);
create index if not exists idx_usage_daily_project_date on public.usage_aggregates_daily(project_id, date desc);
create index if not exists idx_usage_monthly_project_month on public.usage_aggregates_monthly(project_id, month desc);
create index if not exists idx_billing_usage_ledger_project_period on public.billing_usage_ledger(project_id, billing_period_start, billing_period_end);

commit;
