/* 23_node_prefix_core_modules.js

=====================================================
The node: Prefix for Core Modules
=====================================================

Definition (What I should say in the interview):
- "The node: prefix, like require('node:fs') or import fs from 'node:fs', explicitly tells Node
   to load the **built-in core module**. Without the prefix it already loads the core module, but
   the prefix makes the intent clear to anyone reading the code, avoids any confusion with an npm
   package of the same name, and skips the resolution lookup. Some newer modules such as
   node:test and node:sqlite are only available with the prefix, so I use it everywhere now."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Supported in require() since Node 14.18 / 16, and in ESM since 12/14.
2. Clear distinction between built-ins and third-party packages at a glance.
3. Cannot be hijacked by anything in node_modules.
4. Prefix-only modules: node:test, node:sqlite, node:sea, node:test/reporters.
5. Recommended by the Node docs and by linters (eslint-plugin-n / unicorn "prefer-node-protocol").

-----------------------------------------------------
Example
-----------------------------------------------------
// CommonJS
const fs = require('node:fs/promises');
const path = require('node:path');
const { EventEmitter } = require('node:events');

// ESM
import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import test from 'node:test';          // only works WITH the prefix
import assert from 'node:assert/strict';

test('uuid has 36 chars', () => {
  assert.equal(randomUUID().length, 36);
});

-----------------------------------------------------
Comparison
-----------------------------------------------------
Import           | Result
-----------------|----------------------------------------------
'fs'             | core fs (core modules win over node_modules)
'node:fs'        | core fs, explicitly
'test'           | npm package named "test" if installed - NOT node:test
'node:test'      | built-in test runner

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Mixing styles in one codebase is harmless but inconsistent - pick one (prefer node:) and
  enforce it with a lint rule.
- Bundlers targeting the browser may need configuration to treat node: imports as externals.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is require('fs') ever different from require('node:fs')?
A1: No, both return the same core module. The prefix is about clarity and future modules.

Q2: Why does require('test') not give me the test runner?
A2: node:test was added as prefix-only to avoid breaking the existing npm package named "test".
*/
