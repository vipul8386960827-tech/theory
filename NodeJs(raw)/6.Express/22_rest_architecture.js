/* 22_rest_architecture.js

=====================================================
REST Architecture
=====================================================

Definition (What I should say in the interview):
- "REST stands for **Representational State Transfer**. It's an architectural style where
   everything is treated as a **resource** identified by a URL, and we use standard **HTTP
   methods** to act on it - GET to read, POST to create, PUT/PATCH to update and DELETE to
   remove. It's **stateless**, meaning every request carries all the info needed, like the auth
   token, so the server doesn't keep client session state. Responses are usually JSON with
   proper status codes."

-----------------------------------------------------
REST Constraints (6)
-----------------------------------------------------
1. Client-Server         -> UI and backend evolve independently.
2. Stateless             -> no session stored on server between requests.
3. Cacheable             -> responses say if they can be cached (Cache-Control, ETag).
4. Uniform Interface     -> resources via URLs, standard methods, representations.
5. Layered System        -> client doesn't know about proxies, load balancers, CDNs.
6. Code on Demand        -> optional (server can send executable code).

-----------------------------------------------------
Good URL design
-----------------------------------------------------
GET    /api/users            -> list users
POST   /api/users            -> create user
GET    /api/users/12         -> one user
PATCH  /api/users/12         -> partial update
DELETE /api/users/12         -> delete
GET    /api/users/12/orders  -> nested resource
Bad:   /api/getUsers, /api/deleteUser?id=12  (verbs in URL)

-----------------------------------------------------
Example
-----------------------------------------------------
const express = require('express');
const app = express();
app.use(express.json());
let users = [{ id: 1, name: 'Alice' }];

app.get('/api/users', (req, res) => res.json(users));
app.post('/api/users', (req, res) => {
  const user = { id: users.length + 1, ...req.body };
  users.push(user);
  res.status(201).location(`/api/users/${user.id}`).json(user);
});
app.delete('/api/users/:id', (req, res) => {
  users = users.filter((u) => u.id !== Number(req.params.id));
  res.sendStatus(204);
});
app.listen(3000);

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: REST vs GraphQL?
A1: REST has multiple endpoints with fixed responses; GraphQL has one endpoint where the client
    asks for exactly the fields it needs, avoiding over/under-fetching.

Q2: Is a JWT-based API stateless?
A2: Yes, the token carries identity, so any server instance can handle the request.

Q3: What is HATEOAS?
A3: Responses include links to related actions; it's part of the uniform interface but rarely used fully.
*/
