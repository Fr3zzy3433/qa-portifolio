'use strict';

const fs = require('fs');
const path = require('path');
const newman = require('newman');

const projectRoot = path.resolve(__dirname, '..');
const envPath = path.join(projectRoot, '.env');
const collectionPath = path.join(
  projectRoot,
  'postman',
  'ReqRes_API_QA_Portfolio.postman_collection.json'
);

function loadLocalEnv(filePath) {
  if (!fs.existsSync(filePath)) return;

  const contents = fs.readFileSync(filePath, 'utf8');

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const separatorIndex = line.indexOf('=');
    if (separatorIndex < 1) continue;

    const key = line.slice(0, separatorIndex).trim();
    if (Object.prototype.hasOwnProperty.call(process.env, key)) continue;

    let value = line.slice(separatorIndex + 1).trim();
    const isQuoted =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"));

    if (isQuoted) value = value.slice(1, -1);
    process.env[key] = value;
  }
}

loadLocalEnv(envPath);

const apiKey = (process.env.REQRES_API_KEY || '').trim();

if (!apiKey || apiKey === 'your_api_key_here') {
  console.error(
    'ERROR: REQRES_API_KEY is required. Copy .env.example to .env for local runs or configure the GitHub Actions secret REQRES_API_KEY.'
  );
  process.exit(1);
}

newman.run(
  {
    collection: collectionPath,
    envVar: [
      { key: 'baseUrl', value: 'https://reqres.in' },
      { key: 'api-key', value: apiKey },
    ],
    reporters: ['cli'],
  },
  (error, summary) => {
    if (error) {
      console.error(`ERROR: Newman could not start: ${error.message}`);
      process.exitCode = 1;
      return;
    }

    const failures = summary?.run?.failures || [];
    if (failures.length > 0) {
      console.error(`API test run failed with ${failures.length} failure(s).`);
      process.exitCode = 1;
      return;
    }

    console.log('API test run completed successfully with no failures.');
  }
);
