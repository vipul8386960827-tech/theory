/* 36_node_vs_deno_vs_bun.js

=====================================================
Node.js vs Deno vs Bun
=====================================================

Definition (What I should say in the interview):
- "All three are JavaScript runtimes for the server. **Node** is the oldest and most mature,
   built on V8 and libuv, with the biggest ecosystem. **Deno** was created by Ryan Dahl, the
   original creator of Node, to fix its design issues - it has built-in TypeScript, is secure by
   default with permission flags, and ships with a formatter, linter and test runner. **Bun** is
   built on JavaScriptCore and written in Zig, focused on speed, and also acts as a package
   manager, bundler and test runner. Both Deno and Bun now support most npm packages, but for
   production I'd still default to Node because of its stability and ecosystem."

-----------------------------------------------------
Comparison Table
-----------------------------------------------------
| Feature         | Node.js           | Deno                 | Bun                    |
|-----------------|-------------------|----------------------|------------------------|
| Released        | 2009              | 2020 (2.0 in 2024)   | 2023 (1.0)             |
| JS engine       | V8                | V8                   | JavaScriptCore         |
| Written in      | C++ (libuv in C)  | Rust                 | Zig                    |
| TypeScript      | Type stripping    | Built-in             | Built-in               |
|                 | (Node 22.6+/23.6+)|                      |                        |
| Security        | Full access       | Permissions          | Full access            |
|                 | (perm. model opt.)| (--allow-net etc.)   |                        |
| Package manager | npm/yarn/pnpm     | Built-in + npm: URLs | bun install (fast)     |
| Tooling         | Separate tools    | fmt, lint, test      | bundler, test runner   |
| Maturity        | Very high         | Medium               | Newer                  |

-----------------------------------------------------
Example (same server in each)
-----------------------------------------------------
// Node
require('http').createServer((req, res) => res.end('Hi')).listen(3000);

// Deno  (run: deno run --allow-net server.ts)
// Deno.serve({ port: 3000 }, () => new Response('Hi'));

// Bun   (run: bun server.ts)
// Bun.serve({ port: 3000, fetch: () => new Response('Hi') });

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Node is adopting good ideas from them: fetch, test runner, --watch, --env-file,
  TypeScript type stripping, permission model (--permission).
- Bun benchmarks are often faster, but compatibility with some native npm modules can vary.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why was Deno created?
A1: Ryan Dahl listed regrets about Node (no security sandbox, node_modules complexity,
    package.json, callbacks) and built Deno to address them.

Q2: Would you use Bun in production?
A2: Maybe for new services or tooling (bun install is very fast), but after testing; for
    critical systems Node is safer due to maturity and long-term support.
*/
