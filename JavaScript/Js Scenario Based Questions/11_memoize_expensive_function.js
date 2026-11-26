/* 11_memoize_expensive_function.js

=====================================================
Scenario: A slow pure function is called again and again with the same inputs
=====================================================

The Question (how the interviewer asks it):
- "We have a function that does heavy calculation. Profiling shows it is called
   many times with the same arguments and the page feels slow. How would you fix it?"

What the interviewer is checking:
- Do you know memoization (cache the result for the same input)?
- Can you build it with a closure and a Map?
- Do you think about the cache key and about memory growth?
- Do you know memoization is safe only for PURE functions?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. First I confirm the function is pure: same input always gives the same output,
   and it has no side effects (no API call, no Date.now(), no random, no DOM change).
2. I write a memoize helper. It keeps a Map inside a closure, so the cache lives
   between calls but is private.
3. On each call I build a cache key from the arguments. For one primitive argument
   I use it directly. For many primitive arguments I can use JSON.stringify(args).
4. If the key is in the Map, I return the cached value. If not, I call the real
   function, store the result, and return it.
5. I think about memory: an unbounded Map grows forever. For many different inputs
   I add a size limit (simple LRU) or clear the cache sometimes.
6. For object arguments I can use a WeakMap keyed by the object, so entries are
   garbage collected when the object is gone.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// Slow version: recalculates every time
function slowSquareSum(n) {
  let sum = 0;
  for (let i = 0; i < n; i++) sum += i * i;
  return sum;
}

// Fixed: generic memoize with closure + Map + simple size limit (LRU)
function memoize(fn, { maxSize = 100 } = {}) {
  const cache = new Map(); // private, kept alive by the closure

  return function (...args) {
    const key = args.length === 1 ? args[0] : JSON.stringify(args);

    if (cache.has(key)) {
      const value = cache.get(key);
      cache.delete(key);       // move to the end = most recently used
      cache.set(key, value);
      return value;
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    if (cache.size > maxSize) {
      cache.delete(cache.keys().next().value); // remove oldest entry
    }
    return result;
  };
}

const fastSquareSum = memoize(slowSquareSum);
fastSquareSum(1e7); // slow, first time
fastSquareSum(1e7); // instant, from cache

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "I would memoize it. I wrap the function in a helper that keeps a Map inside a
   closure. For each call I create a key from the arguments; if the key exists I
   return the cached result, otherwise I compute, store and return it. This only
   works for pure functions. I also limit the cache size, because an unbounded
   cache is a memory leak."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Memoizing a function that is not pure (uses time, random, API data, globals).
- Using an object as a key in a normal Map and expecting a new object with the
  same content to match. Map compares keys by reference.
- Using JSON.stringify keys with objects whose key order changes, or with values
  JSON cannot represent (undefined, functions, Date becomes a string).
- Never clearing the cache, so memory grows forever in a long-running app.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why does the cache survive between calls?
A1: Because of the closure. The returned function keeps a reference to the cache
    variable from memoize's scope, so it is not garbage collected.

Q2: How would you memoize a recursive function like fibonacci?
A2: The recursive calls must go through the memoized version. For example:
    const fib = memoize(n => (n < 2 ? n : fib(n - 1) + fib(n - 2)));
    This changes the time from O(2^n) to O(n).

Q3: Where do you see memoization in React?
A3: useMemo caches a computed value, useCallback caches a function reference, and
    React.memo skips re-rendering a component when props are shallow-equal. They
    only remember the last inputs, not every input.
*/
