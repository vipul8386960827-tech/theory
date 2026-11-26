/* 32_npm_audit.js

=====================================================
npm audit
=====================================================

Definition (What I should say in the interview):
- "npm audit checks my dependency tree against the npm **security advisory database** and reports
   known vulnerabilities with their severity - low, moderate, high or critical - and the path
   through which the vulnerable package is pulled in. npm audit fix tries to upgrade to patched
   versions that are still inside my semver ranges. npm audit fix --force can also apply major
   upgrades, so I avoid it blindly because it can introduce breaking changes. npm also runs a
   quick audit automatically on every npm install."

-----------------------------------------------------
Example
-----------------------------------------------------
npm audit                          # full report
npm audit --audit-level=high       # exit code 1 only for high/critical (good for CI)
npm audit --omit=dev               # only production dependencies
npm audit --json                   # machine-readable
npm audit fix                      # safe, in-range fixes
npm audit fix --force              # may install breaking majors - review the diff!

# Sample output
# jsonwebtoken  <9.0.0
# Severity: high
# jsonwebtoken unrestricted key type could lead to legacy keys usage
# fix available via `npm audit fix --force`
# Will install jsonwebtoken@9.0.2, which is a breaking change

-----------------------------------------------------
When the fix is in a transitive dependency
-----------------------------------------------------
// package.json - force a patched version of a nested package
"overrides": {
  "semver": "^7.5.4",
  "some-parent": { "minimist": "^1.2.8" }
}
// then: npm install  (yarn uses "resolutions", pnpm uses "pnpm.overrides")

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Not every report is exploitable: a ReDoS in a dev-only build tool is lower risk than one in
  a request parser used in production. Prioritize by severity AND usage.
- npm audit only finds KNOWN vulnerabilities. It does not detect malicious new packages -
  also use lockfiles, minimal dependencies, and tools like Snyk, Socket or Dependabot alerts.
- npm audit signatures verifies registry signatures of installed packages.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What would you do with a critical vulnerability that has no fix?
A1: Check if the vulnerable code path is actually used, look for an alternative package or a
    patched fork, apply overrides or a patch (patch-package), and document the risk.

Q2: How do you use audit in CI?
A2: npm audit --audit-level=high --omit=dev as a pipeline step so high/critical prod issues
    fail the build.

Q3: Difference between audit fix and audit fix --force?
A3: fix stays within semver ranges; --force allows major version upgrades (possible breakage).
*/
