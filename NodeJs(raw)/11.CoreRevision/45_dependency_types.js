/* 9_dependency_types.js

=====================================================
Dependency Types (dependencies, devDependencies, peer, optional)
=====================================================

Definition (What I should say in the interview):
- "**dependencies** are packages my code needs at runtime in production, like express or
   mongoose. **devDependencies** are only needed while developing, testing or building - jest,
   eslint, typescript, nodemon. **peerDependencies** are used by plugins and libraries to say
   'the host project must provide this package', for example a React component library declares
   react as a peer so it does not bring its own copy. There are also optionalDependencies,
   which npm tries to install but does not fail if they cannot be installed."

-----------------------------------------------------
Comparison
-----------------------------------------------------
Type                  | Install command              | Installed in prod? | Example
----------------------|------------------------------|--------------------|---------------
dependencies          | npm i express                | Yes                | express, axios
devDependencies       | npm i -D jest                | No (--omit=dev)    | jest, eslint
peerDependencies      | declared by the library      | Host must have it  | react, webpack
optionalDependencies  | npm i -O fsevents            | If possible        | fsevents
bundleDependencies    | listed names                 | Shipped in tarball | rare

-----------------------------------------------------
Example
-----------------------------------------------------
// App package.json
"dependencies":    { "express": "^4.19.2", "mongoose": "^8.4.0" },
"devDependencies": { "jest": "^29.7.0", "eslint": "^9.5.0" }

// A plugin library's package.json
"peerDependencies": { "react": ">=18" },
"peerDependenciesMeta": { "react": { "optional": false } }

// Production install (skip devDependencies)
npm ci --omit=dev        // older: npm install --production

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- npm 7+ installs peerDependencies automatically and errors on conflicts (ERESOLVE).
  --legacy-peer-deps restores the old npm 6 behavior (skip peers) - a workaround, not a fix.
- If your app imports a package at runtime, it must be in dependencies, not devDependencies,
  otherwise it breaks after a production install.
- TypeScript: @types/* and typescript are dev deps if you deploy compiled JS.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why do plugins use peerDependencies instead of dependencies?
A1: To avoid two copies of the host library (two Reacts break hooks; two mongooses break
    model registration). The plugin uses the version the app already has.

Q2: What is the ERESOLVE error?
A2: npm cannot satisfy all peer dependency ranges at once. Fix by aligning versions; use
    --legacy-peer-deps only as a temporary workaround.

Q3: Does it matter in a Docker image whether jest is in dependencies?
A3: Yes - with --omit=dev it stays out, giving a smaller image and less attack surface.
*/
