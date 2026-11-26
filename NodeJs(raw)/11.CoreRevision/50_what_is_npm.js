/* 25_what_is_npm.js

=====================================================
What is npm?
=====================================================

Definition (What I should say in the interview):
- "npm stands for Node Package Manager. It is three things: a **public registry** at
   registry.npmjs.org with millions of open-source packages, a **command-line tool** that comes
   bundled with Node and is used to install, update and publish packages, and the **website**
   where you search packages and manage accounts. In daily work I use npm to manage project
   dependencies through package.json and the lockfile, and to run scripts like npm test or
   npm run build."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Registry -> where packages live (can be swapped for a private one: Verdaccio, GitHub
   Packages, Artifactory).
2. CLI -> npm install, npm run, npm publish, npm audit, npm outdated...
3. Installed automatically with Node (check: npm -v).
4. Configuration via .npmrc (project, user, global level).
5. Scoped packages: @org/name -> namespaces for organizations (@nestjs/core, @types/node).

-----------------------------------------------------
Everyday Commands
-----------------------------------------------------
npm init -y                  # create package.json
npm install                  # install everything from package.json (alias: npm i)
npm install axios            # add a runtime dependency
npm install -D typescript    # add a dev dependency
npm uninstall axios          # remove a package
npm run dev                  # run a script
npm ls --depth=0             # list top-level installed packages
npm view express versions    # see published versions of a package
npm cache clean --force      # clear the local cache (rarely needed)

-----------------------------------------------------
.npmrc Example (private registry for a scope)
-----------------------------------------------------
@mycompany:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
save-exact=true

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Never commit real auth tokens in .npmrc - use environment variables.
- npm packages can run install scripts; installing a malicious package can execute code on
  your machine. Check downloads, maintainers and repo before adding a dependency.
- Node and npm have separate versions; corepack can manage yarn/pnpm versions too.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is npm the only package manager for Node?
A1: No - yarn and pnpm are popular alternatives, all using the same npm registry.

Q2: What is a scoped package?
A2: A package name with an @scope/ prefix, used to group packages by org and allow private
    packages, e.g. @mycompany/logger.

Q3: How do you use a private registry?
A3: Configure it in .npmrc (optionally per scope) with an auth token from an env variable.
*/
