/* 0_index.js

=====================================================
Scenario-Based Node.js Questions (2 years experience)
=====================================================

How many are enough?
- About 40-45 well-understood scenarios. Real interviews pick 3-6 scenarios,
  and almost all of them are variations of the ones below.
- Do not memorize answers. Learn the PATTERN of a good answer:
    1. Clarify the problem (ask 1-2 questions)
    2. Measure / find the cause first (logs, metrics, profiling)
    3. Give the fix, with the trade-off
    4. Say how you would prevent it in future (monitoring, tests)
- If you have a real story from your job for a scenario, tell that instead.
  "In my last project we had ..." is the strongest answer you can give.

-----------------------------------------------------
A. Performance & Event Loop (most asked)
-----------------------------------------------------
1  API slow under load
2  CPU-heavy endpoint blocks the whole server
3  High event loop lag in production
4  Process a large CSV / 1M records without crashing
5  Memory keeps growing until crash (memory leak)
6  Third-party API slow or failing
7  Multiple independent calls are slow
8  Serving large file downloads

-----------------------------------------------------
B. Error Handling & Reliability
-----------------------------------------------------
9  Server crashes on unhandled rejection
10 Requests dropped during deploy (graceful shutdown)
11 Async route error makes the request hang
12 Payment webhook received twice (idempotency)
13 Send email without slowing signup (background jobs)
14 Cron job runs on every instance
15 Logs are useless for debugging production

-----------------------------------------------------
C. Database
-----------------------------------------------------
16 Query slow on a large collection
17 N+1 problem in a list endpoint
18 Pagination slow on deep pages
19 Two users book the last seat (race condition)
20 Transfer money between accounts (transactions)
21 Too many DB connections
22 Implement a search feature
23 Schema change in production

-----------------------------------------------------
D. Auth & Security
-----------------------------------------------------
24 JWT token stolen
25 Old tokens still work after password change
26 Brute force login attempts
27 CORS error from frontend
28 User can edit another user's data (IDOR)
29 Secrets committed to git
30 Secure file upload
31 NoSQL injection in login

-----------------------------------------------------
E. Scaling & Architecture
-----------------------------------------------------
32 Traffic grows 10x
33 Users logged out after scaling
34 Add caching to a slow endpoint
35 Real-time notifications / chat
36 Rate limiter across instances
37 Monolith vs microservices decision
38 Long-running task (video processing)
39 Breaking API change for mobile clients

-----------------------------------------------------
F. Debugging, Testing & Code Quality
-----------------------------------------------------
40 Bug only in production
41 Test an endpoint that calls a payment API
42 Refactor legacy callback code
43 Config for multiple environments

-----------------------------------------------------
Priority if short on time
-----------------------------------------------------
Must do: 1, 2, 4, 5, 9, 11, 16, 17, 19, 24, 26, 28, 32, 34, 38
Then:    the rest
*/
