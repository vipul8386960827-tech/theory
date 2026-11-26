/* 31_api_versioning.js

=====================================================
API Versioning
=====================================================

Definition (What I should say in the interview):
- "API versioning lets us make **breaking changes** without breaking existing clients, like
   an old mobile app that users haven't updated. The most common approach is **URL versioning**,
   like /api/v1/users and /api/v2/users, because it's explicit and easy to route and cache.
   Other options are a custom header, the Accept header, or a query param. In Express, I keep a
   separate router per version and mount them on different prefixes, reusing shared services."

-----------------------------------------------------
Approaches
-----------------------------------------------------
| Strategy        | Example                                  | Pros / Cons                      |
|-----------------|------------------------------------------|----------------------------------|
| URL path        | /api/v1/users                            | Simple, visible; URL changes     |
| Custom header   | X-API-Version: 2                         | Clean URLs; harder to test/cache |
| Accept header   | Accept: application/vnd.myapp.v2+json    | Most "RESTful"; complex          |
| Query param     | /api/users?version=2                     | Easy; messy, cache issues        |

-----------------------------------------------------
Example (URL + header based)
-----------------------------------------------------
const express = require('express');
const app = express();

// v1: returns full name as one field
const v1 = express.Router();
v1.get('/users', (req, res) => res.json([{ id: 1, name: 'Alice Smith' }]));

// v2: breaking change -> name split into two fields
const v2 = express.Router();
v2.get('/users', (req, res) => res.json([{ id: 1, firstName: 'Alice', lastName: 'Smith' }]));

app.use('/api/v1', (req, res, next) => {
  res.set('Deprecation', 'true');                         // tell clients v1 is going away
  res.set('Sunset', 'Wed, 31 Dec 2026 23:59:59 GMT');
  next();
}, v1);
app.use('/api/v2', v2);

// Header-based alternative on an unversioned path
app.get('/api/users', (req, res, next) => {
  const version = req.get('X-API-Version') || '1';
  const router = version === '2' ? v2 : v1;
  req.url = '/users';
  router(req, res, next);
});

app.listen(3000);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Only bump the version for BREAKING changes; adding optional fields is backward compatible.
- Keep business logic in services so versions differ only in controllers / response shape.
- Have a deprecation policy and communicate timelines to API consumers.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What counts as a breaking change?
A1: Removing/renaming fields, changing types, changing required params or status codes.

Q2: Which approach have you used?
A2: URL versioning - it's easiest for frontend teams, Postman collections and API gateways.
*/
