# GrowOrbit Supabase Backend Blueprint

## Current App Snapshot

After scanning the codebase, the website is currently:

- A Next.js 16 App Router marketing site
- Using Clerk for authentication
- Using Razorpay Standard Checkout for one-time payments
- Mostly static content for services, about, testimonials, stats, and portfolio
- Missing a real backend for:
  - contact form submissions
  - lead and CRM tracking
  - content management
  - payment persistence
  - plan fulfillment and entitlements
  - admin workflows

## Recommendation

Do **not** replace Clerk right now.

Use:

- `Clerk` for authentication and session UX
- `Supabase Postgres` for database
- `Supabase Storage` for media and uploaded assets
- `Supabase Edge Functions` for webhooks and secure background tasks
- `Supabase Realtime` only where we actually need it later

This is the smoothest path because your app already depends on Clerk, and replacing auth at the same time as building the backend would create unnecessary migration risk.

## What The Backend Should Cover

### Public Website

- contact inquiries
- consultation requests
- newsletter subscriptions
- service catalog
- pricing plans
- portfolio projects
- testimonials
- site stats
- blog CMS
- SEO metadata and content settings

### Authenticated User Layer

- user profile synced from Clerk
- purchased plans
- payment history
- project onboarding details
- client requests
- access flags / entitlements

### Internal Admin Layer

- admin users
- lead management pipeline
- payment reconciliation
- content publishing
- support and follow-up notes
- webhook audit logs

## Suggested Domain Model

### Identity

- `profiles`
  - one row per Clerk user
  - stores `clerk_user_id`, display details, lifecycle fields
- `user_roles`
  - admin, editor, sales, client

### CRM / Leads

- `contact_inquiries`
  - records every form submission
- `lead_stages`
  - new, contacted, qualified, proposal_sent, won, lost
- `lead_activities`
  - notes, calls, emails, status changes

### Website CMS

- `service_categories`
- `services`
- `pricing_plans`
- `pricing_plan_features`
- `portfolio_categories`
- `portfolio_projects`
- `testimonials`
- `site_stats`
- `blog_categories`
- `blog_posts`
- `blog_tags`
- `blog_post_tags`
- `site_settings`

### Commerce

- `customer_accounts`
  - app-level customer record linked to profile
- `payment_orders`
  - app-side order intent before payment capture
- `payments`
  - successful or failed payment attempts
- `payment_events`
  - webhook/event audit table
- `subscriptions`
  - future-proof even if current pricing is one-time
- `plan_entitlements`
  - access granted after payment

### Delivery / Client Ops

- `client_projects`
  - if a paying customer becomes a service client
- `project_messages`
- `project_files`
- `project_tasks`

## Why This Schema Fits This App

### Contact Page

[src/sections/contact-section.tsx](/Users/parthbhende/Developer/Projects/GrowOrbit.AI/src/sections/contact-section.tsx:1) contains a real lead form UI but no persistence. This should write to `contact_inquiries`, then optionally create a linked CRM lead.

### Pricing / Payment

[src/components/ui/ruixen-pricing-04.tsx](/Users/parthbhende/Developer/Projects/GrowOrbit.AI/src/components/ui/ruixen-pricing-04.tsx:1) and [src/components/payments/razorpay-checkout-button.tsx](/Users/parthbhende/Developer/Projects/GrowOrbit.AI/src/components/payments/razorpay-checkout-button.tsx:1) currently create and verify payments but do not save them. Supabase should become the source of truth for `payment_orders`, `payments`, and `plan_entitlements`.

### Content Pages

`about`, `services`, `portfolio`, `blog`, `testimonials`, and `stats` are mostly hardcoded today. These should move gradually into Supabase-managed CMS tables so the site can evolve without code edits.

### Auth

[src/app/layout.tsx](/Users/parthbhende/Developer/Projects/GrowOrbit.AI/src/app/layout.tsx:1) and [src/proxy.ts](/Users/parthbhende/Developer/Projects/GrowOrbit.AI/src/proxy.ts:1) already show Clerk is your auth boundary. We should sync Clerk users into `profiles` instead of rebuilding auth.

## Security Model

### Keep Auth Split Cleanly

- Clerk issues identity
- Supabase stores app data
- Server routes and Edge Functions verify the Clerk user before data access

### Row Level Security Strategy

- public content tables readable by everyone
- private tables readable only by owner or admin
- admin write tables restricted by role
- payment and webhook tables writable only by service-role contexts

### Secrets

- never expose Supabase service role key to the browser
- never expose Razorpay secret to the browser
- continue server-side verification for payments

## Recommended Build Order

### Phase 1: Foundation

1. Create the Supabase project.
2. Add local env variables for Supabase URL, anon key, and service role key.
3. Install Supabase SDKs in the Next.js app.
4. Apply the initial SQL schema from `supabase/migrations/0001_core_schema.sql`.

### Phase 2: Clerk Sync

1. Add a `profiles` sync flow from Clerk users into Supabase.
2. Use Clerk webhook events for `user.created`, `user.updated`, and `user.deleted`.
3. Mark admins via `user_roles` instead of hardcoding app-side checks.

### Phase 3: Contact + Lead Backend

1. Replace the static contact form submit with a server action or route.
2. Validate input with Zod.
3. Insert into `contact_inquiries`.
4. Auto-create an initial `lead_activities` entry.
5. Build a simple admin leads page later.

### Phase 4: Payment Persistence

1. Before calling Razorpay, create a `payment_orders` row.
2. Save the Razorpay `order_id`.
3. After signature verification, insert into `payments`.
4. Grant `plan_entitlements`.
5. Add a Razorpay webhook handler to reconcile late or out-of-band events.

### Phase 5: CMS

1. Move pricing plans into `pricing_plans`.
2. Move portfolio items into `portfolio_projects`.
3. Move testimonials and stats into tables.
4. Build blog on `blog_posts`, `blog_categories`, and tags.

### Phase 6: Client Operations

1. Create `client_projects` for won leads or purchasers.
2. Add onboarding intake.
3. Add file uploads via Supabase Storage.
4. Add project status tracking and notes.

## Exact Step-By-Step Rollout

### Step 1

Create a Supabase project in the dashboard.

Use:

- region near your users
- Postgres default setup
- email/password auth can stay disabled if Clerk remains primary auth

### Step 2

Add these env vars:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_DB_PASSWORD=...
CLERK_WEBHOOK_SECRET=...
```

Keep existing Clerk and Razorpay env vars.

### Step 3

Install:

```bash
npm install @supabase/supabase-js @supabase/ssr zod
```

Later, if you use the CLI:

```bash
npm install -D supabase
```

### Step 4

Initialize Supabase locally:

```bash
npx supabase init
```

Then copy the SQL from `supabase/migrations/0001_core_schema.sql` into the generated migrations flow or run it in the SQL editor first.

### Step 5

Create three app clients:

- browser client
- server client
- admin/service-role client

Store them under:

- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `src/lib/supabase/admin.ts`

### Step 6

Create a Clerk webhook route:

- `POST /api/webhooks/clerk`

On user create/update/delete:

- upsert or soft-delete `profiles`
- maintain `user_roles` if needed

### Step 7

Wire the contact form backend:

- validate request
- insert into `contact_inquiries`
- create initial `lead_activities`
- return a real success/error response to the UI

### Step 8

Upgrade payment routes:

- on `/api/create-order` insert `payment_orders` first
- include plan id, billing period, profile id, and receipt
- on `/api/verify-payment` insert `payments`
- create `plan_entitlements` on success

### Step 9

Add Razorpay webhook ingestion:

- `POST /api/webhooks/razorpay`
- verify webhook signature
- write raw event into `payment_events`
- reconcile `payment_orders` and `payments`

### Step 10

Move hardcoded site content into Supabase one area at a time:

1. pricing
2. portfolio
3. testimonials
4. stats
5. services
6. blog

### Step 11

Build a private admin area:

- `/admin/leads`
- `/admin/payments`
- `/admin/content`
- `/admin/projects`

Protect it with Clerk auth plus `user_roles`.

### Step 12

Add Storage buckets:

- `portfolio-assets`
- `blog-images`
- `client-files`

Use signed URLs for private client assets.

## Best First Milestone

If you want the highest-value backend quickly, do this first:

1. `profiles`
2. `contact_inquiries`
3. `lead_activities`
4. `pricing_plans`
5. `payment_orders`
6. `payments`
7. `plan_entitlements`

That gets you:

- real lead capture
- real order/payment persistence
- a foundation for dashboard and fulfillment

## What I Would Not Build Yet

- chat system
- realtime collaboration
- complex subscription billing engine
- full project management suite
- custom auth replacing Clerk

Those can come later after the core CRM + payment + CMS backend is live.

## Suggested Next Implementation Order In This Repo

1. Add Supabase SDK and libs
2. Add initial schema and migrations
3. Sync Clerk users to `profiles`
4. Wire contact form to Supabase
5. Persist Razorpay orders and payments
6. Read pricing plans from database
7. Move portfolio/testimonials/blog to CMS tables
8. Build admin pages

