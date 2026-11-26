/* 26_npm_init.js

=====================================================
npm init
=====================================================

Definition (What I should say in the interview):
- "npm init creates a new **package.json** in the current folder - it is the first step when I
   start a Node project. Run without flags it asks interactive questions like name, version,
   entry point and license. With **npm init -y** it skips the questions and uses defaults, which
   is what I usually do and then edit the file. There is also npm init <initializer>, like
   npm init vite, which runs a project scaffolding package called create-vite."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. npm init       -> interactive questionnaire.
2. npm init -y    -> accept all defaults (--yes).
3. npm init <x>   -> runs npx create-<x> (npm init vite, npm init playwright).
4. Defaults can be configured: npm config set init-author-name "Your Name".
5. It does not install anything - only creates package.json.

-----------------------------------------------------
Example
-----------------------------------------------------
mkdir orders-api && cd orders-api
npm init -y

// Generated package.json (roughly)
{
  "name": "orders-api",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": { "test": "echo \"Error: no test specified\" && exit 1" },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}

// What I typically change right after:
npm pkg set type=module                 # switch to ESM
npm pkg set private=true --json         # never publish an app by accident
npm pkg set scripts.start="node index.js"
npm install express && npm install -D nodemon

npm init vite@latest my-app             # scaffolding with an initializer
npm init @scope/app                     # runs @scope/create-app

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Folder name becomes the default package name - must be lowercase, no spaces, URL-safe.
- Default "test" script exits with code 1 - replace it, otherwise CI "npm test" fails.
- Also add .gitignore (node_modules, .env) and optionally .nvmrc at this point.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What does npm init -y do?
A1: Creates package.json with default values without asking any questions.

Q2: What does npm init vite actually run?
A2: npm exec create-vite - npm init <name> maps to the create-<name> package.

Q3: How do you edit package.json from the CLI?
A3: npm pkg set / get / delete, e.g. npm pkg set scripts.dev="nodemon index.js".
*/
