/* 0_index.js

=====================================================
Scenario-Based JavaScript Questions (2 years experience)
=====================================================

How many are enough?
- About 25-30. JS scenarios are narrower than backend ones, and the
  concepts behind them are already covered in "Js" and "Js Output Based
  Questions". These files train you to APPLY those concepts to a real bug.
- Answer pattern:
    1. Say what is causing the bug (the concept: closure, this, event loop...)
    2. Show the fix in code
    3. Mention the trade-off or a better alternative
    4. Say how you would prevent it (lint rule, test, code review)

-----------------------------------------------------
A. Async (most asked)
-----------------------------------------------------
1  Search API called on every keystroke (debounce)
2  Old search results overwrite new ones (race condition)
3  Retry a failed fetch with backoff
4  Limit concurrent requests (5 at a time)
5  await inside forEach does not wait
6  Add a timeout to fetch
7  Page slow due to sequential API calls
8  Promise error not caught by try/catch

-----------------------------------------------------
B. Closures & Scope
-----------------------------------------------------
9  var in a loop gives the same value
10 Function that runs only once
11 Memoize an expensive function
12 Private state with closures

-----------------------------------------------------
C. this Keyword
-----------------------------------------------------
13 Method loses this when passed as a callback
14 Arrow vs normal function in a handler or class

-----------------------------------------------------
D. Objects & Data
-----------------------------------------------------
15 Copied object changes the original
16 Floating point money bug
17 Compare two objects
18 Remove duplicate objects from an array
19 Sort breaks on numbers and dates
20 Transform API data for the UI
21 JSON.stringify loses data

-----------------------------------------------------
E. Performance & Memory
-----------------------------------------------------
22 Page gets slower over time (memory leak)
23 Laggy scroll or resize handler (throttle)
24 Event listeners on a large list (delegation)
25 Heavy loop freezes the UI

-----------------------------------------------------
F. Errors & Debugging
-----------------------------------------------------
26 Cannot read properties of undefined
27 Timezone bug in dates
28 Zero treated as a missing value (|| vs ??)

-----------------------------------------------------
Priority if short on time
-----------------------------------------------------
Must do: 1, 2, 4, 5, 9, 13, 15, 16, 22, 24, 25, 28
Then:    the rest
*/
