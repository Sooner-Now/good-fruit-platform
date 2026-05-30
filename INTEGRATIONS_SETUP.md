# Good Fruit Production Integrations

This is the first production stack to wire in when we move beyond the static prototype.

## 1. Supabase

Use Supabase for:

- Email authentication
- User profiles and trust levels
- Churches, groups, businesses, events, courses, needs, prayer requests, marketplace posts
- Advocate session history
- Moderation reports and audit logs

Setup:

1. Create a Supabase project.
2. Open the SQL editor.
3. Run `supabase/schema.sql`.
4. Copy project URL and keys into Vercel environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

Keep the service role key server-side only.

## 2. Stripe

Use Stripe for:

- Business subscriptions
- Invoices and payment status
- Identity verification for Guest, Member, and Business access
- Future bonus distribution records

Environment variables:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_BUSINESS_PRICE_ID`
- `STRIPE_IDENTITY_VERIFICATION_TEMPLATE_ID`

Never collect raw payment data inside Good Fruit forms. Let Stripe host payment and identity flows.

## 3. OpenAI / Seedling

Seedling is wired for a Vercel serverless endpoint at:

```text
/api/seedling
```

Environment variables:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`

The endpoint uses OpenAI's Responses API and keeps the API key off the browser. Seedling should receive only the minimum user context needed to help: role, area, interests, and trust status.

## 4. Email

Recommended first provider: Resend or Postmark.

Use it for:

- Email confirmation
- Login/security messages
- Prayer request updates
- Need response notifications
- Business membership notices

Environment variables:

- `RESEND_API_KEY`
- `EMAIL_FROM`

## 5. Maps

Use either Mapbox or Google Maps first. Do not wire both into the UI until we choose one primary provider.

Environment variables:

- `MAPBOX_ACCESS_TOKEN`
- `GOOGLE_MAPS_API_KEY`

## 6. Vercel Environment Check

After adding variables locally or in Vercel, run:

```bash
node scripts/check-platform-env.mjs
```

This script reports which production integration keys are still missing.

## 7. Safety Defaults

- Store no raw state ID documents in Good Fruit.
- Use Stripe Identity, Persona, or a similar provider to hold identity verification artifacts.
- Keep OpenAI calls server-side.
- Add admin review before public posting at scale.
- Log moderation actions in `audit_logs`.
- Escalate emergencies, abuse, and self-harm concerns to immediate human/local help.
