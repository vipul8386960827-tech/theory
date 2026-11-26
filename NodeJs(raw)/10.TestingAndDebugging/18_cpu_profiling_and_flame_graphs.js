/* 18_cpu_profiling_and_flame_graphs.js

=====================================================
CPU Profiling and Flame Graphs
=====================================================

Definition (What I should say in the interview):
- "CPU profiling tells me where the process is spending its CPU time, function by function.
   It's what I use when an API is slow or CPU is at 100% and the event loop is blocked. I can
   record a profile with Chrome DevTools via --inspect, with node --cpu-prof, or with tools like
   **Clinic.js** and **0x**. The result is usually viewed as a **flame graph**: each bar is a
   function, the width is how much time it took including its children, so the widest bars at
   the top of a stack are the hot spots to optimise."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Profiler samples the call stack many times per second (sampling profiler).
2. Flame graph: x-axis = proportion of samples (time), NOT a timeline; y-axis = stack depth.
3. Wide plateau at the top -> function itself burning CPU ("self time").
4. Common culprits: JSON.parse/stringify on big payloads, sync crypto, regex backtracking,
   heavy loops in request handlers, *Sync fs calls, bcrypt with high rounds on main thread.
5. Profile under realistic load, otherwise the profile is mostly idle time.

-----------------------------------------------------
Example - commands
-----------------------------------------------------
// 1) Built-in: writes a .cpuprofile file on exit -> open in DevTools Performance/Profiler tab
//    node --cpu-prof app.js
//    node --cpu-prof --cpu-prof-dir=./profiles app.js

// 2) DevTools live
//    node --inspect app.js -> chrome://inspect -> "Profiler"/"Performance" -> Record

// 3) V8 tick profiler
//    node --prof app.js
//    node --prof-process isolate-0x...-v8.log > processed.txt

// 4) Clinic.js / 0x (flame graphs)
//    npx clinic flame -- node app.js
//    npx clinic doctor -- node app.js     (diagnoses event loop / IO / GC issues)
//    npx 0x app.js

// Generate load while profiling
//    npx autocannon -c 100 -d 20 http://localhost:3000/report

-----------------------------------------------------
Example - typical finding
-----------------------------------------------------
app.get('/report', (req, res) => {
  const rows = hugeArray.filter(r => /^(a+)+$/.test(r.code));   // catastrophic regex
  res.json(rows);
});
// Flame graph shows a wide bar for RegExp exec under the route handler.
// Fix: simpler regex, paginate, cache result, or move heavy work to a worker thread.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Measure event loop lag too: perf_hooks.monitorEventLoopDelay().
- Profiling adds overhead; in production, profile one instance briefly or use an APM profiler.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you know the event loop is blocked?
A1: High event loop delay (monitorEventLoopDelay / APM), all requests slow at once, CPU near
    100% on one core. Then a CPU profile shows which sync code is responsible.

Q2: How do you fix CPU-heavy work in Node?
A2: Optimise the algorithm first; otherwise offload to worker_threads, a separate service or
    a job queue, and use the cluster module / multiple instances to use all cores.
*/
