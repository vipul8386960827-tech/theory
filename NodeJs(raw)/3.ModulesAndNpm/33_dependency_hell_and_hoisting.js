/* 33_dependency_hell_and_hoisting.js

=====================================================
Dependency Hell and Hoisting
=====================================================

Definition (What I should say in the interview):
- "Dependency hell is when packages need **conflicting versions** of the same dependency, or the
   tree becomes so deep and duplicated that installs are huge and behavior is unpredictable.
   npm handles version conflicts by allowing **nested copies**: each package can have its own
   version in its own node_modules. To reduce duplication, npm **hoists** - it flattens
   dependencies to the top-level node_modules whenever versions are compatible. The side effect
   is 'phantom dependencies': my code can require a package I never declared, just because it
   was hoisted."

-----------------------------------------------------
How Hoisting Looks
-----------------------------------------------------
// package A needs lodash@4, package B needs lodash@3
node_modules/
  A/
  B/
    node_modules/
      lodash/        <- 3.x, nested because of the conflict
  lodash/            <- 4.x, hoisted to the top, shared by A and anyone else

-----------------------------------------------------
Problems
-----------------------------------------------------
1. Phantom dependencies: require('debug') works because express pulled it in - breaks later
   when express drops it.
2. Duplicate copies: two versions of a library -> bigger bundles, instanceof / singleton bugs
   (e.g. two copies of react or graphql).
3. Peer dependency conflicts (ERESOLVE) between plugins.
4. Non-deterministic trees without a lockfile.

-----------------------------------------------------
Tools to Diagnose and Fix
-----------------------------------------------------
npm ls lodash              # see every copy and who requires it
npm explain lodash         # why is this package installed?
npm dedupe                 # re-flatten the tree to remove duplicates where possible
"overrides": { "lodash": "4.17.21" }    // force one version across the tree
// pnpm avoids phantom deps by NOT hoisting: only declared deps are visible to your code.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Always declare every package you import directly in your own package.json.
- Keep dependencies minimal; each one adds its own subtree.
- In monorepos (workspaces), hoisting puts shared deps in the root node_modules.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is a phantom dependency?
A1: A package your code uses but does not list in package.json; it only works because some
    other dependency installed it and npm hoisted it.

Q2: How do you find out why a package is installed?
A2: npm explain <pkg> or npm ls <pkg>.

Q3: How does pnpm solve dependency hell differently?
A3: It uses a content-addressable store with symlinks and a strict, non-flat node_modules, so
    duplicates share disk space and undeclared packages cannot be required.
*/
