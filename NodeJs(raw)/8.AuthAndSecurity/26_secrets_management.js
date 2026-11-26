/* 26_secrets_management.js

=====================================================
Secrets Management
=====================================================

Definition (What I should say in the interview):
- "Secrets are things like DB passwords, JWT signing keys and third-party API keys. The basic
   rule is they never go into source code or git. Locally a .env file is fine, but in production
   I prefer a **secrets manager** like AWS Secrets Manager, Azure Key Vault, HashiCorp Vault or
   the platform's encrypted secrets, which give access control, audit logs and **rotation**.
   I also follow least privilege - each service only gets the secrets it needs - and if a secret
   leaks I rotate it immediately."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Never hard-code; never commit; add .env to .gitignore from day one.
2. Use a **pre-commit secret scanner** (gitleaks, git-secrets) and GitHub secret scanning.
3. Different secrets per environment (dev / staging / prod).
4. **Rotation**: change secrets regularly and on any suspicion of leak; support two active
   keys during rotation (e.g. JWT "kid").
5. Do not log secrets; redact them in logs and error reports.
6. Docker: do not bake secrets into images (ENV in Dockerfile is visible in image layers).
7. CI/CD: store as encrypted pipeline secrets, not in YAML.

-----------------------------------------------------
Example (load from AWS Secrets Manager at startup)
-----------------------------------------------------
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

async function loadSecrets() {
  const client = new SecretsManagerClient({ region: process.env.AWS_REGION });
  const res = await client.send(new GetSecretValueCommand({ SecretId: 'prod/my-api' }));
  return JSON.parse(res.SecretString);       // { DB_URL, JWT_SECRET, ... }
}

(async () => {
  const secrets = await loadSecrets();       // app's IAM role grants access, no keys in code
  const app = createApp(secrets);
  app.listen(process.env.PORT || 3000);
})();

// Redact in logs (pino)
const logger = require('pino')({ redact: ['req.headers.authorization', 'req.headers.cookie', '*.password'] });

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- If a secret was committed, deleting the file is not enough - it is in history. Rotate first,
  then clean history if needed.
- Generate strong secrets: crypto.randomBytes(64).toString('hex').

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why a secrets manager instead of env vars?
A1: Central control, encryption at rest, access policies, audit trail and automatic rotation.
    Env vars are still often the final delivery mechanism to the process.

Q2: What do you do if an API key is pushed to a public repo?
A2: Revoke/rotate it immediately, check provider logs for misuse, then remove it from history.
*/
