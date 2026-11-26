/* 29_npm_scripts_and_lifecycle_hooks.js

=====================================================
npm Scripts and Lifecycle Hooks
=====================================================

Definition (What I should say in the interview):
- "npm scripts are named commands defined in the **scripts** section of package.json, which I run
   with npm run <name>. They give the team one standard way to start, test, lint and build the
   project. npm automatically adds node_modules/.bin to the PATH, so locally installed tools work
   without npx. Scripts also support **pre and post hooks** - if I define prebuild, it runs before
   build automatically - and there are lifecycle scripts like prepare or postinstall that npm runs
   during install or publish."

-----------------------------------------------------
Example
-----------------------------------------------------
"scripts": {
  "start": "node src/index.js",
  "dev": "node --watch --env-file=.env src/index.js",
  "test": "jest",
  "lint": "eslint .",
  "prebuild": "rimraf dist",          // runs automatically before build
  "build": "tsc",
  "postbuild": "echo build done",     // runs automatically after build
  "prepare": "husky",                 // runs after npm install (local) and before publish
  "migrate": "knex migrate:latest"
}

npm start            # "start", "test", "stop", "restart" do not need "run"
npm test             # same as npm run test (alias: npm t)
npm run build        # prebuild -> build -> postbuild
npm run test -- --watch       # args after -- are passed to the script
npm run                        # list all scripts

-----------------------------------------------------
Lifecycle Scripts
-----------------------------------------------------
Script        | When it runs
--------------|--------------------------------------------------------
preinstall    | Before the package is installed
install/postinstall | After install (often native builds - also for dependencies!)
prepare       | After local npm install and before pack/publish
prepublishOnly| Only before npm publish
pre<x>/post<x>| Before/after any custom script x

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Security: dependencies' postinstall scripts run on your machine. npm install --ignore-scripts
  (or ignore-scripts=true in .npmrc) disables them; pnpm blocks them by default.
- Scripts run in a shell (cmd.exe on Windows), so "rm -rf" or "VAR=x node app" are not portable -
  use rimraf / cross-env, or Node's own flags like --env-file.
- Chaining: "a && b" sequential; parallel via npm-run-all or concurrently.
- npm exposes package.json values as env vars, e.g. process.env.npm_package_version.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why use npm scripts instead of running commands directly?
A1: Standard entry points for the team and CI, pinned local tool versions, no global installs.

Q2: How do you pass extra arguments to a script?
A2: After a double dash: npm run test -- --coverage.

Q3: What is the "prepare" script typically used for?
A3: Setting up git hooks (husky) or building a package before it is published or installed
    from git.
*/
