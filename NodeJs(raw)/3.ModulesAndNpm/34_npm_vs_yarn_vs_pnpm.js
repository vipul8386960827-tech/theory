/* 34_npm_vs_yarn_vs_pnpm.js

=====================================================
npm vs Yarn vs pnpm
=====================================================

Definition (What I should say in the interview):
- "All three are package managers that use the same npm registry and package.json. **npm** ships
   with Node, so it needs no setup and is the default in most projects. **Yarn** was created by
   Facebook when npm was slow and had no lockfile; Yarn Berry (v2+) adds Plug'n'Play, which can
   remove node_modules completely. **pnpm** stores every package version once in a global
   content-addressable store and links it into projects, so installs are fast, use much less disk,
   and its strict node_modules prevents phantom dependencies. It is very popular for monorepos."

-----------------------------------------------------
Comparison
-----------------------------------------------------
Aspect            | npm                 | Yarn (classic / berry)     | pnpm
------------------|---------------------|----------------------------|-------------------------
Lockfile          | package-lock.json   | yarn.lock                  | pnpm-lock.yaml
Comes with Node   | Yes                 | Via corepack               | Via corepack
node_modules      | Flat, hoisted       | Flat / PnP (no folder)     | Symlinked, strict
Disk usage        | Copy per project    | Copy per project / zip cache| One global store, hard links
Phantom deps      | Possible            | Possible / prevented (PnP) | Prevented
Workspaces        | Yes                 | Yes                        | Yes (very strong)
Speed             | Good                | Good                       | Usually fastest

-----------------------------------------------------
Command Mapping
-----------------------------------------------------
Task               | npm                  | yarn                | pnpm
-------------------|----------------------|---------------------|---------------------
Install all        | npm install          | yarn                | pnpm install
CI install         | npm ci               | yarn install --immutable | pnpm install --frozen-lockfile
Add package        | npm i axios          | yarn add axios      | pnpm add axios
Add dev            | npm i -D jest        | yarn add -D jest    | pnpm add -D jest
Run script         | npm run dev          | yarn dev            | pnpm dev
One-off binary     | npx cowsay           | yarn dlx cowsay     | pnpm dlx cowsay

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Pick ONE per repo and commit only its lockfile; mixing them causes different trees.
- corepack enable + "packageManager": "pnpm@9.12.0" in package.json pins the manager version
  for the whole team.
- Switching npm -> pnpm may expose phantom dependencies (missing declarations) - that is a
  good thing, just add them to package.json.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which one do you use and why?
A1: npm in most projects because it is built in and well supported; I would consider pnpm for a
    monorepo or many projects on one machine, for speed and disk savings.

Q2: Why does pnpm save so much disk space?
A2: Each package version is stored once in a global store and hard-linked into every project.

Q3: What is Yarn Plug'n'Play?
A3: Instead of a node_modules folder, Yarn generates a .pnp.cjs map telling Node where each
    package lives (zipped in the cache); faster installs, but some tools need extra setup.
*/
