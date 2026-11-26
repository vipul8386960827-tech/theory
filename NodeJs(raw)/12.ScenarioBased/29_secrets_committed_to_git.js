/* 29_secrets_committed_to_git.js

=====================================================
Scenario: Secrets Were Pushed to GitHub
=====================================================

The Question (how the interviewer asks it):
- "A developer accidentally pushed the .env file with the database password
   and a Stripe API key to GitHub. What do you do right now, and how do you
   stop it from happening again?"

What the interviewer is checking:
- Correct priority: rotate first, clean up second
- Knowing that deleting the file or rewriting history is NOT enough
- Proper config handling: env vars, .env + .gitignore, secret managers
- Prevention tools: pre-commit scanning, GitHub push protection

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Clarify first: is the repo public or private? Which secrets exactly? How
   long was it exposed? Assume it is compromised either way - bots scan
   public GitHub within minutes.
2. Rotate immediately: create a new DB password and a new API key, update
   them in the deployment (env vars / secret manager), restart the app, then
   revoke the old ones. This is the step that actually removes the risk.
3. Check for abuse: look at DB logs, cloud billing, Stripe dashboard and
   access logs for unusual activity during the exposure window.
4. Clean the repo: remove the file, add .env to .gitignore, and rewrite
   history with git filter-repo or BFG, then force-push. But forks, clones,
   caches and PR views may still have it, so history cleanup is only hygiene.
5. Prevent it: commit a .env.example with fake values, load real values
   from environment variables, and in production use a secret manager
   (AWS Secrets Manager, Vault, GitHub Actions secrets).
6. Add guards: pre-commit hooks (gitleaks, git-secrets), GitHub secret
   scanning with push protection, and a scan in CI.
7. Write a short blameless postmortem and share the process with the team.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// .gitignore
//   .env
//   .env.*
//   !.env.example

// .env.example  (committed, fake values only)
//   DATABASE_URL=postgres://user:password@localhost:5432/app
//   STRIPE_SECRET_KEY=sk_test_xxx

// BAD: secret hard-coded in source
// const stripe = require('stripe')('sk_live_51Hx...');

// GOOD: config.js - read from env and fail fast if missing
// Node 20.6+: node --env-file=.env server.js  (no dotenv package needed)
const required = ['DATABASE_URL', 'STRIPE_SECRET_KEY', 'JWT_SECRET'];
for (const name of required) {
  if (!process.env[name]) {
    console.error(`Missing env variable: ${name}`);
    process.exit(1);
  }
}

module.exports = {
  dbUrl: process.env.DATABASE_URL,
  stripeKey: process.env.STRIPE_SECRET_KEY,
  jwtSecret: process.env.JWT_SECRET,
};

// Cleanup (after rotating!)
//   git rm --cached .env
//   git filter-repo --path .env --invert-paths
//   git push --force --all

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "First I treat the secrets as compromised and rotate them immediately:
   new DB password and API key, deploy them, then revoke the old ones. Then
   I check logs and billing for abuse. Removing the file or rewriting history
   is not enough, because clones and forks may already have it. To prevent
   it, secrets come from environment variables or a secret manager, .env is
   in .gitignore, and we use gitleaks and GitHub push protection."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "I'll just delete the file and push a new commit" - it is still in history.
- Rewriting history but NOT rotating the secrets.
- "The repo is private, so it is fine" - private repos get leaked, cloned
  to laptops, and shared with contractors.
- Putting secrets in frontend code or in the Docker image.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is a secret manager better than a .env file on the server?
A1: Access control and audit logs, encryption at rest, easy rotation, and
    no secret files lying on disks or in images.

Q2: How do you rotate a DB password without downtime?
A2: Create a second credential (or let the DB accept both), deploy the app
    with the new one, check it works, then remove the old one.

Q3: Where else can secrets leak besides git?
A3: Logs (printing req.headers or config), error messages, CI output,
    Docker image layers, and frontend bundles. Redact sensitive fields in logs.
*/
