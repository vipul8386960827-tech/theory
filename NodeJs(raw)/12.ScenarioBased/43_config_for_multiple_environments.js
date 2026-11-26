/* 43_config_for_multiple_environments.js

=====================================================
Scenario: Config for dev, staging and production
=====================================================

The Question (how the interviewer asks it):
- "How do you manage configuration and secrets for dev, staging and
   production in a Node.js app? Last week someone deployed with a wrong DB
   URL and the app started but failed on the first request."

What the interviewer is checking:
- Do you know the 12-factor rule: config in environment variables?
- Do you keep secrets out of git?
- Do you validate config at startup and fail fast?
- Do you know where real secrets live in production (secret managers)?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Same code, different config. Following 12-factor, everything that changes
   between environments (DB URL, API keys, ports, log level) comes from
   environment variables, not from if (env === 'prod') code everywhere.
2. Local development: a .env file loaded with dotenv or the built-in
   `node --env-file=.env` (Node 20.6+). .env is in .gitignore. I commit a
   .env.example with names but no real values.
3. Staging/production: the platform injects env vars (Kubernetes secrets,
   AWS Secrets Manager / Parameter Store, Vault, CI/CD secrets). No .env
   files on production servers.
4. Validate at startup with zod or envalid: required vars, types, formats
   (URL, number). If something is wrong, log a clear message and exit. This
   is fail fast - better than failing on the first user request.
5. One config module: read process.env only in config.js, export a typed,
   frozen object. The rest of the code imports config.
6. Never log secrets, rotate keys regularly, use different keys per
   environment, and limit who can read production secrets.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// config.js - the only file that reads process.env
const { z } = require('zod');

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']),
  PORT: z.coerce.number().int().default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error('Invalid configuration:', parsed.error.flatten().fieldErrors);
  process.exit(1);                    // fail fast, do not start the server
}

module.exports = Object.freeze(parsed.data);

// server.js
const config = require('./config');
app.listen(config.PORT, () => logger.info(`Running in ${config.NODE_ENV}`));

// Local run (Node 20.6+), no dotenv package needed:
//   node --env-file=.env server.js
// .gitignore:  .env      committed:  .env.example (names only)

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "I follow 12-factor: the code is the same everywhere and config comes from
   environment variables. Locally I use a .env file with dotenv or node
   --env-file, which is gitignored, and I commit a .env.example. In staging
   and production, secrets come from the platform or a secret manager like
   AWS Secrets Manager or Kubernetes secrets. All config is read in one
   module and validated at startup with zod or envalid, so a wrong or
   missing value stops the app immediately instead of failing later."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Committing .env or API keys to git (even in a private repo).
- Reading process.env.X all over the code with no validation, so a typo
  becomes `undefined` at runtime.
- Forgetting that env vars are always strings ("false" is truthy).
- Using the same secrets in dev, staging and production.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: A secret was committed to git by mistake. What do you do?
A1: Rotate (revoke) the secret immediately - removing the commit is not
    enough, because it may already be cloned or scanned. Then clean history
    if needed and add secret scanning (e.g. gitleaks, GitHub secret scanning).

Q2: Why not use config files like config/production.json?
A2: Non-secret defaults in files are fine, but secrets in files often end up
    in git or Docker images. Env vars keep the same build artifact usable in
    every environment.

Q3: Should NODE_ENV be "staging" on staging?
A3: Many libraries (Express, React builds) only check for "production" to
    enable optimizations. A common approach is NODE_ENV=production on staging
    too, plus a separate APP_ENV=staging for app-specific behavior.
*/
