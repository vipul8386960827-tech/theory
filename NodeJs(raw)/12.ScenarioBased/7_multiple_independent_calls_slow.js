/* 7_multiple_independent_calls_slow.js

=====================================================
Scenario: Endpoint With 4 Independent Calls Is Slow
=====================================================

The Question (how the interviewer asks it):
- "A dashboard endpoint loads user profile, orders, notifications and recommendations. Each
   call takes about 200ms, but the endpoint takes 800ms+. How would you make it faster?"

What the interviewer is checking:
- Do you see that sequential await adds up the times?
- Promise.all vs Promise.allSettled vs Promise.race/any, and how errors behave.
- Limiting concurrency, timeouts, and handling partial failure.

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Look at the code / trace: if each call is awaited one after another, total time is the SUM
   (200 + 200 + 200 + 200 = 800ms).
2. Check dependencies: if the calls do not need each other's results, start them all at once.
   Total time becomes the slowest call (~200ms).
3. Choose the right combinator:
   - Promise.all: all results are required; fails fast if any one rejects.
   - Promise.allSettled: some results are optional; get every result and handle failures one by one.
4. Handle partial failure: e.g. if recommendations fail, still return the dashboard with an
   empty list, but if the profile fails, return an error.
5. Add a timeout to the optional slow calls so one slow service does not slow the response.
6. For many calls (e.g. 500 items), do not fire all at once - limit concurrency (p-limit)
   so we do not overload the DB pool or the other API.
7. Further: reduce the calls themselves (one JOIN instead of 2 queries, caching, DataLoader
   for N+1 in GraphQL).

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BAD: sequential - ~800ms
app.get('/dashboard', async (req, res) => {
  const profile = await getProfile(req.user.id);
  const orders = await getOrders(req.user.id);
  const notifications = await getNotifications(req.user.id);
  const recs = await getRecommendations(req.user.id);
  res.json({ profile, orders, notifications, recs });
});

// GOOD: parallel - ~200ms, optional parts can fail
app.get('/dashboard', async (req, res, next) => {
  try {
    const id = req.user.id;
    const [profile, orders, notifications, recs] = await Promise.allSettled([
      getProfile(id),
      getOrders(id),
      getNotifications(id),
      getRecommendations(id, { signal: AbortSignal.timeout(300) }), // optional + timeout
    ]);
    if (profile.status === 'rejected') throw profile.reason;      // required part

    const value = (r, fallback) => (r.status === 'fulfilled' ? r.value : fallback);
    res.json({
      profile: profile.value,
      orders: value(orders, []),
      notifications: value(notifications, []),
      recs: value(recs, []),
    });
  } catch (err) { next(err); }
});

// Many calls: limit concurrency
const pLimit = require('p-limit');
const limit = pLimit(10);                          // max 10 at the same time
const prices = await Promise.all(ids.map((id) => limit(() => getPrice(id))));

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "The calls are awaited one by one, so the times add up. Since they are independent, I start
   them together with Promise.all, so the total time is only the slowest call. If some parts
   are optional, I use Promise.allSettled so one failure does not break the whole response,
   and I add timeouts on slow optional calls. If there are hundreds of calls, I limit
   concurrency with something like p-limit so I do not overload the database."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Using Promise.all for optional data, so one failing widget breaks the whole page.
- Using forEach with async callbacks - forEach does not wait, errors are lost.
- Running 10,000 promises at once with no concurrency limit.
- Thinking Promise.all runs things on multiple threads - it only waits for I/O in parallel.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: If one promise in Promise.all rejects, do the other calls stop?
A1: No. Promise.all rejects immediately, but the other operations keep running in the
    background. To really cancel them, pass an AbortSignal and abort it.

Q2: Promise.race vs Promise.any?
A2: race settles with the first promise that settles (success OR error). any resolves with the
    first success and rejects only if all fail (AggregateError).

Q3: Does this help if all 4 queries go to the same database?
A3: Usually yes, if the pool has free connections - they run in parallel on different
    connections. But if the pool size is 1 or the DB is overloaded, the gain is small.
*/
