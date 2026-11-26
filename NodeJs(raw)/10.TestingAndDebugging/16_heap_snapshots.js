/* 16_heap_snapshots.js

=====================================================
Heap Snapshots
=====================================================

Definition (What I should say in the interview):
- "A heap snapshot is a full picture of all the objects in the V8 heap at one moment - what
   they are, how much memory they take and who is referencing them. It's the main tool for
   finding memory leaks. The technique is to take **several snapshots over time** while the app
   is under load and **compare** them in Chrome DevTools: objects whose count keeps growing
   between snapshots are the leak suspects, and the retainers view shows what is holding them."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Taking a snapshot triggers a GC first, so only reachable (live) objects are shown.
2. Shallow size -> memory of the object itself; Retained size -> memory freed if it were deleted.
3. Views in DevTools: Summary, Comparison, Containment, Statistics.
4. "Retainers" panel -> the reference chain from GC root to the object (why it's not freed).
5. Snapshots are expensive: they pause the process and can need about as much memory as
   the heap itself - be careful in production.

-----------------------------------------------------
Example - ways to take a snapshot
-----------------------------------------------------
// 1) Chrome DevTools
//    node --inspect app.js -> chrome://inspect -> Memory tab -> "Take heap snapshot"

// 2) From code (Node 11.13+)
const v8 = require('v8');
app.get('/debug/heap', (req, res) => {        // protect this route with admin auth!
  const file = v8.writeHeapSnapshot();         // writes Heap-<date>-<pid>.heapsnapshot
  res.json({ file });
});

// 3) On a signal (Node 12+)
//    node --heapsnapshot-signal=SIGUSR2 app.js
//    kill -USR2 <pid>

// 4) Automatically near OOM (Node 15.1+)
//    node --heapsnapshot-near-heap-limit=2 app.js

-----------------------------------------------------
Workflow (3-snapshot technique)
-----------------------------------------------------
1. Start the app, warm it up, take snapshot A.
2. Run load (e.g. autocannon -c 50 -d 60 http://localhost:3000/api), take snapshot B.
3. Run the same load again, take snapshot C.
4. In DevTools, select C -> "Comparison" with B -> sort by "# Delta" / "Size Delta".
5. Objects that grow consistently (e.g. thousands of new closures, arrays, strings in a Map)
   -> check their Retainers to find the variable / cache / listener holding them.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Load .heapsnapshot files into DevTools Memory tab via "Load" button for offline analysis.
- Snapshots contain real data (tokens, user data) -> treat them as sensitive files.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why compare multiple snapshots instead of looking at one?
A1: One snapshot shows what is big, not what is growing. A leak is growth over time, so the
    delta between snapshots taken under the same load points to it.

Q2: Shallow vs retained size?
A2: Shallow is the object's own memory. Retained includes everything that would be freed if
    this object was removed - a small Map can have a huge retained size.
*/
