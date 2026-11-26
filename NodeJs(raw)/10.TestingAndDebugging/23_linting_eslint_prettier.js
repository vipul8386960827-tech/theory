/* 23_linting_eslint_prettier.js

=====================================================
Linting - ESLint and Prettier
=====================================================

Definition (What I should say in the interview):
- "**ESLint** is a static analysis tool that finds problems in code without running it - like
   unused variables, undefined variables, missing await or risky patterns - and enforces team
   coding rules. **Prettier** is a code formatter that only cares about style - indentation,
   quotes, semicolons, line length - and rewrites the code in one consistent format. I use
   both together: Prettier for formatting, ESLint for code quality, with eslint-config-prettier
   to switch off ESLint rules that would conflict with Prettier."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. ESLint -> correctness and best practices (no-unused-vars, eqeqeq, no-undef).
2. Prettier -> formatting only; opinionated with few options.
3. Run them automatically: editor on save, pre-commit hook (husky + lint-staged), and in CI.
4. ESLint 9 uses the "flat config" file eslint.config.js (older: .eslintrc.json).
5. Plugins: eslint-plugin-n (Node rules), eslint-plugin-security, eslint-plugin-jest,
   typescript-eslint for TS.

-----------------------------------------------------
Example
-----------------------------------------------------
// eslint.config.js (flat config, ESLint 9)
const js = require('@eslint/js');
const globals = require('globals');
const prettier = require('eslint-config-prettier');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: { globals: { ...globals.node, ...globals.jest } },
    rules: {
      'no-unused-vars': 'warn',
      eqeqeq: 'error',
      'no-console': 'off',
    },
  },
  prettier,                     // must be last -> disables conflicting style rules
];

// .prettierrc
{ "singleQuote": true, "semi": true, "printWidth": 100, "trailingComma": "es5" }

// package.json
"scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier --write ."
},
"lint-staged": { "*.js": ["eslint --fix", "prettier --write"] }

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect       | ESLint                         | Prettier                    |
|--------------|--------------------------------|-----------------------------|
| Purpose      | code quality + some style      | formatting only             |
| Catches bugs | yes (undefined vars, etc.)     | no                          |
| Configurable | highly                         | intentionally minimal       |
| Auto-fix     | some rules (--fix)             | rewrites whole file         |

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why use both instead of only ESLint?
A1: Prettier formats more consistently and faster with zero debates; ESLint focuses on finding
    real problems. eslint-config-prettier prevents them fighting over style.

Q2: How do you make sure everyone follows the rules?
A2: Pre-commit hooks with husky + lint-staged on changed files, and a lint step in the CI
    pipeline that fails the build on errors.
*/
