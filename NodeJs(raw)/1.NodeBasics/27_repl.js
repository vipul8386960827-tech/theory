/* 27_repl.js

=====================================================
REPL (Read-Eval-Print Loop)
=====================================================

Definition (What I should say in the interview):
- "REPL stands for **Read, Eval, Print, Loop**. It's the interactive shell you get when you type
   node with no file. It reads your input, evaluates it, prints the result and waits for the
   next input. I use it to quickly test JavaScript snippets, check how an API behaves, or debug
   small pieces of logic without creating a file."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Start: run node in the terminal. Exit: .exit or Ctrl+C twice or Ctrl+D.
2. _ (underscore) holds the result of the last expression.
3. Top-level await is supported in the REPL.
4. Core modules are available without require (e.g. fs, path, os directly).
5. Tab completion and up-arrow history are supported.

-----------------------------------------------------
Useful REPL Commands
-----------------------------------------------------
.help    -> list commands
.editor  -> multi-line editor mode (Ctrl+D to run)
.break   -> cancel a multi-line expression
.clear   -> reset the context
.load f  -> load a JS file into the session
.save f  -> save the session to a file
.exit    -> quit

-----------------------------------------------------
Example
-----------------------------------------------------
$ node
> 2 + 3
5
> _ * 2
10
> const res = await fetch('https://api.github.com')
> res.status
200
> os.cpus().length
8

// Custom REPL inside your own app (e.g. for admin/debug consoles)
const repl = require('repl');
const r = repl.start({ prompt: 'app> ' });
r.context.db = { users: ['alice', 'bob'] };   // expose objects to the session

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- In the REPL, top-level this is globalThis (different from a CommonJS file).
- node -e "code" runs one line; node -p "expr" evaluates and prints it.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What does the underscore variable do?
A1: It stores the result of the last evaluated expression. _error stores the last error.

Q2: Can you build your own REPL?
A2: Yes, with the built-in repl module (repl.start). Frameworks like Rails-style consoles or
    Nest/Adonis REPLs use this to interact with app services.
*/
