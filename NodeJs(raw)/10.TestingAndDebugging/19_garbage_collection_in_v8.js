/* 19_garbage_collection_in_v8.js

=====================================================
Garbage Collection in V8
=====================================================

Definition (What I should say in the interview):
- "V8 manages memory automatically with a **generational garbage collector**, based on the
   observation that most objects die young. New objects go into the **young generation**, which
   is small and cleaned very often with a fast **Scavenge** (copying) collector. Objects that
   survive a couple of scavenges are promoted to the **old generation**, which is cleaned less
   often with **Mark-Sweep-Compact**. An object is collected only when it is no longer
   reachable from the roots - so a leak is really just an object that is still reachable."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Reachability: roots = global object, current call stack, active closures/handles.
2. Young generation (new space): small (a few MB to tens of MB); split in two semi-spaces.
   Scavenge copies live objects to the other semi-space -> fast, "minor GC".
3. Survive ~2 scavenges -> promoted to old generation.
4. Old generation: Mark (find live objects) -> Sweep (free dead ones) -> Compact (defragment).
   This is the "major GC" and is more expensive.
5. Orinoco (V8's GC project) makes it incremental, concurrent and parallel to reduce pauses,
   but some stop-the-world pauses still exist.
6. Old space limit is controlled with --max-old-space-size.

-----------------------------------------------------
Example
-----------------------------------------------------
// See GC activity
//   node --trace-gc app.js
//   [1234:0x...] 45 ms: Scavenge 4.1 (6.0) -> 3.2 (7.0) MB, 0.9 ms ...
//   [1234:0x...] 900 ms: Mark-Compact 60.3 (80.1) -> 41.2 (78.0) MB, 35.2 ms ...

function handler() {
  const temp = new Array(1000).fill('x');   // short-lived -> dies in young gen
  return temp.length;
}

const sessions = new Map();                  // long-lived -> promoted to old gen
function login(id) { sessions.set(id, { id, at: Date.now() }); }
// If entries are never deleted, they stay reachable -> never collected -> leak.

// Force GC only for experiments:
//   node --expose-gc app.js   then   global.gc();

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect     | Young generation        | Old generation             |
|------------|-------------------------|----------------------------|
| Objects    | newly allocated         | survived scavenges         |
| Algorithm  | Scavenge (copying)      | Mark-Sweep-Compact         |
| Frequency  | very often              | less often                 |
| Cost       | cheap, short pause      | expensive, longer pause    |

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is GC a performance concern in Node?
A1: GC pauses run on the main thread; frequent major GCs (from high allocation or a near-full
    heap) cause latency spikes for all requests.

Q2: Does setting a variable to null free memory immediately?
A2: No. It just removes one reference; the memory is reclaimed later when GC runs and finds
    the object unreachable.
*/
