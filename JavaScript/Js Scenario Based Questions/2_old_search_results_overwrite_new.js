/* 2_old_search_results_overwrite_new.js

=====================================================
Scenario: A slow old response overwrites the new results
=====================================================

The Question (how the interviewer asks it):
- "User types 'ja', then quickly 'java'. The request for 'ja' is slow and
  comes back after the 'java' response. Now the screen shows results for
  'ja' while the input says 'java'. Why, and how do you fix it?"

What the interviewer is checking:
- Do you recognize a race condition between async requests?
- Do you know AbortController and how fetch handles abort (AbortError)?
- Do you know a simple "latest request only" check with a request id?
- Do you handle the abort error without showing it to the user?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I explain the cause: network responses do not come back in the order
   they were sent. The last response to arrive wins, not the last request.
2. Fix A (best): cancel the old request. Before each new search I call
   abort() on the previous AbortController and pass a new signal to fetch.
3. When a fetch is aborted, it rejects with a DOMException named
   "AbortError". I ignore that error and do not show it in the UI.
4. Fix B (works with any promise, even non-fetch): keep a counter. Each
   request saves its id; when the response comes, I update the UI only if
   the id is still the latest.
5. I combine it with debounce (scenario 1) to reduce requests too.
6. In React, I abort in the useEffect cleanup function.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BUGGY: whichever response arrives last is shown
async function search(q) {
  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  render(await res.json());
}

// FIX A: abort the previous request
let controller = null;
async function searchAbort(q) {
  controller?.abort();
  controller = new AbortController();
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
      signal: controller.signal,
    });
    render(await res.json());
  } catch (err) {
    if (err.name === "AbortError") return; // expected, ignore it
    showError(err);
  }
}

// FIX B: only the latest request may update the UI
let latestId = 0;
async function searchLatest(q) {
  const id = ++latestId;
  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  const data = await res.json();
  if (id !== latestId) return; // a newer search started, drop this one
  render(data);
}

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "This is a race condition: responses can arrive in any order. My main fix
  is AbortController: before every new search I abort the previous request
  and pass the new signal to fetch, and I ignore the AbortError. If the
  async work cannot be cancelled, I use a request id and only render if the
  response belongs to the latest request. I usually add debounce as well."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Thinking debounce alone fixes it. A slow request can still finish late.
- Showing "AbortError" as an error message to the user.
- Reusing one AbortController for all requests. After abort() it stays
  aborted forever; create a new one each time.
- Disabling the input while loading, which hurts UX instead of fixing it.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does abort stop the server from processing the request?
A1: Not always. It stops the browser from waiting and frees the connection,
    but the server may already be working. That is fine for search (a read);
    for writes we need other protection like idempotency.

Q2: How do you do this in React?
A2: In useEffect create an AbortController, start fetch with its signal,
    and return a cleanup that calls controller.abort(). When the query
    changes, the old effect cleans up and cancels the old request.

Q3: What do libraries do here?
A3: React Query / TanStack Query and SWR key requests by the query and only
    show data for the current key. TanStack Query also passes an abort
    signal to the query function. RxJS uses switchMap for the same idea.
*/
