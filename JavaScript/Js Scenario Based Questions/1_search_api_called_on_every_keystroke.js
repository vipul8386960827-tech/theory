/* 1_search_api_called_on_every_keystroke.js

=====================================================
Scenario: Search box calls the API on every keystroke
=====================================================

The Question (how the interviewer asks it):
- "We have a search input. Every time the user types a letter, we call the
  search API. Typing 'laptop' sends 6 requests. The backend team is
  complaining. How would you fix this?"

What the interviewer is checking:
- Do you know the word "debounce" and when to use it (vs throttle)?
- Can you write debounce yourself using closures and setTimeout?
- Do you think about the user (UX) and the server (load) together?
- Do you know that debounce alone does not fix out-of-order responses?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. First I confirm the problem: open the Network tab and see one request
   per keystroke.
2. I say the fix is "debounce": wait until the user stops typing for some
   time (for example 300 ms), then send only one request.
3. I write a debounce function: it keeps a timer in a closure. Every call
   clears the old timer and starts a new one.
4. I add small extras: do not search if the text is empty or shorter than
   2 characters, and trim spaces.
5. I mention leading vs trailing: trailing (default) runs after the user
   stops; leading runs on the first call and ignores calls during the wait.
6. I mention that debounce reduces requests but a slow old response can
   still arrive late, so I also cancel old requests (see scenario 2).

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BUGGY: one API call per keystroke
input.addEventListener("input", (e) => searchApi(e.target.value));

// FIXED: debounce (trailing by default, optional leading)
function debounce(fn, delay = 300, { leading = false } = {}) {
  let timerId = null;

  function debounced(...args) {
    const callNow = leading && timerId === null;
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      timerId = null;
      if (!leading) fn.apply(this, args); // trailing call
    }, delay);

    if (callNow) fn.apply(this, args); // leading call
  }

  debounced.cancel = () => {
    clearTimeout(timerId);
    timerId = null;
  };

  return debounced;
}

const debouncedSearch = debounce((text) => {
  const q = text.trim();
  if (q.length < 2) return;
  searchApi(q);
}, 300);

input.addEventListener("input", (e) => debouncedSearch(e.target.value));
// In React: create it once (useMemo / useRef) and call .cancel() on unmount.

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "I would debounce the input handler. Debounce waits until the user stops
  typing for about 300 ms and then makes only one call. I implement it with
  a closure that stores a timer: each keystroke clears the old timer and
  sets a new one. Trailing debounce is best for search; leading is good when
  the first click must act immediately. I would also cancel old requests so
  a late response cannot overwrite new results."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Creating a new debounced function on every render (React), so the timer
  is lost and nothing is debounced.
- Mixing up debounce and throttle. Throttle runs at most once per interval
  (good for scroll/resize); debounce waits for silence (good for search).
- Losing "this" or arguments inside the debounced function.
- Forgetting to clear the timer on unmount, which can call setState on an
  unmounted component.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between debounce and throttle?
A1: Debounce runs the function only after calls stop for N ms. Throttle runs
    it at most once every N ms while calls continue. Search uses debounce;
    scroll position tracking or resize usually uses throttle.

Q2: How would you use this in React?
A2: Keep the debounced function stable with useMemo or useRef, or debounce
    the value with a useDebounce hook (useEffect + setTimeout + cleanup that
    calls clearTimeout). Cancel it in the cleanup function.

Q3: What delay would you pick?
A3: Usually 250-500 ms. Too short does not reduce calls much; too long makes
    the UI feel slow. I would agree on it with UX and measure.
*/
