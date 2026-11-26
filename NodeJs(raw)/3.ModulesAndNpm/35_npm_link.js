/* 35_npm_link.js

=====================================================
npm link
=====================================================

Definition (What I should say in the interview):
- "npm link lets me use a **local package** in another project **without publishing it**. It
   works in two steps: running npm link inside the package folder creates a global symlink to it,
   and running npm link <package-name> inside the consuming project symlinks that global entry
   into the project's node_modules. Any change I make in the package source is visible
   immediately in the project. I use it when developing a shared library or a CLI tool and want
   to test it in a real app before releasing."

-----------------------------------------------------
Example
-----------------------------------------------------
# 1. In the library
cd ~/code/my-logger
npm link                       # global symlink: <global>/node_modules/my-logger -> ~/code/my-logger
                               # also links its "bin" commands globally (for CLIs)

# 2. In the app
cd ~/code/orders-api
npm link my-logger             # orders-api/node_modules/my-logger -> global link

# Shortcut: link directly by path
npm link ../my-logger

# 3. Clean up when done
npm unlink my-logger           # in the app (then npm install to restore the registry version)
npm unlink -g my-logger        # remove the global link (or: npm rm -g my-logger)

-----------------------------------------------------
Alternatives
-----------------------------------------------------
Option                         | Notes
-------------------------------|------------------------------------------------
"my-logger": "file:../my-logger" | Saved in package.json, installed as a link/copy
npm workspaces (monorepo)      | Best for packages that live together long term
npm pack + npm i ./x.tgz       | Tests the REAL published contents (files, exports)
yalc                           | Simulates publishing locally, avoids symlink issues

-----------------------------------------------------
Common Problems
-----------------------------------------------------
- Duplicate peer deps: the linked package resolves react/express from ITS OWN node_modules,
  so you get two copies -> "Invalid hook call" in React, broken instanceof checks.
- Running npm install in the app can remove the link - re-run npm link afterwards.
- Linked package must be built (dist/) if its main/exports point to compiled files.
- Different Node versions in each folder (nvm) -> different global folders, link not found.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does npm link change package.json?
A1: No (with current npm it does not save it), which is why it is only for local testing.

Q2: How do you test exactly what will be published?
A2: npm pack creates the tarball; install that .tgz in a test project.

Q3: When would you choose workspaces over npm link?
A3: When the library and app are developed together permanently, e.g. in a monorepo.
*/
