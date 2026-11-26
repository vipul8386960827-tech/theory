/* 31_npm_update_and_outdated.js

=====================================================
npm outdated and npm update
=====================================================

Definition (What I should say in the interview):
- "npm outdated shows which dependencies have newer versions. It lists three versions per
   package: **Current** (installed), **Wanted** (the highest version allowed by the range in
   package.json) and **Latest** (the newest published version). npm update upgrades packages
   up to the **Wanted** version - it stays inside the semver range and updates the lockfile, but
   never jumps to a new major. For a major upgrade I install it explicitly, like
   npm install express@5, and read the changelog for breaking changes."

-----------------------------------------------------
Example
-----------------------------------------------------
npm outdated

Package   Current   Wanted   Latest   Location
express   4.18.2    4.21.1   5.1.0    node_modules/express
jest      29.5.0    29.7.0   29.7.0   node_modules/jest
mongoose  7.6.3     7.8.2    8.9.0    node_modules/mongoose

npm update                 # express -> 4.21.1, jest -> 29.7.0, mongoose -> 7.8.2
npm update jest            # update just one package
npm install express@5      # major upgrade - explicit, updates package.json range to ^5.x
npm install express@latest

# Interactive helper for bulk major upgrades
npx npm-check-updates -i   # (ncu) lets you pick packages and rewrites package.json ranges

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Wanted is limited by ^ / ~ in package.json; Latest ignores it.
2. npm update changes node_modules and package-lock.json; it does NOT rewrite package.json
   ranges by default in current npm - use npm update --save if you want that.
3. Red in npm outdated = below Wanted (safe update); yellow = above range (major upgrade needed).
4. Exit code of npm outdated is 1 when something is outdated - useful in CI checks.

-----------------------------------------------------
How I Upgrade Safely (practical answer)
-----------------------------------------------------
1. Run npm outdated, group: patch/minor first, majors one at a time.
2. Read release notes / migration guides for majors.
3. Update on a branch, run tests and lint, check the app manually.
4. Commit package.json + package-lock.json together.
5. Automate with Dependabot or Renovate PRs.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why does npm update not upgrade express from 4 to 5?
A1: The range ^4.x does not allow 5.0.0. Majors must be installed explicitly.

Q2: What is the difference between Wanted and Latest?
A2: Wanted = max version satisfying my package.json range; Latest = the "latest" dist-tag on npm.

Q3: How do you update a transitive dependency with a security fix?
A3: npm update <pkg> if the range allows it, otherwise "overrides" in package.json to force
    a version, or upgrade the parent package.
*/
