/* 28_global_vs_local_install.js

=====================================================
Global vs Local Installation
=====================================================

Definition (What I should say in the interview):
- "A **local install** puts the package into the project's node_modules and records it in
   package.json - this is the default and what I use for libraries and project tools, so every
   developer and CI uses the same version. A **global install** with -g puts the package in a
   system-wide folder and is meant for CLI tools I use across projects, like npm itself or
   nodemon for quick scripts. Even for CLIs I prefer local installs plus npm scripts or npx, so
   the version is pinned per project."

-----------------------------------------------------
Comparison
-----------------------------------------------------
Aspect             | Local (default)              | Global (-g)
-------------------|------------------------------|--------------------------------
Location           | ./node_modules               | npm prefix -g (system folder)
In package.json?   | Yes                          | No
require()-able?    | Yes                          | No (not on the module path)
Version per project| Yes                          | One version for the whole machine
Typical use        | express, jest, eslint        | npm, pnpm, vercel CLI, http-server
Team consistency   | Guaranteed via lockfile      | "Install X globally first" in README

-----------------------------------------------------
Example
-----------------------------------------------------
npm install eslint -D          # local
npx eslint .                   # run local binary
// or "scripts": { "lint": "eslint ." } -> npm run lint

npm install -g nodemon         # global
nodemon app.js                 # available everywhere

npm ls -g --depth=0            # list global packages
npm prefix -g                  # where globals live
npm uninstall -g nodemon

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- require('some-global-pkg') -> "Cannot find module". Globals are not resolvable from projects.
- EACCES permission errors on Linux/Mac when installing globally -> do not use sudo; use a Node
  version manager (nvm, fnm, volta) so globals live in your user folder.
- CI failing because a tool was only installed globally on a developer's machine.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Should typescript or jest be installed globally?
A1: No, as devDependencies locally - so the version is pinned and CI has it too.

Q2: When is a global install fine?
A2: For personal, project-independent CLIs (npm, pnpm, a deploy CLI, http-server).

Q3: What happens to global packages when you switch Node versions with nvm?
A3: Each Node version has its own global folder, so you need to reinstall them
    (nvm install --reinstall-packages-from helps).
*/
