/* 28_api_keys_vs_tokens.js

=====================================================
API Keys vs Tokens
=====================================================

Definition (What I should say in the interview):
- "An **API key** identifies an **application or project**, usually for server-to-server
   calls - it is long-lived, does not expire by itself, and is often used for rate limiting and
   billing. A **token**, like a JWT or OAuth access token, represents an **authenticated user**
   (or a delegated permission), is short-lived and carries scopes or claims. So I use API keys
   for machine clients like a partner integration, and tokens for user sessions."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect        | API Key                          | Access Token (JWT / OAuth)           |
|---------------|----------------------------------|--------------------------------------|
| Identifies    | App / project / client           | User (or user + client)              |
| Lifetime      | Long-lived until revoked         | Short-lived (minutes)                |
| Contains info | Usually random opaque string     | Claims, scopes, expiry               |
| Issued by     | Developer dashboard              | Login / OAuth flow                   |
| Revocation    | Delete from DB                   | Expiry, refresh token revoke         |
| Use case      | Server-to-server, public data    | User actions in SPA / mobile         |
| Sent as       | x-api-key header                 | Authorization: Bearer <token>        |

-----------------------------------------------------
Example (issuing and checking API keys)
-----------------------------------------------------
const crypto = require('crypto');
const sha256 = (v) => crypto.createHash('sha256').update(v).digest('hex');

// create: show the raw key ONCE, store only the hash
async function createApiKey(clientId) {
  const raw = 'sk_live_' + crypto.randomBytes(32).toString('base64url');
  await ApiKey.create({ clientId, keyHash: sha256(raw), prefix: raw.slice(0, 12), scopes: ['read'] });
  return raw;
}

// verify middleware
async function apiKeyAuth(req, res, next) {
  const key = req.get('x-api-key');
  if (!key) return res.status(401).json({ message: 'API key required' });
  const record = await ApiKey.findOne({ keyHash: sha256(key), revoked: false });
  if (!record) return res.status(401).json({ message: 'Invalid API key' });
  req.client = record;
  next();
}

app.get('/api/v1/reports', apiKeyAuth, getReports);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Never put secret API keys in frontend code or mobile apps - they can be extracted.
- Send keys in headers, not in the URL (URLs end up in logs and browser history).
- Support scopes, expiry dates and multiple keys per client for zero-downtime rotation.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is an API key authentication?
A1: It authenticates the calling application, not a person. For user actions you need tokens.

Q2: Why store only a hash of the API key?
A2: A DB leak should not expose working keys. The prefix helps users identify keys in the UI.
*/
