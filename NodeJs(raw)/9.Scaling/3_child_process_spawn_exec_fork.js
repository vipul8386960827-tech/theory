/* 3_child_process_spawn_exec_fork.js

=====================================================
child_process: spawn vs exec vs execFile vs fork
=====================================================

Definition (What I should say in the interview):
- "The **child_process** module lets Node start **separate OS processes**. **spawn** runs any
   command and gives me output as **streams**, so it is good for large or long-running output.
   **exec** runs a command **inside a shell** and **buffers** the whole output into a callback.
   **execFile** is like exec but runs a file directly **without a shell**, which is safer.
   **fork** is a special spawn for **Node scripts** that also opens an **IPC channel** so parent
   and child can send messages."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Method   | Shell?  | Output       | Best for                                 |
|----------|---------|--------------|------------------------------------------|
| spawn    | No*     | Streams      | Big output, long processes (ffmpeg)      |
| exec     | Yes     | Buffered     | Short commands, pipes ("ls | grep x")    |
| execFile | No      | Buffered     | Running a binary safely with args        |
| fork     | No      | Streams+IPC  | Running another Node script, messaging   |
(* spawn can use a shell with { shell: true })

-----------------------------------------------------
Example
-----------------------------------------------------
const { spawn, exec, execFile, fork } = require('child_process');

// spawn -> streams
const ls = spawn('ls', ['-lh', '/usr']);
ls.stdout.on('data', (chunk) => console.log(`out: ${chunk}`));
ls.on('close', (code) => console.log(`exited with ${code}`));

// exec -> buffered, uses shell
exec('git rev-parse HEAD', (err, stdout) => console.log('commit:', stdout.trim()));

// execFile -> no shell
execFile('node', ['--version'], (err, stdout) => console.log(stdout));

// fork -> Node script with IPC
const child = fork('./report.js');
child.send({ month: 'Jan' });
child.on('message', (msg) => console.log('report ready', msg));
// report.js:  process.on('message', (m) => process.send({ ok: true, m }));

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- exec with user input -> **command injection** (exec(`rm ${userInput}`)). Use execFile/spawn with args.
- exec has a maxBuffer limit (1 MB default) -> large output throws an error. Use spawn.
- Each child is a full process -> more memory than a worker thread.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which one does cluster use internally?
A1: fork, because workers need the IPC channel to receive connection handles.

Q2: How do you kill a child process?
A2: child.kill() (sends SIGTERM by default) or child.kill('SIGKILL').

Q3: Sync versions?
A3: spawnSync / execSync exist, but they block the event loop -> only for scripts/CLI tools.
*/
