/* 2_path_module.js

=====================================================
path Module
=====================================================

Definition (What I should say in the interview):
- "The path module is a utility for working with file and directory paths in a
   **cross-platform** way. Windows uses backslashes and Linux uses forward slashes, so instead of
   building paths with string concatenation I use path.join or path.resolve. It also helps to
   extract parts of a path like the file name, extension and directory."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. path.join(...)     -> joins segments and normalizes.
2. path.resolve(...)  -> builds an absolute path.
3. path.basename(p)   -> 'file.txt'; path.basename(p, '.txt') -> 'file'.
4. path.dirname(p)    -> parent directory.
5. path.extname(p)    -> '.txt'.
6. path.parse(p) / path.format(obj) -> split into / build from { root, dir, base, name, ext }.
7. path.sep -> '\' on Windows, '/' on POSIX. path.posix / path.win32 for a fixed style.
8. path.normalize, path.relative(from, to), path.isAbsolute(p).

-----------------------------------------------------
Example
-----------------------------------------------------
const path = require('path');

const file = path.join(__dirname, 'uploads', 'avatar.png');
console.log(path.basename(file));        // avatar.png
console.log(path.extname(file));         // .png
console.log(path.dirname(file));         // .../uploads
console.log(path.parse(file).name);      // avatar
console.log(path.relative('/a/b', '/a/c/d')); // ../c/d
console.log(path.normalize('/a//b/../c'));    // /a/c

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Using './data.json' with fs -> relative to process.cwd(), NOT to the current file.
  Use path.join(__dirname, 'data.json') instead.
- In ES modules there is no __dirname; use import.meta.dirname (newer Node) or
  path.dirname(fileURLToPath(import.meta.url)).
- path does not touch the disk; it is pure string manipulation. It does not check if a file exists.

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Building upload/static folder paths, checking allowed file extensions, config file locations.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why not just use string concatenation?
A1: Separators differ across OSes and you can end up with double slashes or wrong separators.

Q2: How do you validate an uploaded file type with path?
A2: path.extname(name).toLowerCase() against an allow-list, but also verify the MIME/content,
    since the extension can be faked.
*/
