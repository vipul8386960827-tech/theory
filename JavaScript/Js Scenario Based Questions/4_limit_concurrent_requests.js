/* 4_limit_concurrent_requests.js

=====================================================
Scenario: Call an API for 100 items, at most 5 at a time
=====================================================

The Question (how the interviewer asks it):
- "We have 100 user ids and must call /api/users/:id for each. If we fire
  all 100 at once, the server rate-limits us. If we do them one by one, it
  is too slow. Write a function that runs at most 5 requests at the same
  time."

What the interviewer is checking:
- Do you understand that a promise starts running when it is created?
- Can you write a promise pool (worker pattern) without a library?
- Do you keep results in the original order?
- Do you think about error handling (one failure, stop or continue?)

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I explain why ids.map(id => fetch(...)) starts all 100 requests at once:
   the request starts when fetch is called, not when we await it.
2. So I must pass functions (tasks), not already-started promises.
3. I start N "workers" (N = 5). Each worker takes the next index from a
   shared counter, runs that task, saves the result at that index, and
   repeats until no tasks are left.
4. JavaScript is single-threaded, so "next++" is safe between workers.
5. I wait for all workers with Promise.all and return results in order.
6. For errors, I choose: fail fast (default here) or store
   { status, value/reason } like allSettled so other items continue.
7. I mention libraries like p-limit or p-map for production code.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BUGGY: starts 100 requests at the same time
const users = await Promise.all(ids.map((id) => fetch(`/api/users/${id}`)));

// BUGGY: chunks of 5, but each chunk waits for its slowest request
// for (let i = 0; i < ids.length; i += 5) await Promise.all(...)

// FIXED: promise pool with a limit
async function runWithLimit(tasks, limit = 5) {
  const results = new Array(tasks.length);
  let next = 0;

  async function worker() {
    while (next < tasks.length) {
      const index = next++; // take the next task
      results[index] = await tasks[index]();
    }
  }

  const workerCount = Math.min(limit, tasks.length);
  await Promise.all(Array.from({ length: workerCount }, worker));
  return results; // same order as tasks
}

const tasks = ids.map((id) => () =>
  fetch(`/api/users/${id}`).then((r) => r.json())
);
const users2 = await runWithLimit(tasks, 5);

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "A promise starts when it is created, so I pass an array of functions
  instead of promises. Then I start 5 workers. Each worker picks the next
  task index, awaits it, stores the result in that index, and loops until
  the list is empty. So there are always up to 5 requests in flight, and
  results keep the original order. In production I might use p-limit."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Passing promises (already running) into the limiter, so the limit does
  nothing.
- Batching in fixed chunks of 5: it works, but is slower because each batch
  waits for its slowest request.
- Pushing results in finish order, which mixes up the order.
- No plan for errors: one rejected task stops everything with Promise.all.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How would you continue when some requests fail?
A1: Wrap each task: try { results[i] = { status: "fulfilled", value } }
    catch (e) { results[i] = { status: "rejected", reason: e } }. Then the
    caller sees all outcomes, like Promise.allSettled.

Q2: Why is next++ safe with many workers?
A2: JavaScript runs one piece of code at a time on the event loop. Reading
    and incrementing next happens synchronously between awaits, so two
    workers can never get the same index.

Q3: What about a rate limit like "10 requests per second" instead?
A3: That is a different limit (rate, not concurrency). I would use a token
    bucket or delay between starts, and handle 429 with backoff.
*/
