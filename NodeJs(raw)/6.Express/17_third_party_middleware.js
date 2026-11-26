/* 17_third_party_middleware.js

=====================================================
Third-Party Middleware
=====================================================

Definition (What I should say in the interview):
- "Third-party middleware are npm packages that plug into the Express pipeline with app.use().
   Since Express core is minimal, almost every production API uses a few of them - in my
   projects that's usually **helmet** for security headers, **cors** for cross-origin requests,
   **morgan** for request logging, **express-rate-limit** for brute-force protection, plus
   cookie-parser and compression. I check that a package is maintained and keep the list
   small, because each one runs on every request."

-----------------------------------------------------
Commonly used packages
-----------------------------------------------------
| Package             | Purpose                                         |
|---------------------|-------------------------------------------------|
| helmet              | Sets security headers (CSP, HSTS, X-Frame...)   |
| cors                | Adds Access-Control-Allow-* headers             |
| morgan              | HTTP request logging                            |
| express-rate-limit  | Limit requests per IP / window                  |
| compression         | Gzip / brotli response bodies                   |
| cookie-parser       | Parses cookies into req.cookies                 |
| express-session     | Server-side sessions                            |
| multer              | multipart/form-data file uploads                |
| express-validator   | Validation chains                               |

-----------------------------------------------------
Example
-----------------------------------------------------
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const app = express();

app.use(helmet());
app.use(cors({ origin: ['https://myapp.com'], credentials: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(compression());
app.use(express.json());

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });
app.post('/auth/login', loginLimiter, (req, res) => res.json({ token: 'abc' }));

app.listen(3000);

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- cors() with origin '*' and credentials: true -> browsers reject it; list exact origins.
- Behind a proxy/load balancer, rate limiter sees the proxy IP -> set app.set('trust proxy', 1).
- Compressing already-compressed content (images) wastes CPU.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does CORS protect the server?
A1: No - it's enforced by browsers. Postman or server-to-server calls ignore it. Use auth for protection.

Q2: Why use helmet?
A2: It sets sensible security headers in one line and removes X-Powered-By, reducing common attack surface.
*/
