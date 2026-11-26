/* 39_breaking_api_change_for_mobile_clients.js

=====================================================
Scenario: Breaking API change, but old mobile apps still use it
=====================================================

The Question (how the interviewer asks it):
- "We must change the response of GET /users/:id (for example, split 'name'
   into 'firstName' and 'lastName'). Many users never update the mobile
   app. How do you make this change without breaking them?"

What the interviewer is checking:
- Do you know that mobile clients cannot be forced to update quickly?
- Do you prefer additive, backward-compatible changes?
- Do you know API versioning options and deprecation practice?
- Do you use data (which versions still call the API) before removing things?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Check if the change can be additive. Add new fields, keep the old ones.
   Example: return name AND firstName/lastName. Old apps ignore new fields.
   Most changes can be done this way, with no new version.
2. If it is truly breaking (removed field, changed type or meaning), create a
   new version: /api/v2/users/:id, and keep /api/v1 working.
3. Share logic: both versions use the same service layer; only the
   "response mapper" (serializer) is different per version.
4. Mark the old version as deprecated: send Deprecation and Sunset headers,
   a Link to the docs, and tell client teams.
5. Measure usage: log the version and app version (e.g. X-App-Version
   header). Remove v1 only when traffic is near zero.
6. Use the mobile "force update" check: an endpoint returns the minimum
   supported app version, so very old apps show an "please update" screen.
7. Protect with contract tests so a refactor does not change v1 by accident.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// Same service, different response shape per version
async function getUser(id) {
  return db.users.findById(id);   // { id, firstName, lastName, email }
}

const toV1 = (u) => ({ id: u.id, name: `${u.firstName} ${u.lastName}`, email: u.email });
const toV2 = (u) => ({ id: u.id, firstName: u.firstName, lastName: u.lastName, email: u.email });

const v1 = express.Router();
v1.use((req, res, next) => {
  res.set('Deprecation', 'true');
  res.set('Sunset', 'Wed, 30 Jun 2027 00:00:00 GMT');
  res.set('Link', '</api/v2/users>; rel="successor-version"');
  next();
});
v1.get('/users/:id', async (req, res) => {
  logger.info({ api: 'v1', appVersion: req.get('x-app-version') }, 'v1 call');
  res.json(toV1(await getUser(req.params.id)));
});

const v2 = express.Router();
v2.get('/users/:id', async (req, res) => {
  res.json(toV2(await getUser(req.params.id)));
});

app.use('/api/v1', v1);
app.use('/api/v2', v2);

// Even better when possible: additive change in v1 (no new version)
// { id, name, firstName, lastName, email }

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "Mobile users update slowly, so I never break the existing contract. First
   I try an additive change: add the new fields and keep the old ones. If it
   is really breaking, I add /api/v2 and keep v1 running, with both versions
   sharing the same service logic and only different response mappers. I
   send Deprecation and Sunset headers on v1, track which app versions still
   call it, and remove it only when usage is close to zero, with a
   force-update screen for very old apps."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Changing the response and saying "users must update the app".
- Copy-pasting the whole controller for v2, so bugs must be fixed twice.
- Removing v1 on a date without checking real traffic.
- Renaming fields or changing types (string to number) and calling it
  "a small change".

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: URL versioning vs header versioning?
A1: URL (/v2) is simple, visible, easy to cache and route. Header versioning
    (Accept: application/vnd.app.v2+json) keeps URLs clean but is harder to
    test and debug. Most teams choose URL versioning.

Q2: Which changes are backward compatible?
A2: Adding new optional fields, new endpoints, new optional query params.
    Breaking: removing/renaming fields, changing types, making a field
    required, changing error formats or status codes.

Q3: How do you stop accidental breaking changes?
A3: Contract tests (Pact or schema tests with OpenAPI), API reviews in PRs,
    and tests that check the exact v1 response shape.
*/
