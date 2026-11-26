/* 30_npm_install_vs_npm_ci.js

=====================================================
npm install vs npm ci
=====================================================

Definition (What I should say in the interview):
- "npm install is for **development** - it installs dependencies based on package.json, can
   resolve new versions within the allowed ranges, and **updates package-lock.json** if needed.
   npm ci is for **CI and production builds** - it **deletes node_modules** first, installs
   **exactly** what is in the lockfile, never modifies package.json or the lockfile, and
   **fails** if the lockfile is missing or out of sync with package.json. That makes builds
   reproducible and usually faster."

-----------------------------------------------------
Comparison
-----------------------------------------------------
Aspect                     | npm install                  | npm ci
---------------------------|------------------------------|---------------------------------
Needs a lockfile           | No (creates one)             | Yes, errors without it
Modifies lockfile          | Can update it                | Never
Lockfile out of sync       | Fixes/updates it             | Fails with an error
Existing node_modules      | Reused, updated incrementally| Deleted, clean install
Add single package         | npm install axios            | Not possible
Use case                   | Local development            | CI pipelines, Docker, deploys

-----------------------------------------------------
Example
-----------------------------------------------------
# Local
npm install                # after pulling changes
npm install zod            # add a package -> updates package.json + lockfile

# GitHub Actions
- uses: actions/setup-node@v4
  with: { node-version: 20, cache: 'npm' }
- run: npm ci
- run: npm test

# Dockerfile
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Using npm install in CI -> lockfile may drift, builds are not reproducible.
- Changing package.json by hand without running npm install -> npm ci in CI fails with
  "package.json and package-lock.json are not in sync". Fix: run npm install locally, commit
  the updated lockfile.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is npm ci faster?
A1: It skips dependency resolution because the lockfile already has the exact tree, and it
    does not diff against an existing node_modules.

Q2: Can npm ci install devDependencies?
A2: Yes, by default. Use --omit=dev for a production-only install.

Q3: Does npm install ignore the lockfile?
A3: No, it respects it, but if package.json changed it updates the lockfile to match.
*/
