/* 8_package_lock_json.js

=====================================================
package-lock.json
=====================================================

Definition (What I should say in the interview):
- "package.json says which version **ranges** I accept, like ^4.18.0, but package-lock.json
   records the **exact version** of every package that was actually installed - including all
   nested dependencies - with their download URL and integrity hash. Committing it to git makes
   installs **reproducible**: my machine, my teammate's machine and the CI server all get the
   same dependency tree. npm creates and updates it automatically."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Generated/updated by npm install, npm update, npm uninstall.
2. Locks the full tree (direct + transitive deps).
3. "integrity" field (sha512 hash) -> npm verifies the downloaded tarball was not tampered with.
4. ALWAYS commit it for applications.
5. npm ci uses it strictly; npm install uses it but may update it when package.json changes.
6. Not published to npm - libraries' lockfiles are ignored by consumers.

-----------------------------------------------------
Example (simplified snippet)
-----------------------------------------------------
{
  "name": "orders-api",
  "lockfileVersion": 3,
  "packages": {
    "node_modules/express": {
      "version": "4.19.2",
      "resolved": "https://registry.npmjs.org/express/-/express-4.19.2.tgz",
      "integrity": "sha512-...",
      "dependencies": { "body-parser": "1.20.2" }
    }
  }
}

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Adding package-lock.json to .gitignore -> "works on my machine" bugs because a transitive
  dependency got a new (broken) version on the server.
- Merge conflicts in the lockfile: don't hand-edit. Resolve package.json, then run npm install
  to regenerate the lockfile.
- Mixing package managers (yarn.lock + package-lock.json) in one repo.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: If package.json says ^4.18.0, which version gets installed with a lockfile present?
A1: The exact version in the lockfile (say 4.19.2), as long as it still satisfies the range.

Q2: What is npm-shrinkwrap.json?
A2: Same format as package-lock, but it IS published with the package, so it locks versions
    for consumers too. Rarely used - mostly for CLI tools.

Q3: Should libraries commit the lockfile?
A3: Yes, for consistent development and CI, even though consumers do not use it.
*/
