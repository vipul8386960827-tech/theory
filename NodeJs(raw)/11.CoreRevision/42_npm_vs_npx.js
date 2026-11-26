/* 6_npm_vs_npx.js

=====================================================
npm vs npx
=====================================================

Definition (What I should say in the interview):
- "npm is the **package manager** - I use it to install, update and remove packages and run
   scripts. npx is a **package runner** that comes with npm. It executes a package's binary
   either from my local node_modules/.bin or, if it is not installed, downloads it temporarily
   and runs it. I use npx for one-off tools like create-vite or for running a locally installed
   CLI without installing it globally."

-----------------------------------------------------
Comparison
-----------------------------------------------------
Aspect            | npm                              | npx
------------------|----------------------------------|----------------------------------
Purpose           | Manage packages / run scripts    | Execute package binaries
Installs?         | Yes, into node_modules           | Temporary cache if not installed
Typical use       | npm install express              | npx create-vite my-app
Version pinning   | Through package.json             | npx pkg@1.2.3 on the fly

-----------------------------------------------------
Example
-----------------------------------------------------
npm install -D eslint          # install as dev dependency
npx eslint .                   # run the LOCAL eslint from node_modules/.bin

npx create-next-app my-app     # run without installing globally
npx nodemon@3 server.js        # run a specific version
npx -y cowsay hello            # -y skips the "Ok to proceed?" prompt

// Equivalent of npx for project tools: npm scripts
// "scripts": { "lint": "eslint ." }  -> npm run lint
// npm scripts also add node_modules/.bin to PATH automatically.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- npx checks local node_modules/.bin first, then global, then downloads.
- Since npm 7, npx is implemented with "npm exec".
- Security: npx downloads and runs code - double-check the package name (typosquatting).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why use npx instead of a global install?
A1: You always get the latest (or a pinned) version, no global pollution, and different
    projects can use different versions of the same tool.

Q2: Inside package.json scripts, do I need npx?
A2: No. npm run puts node_modules/.bin on PATH, so "test": "jest" works directly.

Q3: Where does npx store the downloaded packages?
A3: In the npm cache (the _npx folder inside the cache directory), not in your project.
*/
