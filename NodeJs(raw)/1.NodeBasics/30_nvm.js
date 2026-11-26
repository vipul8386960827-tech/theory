/* 30_nvm.js

=====================================================
nvm (Node Version Manager)
=====================================================

Definition (What I should say in the interview):
- "nvm is a **Node Version Manager**. It lets me install multiple Node versions on the same
   machine and switch between them per project, without needing admin rights. That's useful
   when one project runs on Node 18 and another on Node 22. We add a .nvmrc file to the repo so
   everyone on the team just runs nvm use and gets the correct version."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. nvm (nvm-sh) works on macOS/Linux; on Windows use **nvm-windows** (separate project).
2. Each version is installed in the user folder, with its own global npm packages.
3. .nvmrc file holds the version for a project.
4. Alternatives: fnm (fast, Rust-based), volta, asdf, n, Corepack for package managers.

-----------------------------------------------------
Common Commands
-----------------------------------------------------
nvm install 22            -> install latest Node 22
nvm install --lts         -> install latest LTS
nvm use 20                -> switch current shell to Node 20
nvm ls                    -> list installed versions
nvm ls-remote             -> list available versions (nvm list available on Windows)
nvm alias default 22      -> default version for new shells
nvm current               -> show active version
nvm uninstall 18          -> remove a version

-----------------------------------------------------
Example (.nvmrc workflow)
-----------------------------------------------------
// .nvmrc (in project root)
// 22

// Terminal
// $ cd my-project
// $ nvm install     -> reads .nvmrc and installs 22 if missing
// $ nvm use         -> switches to 22
// $ node -v         -> v22.x.x

// Verify inside code
const major = Number(process.versions.node.split('.')[0]);
if (major < 20) {
  console.error('This app needs Node 20+');
  process.exit(1);
}

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Global packages (npm i -g) are per Node version -> after switching, reinstall them.
- nvm use only affects the current terminal session; set nvm alias default for new shells.
- On servers/containers we usually don't use nvm; we use the official Docker image instead.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why use nvm instead of installing Node from the website?
A1: You can keep several versions side by side and switch instantly, without sudo/admin.

Q2: How do you make sure CI uses the same version?
A2: Read .nvmrc in CI (e.g. actions/setup-node with node-version-file: '.nvmrc').
*/
