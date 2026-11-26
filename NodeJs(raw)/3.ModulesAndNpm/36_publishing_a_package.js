/* 36_publishing_a_package.js

=====================================================
Publishing a Package to npm
=====================================================

Definition (What I should say in the interview):
- "To publish a package I need an npm account, a unique package name - often scoped like
   @myorg/utils - and a package.json with name, version, entry points and the files to include.
   I log in with npm login, bump the version using semantic versioning with npm version, check
   the contents with npm pack --dry-run, and run npm publish. Scoped packages are private by
   default, so a public scoped package needs --access public. In real teams this usually runs
   from CI with an automation token after tests pass."

-----------------------------------------------------
Minimal package.json for a library
-----------------------------------------------------
{
  "name": "@myorg/string-utils",
  "version": "1.0.0",
  "type": "module",
  "exports": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "scripts": { "build": "tsc", "prepublishOnly": "npm test && npm run build" },
  "engines": { "node": ">=20" },
  "license": "MIT",
  "repository": "github:myorg/string-utils"
}

-----------------------------------------------------
Steps
-----------------------------------------------------
npm login                         # once per machine
npm pack --dry-run                # list exactly which files would be published
npm version patch                 # 1.0.0 -> 1.0.1, creates a git commit + tag
npm version minor | major         # new feature / breaking change
npm publish --access public       # scoped public package
npm publish --tag beta            # pre-release under the "beta" dist-tag, not "latest"

npm deprecate @myorg/string-utils@1.0.0 "Use 1.0.1 - fixes a bug"
npm unpublish ...                 # only allowed within 72 hours and with restrictions

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Use the "files" whitelist (or .npmignore) so tests, .env and source maps you do not want
  are NOT published - leaking secrets in a package is a classic mistake.
- A version number can never be reused, even after unpublishing.
- "private": true in package.json prevents accidental publishing of apps.
- Enable 2FA on the account; in CI use granular/automation tokens or trusted publishing
  (OIDC) and npm publish --provenance to link the package to its source build.
- Put real runtime deps in dependencies and the host framework in peerDependencies.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you publish a beta version without users getting it by default?
A1: Version it like 2.0.0-beta.1 and publish with --tag beta; npm install gets "latest",
    users opt in with npm install pkg@beta.

Q2: What does npm version do?
A2: Bumps the version in package.json and the lockfile, and (in a git repo) creates a commit
    and a tag like v1.0.1.

Q3: How do you publish a private package?
A3: A scoped package on a paid npm org (default access is restricted), or a private registry
    like GitHub Packages or Verdaccio configured in .npmrc.
*/
