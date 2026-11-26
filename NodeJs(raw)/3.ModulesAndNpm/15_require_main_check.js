/* 15_require_main_check.js

=====================================================
require.main === module (Is this file run directly?)
=====================================================

Definition (What I should say in the interview):
- "require.main points to the **entry module** - the file that was started with node. Inside any
   file, if require.main === module is true, it means this file was **run directly** from the
   command line and not required by another file. I use this pattern when a file should work both
   as a reusable module and as a script, for example a server file that starts listening when run
   directly but just exports the app when imported by tests."

-----------------------------------------------------
Example (CommonJS)
-----------------------------------------------------
// server.js
const express = require('express');
const app = express();
app.get('/health', (req, res) => res.send('ok'));

if (require.main === module) {
  app.listen(3000, () => console.log('Listening on 3000'));   // node server.js
}

module.exports = app;   // supertest can import app without opening a port

// test
const request = require('supertest');
const app = require('./server');        // require.main !== module here -> no listen
await request(app).get('/health').expect(200);

-----------------------------------------------------
ESM Equivalent
-----------------------------------------------------
// Newer Node (added in 24.2, backported to 22.18): import.meta.main is true for the entry module
if (import.meta.main) startServer();

// Portable version for older Node
import { fileURLToPath } from 'node:url';
if (process.argv[1] === fileURLToPath(import.meta.url)) startServer();

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- require.main.filename gives the path of the entry script - sometimes used to find the
  project root (but process.cwd() or a config is more reliable).
- require.main is undefined when Node runs code from the REPL or stdin.
- The process.argv[1] check can fail with symlinks or when run without the extension;
  import.meta.main is the cleaner option where available.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why separate app and server.listen at all?
A1: So tests can import the app without starting a real server or fighting over ports.

Q2: Does require.main exist in ESM?
A2: No, require is not available in ESM. Use import.meta.main or compare process.argv[1].

Q3: Python equivalent?
A3: if __name__ == '__main__': - same idea.
*/
