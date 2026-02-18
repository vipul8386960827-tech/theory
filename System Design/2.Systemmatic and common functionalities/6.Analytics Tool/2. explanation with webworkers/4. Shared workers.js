/*
---------- Potential Issue with Web Workers ----------

One limitation of using a regular (Dedicated) Web Worker is that
each browser tab creates its own worker instance.

If the user opens 10 tabs of the same application:
- There will be 10 separate Web Workers running.
- Each worker will maintain its own event queue.
- Each worker will perform its own batching logic.
- Each worker will send its own network requests.

This can lead to several issues:

1) Duplicate Analytics Events
   The same user session across multiple tabs may generate
   duplicate or overlapping analytics data.

2) Increased Network Usage
   Multiple workers may flush batches independently,
   increasing unnecessary API calls.

3) Higher Memory Consumption
   Each worker runs in a separate thread and maintains
   its own memory space, which increases overall resource usage.

4) Coordination Problems
   There is no shared state between dedicated workers,
   so they cannot coordinate batching or retry strategies.

Because of this, while Web Workers improve performance
by offloading work from the main thread, they do not
solve multi-tab coordination problems.

This is an architectural tradeoff that needs to be considered
when designing analytics systems.

/*
---------- What is a SharedWorker and how it solves the problem ----------

A SharedWorker is a type of Web Worker that can be shared
across multiple browser tabs, windows, or iframes
as long as they belong to the same origin.

Unlike a regular (Dedicated) Web Worker,
which creates one worker per tab,
a SharedWorker creates only one single background thread
that all tabs connect to.

How this solves the multi-tab problem:

If 10 tabs are open:
- Instead of 10 separate workers,
  there will be only 1 SharedWorker instance.
- All tabs send their analytics events to the same worker.
- The worker maintains one centralized queue.
- Batching and flushing happen in one place.

This solves the earlier issues:

1) Prevents Duplicate Batching
   Since batching happens in one central worker,
   multiple tabs do not independently flush data.

2) Reduces Network Calls
   Only one worker handles API communication,
   reducing unnecessary duplicate requests.

3) Lower Memory Usage
   Only one background thread runs instead of multiple.

4) Centralized Coordination
   The worker can manage retries, backoff strategies,
   and persistence logic in a unified way.

In short:
- Dedicated Worker = one worker per tab.
- SharedWorker = one worker shared across all tabs.

This makes SharedWorker a better architectural choice
for analytics systems that need multi-tab coordination.

we can create a new useEffect and inside that we can create a variable
const worker =  new SharedWorker("/worker.js")
workerRef = worker
worker.port.start() it will help us to send data to the port
and the depency array will be empty because we want the worker to be initialized one
*/
