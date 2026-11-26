/* 7_environment_variables.js

=====================================================
Environment Variables (Security View)
=====================================================

Definition (What I should say in the interview):
- "Environment variables let us keep configuration and secrets, like the DB URL or the JWT
   secret, **outside the code**. In Node they are read from process.env. Locally I use a .env
   file loaded with dotenv or Node's built-in --env-file flag, and that file is in .gitignore.
   In production the values come from the hosting platform or a secrets manager. I also
   validate them at startup so the app fails fast if something is missing."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. All values in process.env are **strings** -> convert numbers/booleans yourself.
2. Commit a .env.example with keys only, never the real .env.
3. Load once, at the very top of the entry file, before other modules read process.env.
4. Node 20.6+ supports: node --env-file=.env server.js (no dotenv needed).
5. NODE_ENV=production enables optimizations in Express and hides stack traces in many setups.

-----------------------------------------------------
Example (load + validate at startup)
-----------------------------------------------------
// config.js
require('dotenv').config();

const required = ['DATABASE_URL', 'JWT_SECRET', 'REFRESH_SECRET'];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error('Missing env vars:', missing.join(', '));
  process.exit(1);                          // fail fast
}

module.exports = {
  port: Number(process.env.PORT) || 3000,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  isProd: process.env.NODE_ENV === 'production',
};

// .gitignore
// .env

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Committing .env once -> secret is in git history forever; you must ROTATE it, not just delete.
- Logging the whole process.env or config object on startup.
- Putting backend secrets in frontend env vars (VITE_ / REACT_APP_) -> they are bundled into
  public JS and visible to anyone.
- process.env.DEBUG === true -> always false, because the value is the string 'true'.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Are environment variables fully secure?
A1: Better than hard-coding, but they can leak via logs, crash dumps or child processes. For
    serious secrets use a secrets manager (see 26_secrets_management).

Q2: How do you validate config in bigger projects?
A2: With a schema library like zod or joi, so types and formats are checked too.
*/
