/* 29_node_versions_and_lts.js

=====================================================
Node Versions and LTS (Long-Term Support)
=====================================================

Definition (What I should say in the interview):
- "Node releases a new major version every six months, in April and October. **Even-numbered**
   versions (18, 20, 22, 24) become **LTS** - Long-Term Support - in October and get about 30
   months of bug fixes and security patches. **Odd-numbered** versions are 'Current' releases
   that are short-lived and never become LTS. In production we always use an Active or
   Maintenance LTS version, and we pin it using .nvmrc or the engines field in package.json."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Release lifecycle: Current (about 6 months) -> Active LTS (about 12 months)
   -> Maintenance LTS (until about 30 months total) -> End-of-Life.
2. Odd versions (19, 21, 23) -> about 6 months support only; good for trying new features.
3. LTS versions also get codenames (e.g. 18 Hydrogen, 20 Iron, 22 Jod).
4. Versioning follows SemVer: MAJOR.MINOR.PATCH (e.g. 22.11.0).
5. Major versions may contain breaking changes -> test before upgrading.

-----------------------------------------------------
Example
-----------------------------------------------------
// Terminal
// node -v                      -> v22.11.0
// node -p "process.versions"   -> versions of node, v8, uv, openssl ...

console.log(process.version);              // 'v22.11.0'
console.log(process.versions.v8);          // V8 engine version
console.log(process.release.lts);          // 'Jod' on LTS, undefined on Current

// package.json - declare supported versions
// "engines": { "node": ">=20" }

// .nvmrc - team uses the same version
// 22

-----------------------------------------------------
Comparison Table
-----------------------------------------------------
| Type            | Versions      | Support       | Use for                  |
|-----------------|---------------|---------------|--------------------------|
| Current         | All new major | ~6 months     | Testing new features     |
| Active LTS      | Even only     | ~12 months    | Production               |
| Maintenance LTS | Even only     | Critical fixes| Production (plan upgrade)|
| End-of-Life     | -             | None          | Never (security risk)    |

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Running an EOL version (like Node 16) means no security patches -> upgrade.
- Use the same Node version locally, in CI and in the Docker image (e.g. FROM node:22-alpine).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which Node version would you use for a new production project?
A1: The latest Active LTS version, because it is stable and has the longest support window.

Q2: How do you keep the Node version consistent in a team?
A2: .nvmrc for nvm, engines field in package.json, and a pinned version in Dockerfile/CI.

Q3: Why not run the odd-numbered versions in production?
A3: They are supported only for about 6 months and never become LTS.
*/
