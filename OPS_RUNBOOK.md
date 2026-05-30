# Good Fruit Operations Runbook

This project is currently a static prototype. These commands help us keep moving even when GitHub or Vercel access is unreliable.

## Local Verification

Run:

```bash
node scripts/verify.mjs
```

This checks required pages, required assets, local image/script references, JavaScript syntax, and the Seedling image size.

## Build A Manual Deploy Bundle

Run:

```bash
bash scripts/build-deploy-bundle.sh
```

The output zip is created in `dist/`. If GitHub or Vercel automation is unavailable, upload that zip through the Vercel dashboard as a fallback.

## Check Production Integration Keys

Run:

```bash
node scripts/check-platform-env.mjs
```

This checks whether the Supabase, Stripe, OpenAI, email, and maps environment variables are present. Missing values are expected until the accounts are created and connected in Vercel.

## Push To GitHub

Run:

```bash
bash scripts/push-to-github.sh "Describe the update"
```

The script verifies the site, checks GitHub reachability, clones the remote repo into a temporary folder, syncs the local project, commits, and pushes.

If DNS fails with `Could not resolve hostname github.com`, use `bash scripts/build-deploy-bundle.sh` and retry the push later.

## Useful Environment Overrides

```bash
GOOD_FRUIT_REPO=git@github.com:Sooner-Now/good-fruit-platform.git
GOOD_FRUIT_BRANCH=main
GOOD_FRUIT_GIT_NAME="Justin Van Patten"
GOOD_FRUIT_GIT_EMAIL="justinvanpatten@users.noreply.github.com"
KEEP_PUSH_TMP=1
```

## Platform Tools We Should Add As The Community Grows

- Database and authentication: Supabase for users, directory listings, needs, offers, prayers, events, courses, and audit logs.
- Identity verification: Stripe Identity for state ID verification without storing raw IDs.
- Payments: Stripe Billing for business membership fees, invoices, and future bonus distribution records.
- Maps: Mapbox or Google Maps for church, needs, events, and marketplace discovery.
- Search: Typesense, Meilisearch, Algolia, or Postgres full-text search for directory-wide discovery.
- AI agent backend: OpenAI Responses API with retrieval over Good Fruit content, strict safety policies, escalation paths, and human handoff.
- Moderation and trust: Admin review queue, abuse reports, verification status, community endorsements, and activity history.
- Messaging: Resend or Postmark for email confirmations, prayer updates, and trusted notifications.
- Analytics: Plausible or PostHog for privacy-aware usage and impact tracking.
