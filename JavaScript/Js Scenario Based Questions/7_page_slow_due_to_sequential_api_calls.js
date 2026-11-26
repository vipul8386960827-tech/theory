/* 7_page_slow_due_to_sequential_api_calls.js

=====================================================
Scenario: Dashboard is slow and one failing API breaks everything
=====================================================

The Question (how the interviewer asks it):
- "Our dashboard loads user, orders, notifications and stats. The code
  awaits them one after another, so the page takes 4 seconds. Also, if the
  stats API fails, the whole dashboard shows an error. How do you fix it?"

What the interviewer is checking:
- Can you see that independent awaits run in sequence (a "waterfall")?
- Do you know Promise.all vs Promise.allSettled and when to use each?
- Can you design a partial UI (show what loaded, error only for one card)?
- Do you know the difference between required and optional data?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I check the Network tab: the requests start one after another. Total
   time = sum of all requests (1 s + 1 s + 1 s + 1 s).
2. The 4 APIs do not depend on each other, so I start them all at once.
   Total time becomes about the slowest one (about 1 s).
3. Promise.all is good if ALL data is required: it rejects on the first
   failure.
4. Here, each card can work alone, so I use Promise.allSettled. I get a
   status for each and render each card separately.
5. The failed card shows "Could not load stats - Retry", the rest works.
6. If one call depends on another (orders need userId), I await only that
   one first, then run the rest in parallel.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BUGGY: waterfall (slow) and one failure breaks all
async function loadDashboard() {
  const user = await getUser();
  const orders = await getOrders();
  const notes = await getNotifications();
  const stats = await getStats(); // if this throws, nothing renders
  render({ user, orders, notes, stats });
}

// FIXED: parallel + partial UI
async function loadDashboardFixed() {
  const names = ["user", "orders", "notes", "stats"];
  const results = await Promise.allSettled([
    getUser(), getOrders(), getNotifications(), getStats(),
  ]);

  results.forEach((r, i) => {
    if (r.status === "fulfilled") renderCard(names[i], r.value);
    else renderCardError(names[i], r.reason); // only this card fails
  });
}

// Mixed: user is required, others are optional
async function loadMixed() {
  const userP = getUser(); // start everything first
  const othersP = Promise.allSettled([getOrders(), getNotifications(), getStats()]);
  const user = await userP; // if it fails, show full-page error
  const others = await othersP;
  render(user, others);
}

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "The awaits run one by one, so the time adds up. Because the calls are
  independent, I start them together; then the page waits only for the
  slowest one. For failure, Promise.all rejects if any one fails, which is
  right only when all data is required. For a dashboard I use
  Promise.allSettled and render each card based on its own status, so one
  broken API shows one error card, not a broken page."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Thinking Promise.all cancels the other requests when one fails. It does
  not; it just stops waiting.
- Using allSettled but never checking status, so undefined data crashes
  the render.
- Making dependent calls parallel by mistake (using userId before it
  exists).
- In loadMixed: creating a promise and awaiting it much later without a
  catch can log an unhandled rejection warning if it fails early. Here
  allSettled never rejects, so it is safe.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What are Promise.race and Promise.any?
A1: race settles with the first promise that settles (success or error).
    any resolves with the first success and rejects with AggregateError
    only if all fail. any is good for "fastest mirror wins".

Q2: Could you make the page feel even faster?
A2: Yes. Render each card as soon as its own request finishes (each card
    loads itself with its own loading state), use skeletons, cache data
    (React Query / SWR), or let the server send one combined response.

Q3: Is there a limit to starting requests in parallel?
A3: For 4 calls, no. For hundreds, yes: browsers limit connections per
    host on HTTP/1.1 and servers may rate-limit, so I use a concurrency
    limit (scenario 4).
*/
