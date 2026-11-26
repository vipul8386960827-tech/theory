/* 7_package_json_fields.js

=====================================================
package.json - Important Fields
=====================================================

Definition (What I should say in the interview):
- "package.json is the **manifest** of a Node project. It describes the project - name, version,
   entry point - and lists its dependencies with version ranges, plus npm scripts for common
   tasks like start, test and build. It also controls how Node treats the code, for example the
   "type" field decides CommonJS vs ESM, and "engines" documents the Node version we support."

-----------------------------------------------------
Example
-----------------------------------------------------
{
  "name": "orders-api",
  "version": "1.4.0",
  "description": "Order service",
  "main": "src/index.js",
  "type": "module",
  "private": true,
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest"
  },
  "dependencies": { "express": "^4.19.2" },
  "devDependencies": { "jest": "^29.7.0", "nodemon": "^3.1.0" },
  "engines": { "node": ">=20" },
  "license": "MIT"
}

-----------------------------------------------------
Key Fields
-----------------------------------------------------
Field             | Purpose
------------------|-------------------------------------------------------------
name, version     | Identity; required only if you publish to npm
main              | Entry file when someone requires the package
exports           | Modern, stricter entry points (overrides main in new Node)
type              | "module" -> .js is ESM; "commonjs" (default) -> .js is CJS
scripts           | Commands run with npm run <name>
dependencies      | Needed at runtime
devDependencies   | Needed only for development/build/test
peerDependencies  | Host must provide it (plugins)
engines           | Supported Node/npm versions
private           | true -> npm refuses to publish it (good for apps)
bin               | CLI commands the package provides
files             | Whitelist of files included when publishing

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- package.json must be valid JSON: no comments, no trailing commas.
- "engines" is only a warning by default; set engine-strict=true in .npmrc to enforce it.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is name/version required for an application?
A1: Not really - only for packages you publish. For apps I set "private": true.

Q2: What is the difference between main and exports?
A2: main is a single entry point. exports can define multiple entry points, conditions
    (import vs require) and blocks access to internal files not listed.

Q3: Where would you put the minimum Node version?
A3: In "engines", plus an .nvmrc file so the team and CI use the same version.
*/
