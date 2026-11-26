/* 25_https_and_tls.js

=====================================================
HTTPS and TLS
=====================================================

Definition (What I should say in the interview):
- "HTTPS is HTTP over **TLS**. TLS gives three things: **encryption** so nobody on the network
   can read the traffic, **integrity** so it cannot be modified, and **authentication** through
   a certificate so the client knows it is talking to the real server. Without HTTPS, tokens,
   cookies and passwords travel in plain text. In production I usually terminate TLS at a
   reverse proxy or load balancer like Nginx or AWS ALB, and the Node app runs plain HTTP behind
   it, with HSTS and Secure cookies enabled."

-----------------------------------------------------
TLS Handshake (simplified, TLS 1.3)
-----------------------------------------------------
1. Client Hello -> supported ciphers + key share.
2. Server Hello -> chosen cipher + key share + certificate (signed by a CA).
3. Client verifies the certificate chain and hostname.
4. Both derive the same symmetric session key (ECDHE key exchange).
5. All further data is encrypted with fast symmetric encryption (e.g. AES-GCM).
-> Asymmetric crypto is used to agree on the key; symmetric crypto encrypts the data.

-----------------------------------------------------
Example
-----------------------------------------------------
// Direct HTTPS in Node (less common in production)
const https = require('https');
const fs = require('fs');
https.createServer({
  key: fs.readFileSync('/etc/ssl/private/key.pem'),
  cert: fs.readFileSync('/etc/ssl/certs/fullchain.pem'),
}, app).listen(443);

// Behind a proxy that terminates TLS
app.set('trust proxy', 1);              // so req.secure / req.protocol use X-Forwarded-Proto
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
  }
  next();
});
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- NODE_TLS_REJECT_UNAUTHORIZED=0 or rejectUnauthorized: false to "fix" cert errors -> disables
  verification and allows man-in-the-middle attacks.
- Mixed content: HTTPS page loading HTTP scripts.
- Forgetting the intermediate certificate (use fullchain).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why terminate TLS at the proxy?
A1: Central cert management (Let's Encrypt auto-renew), offloads crypto, and Node stays simple.
    Traffic inside a private network may be re-encrypted if required.

Q2: Is HTTPS enough to secure an API?
A2: No. It protects data in transit only; you still need auth, validation, rate limits, etc.

Q3: What does HSTS add?
A3: Browser refuses plain HTTP for the domain, preventing SSL-stripping on the first redirect.
*/
