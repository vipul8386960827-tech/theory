/* 20_when_not_to_use_nodejs.js

=====================================================
When NOT to Use Node.js
=====================================================

Definition (What I should say in the interview):
- "I would avoid Node.js as the main choice for **CPU-intensive workloads** - like video
   encoding, image processing at scale, machine learning, or heavy scientific computation -
   because long computations block the single JS thread and hurt every other request. In those
   cases I'd use worker threads, a job queue, or a service in a language like Go, Java or Python."

-----------------------------------------------------
Not Ideal For
-----------------------------------------------------
1. **Heavy computation** -> video/audio encoding, large image processing, ML training.
2. **Big data number-crunching** -> better in Python/Java/Spark.
3. **Simple CRUD apps with heavy relational logic** where a mature framework
   (Django, Rails, Spring) may be more productive - a team choice, not a hard rule.

-----------------------------------------------------
If you must do CPU work in Node
-----------------------------------------------------
- worker_threads for parallel CPU work.
- child_process to run external programs (ffmpeg).
- Job queue (BullMQ + Redis) to process in background workers.
- Split into chunks with setImmediate so the loop can breathe.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can Node do CPU work at all?
A1: Yes, with worker_threads it can use multiple cores - it's just not its default strength.
*/
