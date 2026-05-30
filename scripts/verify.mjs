import { access, readdir, readFile, stat } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const requiredPages = [
  'index.html',
  'home.html',
  'opportunities.html',
  'prayer.html',
  'needs.html',
  'connect.html',
  'marketplace.html',
  'learn.html',
  'bible.html',
  'profile.html',
];

const requiredAssets = [
  'assets/styles.css',
  'assets/shared.js',
  'assets/advocate-agent.js',
  'assets/opportunities.js',
  'assets/bible-study.js',
  'assets/bible-data.js',
  'assets/seedling-advocate.png',
  'assets/seedling-expressions/joyful.png',
  'assets/seedling-expressions/listening.png',
  'assets/seedling-expressions/praying.png',
  'assets/seedling-expressions/thinking.png',
  'assets/seedling-expressions/encouraging.png',
  'assets/seedling-expressions/here-for-you.png',
  'assets/seedling-expressions/comforting.png',
  'assets/seedling-expressions/celebrate.png',
];

const requiredIntegrationFiles = [
  '.env.example',
  '.gitignore',
  'api/seedling.js',
  'supabase/schema.sql',
  'vercel.json',
  'docs/OPS_RUNBOOK.md',
  'docs/COMMUNITY_DIRECTORY_BLUEPRINT.md',
  'docs/INTEGRATIONS_SETUP.md',
  'docs/OPPORTUNITIES_README.md',
  'scripts/check-platform-env.mjs',
  'scripts/github-doctor.sh',
];

const failures = [];

async function mustExist(file) {
  try {
    await access(path.join(root, file), constants.R_OK);
  } catch {
    failures.push(`Missing required file: ${file}`);
  }
}

async function checkHtmlScripts(file) {
  const html = await readFile(path.join(root, file), 'utf8');
  const scripts = [...html.matchAll(/<script\s+src="([^"]+)"/g)].map((match) => match[1]);
  const links = [...html.matchAll(/<link\s+[^>]*href="([^"]+)"/g)].map((match) => match[1]);
  const images = [...html.matchAll(/<img\s+[^>]*src="([^"]+)"/g)].map((match) => match[1]);
  for (const ref of [...scripts, ...links, ...images]) {
    if (/^https?:\/\//.test(ref)) continue;
    try {
      await access(path.join(root, ref), constants.R_OK);
    } catch {
      failures.push(`${file} references missing asset: ${ref}`);
    }
  }
}

async function collectJs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await collectJs(full));
    if (entry.isFile() && entry.name.endsWith('.js')) files.push(full);
  }
  return files;
}

for (const file of [...requiredPages, ...requiredAssets, ...requiredIntegrationFiles]) {
  await mustExist(file);
}

for (const page of requiredPages) {
  await checkHtmlScripts(page);
}

for (const file of await collectJs(path.join(root, 'assets'))) {
  const result = spawnSync('node', ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) {
    failures.push(`JavaScript check failed: ${path.relative(root, file)}\n${result.stderr || result.stdout}`);
  }
}

for (const file of ['api/seedling.js', 'scripts/check-platform-env.mjs']) {
  const result = spawnSync('node', ['--check', path.join(root, file)], { encoding: 'utf8' });
  if (result.status !== 0) {
    failures.push(`JavaScript check failed: ${file}\n${result.stderr || result.stdout}`);
  }
}

const mascot = await stat(path.join(root, 'assets/seedling-advocate.png')).catch(() => null);
if (mascot && mascot.size > 250_000) {
  failures.push('Seedling mascot is larger than expected. Re-optimize assets/seedling-advocate.png.');
}

if (failures.length) {
  console.error(`Verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Good Fruit verification passed.');
