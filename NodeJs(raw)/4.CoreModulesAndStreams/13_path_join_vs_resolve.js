/* 13_path_join_vs_resolve.js

=====================================================
path.join vs path.resolve
=====================================================

Definition (What I should say in the interview):
- "path.join simply **joins all segments** with the platform separator and normalizes the result;
   the result can be relative. path.resolve processes segments **from right to left** until it
   builds an **absolute path** - if no segment is absolute it prepends process.cwd(). Also, in
   resolve a segment starting with '/' resets everything before it, while join treats it as a
   normal segment."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Point                    | path.join                 | path.resolve                   |
|--------------------------|---------------------------|--------------------------------|
| Output                   | relative or absolute      | always absolute                |
| Uses process.cwd()       | No                        | Yes, if no absolute segment    |
| Segment starting with /  | just appended             | becomes the new root           |
| Empty call               | '.'                       | process.cwd()                  |

-----------------------------------------------------
Example (POSIX output, cwd = /home/app)
-----------------------------------------------------
const path = require('path');

path.join('a', 'b', 'c.txt');        // 'a/b/c.txt'
path.resolve('a', 'b', 'c.txt');     // '/home/app/a/b/c.txt'

path.join('/a', '/b', 'c');          // '/a/b/c'
path.resolve('/a', '/b', 'c');       // '/b/c'   ('/b' is absolute -> restart)

path.join('a', '../b');              // 'b'
path.resolve('a', '../b');           // '/home/app/b'

path.join();                         // '.'
path.resolve();                      // '/home/app'

// Most common real usage
const uploads = path.join(__dirname, 'uploads');      // absolute because __dirname is absolute
const cfg = path.resolve(process.argv[2] || 'config.json'); // user path relative to cwd

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- path.join(__dirname, x) and path.resolve(__dirname, x) give the same result in most cases,
  except when x starts with '/' (resolve would ignore __dirname).
- Security: neither one prevents path traversal. For user input do:
  const full = path.resolve(base, userInput);
  if (!full.startsWith(base + path.sep)) throw new Error('Invalid path');

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which would you use for a CLI argument like "./data/file.csv"?
A1: path.resolve, because the user means relative to where they ran the command (cwd).

Q2: Which for a file next to my source code?
A2: path.join(__dirname, 'file') - independent of where the process was started.
*/
