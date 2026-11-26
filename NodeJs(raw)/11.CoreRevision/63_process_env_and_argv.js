/* 14_process_env_and_argv.js

=====================================================
process.env and process.argv
=====================================================

Definition (What I should say in the interview):
- "process.env is an object with the **environment variables** of the process. I use it for
   configuration that changes between environments - port, DB URL, API keys, NODE_ENV - following
   the 12-factor approach. process.argv is an **array of command-line arguments**: index 0 is the
   node executable path, index 1 is the script path, and the real user arguments start at
   index 2."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. All env values are STRINGS. 'false' is truthy; convert explicitly.
2. Load a .env file: dotenv package, or built-in node --env-file=.env (Node 20.6+).
3. Never commit .env with secrets; commit a .env.example instead.
4. process.argv.slice(2) -> user args. For parsing flags use util.parseArgs (built-in) or yargs.
5. Validate config at startup and fail fast if something required is missing.

-----------------------------------------------------
Example
-----------------------------------------------------
// run: PORT=4000 DEBUG=false node app.js --name=alice -v
const { parseArgs } = require('util');

const config = {
  port: Number(process.env.PORT) || 3000,
  debug: process.env.DEBUG === 'true',        // 'false' string -> false
  dbUrl: process.env.DATABASE_URL,
};
if (!config.dbUrl) {
  console.error('DATABASE_URL is required');
  process.exitCode = 1;
}

console.log(process.argv);
// [ '/usr/bin/node', '/app/app.js', '--name=alice', '-v' ]

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    name: { type: 'string' },
    verbose: { type: 'boolean', short: 'v' },
  },
});
console.log(values); // { name: 'alice', verbose: true }

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- if (process.env.DEBUG) -> true even when DEBUG='false'.
- Reading process.env all over the code. Better: one config module that reads, validates and
  exports typed values.
- Logging the whole process.env -> leaks secrets into logs.
- On Windows cmd, "PORT=4000 node app.js" does not work; use cross-env or --env-file.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why NODE_ENV=production?
A1: Many libraries (Express etc.) enable caching and less verbose errors, which improves performance.

Q2: Can you change process.env at runtime?
A2: Yes, but only for the current process and its child processes; values are converted to strings.
*/
