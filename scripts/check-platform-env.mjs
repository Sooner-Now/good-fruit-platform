const groups = [
  {
    name: 'Supabase',
    keys: ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY'],
  },
  {
    name: 'OpenAI / Seedling',
    keys: ['OPENAI_API_KEY', 'OPENAI_MODEL'],
  },
  {
    name: 'Stripe',
    keys: ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'STRIPE_BUSINESS_PRICE_ID', 'STRIPE_IDENTITY_VERIFICATION_TEMPLATE_ID'],
  },
  {
    name: 'Email',
    keys: ['RESEND_API_KEY', 'EMAIL_FROM'],
  },
  {
    name: 'Maps',
    keys: ['MAPBOX_ACCESS_TOKEN', 'GOOGLE_MAPS_API_KEY'],
    optionalAny: true,
  },
];

let missingCount = 0;

for (const group of groups) {
  const missing = group.keys.filter((key) => !process.env[key]);
  if (group.optionalAny) {
    const hasOne = group.keys.some((key) => Boolean(process.env[key]));
    console.log(`${group.name}: ${hasOne ? 'ready' : 'needs one provider key when maps go live'}`);
    continue;
  }
  if (missing.length) {
    missingCount += missing.length;
    console.log(`${group.name}: missing ${missing.join(', ')}`);
  } else {
    console.log(`${group.name}: ready`);
  }
}

if (missingCount) {
  console.log('\nAdd missing values in Vercel Project Settings -> Environment Variables.');
  process.exit(1);
}

console.log('\nProduction integration environment looks ready.');
