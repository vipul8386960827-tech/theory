/* 10_semver_caret_tilde.js

=====================================================
Semantic Versioning, ^ (caret) and ~ (tilde)
=====================================================

Definition (What I should say in the interview):
- "npm packages follow **semantic versioning**: MAJOR.MINOR.PATCH. A major bump means breaking
   changes, minor means new backward-compatible features, patch means bug fixes. In package.json,
   the **caret ^** allows minor and patch updates, so ^1.4.2 means anything from 1.4.2 up to but
   not including 2.0.0. The **tilde ~** allows only patch updates, so ~1.4.2 means up to 1.5.0.
   One gotcha: for 0.x versions caret is stricter - ^0.4.2 only allows 0.4.x."

-----------------------------------------------------
Range Cheat Sheet
-----------------------------------------------------
Range       | Allowed versions
------------|------------------------------------
1.4.2       | exactly 1.4.2
^1.4.2      | >=1.4.2 <2.0.0   (minor + patch)
~1.4.2      | >=1.4.2 <1.5.0   (patch only)
^0.4.2      | >=0.4.2 <0.5.0   (0.x: minor is treated like major)
^0.0.3      | >=0.0.3 <0.0.4   (only that exact patch)
~1.4        | >=1.4.0 <1.5.0
1.x / 1.*   | >=1.0.0 <2.0.0
>=1.2 <2    | explicit range
*  / latest | anything (avoid)
1.0.0-beta.1| pre-release, only matched if explicitly requested

-----------------------------------------------------
Example
-----------------------------------------------------
npm install express            # saves "express": "^4.19.2" (caret is the default)
npm install express --save-exact   # saves "4.19.2"
npm config set save-prefix '~'     # make ~ the default

npx semver -r "^1.4.2" 1.9.0 2.0.0 # check which versions match -> 1.9.0

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- semver is a promise, not a guarantee - a minor release can still break you. The lockfile
  protects you from surprise updates.
- Many teams pin exact versions for critical packages and use Dependabot/Renovate to update.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What does ^0.2.3 allow and why?
A1: Only >=0.2.3 <0.3.0. Before 1.0.0 the API is considered unstable, so npm treats the
    minor number as the breaking one.

Q2: When would you prefer ~ over ^?
A2: For a package known to break things in minor versions, or in sensitive production code
    where I only want bug fixes.

Q3: If ^ allows updates, why does my install not upgrade automatically?
A3: Because package-lock.json pins the installed version. npm update moves within the range.
*/
