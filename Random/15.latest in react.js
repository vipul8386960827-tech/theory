/*
===============================
REACT 19 - KEY FEATURES
===============================

1. SERVER COMPONENTS
--------------------
- Components can run on the server instead of the browser
- Reduces bundle size (less JS sent to client)
- Improves performance and load time

Example idea:
- Heavy logic (DB calls, processing) runs on server
- Client only gets final UI


2. REACT COMPILER (AUTO OPTIMIZATION)
------------------------------------
- Automatically optimizes rendering
- Reduces need for:
    - useMemo
    - useCallback

Benefits:
- Cleaner code
- Fewer performance bugs


3. ACTIONS (ASYNC HANDLING)
---------------------------
- New way to handle:
    - form submissions
    - API calls
    - loading & error states

Benefits:
- Less manual state handling
- Simplifies async workflows


4. NEW HOOKS
------------

a) useActionState
- Manages async state (loading, success, error)

b) useFormStatus
- Gives form status (loading, pending)

c) useOptimistic
- Updates UI before server response (optimistic UI)

Example:
- User clicks "Like" → UI updates instantly → server confirms later


5. use() API (SIMPLIFIED DATA FETCHING)
--------------------------------------
- Directly use async data inside components

Before:
- useEffect + useState + loading logic

Now:
- const data = use(fetchData())

Benefits:
- Cleaner and shorter code


6. BUILT-IN SEO / METADATA HANDLING
----------------------------------
- Manage:
    - <title>
    - <meta>
    - SEO tags

Benefits:
- No need for external libraries


7. REF IMPROVEMENTS
-------------------
- Pass ref like normal props
- Less need for forwardRef

Benefits:
- Simpler component structure


8. PERFORMANCE IMPROVEMENTS
---------------------------
- Better:
    - Concurrent rendering
    - Suspense
    - Automatic batching

Benefits:
- Faster UI updates
- Smoother user experience


9. PARTIAL PRE-RENDERING (React 19.2)
-------------------------------------
- Static parts load first
- Dynamic parts load later

Combination of:
- SSR + Static + Client rendering

Benefits:
- Faster page load
- Better performance


===============================
INTERVIEW SUMMARY (SHORT)
===============================
- React 19 focuses on:
    1. Server-side execution (Server Components)
    2. Automatic optimization (React Compiler)
    3. Simplified async handling (Actions, use hooks)
    4. Better performance (partial pre-rendering)

*/
