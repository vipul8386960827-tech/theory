/* 11_child_process_vs_worker_threads.js

=====================================================
child_process vs worker_threads
=====================================================

Definition (What I should say in the interview):
- "Both let me do work outside the main event loop, but the level is different. A **child
   process** is a **completely separate OS process** with its own memory and can run **any
   program**, like Python, ffmpeg or another Node script. A **worker thread** is a **thread
   inside the same Node process**, can only run JavaScript, starts faster, uses less memory and
   can share memory. I choose a child process when I need **isolation or a non-JS tool**, and a
   worker thread for **CPU-heavy JavaScript**."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature           | child_process                     | worker_threads                  |
|-------------------|-----------------------------------|---------------------------------|
| Runs              | Any executable / Node script      | JavaScript only                 |
| Memory            | Separate process memory           | Same process, shared possible   |
| Startup cost      | Higher (new process + runtime)    | Lower                           |
| Communication     | stdio streams, IPC (fork)         | postMessage, SharedArrayBuffer  |
| Isolation         | Strong (crash/leak is contained)  | Weaker                          |
| Can kill safely   | Yes, OS signals                   | worker.terminate()              |
| Typical use       | ffmpeg, git, Python ML script,    | Hashing, image resize in JS,    |
|                   | untrusted/leaky code              | parsing, compression            |

-----------------------------------------------------
Example (same task, two ways)
-----------------------------------------------------
// Option A: child process -> use an external tool
const { spawn } = require('child_process');
const ff = spawn('ffmpeg', ['-i', 'in.mp4', '-vf', 'scale=640:-1', 'out.mp4']);
ff.on('close', (code) => console.log('ffmpeg done', code));

// Option B: worker thread -> pure JS library (sharp/jimp style work)
const { Worker } = require('worker_threads');
const w = new Worker('./thumbnail.js', { workerData: { file: 'in.png' } });
w.on('message', (r) => console.log('thumbnail ready', r));

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Using fork() for small CPU tasks -> each child is a full Node process (~30MB+). Threads are lighter.
- Running untrusted or memory-leaky code in a worker thread -> it can affect the main process;
  a child process is safer and can be killed by the OS.
- Neither is needed for I/O work (DB, HTTP) - the event loop already handles that.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: You need to run a Python script from Node. Which one?
A1: child_process (spawn or execFile), since worker threads can only run JS.

Q2: Which is better for sharing a large dataset?
A2: worker_threads with SharedArrayBuffer or transfer; processes would need to copy over IPC.
*/
