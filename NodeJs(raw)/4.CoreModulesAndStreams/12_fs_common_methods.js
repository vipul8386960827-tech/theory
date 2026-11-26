/* 12_fs_common_methods.js

=====================================================
Common fs Methods
=====================================================

Definition (What I should say in the interview):
- "The methods I use most from fs are readFile/writeFile/appendFile for content, mkdir with
   recursive, readdir, stat to get file info, unlink and rm to delete, rename to move, copyFile,
   and access to check permissions. I use the fs/promises versions with async/await, and
   fs.watch occasionally for watching changes."

-----------------------------------------------------
Key Methods (fs/promises)
-----------------------------------------------------
| Method                         | Purpose                                     |
|--------------------------------|---------------------------------------------|
| readFile(p, 'utf8')            | read whole file                             |
| writeFile(p, data)             | create/overwrite file                       |
| appendFile(p, data)            | add to end (logs)                           |
| mkdir(p, { recursive: true })  | create nested dirs, no error if exists      |
| readdir(p, { withFileTypes })  | list dir entries (Dirent: isFile/isDirectory)|
| stat(p)                        | size, mtime, isFile(), isDirectory()        |
| rename(old, new)               | move/rename                                 |
| copyFile(src, dest)            | copy                                        |
| unlink(p) / rm(p, {recursive}) | delete file / delete folder tree            |
| access(p, fs.constants.R_OK)   | check permission (throws if not allowed)    |
| open(p) -> FileHandle          | low-level read/write, must close()          |

-----------------------------------------------------
Example
-----------------------------------------------------
const fs = require('fs/promises');
const path = require('path');

async function main() {
  const dir = path.join(__dirname, 'reports');
  await fs.mkdir(dir, { recursive: true });

  const file = path.join(dir, 'today.txt');
  await fs.writeFile(file, 'Report\n');
  await fs.appendFile(file, 'More lines\n');

  const info = await fs.stat(file);
  console.log('size:', info.size, 'modified:', info.mtime);

  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    console.log(entry.name, entry.isDirectory() ? 'dir' : 'file');
  }

  await fs.rm(dir, { recursive: true, force: true });
}
main().catch(console.error);

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Check-then-act race: calling access()/exists before open is racy. Better to just try the
  operation and handle ENOENT / EEXIST.
- fs.exists is deprecated; fs.existsSync is still fine for scripts.
- Common error codes: ENOENT (not found), EACCES (permission), EEXIST, EISDIR, EMFILE (too many
  open files).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: stat vs lstat?
A1: lstat returns info about a symlink itself; stat follows the link to the target.

Q2: fs.watch vs fs.watchFile?
A2: watch uses OS events (efficient, platform quirks); watchFile polls with stat (slower, portable).
*/
