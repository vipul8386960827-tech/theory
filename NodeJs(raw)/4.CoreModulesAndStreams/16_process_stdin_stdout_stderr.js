/* 16_process_stdin_stdout_stderr.js

=====================================================
process.stdin, process.stdout, process.stderr
=====================================================

Definition (What I should say in the interview):
- "These are the three standard I/O streams of the process. process.stdin is a **Readable**
   stream for input, process.stdout and process.stderr are **Writable** streams for normal output
   and error output. console.log writes to stdout and console.error writes to stderr. Keeping them
   separate matters because shells, Docker and log collectors can redirect them independently."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. stdin  -> Readable (fd 0); stdout -> Writable (fd 1); stderr -> Writable (fd 2).
2. process.stdout.write('text') -> no automatic newline (unlike console.log).
3. Because they are streams, you can pipe: process.stdin.pipe(transform).pipe(process.stdout).
4. process.stdout.isTTY -> true in a terminal, undefined when piped to a file -> disable colors.
5. Unlike most streams, writes may be synchronous or asynchronous depending on the OS and the
   target (file, terminal or pipe). When async, process.exit() can cut off pending output.

-----------------------------------------------------
Example (uppercase filter: echo hello | node upper.js)
-----------------------------------------------------
const { Transform, pipeline } = require('stream');

const upper = new Transform({
  transform(chunk, enc, cb) {
    cb(null, chunk.toString().toUpperCase());
  },
});

pipeline(process.stdin, upper, process.stdout, (err) => {
  if (err) {
    process.stderr.write(`Error: ${err.message}\n`);
    process.exitCode = 1;
  }
});

// Progress line that overwrites itself
// process.stdout.write(`\rProgress: ${pct}%`);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- node app.js > out.log 2> err.log -> stdout and stderr go to different files.
- In Docker / Kubernetes, write logs to stdout/stderr (not files); the platform collects them.
- Errors and diagnostics go to stderr so they do not corrupt data piped through stdout.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: console.log vs process.stdout.write?
A1: console.log formats arguments (util.format) and adds a newline; stdout.write writes raw
    strings/Buffers exactly as given.

Q2: How do you read all of stdin into a string?
A2: let s = ''; for await (const c of process.stdin) s += c;  (set encoding or collect Buffers).

Q3: How do you ask the user a question in the terminal?
A3: Use the readline module (readline/promises rl.question) on top of stdin/stdout.
*/
