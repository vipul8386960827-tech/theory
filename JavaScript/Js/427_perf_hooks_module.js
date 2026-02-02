/* 427_perf_hooks_module.js

=====================================================
Performance Hooks Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `perf_hooks` module in Node.js provides a set of APIs to **measure the performance of applications**. 
   It helps developers track execution time, detect bottlenecks, and monitor performance metrics 
   using high-resolution timers similar to the Performance API in browsers."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. High-resolution timing with `performance.now()` (in milliseconds, sub-millisecond precision).
2. Performance marks and measures for profiling code (`performance.mark()`, `performance.measure()`).
3. `PerformanceObserver` to listen for performance entries asynchronously.
4. Built-in monitoring features like:
   - `monitorEventLoopDelay()` → tracks event loop latency.
   - `performance.nodeTiming` → provides Node.js lifecycle timing.
5. Useful for benchmarking, debugging, and performance monitoring.

-----------------------------------------------------
Basic Example (Measuring Execution Time)
-----------------------------------------------------
const { performance } = require('perf_hooks');

const start = performance.now();
// Simulate a task
for (let i = 0; i < 1e6; i++) {}
const end = performance.now();

console.log(`Execution time: ${end - start} ms`);

-----------------------------------------------------
Example with Marks and Measures
-----------------------------------------------------
const { performance, PerformanceObserver } = require('perf_hooks');

performance.mark('startTask');

// Simulate async work
setTimeout(() => {
  performance.mark('endTask');
  performance.measure('Task Duration', 'startTask', 'endTask');
}, 500);

const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration} ms`);
  });
});

obs.observe({ entryTypes: ['measure'] });

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Profiling application performance.
- Measuring function or API response times.
- Detecting event loop delays.
- Monitoring Node.js startup lifecycle.
- Benchmarking algorithms or critical code paths.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `performance.now()` provides more precise timing than `Date.now()`.
2. Performance marks and measures are useful for labeling code sections.
3. Observers provide async performance logging for continuous monitoring.
4. Event loop monitoring helps detect performance degradation under load.
5. Best used in production monitoring or debugging performance-critical systems.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of `perf_hooks` as a **stopwatch for your Node.js app**:
  - You can start, stop, and record how long different parts of your program take to run.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why use `performance.now()` instead of `Date.now()`?  
A1: `performance.now()` offers sub-millisecond precision, while `Date.now()` only gives millisecond precision.

Q2: What is the role of `PerformanceObserver`?  
A2: It listens to performance entries (like measures) asynchronously and helps log or analyze them.

Q3: How can you detect event loop delays in Node.js?  
A3: By using `monitorEventLoopDelay()` from the `perf_hooks` module.

Q4: What does `performance.nodeTiming` provide?  
A4: It gives detailed Node.js lifecycle metrics like startup, bootstrap, and event loop phases.

Q5: How is the Node.js `perf_hooks` module similar to the browser Performance API?  
A5: Both provide high-resolution timers, marks, and measures to track performance metrics.
*/
