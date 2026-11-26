/* 25_dirname_and_filename.js

=====================================================
__dirname and __filename
=====================================================

Definition (What I should say in the interview):
- "__filename is the **absolute path of the current file**, and __dirname is the **absolute path
   of the folder** that contains it. They are not real globals - in CommonJS they are passed in
   by the module wrapper function. I use __dirname with path.join to build file paths that work
   no matter where the process was started from. In ES modules they don't exist, so we use
   import.meta.url, or import.meta.dirname and import.meta.filename in Node 20.11+."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. __filename -> /home/app/src/server.js
2. __dirname  -> /home/app/src
3. process.cwd() -> folder where you RAN node from (can be different!).
4. Available in CommonJS only; ESM uses import.meta.

-----------------------------------------------------
Example (CommonJS)
-----------------------------------------------------
const path = require('path');
const fs = require('fs');

console.log(__filename);          // /home/app/src/server.js
console.log(__dirname);           // /home/app/src
console.log(process.cwd());       // /home/app  (if run as: node src/server.js)

// Reliable path, independent of where node was started
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

-----------------------------------------------------
Example (ES Modules)
-----------------------------------------------------
// Node 20.11+
console.log(import.meta.dirname, import.meta.filename);

// Older Node versions
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

-----------------------------------------------------
Comparison Table
-----------------------------------------------------
| Value          | Meaning                               | Changes with start dir? |
|----------------|---------------------------------------|-------------------------|
| __dirname      | Folder of the current file            | No                      |
| __filename     | Full path of the current file         | No                      |
| process.cwd()  | Current working dir of the process    | Yes                     |

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Using relative paths like fs.readFile('./data.json') -> resolved against process.cwd(),
  so it breaks when the app is started from another folder. Use path.join(__dirname, ...).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: __dirname vs process.cwd()?
A1: __dirname is fixed to the file location; cwd() depends on where the process was launched.

Q2: Why is __dirname undefined in my ESM file?
A2: ESM has no module wrapper; use import.meta.dirname (20.11+) or fileURLToPath(import.meta.url).
*/
