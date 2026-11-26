/* 27_environment_variables_and_config.js

=====================================================
Environment Variables and Configuration
=====================================================

Definition (What I should say in the interview):
- "Environment variables let us keep **config and secrets outside the code** - things like
   PORT, DATABASE_URL, JWT_SECRET and API keys - so the same code runs in dev, staging and
   production with different values. In Node we read them from **process.env**. Locally I use
   a .env file loaded with dotenv (or node --env-file on Node 20+), and I never commit it.
   I also validate the config at startup so the app fails fast if a required variable is missing."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. process.env values are ALWAYS strings -> convert numbers / booleans.
2. .env in .gitignore; commit a .env.example with dummy values.
3. Load config once in a config module, export a typed/validated object.
4. NODE_ENV=production makes Express cache views and hide error stack traces by default.
5. In production, use the platform's secrets (AWS Secrets Manager, Kubernetes secrets, CI vars).

-----------------------------------------------------
Example
-----------------------------------------------------
// .env (not committed)
// PORT=4000
// MONGO_URI=mongodb://localhost:27017/shop
// JWT_SECRET=supersecret
// ENABLE_SIGNUP=true

// config/index.js
require('dotenv').config();
const required = ['MONGO_URI', 'JWT_SECRET'];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  throw new Error(`Missing env vars: ${missing.join(', ')}`);   // fail fast
}
module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  enableSignup: process.env.ENABLE_SIGNUP === 'true',   // "false" string is truthy!
};

// app.js
const config = require('./config');
const express = require('express');
const app = express();
app.get('/env', (req, res) => res.json({ env: config.env }));
app.listen(config.port, () => console.log(`Listening on ${config.port}`));

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- if (process.env.DEBUG) -> "false" is a non-empty string -> truthy.
- Reading process.env all over the codebase -> hard to know what config exists.
- Calling dotenv.config() after modules that already read process.env.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Should .env be used in production?
A1: Usually no - the hosting platform injects real env vars; .env is for local development.

Q2: How do you validate config?
A2: Manually as above, or with a schema library like Zod, Joi or envalid at startup.
*/
